// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/fieldOptions/TC004_FieldOptionsOnForm');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyFieldOption = require('~actions/fieldOptionVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Field Options');

Scenario('User can add a field option on form.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Access default form
  fieldOptionsActions.accessDefaultForm(data.sectionDataForms, data.defaultForm);
  // Add an attribute required via field options
  fieldOptionsActions.addFieldOption();
  await fieldOptionsActions.makeRequiredFieldOptions(data.attributeName, data.columnName);
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add an attribute read only via field options
  await fieldOptionsActions.readOnlyFieldOption(data.attributeCode, data.columnDisplayName);
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add a boolean attribute display as radio button
  await fieldOptionsActions.showRadioButtonAction(data.attributeBool, data.columnDisplayName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Login to Portal
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.portalViewURL);
  // Verify that field options are applied in Portal
  verifyFieldOption.verifyFoNameValidation(data.insertButton, data.errorPortalMessage);
  fieldOptionsActions.addNewEntryInPortal(data.attributePortalName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  verifyFieldOption.verifyNewEntryInPortal(data.attributePortalName);
  await commonActions.logoutFromApp();
});
