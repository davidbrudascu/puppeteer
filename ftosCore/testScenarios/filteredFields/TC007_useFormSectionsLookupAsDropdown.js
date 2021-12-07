// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/filteredFields/ffUseFormSectionsLookupAsDropdown');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-110
Feature('Filtered Fields');

Scenario('Use Filtered Field - Form Sections Lookup as Dropdown', async () => {
  // Arrays of city options in lookup table
  // All cities
  const cities1 = [data.ffCity1, data.ffCity2, data.ffCity3,
    data.ffCity4, data.ffCity5];
  const cities2 = [data.ffCity6, data.ffCity7, data.ffCity8,
    data.ffCity9, data.ffCity10];
  const cities3 = [data.ffCity11, data.ffCity12, data.ffCity13,
    data.ffCity14, data.ffCity15];
  const cities4 = [data.ffCity16, data.ffCity17, data.ffCity18,
    data.ffCity19, data.ffCity20];
  const cities5 = [data.ffCity21, data.ffCity22];
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
  // 4 Open city lookup -> all cities are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(cities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(cities2);
  commonActions.clickPaginationInTable('3');
  ffVerify.verifyOnlyProperEntriesInTable(cities3);
  commonActions.clickPaginationInTable('4');
  ffVerify.verifyOnlyProperEntriesInTable(cities4);
  commonActions.clickPaginationInTable('5');
  ffVerify.verifyOnlyProperEntriesInTable(cities5);
  // 5 Select a city (Milano)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCityLookupTableDropdown,
    data.ffCity16,
  );
  // 6 Go to 2nd Step
  commonActions.portalNavigateToSectionStep(data.ffFormStep2);
  // 7 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 8 Select a country (Romania)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCountryLookupTableDropdown,
    data.ffCountry4,
  );
  // 9 Go back to 1st section
  commonActions.portalNavigateToSectionStep(data.ffFormStep1);
  // 10 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldDropdown);
  // 11 Check if only cities from Romania are displayed
  commonActions.clickPaginationInTable('1');
  ffVerify.verifyOnlyProperEntriesInTable(roCities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(roCities2);
  // 12 Select a city (Bucharest)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCityLookupTableDropdown,
    data.ffCity7,
  );
  // 13 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 14 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 15 Check again if only Cities from Romania are displayed
  commonActions.clickPaginationInTable('1');
  ffVerify.verifyOnlyProperEntriesInTable(roCities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(roCities2);
  // 16 Go to 2nd Step
  commonActions.portalNavigateToSectionStep(data.ffFormStep2);
  // 17 Check if Romania is selected
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCountryDropdown,
    data.ffCountry4);
  // 18 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 20 Logoff
  await commonActions.logoutFromApp();
});
