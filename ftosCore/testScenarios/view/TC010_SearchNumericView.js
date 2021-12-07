// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC010_SearchNumericView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by numeric attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_SearchResultNumeric/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultNumericPortal);
  // 3  Search by Value: 0 (equal)
  // 4  Check if 1 result is displayed: Auto 1
  // 5  Search by Value: 2200 (equal)
  // 6  Check if 1 result is displayed : Auto 2
  // 7  Search by Value: 2200 .01(equal)
  // 8  Check if 1 result is displayed : Auto 4
  // 9  Search by Value: 2200.01 (less than)
  // 10  Check if 3 results are displayed
  // 11  Search by Value: 2200.01 (grather than)
  // 12  Check if 2 results are displayed
  // 13  Search by Value: 2200.01 (less than or equal)
  // 14  Check if 4 results are displayed
  // 15  Search by Value: 2200.01 (grather than or equal)
  // 16  Check if 3 results are displayed
  // 17  Search by Value: 2200.01-3000 (between)
  // 18  Check if 2 results are displayed
  // 19  Reset Search and Click on "Value" column
  // 20  Check if 1st result value is empty
  // 21  Click again on "Value" column
  // 22  Check if 1st result value is 3,200.00
  await viewActionVerify.verifySearchNumericViewInPortal(data.value0, data.nameAuto1, data.value2200, data.nameAuto2, data.value220001, data.value3000, data.nameAuto4, data.value320000);
  // 23  Logoff
  await commonActions.logoutFromApp();
});
