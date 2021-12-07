// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC011_AddRelationshipType');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a Relationship Type using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access the UI Tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a relation to the UI Designer
  await uiDesignerActions.addRelationshipType(data.relationName);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formURLPortal);
  // Verify changes in portal
  uiDesignerVerify.verifyRelationPortal(data.relationName);
  await commonActions.logoutFromApp();
});
