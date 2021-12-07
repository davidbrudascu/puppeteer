// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC006_SearchTextView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by a text attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResult/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultPortal);
  // 3 Search by Name (default): non
  // 4 Check if 5 results are displayed
  // 5 Check if 1st result is "NonAuto"
  // 6 Search by Name (does not contain): auto
  // 7 Check if 6 results are displayed
  // 8 Search by Name (starts with) AT
  // 9 Check if 7 results are displayed
  // 10 Search by Name (ends with) Auto
  // 11 Check if 5 results are displayed
  // 12 Search by Name (equal) Auto 1
  // 13 Check if 3 results are displayed
  // 14 Search by Name (does not equal) Auto 1
  // 15 Click on Name column
  // 16 Check if 1st result is AT
  // 17 Click again on Name column
  // 18 Check if 1st result is NonAuto 5
  // 19 Click on 3rd page
  // 20 Check if the last result is AT
  // 21 Check if there are 6 results on page
  viewActionVerify.verifySearchTextViewInPortal(data.nameNon, data.nameNonAuto, data.nameAT, data.nameAuto, data.nameAT1Auto, data.nameAuto1, data.nameNonAuto5, data.nameSRL);
  // 22 Logoff
  await commonActions.logoutFromApp();
});
