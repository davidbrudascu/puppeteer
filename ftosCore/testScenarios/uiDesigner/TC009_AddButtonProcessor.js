// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC009_AddButtonProcessor');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a Call Processor Button using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access UI tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add custom processor button
  await uiDesignerActions.addCustomProcessorButton(
    data.customProcessor,
    data.text,
    data.idButton,
    data.customProcessorOption,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formURLPortal);
  // Verify changes made in portal
  uiDesignerVerify.verifyCustomProcessorButtonPortal(
    data.text,
    data.idButton,
    data.customProcessorOption,
  );
  await commonActions.logoutFromApp();
});
