// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC007_AddButton');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a Button using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access the UI tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add a custom button and verify changes in HTML Editor
  await uiDesignerActions.addButton(
    data.blueColor,
    data.largeSize,
    data.facebookIcon,
    data.customButtonType,
    data.textButton,
    data.idButton,
    data.classButton,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Navigate to custom portal URL
  commonActions.accessDirectUrl(data.formURLPortal);
  // Verify changes in portal
  uiDesignerVerify.verifyButtonPortal(
    data.classButton,
    data.idButton,
  );
  await commonActions.logoutFromApp();
});
