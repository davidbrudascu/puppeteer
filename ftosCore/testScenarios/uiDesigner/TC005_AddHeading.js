// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC005_AddHeading.json');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

Feature('UI Designer');

Scenario('User can add an heading using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access UI Tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a heading in UI Designer
  await uiDesignerActions.addHeading(
    data.thirdHeading,
    data.randomText,
    data.localizationKey,
    data.centerTextAlignment,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.formUrlPortal);
  // The changes made are reflected in the Portal
  uiDesignerVerify.verifyHeadingPortal(data.randomText);
  // Logoff
  await commonActions.logoutFromApp();
});
