// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC004_SelectLabelAttributeVA');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a virtual attribute using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to UI tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a virtual attribute and verify changes in HTML Editor
  await uiDesignerActions.addVirtualAttribute(data.virtualAttrList, data.virtualAttrName);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify Virtual Attribute in portal
  uiDesignerVerify.verifyVAttributePortal(data.virtualAttrName);
  await commonActions.logoutFromApp();
});
