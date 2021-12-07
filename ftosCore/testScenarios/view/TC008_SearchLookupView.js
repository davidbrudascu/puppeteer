// Actions
const commonActions = require('~actions/commonActions');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');
// Data
const data = require('~data/view/TC008_SearchLookupView');

// Author Victor Pana

Feature('View');

Scenario('User can search and filter by a lookup attribute data view', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_SearchResultLkp/list/
  commonActions.accessDirectUrl(data.viewAT_SearchResultLkpPortal);
  // 3  Search by Country Code: ITA
  // 4  Check if 6 results are displayed
  // 5  Check if 1st record is Auto 11
  // 6  Search by Country Code: ITA and City: Milano
  // 7  Check if 4 results are displayed
  // 8  Check if 1st record is Auto 4
  // 9  Search by Name: Auto
  // 10  Click on "City" column
  // 11  Check if 1st result is Auto 6, Brasov
  // 12  Click again on City column
  // 13  Check if 1st result is Auto 11, Roma
  // 14  Click on 3rd page
  // 15  Check if 3 results are displayed
  // 16  Check if the last record is Auto, Brasov
  viewActionVerify.verifySearchLookupViewInPortal(data.countryCodeITA, data.nameAuto11, data.cityMilano, data.nameAuto4, data.nameAuto, data.nameAuto6, data.cityBrasov, data.cityRoma);
  // 17  Logoff
  await commonActions.logoutFromApp();
});
