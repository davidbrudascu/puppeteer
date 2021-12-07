// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/filteredFields/ffUseFormLookupAsDropdown');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-110
Feature('Filtered Fields');

Scenario('Use Filtered Field - Form Lookup as Dropdown', async () => {
  // Arrays of city options in lookup table
  // All valid cities
  const cities1 = [data.ffCity1, data.ffCity2, data.ffCity11,
    data.ffCity12, data.ffCity3];
  const cities2 = [data.ffCity4, data.ffCity5, data.ffCity6,
    data.ffCity7, data.ffCity8];
  const cities3 = [data.ffCity13, data.ffCity9, data.ffCity14,
    data.ffCity15, data.ffCity16];
  const cities4 = [data.ffCity17, data.ffCity18, data.ffCity19,
    data.ffCity20, data.ffCity21];
  const cities5 = [data.ffCity10, data.ffCity22];
  // All valid countries
  const countries = [data.ffCountry1, data.ffCountry2,
    data.ffCountry3, data.ffCountry4, data.ffCountry5];
  // Cities from Romania
  const roCities1 = [data.ffCity1, data.ffCity2,
    data.ffCity3, data.ffCity4, data.ffCity5];
  const roCities2 = [data.ffCity6, data.ffCity7, data.ffCity8,
    data.ffCity9, data.ffCity10];
  // Cities not from Romania
  const roInvalidCities = [data.ffCity11, data.ffCity12,
    data.ffCity13, data.ffCity14, data.ffCity15,
    data.ffCity16, data.ffCity17, data.ffCity18,
    data.ffCity19, data.ffCity20, data.ffCity21,
    data.ffCity22];
  // Cities from Italy
  const itCities = [data.ffCity17, data.ffCity19, data.ffCity21];
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
    data.ffCity17,
  );
  // 6 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 7 Select a Country (Romania)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCountryLookupTableDropdown,
    data.ffCountry4,
  );
  // 8 Check if "Milano" is still displayed
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCityDropdown,
    data.ffCity17);
  // 9 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 10 Check if only cities from Romania are displayed
  // Clear the search field because we want to show the list of values
  commonActions.deleteTextValueFromInput(ffPage.fields.ffCityLookupSearchFieldDropdown);
  ffVerify.verifyOnlyProperEntriesInTable(roCities1, roInvalidCities);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(roCities2, roInvalidCities);
  commonActions.clickPaginationInTable('1');
  // 11 Select any city (Bucharest)
  commonActions.doubleClickValueFromTable(ffPage.selector.ffCityLookupTableDropdown,
    data.ffCity5);
  // 12 Click on "Save and Reload"
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 13 Check the values: City = Bucharest and Country = Romania
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCityDropdown,
    data.ffCity5);
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCountryDropdown,
    data.ffCountry4);
  // 14 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 15 Check if only cities from Romania are displayed
  ffVerify.verifyOnlyProperEntriesInTable(roCities1, roInvalidCities);
  commonActions.clickPaginationInTable('2');
  ffVerify.verifyOnlyProperEntriesInTable(roCities2, roInvalidCities);
  commonActions.clickPaginationInTable('1');
  // Click again to close
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 16 Open Country lookup -> all countries are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 17 Select Italy
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCountryLookupTableDropdown,
    data.ffCountry3,
  );
  // 18 Open again City lookup
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 19 Check if only cities from Italy are displayed
  ffVerify.verifyOnlyProperEntriesInTable(itCities, itInvalidCities);
  // 20 Select "Roma"
  commonActions.doubleClickValueFromTable(ffPage.selector.ffCityLookupTableDropdown,
    data.ffCity21);
  // 21 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 22 Check if City=Roma and Country=Italy
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCityDropdown,
    data.ffCity21);
  await commonVerify.verifyValueExistsInInput(ffPage.fields.ffInputPortalEntityCountryDropdown,
    data.ffCountry3);
  // 23 Logoff
  await commonActions.logoutFromApp();
});
