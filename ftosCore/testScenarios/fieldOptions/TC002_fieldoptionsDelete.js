// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/field_Options_Delete');
// Verify
const verifyFieldOption = require('~actions/fieldOptionVerify');

// Author Victor Pana

Feature('Field Options');

Scenario('User can delete a field option.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityFormURL);
  // Delete existing field option
  fieldOptionsActions.deleteFieldOption(data.sectionFieldOptions, data.attributeCode, data.deleteButton, data.popupDialogYes);
  // Login to Portal
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  // Verify that deleted field option no longer applies
  verifyFieldOption.verifyDeletedFO(data.primaryAttDN, data.textFieldValue);
  await commonActions.logoutFromApp();
});
