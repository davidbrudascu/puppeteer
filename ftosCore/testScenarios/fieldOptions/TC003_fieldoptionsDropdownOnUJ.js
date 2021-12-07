// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/fieldOptions/TC003_FieldOptionsDropdownOnUj');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyFieldOption = require('~actions/fieldOptionVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Field Options');

Scenario('User can add dropdown field option.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityFormURL);
  // Add first attribute City
  fieldOptionsActions.addFieldOption();
  await fieldOptionsActions.addLookupFieldOption(data.lookupAttributeName, data.columnName);
  await fieldOptionsActions.selectLookupViewName(data.lookupViewName, data.columnViewName);
  fieldOptionsActions.markLookupAsDropdown();
  fieldOptionsActions.uncheckShowEditButton();
  fieldOptionsActions.uncheckShowInsertButton();
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add second attribute Country
  await fieldOptionsActions.addLookupFieldOption(data.secondLookupAttributeName, data.columnName);
  fieldOptionsActions.markShowEditButton();
  fieldOptionsActions.uncheckShowInsertButton();
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Login to Portal
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.viewPortalURL);
  // Verify that field options are applied in Portal
  verifyFieldOption.verifyCityLookupInPortal(
    data.insertButton,
    data.attributePortalName,
    data.attributeName,
    data.attributeCode,
    data.attributePopulation,
    data.attributeCityName,
  );
  verifyFieldOption.verifyCountryLookupInPortal(data.attributeCountryName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await verifyFieldOption.verifyCountryUpdatedLookupInPortal(data.attributeCountryUpdatedName);
  await commonActions.logoutFromApp();
});
