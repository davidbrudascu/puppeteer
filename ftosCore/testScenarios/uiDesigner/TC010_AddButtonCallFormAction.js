// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC010_AddButtonCallFormAction');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a Call Form Action Button using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access the UI tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a form action button
  await uiDesignerActions.addFormActionButton(
    data.buttonType,
    data.text,
    data.idButton,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Access the FDF in Portal
  commonActions.accessDirectUrl(data.formURLPortal);
  // Verify changes in portal
  uiDesignerVerify.verifyFormActionButtonPortal(data.idButton, data.text);
  await commonActions.logoutFromApp();
});
