// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC013_SearchInvariantDateView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by an invariant date attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_SearchResultDate/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultDatePortal);
  // 3  Search by InvariantDate (less than): 01/01/2000
  // 4  Check if only 1 result is displayed (Auto 3)
  // 5  Search by InvariantDate (grather than): 01/01/2000
  // 6  Check if 2 results are displayed Auto 1 and Auto 2
  // 7  Search by Invariant Date (between: 01/02/2010 - 01/02/2020)
  // 8  Check if 1 result is displayed (Auto 2)
  // 9  Search by InvariantDate (equal): 31/12/2000
  // 10  Check if only 1 result is displayed (Auto 1)
  // 11  Search by Invariant Date (does not equal: 31/12/2010)
  // 12  Check if 2 result are displayed (Auto 1 and Auto 3)
  // 13  Click on Invariant Date column
  // 14  Check if 1st record is Auto 3, 31/12/1999
  // 15  Click again on Invariant Date
  // 16  Check if 1st record is Auto 2, 31/12/2010
  viewActionVerify.verifySearchInvariantDateViewInPortal(data.nameAuto1, data.nameAuto2, data.nameAuto3, data.date01_01_2000, data.date01_02_2010, data.date01_02_2020, data.date31_12_2000, data.date31_12_2010, data.date31_12_1999);
  // 17  Logoff
  await commonActions.logoutFromApp();
});
