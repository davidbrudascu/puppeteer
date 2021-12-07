// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ffActions = require('~actions/filteredFieldsActions');
// Data
const data = require('~data/filteredFields/ffCreateUj');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-52
Feature('Filtered Fields');

Scenario('Create filtered field - User Journey', async () => {
  // Arrays of city options in lookup table
  // Cities from France
  const frCities = [data.ffCity1, data.ffCity2, data.ffCity3, data.ffCity4];
  // Cities not from France
  const frInvalidCities = [data.ffCity5, data.ffCity6, data.ffCity7];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to "Form Driven Journeys"
  commonActions.accessDirectUrl(data.urlFormDrivenJourneys);
  // 3 Access your Journey
  commonActions.searchByColumnValueInTable(ffPage.selector.ffUserJourneysTable,
    data.ffUserJourneysTableNameSearch, data.ffUserJourney);
  commonActions.doubleClickValueFromTable(ffPage.selector.ffUserJourneysTable, data.ffUserJourney);
  // 4 Go to Filtered Fields tab
  commonActions.navigateToFormStep(data.tabFilteredFields);
  // 5 Click on Insert Icon -> a new form is displayed (which contains 3 attributes)
  commonActions.clickToolbarButton(data.toolbarButtonInsert);
  // 6 Fill in this form with the next values:
  // 7 Attribute to Filter: AT_ForFFCityId
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputAttrToFilter,
    data.ffAttrToFilter);
  // 8 Attribute to Filter Reference: AT_ForFFCountryId
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputAttrToFilterRef,
    data.ffAttrToFilterRef);
  // 9 Attribute to Filter By: AT_ForFFCountryId
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputAttrToFilterBy,
    data.ffAttrToFilterBy);
  // 10 Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13 Access "AT_CreateFilteredFieldsF" entity
  commonActions.accessDirectUrl(data.urlPortalEntityFilteredFields);
  // 14 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 15 Fill in name with any value
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputPortalEntityName, data.ffEntityName);
  // 16 Click on "Country" lookup -> list is expanded
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  // 17 Select a value (France)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCountryLookupTableDropdown,
    data.ffCountry1,
  );
  // 18 Click on "CityId" lookup -> list is expanded
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 19 Check if only cities from France are displayed
  ffVerify.verifyOnlyProperEntriesInTable(frCities, frInvalidCities);
  // 20 Select any city from the list (for exaple Paris)
  ffActions.fillInProperCityInDropdown(frCities);
  // 21 Save and Refresh -> list is displayed
  commonActions.saveAndRefreshAction();
  // 22 Check your record in list (check if the lookup values are ok)
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted);
  await ffVerify.verifyLookupDropdown(data.ffEntityName, data.ffCountry1, frCities);
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(frCities, frInvalidCities);
  // 23 Logoff
  await commonActions.logoutFromApp();
});
