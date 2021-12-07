// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/formGeneric');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-231
Feature('Coding');

Scenario('Coding - Uj Generic Form Before/After Js', async () => {
  // Toast message order
  const toastOrder = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    },
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey
  commonActions.accessDirectUrl(data.urlEntityForm);
  // 3 Navigate to "Advanced" tab
  commonActions.navigateToFormStep(data.sectionAdvanced);
  // 4 Fill in Before Events
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeBeforeGenerateEditor,
    codePage.selector.codeMonacoEditor3,
    data.codeBeforeJs,
  );
  // 5 Fill in After Events
  commonActions.clickTabMenuItem(data.tabAfterEvents);
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAfterGenerateEditor,
    codePage.selector.codeMonacoEditor2,
    data.codeAfterJs,
  );
  // 6 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Logoff
  await commonActions.logoutFromApp();
  // 8 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 9 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntityEvents);
  // 10 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 11 Check if "Form Before Events" error message is displayed
  // 12 Check if "Form After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 13 Fill in Name field with: Auto Test 1
  commonActions.fillInTextValueInInput(codePage.fields.codeEntityName, data.codeEntityName);
  // 14 Click on Save and Close
  commonActions.saveAndCloseAction();
  commonActions.closeToastMessage(
    commonPage.messagePopup.successMessage,
    data.toastRecordInserted,
  );
  // 15 Open your record
  commonActions.doubleClickValueFromTable(codePage.selector.codeEntityTable, data.codeEntityName);
  // 16 Check if "Form Before Events" error message is displayed
  // 17 Check if "Form Before Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 18 Logoff
  await commonActions.logoutFromApp();
});
