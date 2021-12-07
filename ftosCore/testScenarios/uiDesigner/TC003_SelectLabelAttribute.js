// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC003_SelectLabelAttribute');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can select a label attribute from UI Designer', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a numeric attribute in UI Designer
  await uiDesignerActions.addAttribute(data.numericAttribute);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify changes made in Portal
  uiDesignerVerify.verifyAttributePortal(data.numericAttribute);
  // Logoff
  await commonActions.logoutFromApp();
});
