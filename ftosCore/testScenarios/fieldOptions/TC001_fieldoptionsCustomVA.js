// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/make_Required_Field_Options');
// Verify
const verifyFieldOption = require('~actions/fieldOptionVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Field Options');

Scenario('User can add a field option Virtual Attribute', async () => {

  // Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add first  Virtual Attribute Code
  fieldOptionsActions.addFieldOption();
  fieldOptionsActions.markVirtualAttributeCheckbox();
  await fieldOptionsActions.makeRequiredVAFieldOptions(data.attributeCode, data.columnDisplayName, data.level);
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add second  Virtual Attribute Lookup
  fieldOptionsActions.markVirtualAttributeCheckbox();
  await fieldOptionsActions.selectLookupVAFieldOptions(data.attributeLookup, data.columnDisplayName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Login using Portal and access your entity
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  // Verify that field options are applied in Portal
  verifyFieldOption.verifyVirtualAttributeRequired(data.entityName, data.attributeCodeNum, data.selectFromDD, data.errorMessage);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
