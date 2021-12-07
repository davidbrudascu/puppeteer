// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC005_SearchBoolView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by a bool attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResult/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultPortal);
  // 3 Search by Major: Yes
  // 4 Check if 1st result is AT
  // 5 Check if 8 results are displayed
  // 6 Search by Major : No
  // 7 Check if 9 results are displayed
  // 8 Search by Name Automation and Major: Yes
  // 9 Check if 2 results are displayed
  // 10 Search by Name Automation and Major: Show all
  // 11 Click on Major Column
  // 12 Check if 1st result is Automation 2, Major: null
  // 13 Click again on Major column
  // 14 Check if 1st result is Automation 5 Auto, Major: true
  viewActionVerify.verifySearchBoolViewInPortal(data.nameAT, data.nameAT1, data.nameAutomation, data.nameAutomation5Auto, data.nameAutomation2);
  // 15 Logoff
  await commonActions.logoutFromApp();
});
