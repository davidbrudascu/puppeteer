// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ffActions = require('~actions/filteredFieldsActions');
// Data
const data = require('~data/filteredFields/ffDelete');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-52
Feature('Filtered Fields');

Scenario('Delete filtered field', async () => {
  // Arrays of city options in lookup table
  // All countries
  const countries = [data.ffCountry1, data.ffCountry2,
    data.ffCountry3, data.ffCountry4, data.ffCountry5];
  // Valid cities
  const validCities = [data.ffCity1, data.ffCity2, data.ffCity3, data.ffCity4, data.ffCity5,
    data.ffCity6, data.ffCity7, data.ffCity8, data.ffCity9, data.ffCity10];

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
  // 5 Delete your filtered fields
  commonActions.tickAllRowsInTable(ffPage.selector.ffFilterFieldsTable);
  commonActions.clickToolbarButton(data.toolbarButtonDelete);
  commonActions.clickPopupDialog(data.popupDialogYes);
  // 6 Save and Close -> list is displayed
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Navigate to "AT_DeleteFilteredFieldsF" edit entity
  commonActions.accessDirectUrl(data.urlEntityFilteredFieldsFormDefault);
  // 8 Go to Filtered Fields tab
  commonActions.navigateToFormStep(data.tabFilteredFields);
  // 9 Delete your filtered fields
  commonActions.tickAllRowsInTable(ffPage.selector.ffFilterFieldsTable);
  commonActions.clickToolbarButton(data.toolbarButtonDelete);
  commonActions.clickPopupDialog(data.popupDialogYes);
  // 10 Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13 Navigate to "AT_DeleteFilteredFieldsF" list
  commonActions.accessDirectUrl(data.urlPortalEntityFFForm);
  // 14 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 15 Fill in name with a valid value
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputPortalEntityName, data.ffEntityName);
  // 16 Click on "Country" lookup -> list is expanded and all values are displayed
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(countries);
  // 17 Select a value (Romania)
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCountryLookupTablePopup,
    data.ffCountry4,
  );
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCountryButton);
  // 18 Click on "City" lookup -> list is expanded
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 19 Check if all cities are displayed
  ffVerify.verifyOnlyProperEntriesInTable(validCities);
  // 20 Select any city from the list (for example Barcelona)
  ffActions.fillInProperCityInPopup(validCities);
  // 21 Save and Refresh -> form is displayed
  commonActions.saveAndRefreshAction();
  // 22 Check your record in form (check if the lookup values are ok)
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted);
  await ffVerify.verifyLookupPopup(data.ffEntityName, data.ffCountry4, validCities);
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(validCities);
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCityButton);
  // 23 Navigate to "AT_DeleteFilteredFieldsUJ" list
  commonActions.accessDirectUrl(data.urlPortalEntityFFUj);
  // 24 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 25 Fill in name with a valid value
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputPortalEntityName, data.ffEntityNameUj);
  // 26 Click on "Country" lookup -> list is expanded
  // 27 Select a value (for example Romania)
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryPopupBtn);
  commonActions.fillInPopupLookupTableWithValue(
    ffPage.selector.ffCountryLookupTablePopup,
    data.ffCountry4,
  );
  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCountryButton);
  // 28 Click on "City" lookup -> list is expanded
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  // 29 Check if all cities are displayed
  ffVerify.verifyOnlyProperEntriesInTable(validCities);
  // 30 Select any city from the list (for example Barcelona)
  ffActions.fillInProperCityInPopup(validCities);
  // 31 Save and Refresh -> form is displayed
  commonActions.saveAndRefreshAction();
  // 22 Check your record in form (check if the lookup values are ok)
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted);
  await ffVerify.verifyLookupPopup(data.ffEntityNameUj, data.ffCountry4, validCities);
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityPopupBtn);
  ffVerify.verifyOnlyProperEntriesInTable(validCities);

  ffActions.clickOkPopupTableButton(ffPage.buttons.okPopupCityButton);
  // 32 Logoff
  await commonActions.logoutFromApp();
});
