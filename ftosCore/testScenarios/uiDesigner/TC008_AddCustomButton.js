// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC008_AddCustomButton');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a Custom Button using UI Designer', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access the UI tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a custom button
  uiDesignerActions.addCustomButton(
    data.buttonType,
    data.textButton,
    data.idButton,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formURLPortal);
  // Verify changes in Portal
  uiDesignerVerify.verifyCustomButtonPortal(
    data.textButton,
    data.idButton,
  );
  // Log off
  await commonActions.logoutFromApp();
});
