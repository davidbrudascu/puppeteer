// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/viewAfterGenerate');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-232
Feature('Coding');

Scenario('Coding - View After Js', async () => {
  // Toast message order
  const toastOrderStep = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your View
  commonActions.accessDirectUrl(data.urlView);
  // 3 Navigate to "Code" section
  commonActions.navigateToFormStep(data.sectionCode);
  // 4 Fill in After Generate JS
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAfterGenerateEditor,
    codePage.selector.codeMonacoEditor2,
    data.codeAfterJs,
  );
  // 5 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6 Logoff
  await commonActions.logoutFromApp();
  // 7 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 8 Access your list
  commonActions.accessDirectUrl(data.urlPortalList);
  // 9 Check if "View After Generte JS" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrderStep);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 10 Logoff
  await commonActions.logoutFromApp();
});
