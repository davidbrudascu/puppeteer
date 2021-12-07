// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC007_SearchOptionSetView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by an option set attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResult/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultPortal);
  // 3 Search by Type: SA
  // 4 Check if 6 results are displayed
  // 5 Search by Name: Auto and Type: SA
  // 6 Check if 5 results are displayed
  // 7 Search by Name "Auto" and click on Type column
  // 8 Check if 1st result is Automation 5 Auto
  // 9 Go to last page
  // 10 Check if last result is Auto 1
  // 11   Check there are only 3 results on page
  viewActionVerify.verifySearchOptionSetViewInPortal(data.typeSA, data.nameAuto, data.nameAutomation5Auto, data.nameAuto1);
  // 12 Logoff
  await commonActions.logoutFromApp();
});
