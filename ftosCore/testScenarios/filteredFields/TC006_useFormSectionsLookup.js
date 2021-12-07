// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ffActions = require('~actions/filteredFieldsActions');
// Data
const data = require('~data/filteredFields/ffUseFormSectionsLookup');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-110
Feature('Filtered Fields');

Scenario('Use Filtered Field - Form Sections Lookup', async () => {
  // Arrays of city options in lookup table
  // All countries
  const countries = [data.ffCountry1, data.ffCountry2,
    data.ffCountry3, data.ffCountry4, data.ffCountry5];
  // All cities
  const validCities1 = [data.ffCity1, data.ffCity2, data.ffCity3, data.ffCity4, data.ffCity5,
    data.ffCity6, data.ffCity7, data.ffCity8, data.ffCity9, data.ffCity10];
  const validCities2 = [data.ffCity11, data.ffCity12, data.ffCity13, data.ffCity14, data.ffCity15,
    data.ffCity16, data.ffCity17, data.ffCity18, data.ffCity19, data.ffCity20];
  const validCities3 = [data.ffCity21, data.ffCity22];
  // Cities from Romania
  const roCities = [data.ffCity1, data.ffCity2, data.ffCity5, data.ffCity6, data.ffCity7,
    data.ffCity8, data.ffCity9, data.ffCity10, data.ffCity12, data.ffCity21];
  // Cities not from Romania
  const roInvalidCities = [data.ffCity3, data.ffCity4, data.ffCity11, data.ffCity13, data.ffCity14,
    data.ffCity15, data.ffCity16, data.ffCity17, data.ffCity18, data.ffCity19, data.ffCity20,
    data.ffCity22];

  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Search for your entity and access it
  commonActions.accessDirectUrl(data.urlPortalFfEntity);
  // 3 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 4 Open city lookup -> all cities are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(validCities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(validCities2);
  commonActions.clickPaginationInTable('3');
  ffVerify.verifyOnlyProperEntriesInTable(validCities3);
  commonActions.clickPaginationInTable('2');
  // 5 Select a city (Milano)
  commonActions.doubleClickValueFromTable(ffPage.selector.ffCityLookupTablePopup,
    data.ffCity16);
  // 6 Go to 2nd Step
  commonActions.portalNavigateToSectionStep(data.ffFormStep2);
  // 7 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 8 Select a country (Romania)
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCountryLookupTablePopup,
    data.ffCountry4,
  );
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCountryButton);
  // 9 Go back to 1st section
  commonActions.portalNavigateToSectionStep(data.ffFormStep1);
  // 10 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 11 Check if only cities from Romania are displayed
  ffVerify.verifyOnlyProperEntriesInTable(roCities, roInvalidCities);
  // 12 Select a city (Bucharest)
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldPopup);
  commonActions.doubleClickValueFromTable(ffPage.selector.ffCityLookupTablePopup,
    data.ffCity7);
  // 13 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 14 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 15 Check again if only Cities from Romania are displayed
  ffVerify.verifyOnlyProperEntriesInTable(roCities, roInvalidCities);
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCityButton);
  // 16 Go to 2nd Step
  commonActions.portalNavigateToSectionStep(data.ffFormStep2);
  // 17 Check if Romania is selected
  commonActions.clickLookupTableButton(ffPage.selector.ffInputSectionCountryPopupBtn);
  // 18 Open Country lookup -> all countries are displayed
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  ffVerify.verifyCancelButton();
  // 20 Logoff
  await commonActions.logoutFromApp();
});
