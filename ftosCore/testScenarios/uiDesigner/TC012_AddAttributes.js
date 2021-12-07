// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC012_AddAttributes');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add and select attributes', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to the UI Tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add attributes
  await uiDesignerActions.addAttributesDataForm(
    data.userAttribute,
    data.user,
    data.relationName,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formURLPortal);
  // Verify changes in Portal
  uiDesignerVerify.verifyDataFormAttrPortal(data.relationshipEntity);
  await commonActions.logoutFromApp();
});
