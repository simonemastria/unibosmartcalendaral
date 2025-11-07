/**
 * Test suite wrapper - imports all tests from /tests folder
 * Ensures Create React App runs tests placed outside /src.
 */
import "../tests/conflictUtils.test.js";      // già presente nel repo
import "../tests/App.test.js";                // già presente nel repo

// Nuovi test aggiunti
import "../tests/conflictUtils.extra.test.js";
import "../tests/eventUtils.test.js";
import "../tests/ScheduleContainer.render.test.jsx";
import "../tests/ScheduleContainer.conflict-smoke.test.jsx";
import "../tests/api.error.test.js";
