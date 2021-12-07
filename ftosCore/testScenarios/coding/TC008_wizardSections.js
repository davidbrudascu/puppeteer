// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/wizardSections');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');
const codeAction = require('~actions/codeActions');


// Author Sebastian Draghici
// AT-230
Feature('Coding');

Scenario('Coding - Wizard Sections code', async () => {
  // Toast message order
  const toastOrder1 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    },
  ];
  const toastOrder2 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
    {
      type: commonPage.messagePopup.successMessage,
      state: constants.TOAST_STAY,
      string: data.toastRecordInserted,
    },
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage3,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey
  commonActions.accessDirectUrl(data.urlUserJourney);
  // 3 Navigate to "Steps" section
  commonActions.navigateToFormStep(data.sectionSteps);
  // 4 Open Step1
  commonActions.doubleClickValueFromTable(codePage.selector.codeEntityStepsTable, data.codeStep1);
  // 5 Go to "Advanced" section
  commonActions.navigateToFormStep(data.sectionAdvanced);
  codeAction.checkOutCodeEditor(codePage.buttons.checkoutCodeAfterGenerateButton);
  // 6 Fill in After Events
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAfterGenerateEditor,
    codePage.selector.codeMonacoEditor2,
    data.codeAfterJs,
  );
   // 7 Fill in Before Save
  commonActions.clickTabMenuItem(data.sectionBeforeSave);
  codeAction.checkOutCodeEditor(codePage.buttons.checkoutCodeBeforeSaveButton);
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeBeforeSaveEditor,
    codePage.selector.codeMonacoEditor4,
    data.codeBeforeSave,
  );
  // 8 Fill in After Save
  commonActions.clickTabMenuItem(data.sectionAfterSave);
  codeAction.checkOutCodeEditor(codePage.buttons.checkoutCodeAfterSaveButton);
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAfterSaveEditor,
    codePage.selector.codeMonacoEditor3,
    data.codeAfterSave,
  );
  // 9 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Logoff
  await commonActions.logoutFromApp();
  // 11 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 12 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 13 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 14 Check if "Sec1 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  // 15 Close error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 16 Click on Next button
  commonActions.portalClickCustomButton(data.codeWizardNext);
  // 17 Check if "Form S1 Before Events" error message is displayed
  // 18 Check if a success message is displayed
  // 19 Check if "Form Sec1 Save" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder2);
  // 20 Close errors
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage3,
  );
  // 21 Logoff
  await commonActions.logoutFromApp();
});
