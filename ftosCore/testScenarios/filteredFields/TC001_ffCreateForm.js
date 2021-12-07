// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ffActions = require('~actions/filteredFieldsActions');
// Data
const data = require('~data/filteredFields/ffCreateForm');
// Pages
const commonPage = require('~pages/commonPage');
const ffPage = require('~pages/filteredFieldsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ffVerify = require('~actions/filteredFieldsVerify');

// Author Sebastian Draghici
// AT-52
Feature('Filtered Fields');

Scenario('Create filtered field - Form', async () => {
  // Arrays of city options in lookup table
  // Cities from France
  const frCities = [data.ffCity1, data.ffCity2, data.ffCity3, data.ffCity4];
  // Cities not from France
  const frInvalidCities = [data.ffCity5, data.ffCity6, data.ffCity7];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/entity/edit/AT_CreateFilteredFieldsF"
  commonActions.accessDirectUrl(data.urlEntityFilteredFields);
  // 3 Expand "Data forms" section
  commonActions.menuSectionExpand(data.sectionDataForms);
  // 4 Access "default" Form
  commonActions.doubleClickValueFromTable(ffPage.selector.ffDataFormsTable, data.dataFormDefault);
  // 5 Go to Filtered Fields tab
  commonActions.navigateToFormStep(data.tabFilteredFields);
  // 6 Click on Insert Icon -> a new form is displayed (which contains 3 attributes)
  commonActions.clickToolbarButton(data.toolbarButtonInsert);
  // 7 Fill in this form with the next values:
  // 8 Attribute to Filter: AT_ForFFCityId
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputAttrToFilter,
    data.ffAttrToFilter);
  // 9 Attribute to Filter Reference: AT_ForFFCountryId
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputAttrToFilterRef,
    data.ffAttrToFilterRef);
  // 10 Attribute to Filter By: AT_ForFFCountryId
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputAttrToFilterBy,
    data.ffAttrToFilterBy);
  // 11 Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Logoff
  await commonActions.logoutFromApp();
  // 13 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14 Access "AT_CreateFilteredFieldsF" entity
  commonActions.accessDirectUrl(data.urlPortalEntityFilteredFields);
  // 15 Click on "Insert" icon -> the form is displayed
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 16 Fill in name with any value
  commonActions.fillInTextValueInInput(ffPage.fields.ffInputPortalEntityName, data.ffEntityName);
  // 17 Click on "Country" lookup -> list is expanded
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCountryDropdownBtn);
  // 18 Select a value (France)
  commonActions.fillInDropdownLookupTableWithValue(
    ffPage.selector.ffCountryLookupTableDropdown,
    data.ffCountry1,
  );
  // 19 Click on "CityId" lookup -> list is expanded
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  // 20 Check if only cities from France are displayed
  ffVerify.verifyOnlyProperEntriesInTable(frCities, frInvalidCities);
  // 21 Select any city from the list (for example Paris)
  ffActions.fillInProperCityInDropdown(frCities);
  // 22 Save and Reload -> form is still displayed
  commonActions.saveAndRefreshAction();
  // 23 Check your lookup values in form (check if the lookup values are ok)
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted);
  await ffVerify.verifyLookupDropdown(data.ffEntityName, data.ffCountry1, frCities);
  commonActions.clickLookupTableButton(ffPage.selector.ffInputPortalEntityCityDropdownBtn);
  ffVerify.verifyOnlyProperEntriesInTable(frCities, frInvalidCities);
  // 24 Logoff
  await commonActions.logoutFromApp();
});
