// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC012_SearchDateTimeView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by a date time attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResultDate/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultDatePortal);
  // 3 Search by Time (less than): 01/01/2000 00:00
  // 4 Check if only 1 result is displayed (Auto 3)
  // 5 Search by Time (grather than): 01/01/2000 00:00
  // 6 Check if 2 results are displayed Auto 1 and Auto 2
  // 7 Search by Time (between: 01/02/2010 00:00 - 01/02/2020 00:00)
  // 8 Check if 1 result is displayed (Auto 2)
  // 9 Click on Time column
  // 10 Check if 1st record is Auto 3, 31/12/1999 12:00
  // 11 Click again on Time
  // 12 Check if 1st record is Auto 2, 31/12/2010 12:00
  viewActionVerify.verifySearchDateTimeViewInPortal(data.time01_01_2000_00_00, data.nameAuto1, data.nameAuto2, data.nameAuto3, data.time01_02_2010_00_00, data.time01_02_2020_00_00, data.time31_12_1999_12_00, data.time31_12_2010_12_00);
  // 13 Logoff
  await commonActions.logoutFromApp();
});
