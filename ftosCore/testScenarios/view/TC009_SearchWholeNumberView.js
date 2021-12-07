// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC009_SearchWholeNumberView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by whole number attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResultNumeric/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultNumericPortal);
  // 3 Search by Age: 25(equal) -> 2 results
  // 4 Check if 2 results are displayed
  // 5 Search by Age: 25 (does not equal) -> 6 results
  // 6 Check if 6 results are displayed
  // 7 Search by Age: 25 (less than)
  // 8 Check if 2 results are displayed
  // 9 Search by Age: 25 (grather than)
  // 10 Check if 4results are displayed
  // 11 Search by Age: 25 (less than or equal)
  // 12 Check if 4 results are displayed
  // 13 Search by Age: 25 (grather than or equal)
  // 14 Check if 6 results are displayed
  // 15 Search by Age: 25-50 (between)
  // 16 Check if 5 results are displayed
  // 17 Click on Age column
  // 18 Check if 1st resut is Auto 1 , Age is 25
  // 19 Check if 2nd resut is Auto 6 , Age is 25
  // 20 Check if 3rd resut is Auto 7 , Age is 32
  // 21 Check if 4th resut is Auto 3 , Age is 32
  // 22 Check if 5th resut is Auto 8 , Age is 44
  viewActionVerify.verifySearchWholeNumberViewInPortal(data.age25, data.age32, data.age44, data.age50, data.nameAuto1, data.nameAuto3, data.nameAuto6, data.nameAuto7, data.nameAuto8);
  // 23 Logoff
  await commonActions.logoutFromApp();
});
