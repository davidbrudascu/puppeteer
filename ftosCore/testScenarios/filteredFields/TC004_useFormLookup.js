// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ffActions = require('~actions/filteredFieldsActions');
// Data
const data = require('~data/filteredFields/ffUseFormLookup');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-110
Feature('Filtered Fields');

Scenario('Use Filtered Field - Form Lookup', async () => {
  // Arrays of city options in lookup table
  // All cities
  const cities1 = [data.ffCity1, data.ffCity2, data.ffCity11,
    data.ffCity12, data.ffCity3, data.ffCity4,
    data.ffCity5, data.ffCity6, data.ffCity7,
    data.ffCity8];
  const cities2 = [data.ffCity13, data.ffCity9, data.ffCity14,
    data.ffCity15, data.ffCity16, data.ffCity17,
    data.ffCity18, data.ffCity19, data.ffCity20,
  ];
  const cities3 = [data.ffCity10, data.ffCity22];
  // All countries
  const countries = [data.ffCountry1, data.ffCountry2,
    data.ffCountry3, data.ffCountry4, data.ffCountry5];
  // Cities from Romania
  const roCities = [data.ffCity1, data.ffCity2,
    data.ffCity3, data.ffCity4, data.ffCity5,
    data.ffCity6, data.ffCity7, data.ffCity8,
    data.ffCity9, data.ffCity10];
  // Cities not from Romania
  const roInvalidCities = [data.ffCity11, data.ffCity12,
    data.ffCity13, data.ffCity14, data.ffCity15,
    data.ffCity16, data.ffCity17, data.ffCity18,
    data.ffCity19, data.ffCity20, data.ffCity21,
    data.ffCity22];
  // Cities from Italy
  const itCities = [data.ffCity17, data.ffCity19,
    data.ffCity21];
  // Cities not from Italy
  const itInvalidCities = [data.ffCity1, data.ffCity2,
    data.ffCity3, data.ffCity4, data.ffCity5,
    data.ffCity6, data.ffCity7, data.ffCity8,
    data.ffCity9, data.ffCity10, data.ffCity11,
    data.ffCity12, data.ffCity13, data.ffCity14,
    data.ffCity15, data.ffCity16, data.ffCity18,
    data.ffCity20, data.ffCity22];

  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Search for your entity and access it
  commonActions.accessDirectUrl(data.urlPortalFfEntity);
  // 3 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 4 Open city lookup -> all cities are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(cities1);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(cities2);
  commonActions.clickPaginationInTable('3');
  ffVerify.verifyOnlyProperEntriesInTable(cities3);
  // 5 Select a city (Milano) -> window is closed
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCityLookupTablePopup,
    data.ffCity17,
  );
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCityButton);
  // 6 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 7 Select a Country (Romania) -> window is closed
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCountryLookupTablePopup,
    data.ffCountry4,
  );
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCountryButton);
  // 8 Check if "Milano" is still displayed
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCityPopup,
    data.ffCity17);
  // 9 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 10 Check if only cities from Romania are displayed
  // Clear the search field because we want to show the list of values
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldPopup);
  ffVerify.verifyOnlyProperEntriesInTable(roCities, roInvalidCities);
  // 11 Select any city (Bucharest) -> window is closed
  commonActions.doubleClickValueFromTable(ffPage.selector.ffCityLookupTablePopup,
    data.ffCity5);
  // 12 Click on "Save and Reload"
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 13 Check the values: City = Bucharest and Country = Romania
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCityPopup,
    data.ffCity5);
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCountryPopup,
    data.ffCountry4);
  // 14 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 15 Check if only cities from Romania are displayed
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldPopup);
  ffVerify.verifyOnlyProperEntriesInTable(roCities, roInvalidCities);
  // 16 Close window
  commonActions.clickPopupCloseButton();
  // 17 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 18 Select Italy -> window is closed
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCountryLookupTablePopup,
    data.ffCountry3,
  );
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCountryButton);
  // 19 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 20 Check if only cities from Italy are displayed
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldPopup);
  ffVerify.verifyOnlyProperEntriesInTable(itCities, itInvalidCities);
  // 21 Select "Roma"
  commonActions.doubleClickValueFromTable(
    ffPage.selector.ffCityLookupTablePopup, data.ffCity21,
  );
  // 22 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 23 Check if City=Roma and Country=Italy
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCityPopup,
    data.ffCity21);
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCountryPopup,
    data.ffCountry3);
  // 24 Logoff
  await commonActions.logoutFromApp();
});
