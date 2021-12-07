// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC001_AddContainer');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add containers using UI Designer', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to UI tab of the FDF
  commonActions.accessDirectUrl(data.uiTabURL);
  // Edit containers and verify they are present in the HTML Editor
  await uiDesignerActions.editAndVerifyContainers();
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify the containers are present in Portal
  uiDesignerVerify.verifyContainersPortal();
  // Logoff.
  await commonActions.logoutFromApp();
});
