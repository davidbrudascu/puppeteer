// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC002_AddLabelAttribute');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a Label Attribute using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.uiTabURL);
  // Edit label attributes in UI Designer and verify them in HTMl editor after
  await uiDesignerActions.editVerifyLabelAttribute();
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify added label attributes in portal
  uiDesignerVerify.verifyLabelAttributesPortal();
  // Logoff.
  await commonActions.logoutFromApp();
});
