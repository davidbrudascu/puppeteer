// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC011_SearchDateView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by a date attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResultDate/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultDatePortal);
  // 3 Search by DoB (less than): 01/01/2000
  // 4 Check if only 1 result is displayed (Auto 3)
  // 5 Search by Dob (grather than): 01/01/2000
  // 6 Check if 2 results are displayed Auto 1 and Auto 2
  // 7 Search by DoB (between: 01/02/2010 - 01/02/2020)
  // 8 Check if 1 result is displayed (Auto 2)
  // 9 Click on DoB column
  // 10 Check if 1st record is Auto 3, 31/12/1999
  // 11 Click again on DoB
  // 12 Check if 1st record is Auto 2, 31/12/2010
  viewActionVerify.verifySearchDateViewInPortal(data.date01012000, data.nameAuto1, data.nameAuto2, data.nameAuto3, data.date01022010, data.date01022020, data.date31121999, data.date31122010);
  // 13 Logoff
  await commonActions.logoutFromApp();
});
