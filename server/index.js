const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createEvents } = require('ics');

const app = express();
app.use(cors());
app.use(express.json());

async function fetchScheduleFromUniBo(targetUrl) {
  return axios.get(targetUrl, {
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json'
    }
  });
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('Unibo Smart Calendar Server - Endpoints: /test, /api/fetch-schedule, /calendar.ics');
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running correctly!' });
});

// CORS Proxy endpoint - fetches data from UniBo on behalf of the client
app.get('/api/fetch-schedule', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ 
      error: 'Missing url parameter',
      message: 'Please provide a url query parameter' 
    });
  }

  try {
    console.log(`[Proxy] Fetching schedule from: ${url}`);
    
    // Fetch data from UniBo (no CORS issues server-side)
    const response = await fetchScheduleFromUniBo(url);

    console.log(`[Proxy] Successfully fetched ${Array.isArray(response.data) ? response.data.length : 0} events`);
    
    // Return the data to the client
    res.json(response.data);
    
  } catch (error) {
    console.error(`[Proxy] Error fetching from ${url}:`, error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      res.status(error.response.status).json({
        error: 'Upstream server error',
        message: error.response.statusText,
        status: error.response.status
      });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(503).json({
        error: 'No response from UniBo server',
        message: 'The UniBo server did not respond. Please try again later.'
      });
    } else {
      // Something happened in setting up the request
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    }
  }
});

// Helper function to fetch and process events
async function fetchProgramSchedule(url, programName) {
  try {
    const isBachelors = url.includes('/laurea/') && !url.includes('/magistrale');
    const isSingleCycle = url.includes('/magistralecu/');
    const isMasters = url.includes('/magistrale/') && !url.includes('/magistralecu/');
    
    const urlObj = new URL(url);
    const existingCurricula = urlObj.searchParams.get('curricula');
    const existingYear = urlObj.searchParams.get('anno');

    // If year is already specified, fetch only that year
    if (existingYear) {
    console.log(`[Calendar] Fetching specific year ${existingYear} for ${programName}`);
      const response = await fetchScheduleFromUniBo(url);
      return response.data.map(event => ({
        ...event,
        year: parseInt(existingYear),
        program: programName
      }));
    }

    // Otherwise, fetch all years for the program type
    const createYearUrl = (year) => {
      const yearUrl = new URL(url);
      yearUrl.searchParams.set('anno', year.toString());
      if (existingCurricula) {
        yearUrl.searchParams.set('curricula', existingCurricula);
      }
      return yearUrl.toString();
    };

    // Determine number of years based on program type
    let maxYears = 3; // default bachelor's
    if (isMasters) {
      maxYears = 2;
    } else if (isSingleCycle) {
      maxYears = 6;
    }

    console.log(`[Calendar] Fetching ${maxYears} years for ${programName}`);

    const yearRequests = [];
    for (let year = 1; year <= maxYears; year++) {
      const yearUrl = createYearUrl(year);
      yearRequests.push(
        fetchScheduleFromUniBo(yearUrl)
          .then(response => ({
            year,
            data: response.data
          }))
          .catch(error => {
            console.error(`[Calendar] Error fetching year ${year}:`, error.message);
            return { year, data: [] };
          })
      );
    }

    const responses = await Promise.all(yearRequests);
    return responses.flatMap(({ year, data }) => {
      return data.map(event => ({
        ...event,
        year,
        program: programName
      }));
    });
  } catch (error) {
    console.error(`[Calendar] Error fetching schedule for ${programName}:`, error.message);
    return [];
  }
}

// Convert events to ICS format
function generateICSContent(events) {
  const icsEvents = events.map(event => ({
    start: new Date(event.start)
      .toISOString()
      .split(/[^0-9]/)
      .slice(0, 5)
      .map(num => parseInt(num)),
    end: new Date(event.end)
      .toISOString()
      .split(/[^0-9]/)
      .slice(0, 5)
      .map(num => parseInt(num)),
    title: event.title,
    description: `Course: ${event.title}\nTeacher: ${event.docente}\nProgram: ${event.program}${event.note ? '\nNotes: ' + event.note : ''}`,
    location: event.aule?.length > 0 
      ? `${event.aule[0].des_ubicazione} - ${event.aule[0].des_risorsa}`
      : undefined,
    categories: [event.program],
    status: 'CONFIRMED',
    busyStatus: 'BUSY'
  }));

  const { error, value } = createEvents(icsEvents);
  return error ? null : value;
}

// Endpoint to serve calendar data
app.get('/calendar.ics', async (req, res) => {
  try {
    const urlsParam = req.query.urls;
    if (!urlsParam) {
      return res.status(400).send('No calendar URLs provided');
    }

    const urls = JSON.parse(decodeURIComponent(urlsParam));
    const allSchedules = await Promise.all(
      urls.map(timetable => fetchProgramSchedule(timetable.url, timetable.name))
    );

    const allEvents = allSchedules.flat();
    const icsContent = generateICSContent(allEvents);

    if (!icsContent) {
      return res.status(500).send('Error generating calendar');
    }

    res.set('Content-Type', 'text/calendar;charset=utf-8');
    res.set('Content-Disposition', 'attachment; filename="unibo-calendar.ics"');
    res.send(icsContent);
  } catch (error) {
    console.error('Error serving calendar:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Calendar server running on port ${PORT}`);
  });
}

module.exports = app;
