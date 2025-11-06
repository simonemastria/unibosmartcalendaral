import React, { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { Box, Paper, Dialog, DialogTitle, DialogContent, ToggleButtonGroup, ToggleButton } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarCustom.css';
import EventList from './EventList';
import { formatEventTitle, createCalendarEvent } from '../utils/eventUtils';
import { findConflicts } from '../utils/conflictUtils';

const locales = {
  'it': it
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const calendarMinHeight = {
  xs: 540,
  sm: 720,
  md: 800
};

const CalendarView = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Process events for the calendar
  const calendarEvents = useMemo(() => {
    console.log('Processing events for calendar:', events.length);
    
    // Debug event structure
    if (events.length > 0) {
      console.log('Sample event structure:', events[0]);
    }
    
    return events.map(event => {
      // Ensure start and end are valid dates
      let start, end;
      
      try {
        start = new Date(event.start);
        end = new Date(event.end);
        
        // Validate dates
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.warn('Invalid date in event:', event);
          // Use current date as fallback
          const now = new Date();
          start = now;
          end = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
        }
      } catch (error) {
        console.error('Error parsing dates for event:', event, error);
        // Use current date as fallback
        const now = new Date();
        start = now;
        end = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
      }
      
      // Use the utility function to create a calendar event with formatted title
      return createCalendarEvent(event, start, end);
    });
  }, [events]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    if (newView) {
      setView(newView);
    }
  };

  // Find conflicts
  const conflictingEventIds = useMemo(() => findConflicts(events), [events]);

  const eventStyleGetter = (event) => {
    const eventId = event.resource ? 
      `${event.resource.title}_${event.resource.start}_${event.resource.program}` : '';
    const hasConflict = conflictingEventIds.has(eventId);

    return {
      style: {
        backgroundColor: hasConflict ? '#1976d2' : '#ac3931',
        borderRadius: '4px',
        border: hasConflict ? '2px solid #fff' : 'none',
        color: 'white',
        fontWeight: hasConflict ? 'bold' : 'normal',
        boxShadow: hasConflict ? '0 0 10px rgba(25, 118, 210, 0.5)' : 'none',
      }
    };
  };

  const formats = {
    eventTimeRangeFormat: () => '', // This removes the time from the month view
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, 'HH:mm', culture),
    eventTimeRangeEndFormat: ({ end }, culture, localizer) =>
      localizer.format(end, 'HH:mm', culture),
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, 'MMMM dd', culture) + ' - ' +
      localizer.format(end, view === Views.MONTH ? 'MMMM dd' : 'dd', culture),
    dayHeaderFormat: (date, culture, localizer) =>
      localizer.format(date, 'EEEE dd/MM', culture), // "Lunedì 22/10"
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, 'EEEE', culture),
    timeRangeFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, 'HH:mm', culture) + ' - ' + localizer.format(end, 'HH:mm', culture),
  };

  // Custom styles for the calendar
  const calendarStyle = {
    height: '100%',
    minHeight: calendarMinHeight,
    '& .rbc-time-view': {
      border: '1px solid #ddd',
    },
    '& .rbc-time-header-content': {
      borderLeft: '1px solid #ddd',
    },
    '& .rbc-time-content': {
      borderTop: '2px solid #ac3931',
    },
    '& .rbc-current-time-indicator': {
      backgroundColor: '#rgb(231, 210, 18)',
      height: '2px',
    },
    '& .rbc-today': {
      backgroundColor: '#rgb(231, 210, 18)',
    },
    '& .rbc-header': {
      padding: '8px 3px',
      fontWeight: 'bold',
      fontSize: '0.9rem',
      borderBottom: '2px solid #ac3931',
      backgroundColor: '#fafafa',
    },
    '& .rbc-time-slot': {
      minHeight: '40px',
    },
    '& .rbc-event': {
      padding: '2px 5px',
      fontSize: '0.85rem',
    },
    '& .rbc-event-label': {
      fontSize: '0.75rem',
    },
  };

  return (
    <Box sx={{ minHeight: calendarMinHeight, height: 'auto' }}>
      <Paper 
        elevation={2} 
        sx={{ 
          minHeight: calendarMinHeight, 
          height: 'auto', 
          p: { xs: 1.5, sm: 2 }, 
          overflow: 'hidden' 
        }}
      >
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(event, nextView) => handleViewChange(nextView)}
          size="small"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            gap: 1,
            mb: 2,
            '& .MuiToggleButton-root': {
              flex: { xs: '1 1 45%', sm: '0 0 auto' },
              minWidth: { xs: '45%', sm: 100 }
            }
          }}
        >
          <ToggleButton value={Views.MONTH}>Mese</ToggleButton>
          <ToggleButton value={Views.WEEK}>Settimana</ToggleButton>
          <ToggleButton value={Views.DAY}>Giorno</ToggleButton>
          <ToggleButton value={Views.AGENDA}>Agenda</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={calendarStyle}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={{
              month: true,
              week: true,
              day: true,
              agenda: true,
            }}
            view={view}
            date={date}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            formats={formats}
            popup
            tooltipAccessor={event => `${event.title}`}
            min={new Date(2024, 0, 1, 7, 0, 0)} // Start at 7:00 AM
            max={new Date(2024, 0, 1, 21, 0, 0)} // End at 9:00 PM
            step={30}
            timeslots={2}
            getNow={() => new Date()} // Ensure current time is always fresh
            showMultiDayTimes={true}
            messages={{
              today: 'Oggi',
              previous: 'Precedente',
              next: 'Successivo',
              month: 'Mese',
              week: 'Settimana',
              day: 'Giorno',
              agenda: 'Agenda',
              date: 'Data',
              time: 'Ora',
              evento: 'Evento',
              noEventsInRange: 'Nessun evento in questo periodo',
              showMore: total => `+ Altri ${total}`
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={Boolean(selectedEvent)}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle>
              {formatEventTitle(selectedEvent)}
            </DialogTitle>
            <DialogContent>
              <EventList events={[selectedEvent]} />
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CalendarView;
