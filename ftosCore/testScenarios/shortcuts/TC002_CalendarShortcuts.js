// Actions
const commonActions = require('~actions/commonActions');
const shortcutsActions = require('~actions/shortcutsActions');
// Data
const data = require('~data/shortcuts/TC002_CalendarShortcuts');

// Author Catalin Diaconu
// AT-534

Feature('Shortcuts');

Scenario('User can use shortcuts to navigate through a calendar', async () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = data.months[date.getMonth()];
  const previousMonth = data.months[date.getMonth() - 1];
  const nextMonth = data.months[date.getMonth() + 1];

  const date_format = new Date();
  today = `${(`0${date_format.getDate()}`).slice(-2)}/${(`0${date_format.getMonth() + 1}`).slice(-2)}/${date_format.getFullYear()}`;
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlEntity);
  shortcutsActions.selectCalendarField();
  shortcutsActions.openCalendar();
  shortcutsActions.closeCalendar();
  shortcutsActions.openCalendar();
  shortcutsActions.navigateToPreviousMonth(previousMonth + data.blankSpace + currentYear, data.one);
  shortcutsActions.navigateToNextMonth(nextMonth + data.blankSpace + currentYear, data.two);
  await shortcutsActions.closeCalendarWithoutSelection(data.empty);
  shortcutsActions.openCalendar();
  // Go back to current month
  shortcutsActions.navigateToPreviousMonth(currentMonth + data.blankSpace + currentYear, data.one);
  await shortcutsActions.selectDate(today);
  await commonActions.logoutFromApp();
});
