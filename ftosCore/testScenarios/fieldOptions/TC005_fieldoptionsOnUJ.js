// Actions
const fieldOptionsActions = require('~actions/fieldOptionsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/fieldOptions/TC005_FieldOptionOnUJ');
// Verify
const verifyViewActions = require('~actions/viewActionsVerify');
const verifyFieldOption = require('~actions/fieldOptionVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Field Options');

Scenario('User can add a field option on User Journey.', async () => {
  // Login using Studio
  // Navigate to "Form Driven Journey"
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add first Attribute Code
  fieldOptionsActions.addFieldOption();
  await fieldOptionsActions.readOnlyFieldOption(data.attributeCode, data.columnDisplayName);
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add second Attribute Value
  await fieldOptionsActions.makeRequiredFieldOptions(data.attributeValue, data.columnDisplayName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Login using Portal and access your entity
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.portalViewURL);
  // Verify that field options are applied in Portal
  verifyViewActions.verifyViewInPortal(data.primaryAttDN);
  verifyFieldOption.verifyFOinUJ(data.textFieldValue, data.errorMessage, data.numericFieldValue);
  await commonActions.logoutFromApp();
});
