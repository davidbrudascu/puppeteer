// Actions
const commonActions = require('~actions/commonActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/filteredFields/ffUseUjWizardLookup');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const ffVerify = require('~actions/filteredFieldsVerify');
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-110
Feature('Filtered Fields');

Scenario('Use Filtered Field - User Journey Wizard Lookup', async () => {
  // Arrays of city options in lookup table
  // All countries
  const countries = [data.ffCountry1, data.ffCountry2,
    data.ffCountry3, data.ffCountry4, data.ffCountry5];
  // Cities from Romania
  const roCities = [data.ffCity1, data.ffCity2, data.ffCity5, data.ffCity6, data.ffCity7,
    data.ffCity8, data.ffCity9, data.ffCity10, data.ffCity12, data.ffCity21];

  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Search for your entity and access it
  commonActions.accessDirectUrl(data.urlPortalFfEntity);
  // 3 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 4 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 5 Select a country (Romania)
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCountryLookupTablePopup,
    data.ffCountry4,
  );
  commonActions.clickToolbarButton('Ok');
  // 6 Click on "Next" button
  commonActions.portalClickCustomButton(data.ffWizButtonNext);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Open City lookup -> only cities from Romania are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(roCities);
  // 8 Select a city (Bucharest)
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCityLookupTablePopup,
    data.ffCity7,
  );
  commonActions.clickToolbarButton('Ok');
  // 9 Click "Finish"
  commonActions.portalClickCustomButton(data.ffWizButtonFinish);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Open again "City" lookup -> only cities from Romania are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldPopup);
  ffVerify.verifyOnlyProperEntriesInTable(roCities);
  commonActions.clickToolbarButton('Ok');
  // 11 Logoff
  await commonActions.logoutFromApp();
});
