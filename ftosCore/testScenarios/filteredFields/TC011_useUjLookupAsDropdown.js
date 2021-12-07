// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/filteredFields/ffUseUjLookupAsDropdown');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-110
Feature('Filtered Fields');

Scenario('Use Filtered Field - User Journey Lookup as Dropdown', async () => {
  // Arrays of city options in lookup table
  // All countries
  const countries = [data.ffCountry1, data.ffCountry2,
    data.ffCountry3, data.ffCountry4, data.ffCountry5];
  // Cities from Romania
  const roCities1 = [data.ffCity1, data.ffCity2, data.ffCity5,
    data.ffCity6, data.ffCity7];
  const roCities2 = [data.ffCity8, data.ffCity9, data.ffCity12,
    data.ffCity21];

  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Search for your entity and access it
  commonActions.accessDirectUrl(data.urlPortalFfEntity);
  // 3 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 4 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 5 Select a country (Romania)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCountryLookupTableDropdown,
    data.ffCountry4,
  );
  // 6 Go to 2nd Step
  commonActions.portalNavigateToSectionStep(data.ffFormStep2);
  // 7 Open City lookup -> only cities from Romania are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(roCities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(roCities2);
  commonActions.clickPaginationInTable('1');
  // 8 Select a city (Bucharest)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCityLookupTableDropdown,
    data.ffCity7,
  );
  // 9 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Open again "City" lookup -> only cities from Romania are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(roCities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(roCities2);
  // 11 Logoff
  await commonActions.logoutFromApp();
});
