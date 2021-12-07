// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/customUjAfterExternalLink');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-228
Feature('Coding');

Scenario('Coding - Custom Uj After Js and External Link', async () => {
  // Toast message order
  const toastOrder1 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    }];
  const toastOrder2 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage3,
    },
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage4,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your Custom User Journey
  commonActions.accessDirectUrl(data.urlEntityCustomUj);
  // 3 Navigate to "Code" section
  commonActions.navigateToFormStep(data.sectionCode);
  // 4 Go to "After Generate JS"
  commonActions.clickTabMenuItem(data.tabAfterGenJs);
  // 5 Fill in After Generate JS
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAfterGenerateEditor,
    codePage.selector.codeMonacoEditor1,
    data.codeAfterJs,
  );
  // 6 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Logoff
  await commonActions.logoutFromApp();
  // 8 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 9 Access your CUJ
  commonActions.accessDirectUrl(data.urlPortalCustomUj);
  // 10 Check if "CUJ" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 11 Open Menu
  commonActions.portalSideMenuOpen();
  // 12 Click on "AT_CodeExternalLinkCUJ"
  commonActions.portalClickSideMenuItem(constants.MENU_ITEM, data.codeCujMenuItem);
  // 13 Check if "Before Events" error message is displayed
  // 14 Check if "After Events" error message is displayed
  // 15 Check if "S1 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder2);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage3,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage4,
  );
  // 16 Logoff
  await commonActions.logoutFromApp();
});
