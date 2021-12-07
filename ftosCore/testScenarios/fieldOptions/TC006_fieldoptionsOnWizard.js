// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/field_Options_On_Wizard');
// Verify
const verifyFieldOption = require('~actions/fieldOptionVerify');

// Author Victor Pana

Feature('Field Options');

Scenario('User can add a field option on wizard.', async () => {
  // Login to Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  // Verify that "Code" attribute is read-only and "Value" attribute is required in Portal.
  commonActions.clickSidebarButton(data.insertButton);
  verifyFieldOption.verifyFOinWizardUJ(
    data.textFieldValue,
    data.numericAttDN,
    data.numericFieldValue,
    data.errorMessage,
  );
  await commonActions.logoutFromApp();
});
