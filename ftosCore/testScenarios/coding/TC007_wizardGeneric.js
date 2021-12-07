// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/wizardGeneric');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-230
Feature('Coding');

Scenario('Coding - Wizard Generic code', async () => {
  // Toast message order
  const toastOrder1 = [
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
  const toastOrder2 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey
  commonActions.accessDirectUrl(data.urlUserJourney);
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
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 10 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 11 Check if "Form Before Events" error message is displayed
  // 12 Check if "Form After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  // 13 Close errors
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 14 Fill in Name field
  commonActions.fillInTextValueInInput(codePage.fields.codeEntityName, data.codeEntityName);
  // 15 Click on Next button
  commonActions.portalClickCustomButton(data.codeWizardNext);
  // 16 Check if a Success message is displayed
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted,
  );
  // 17 Check if "Form Before Events" error message is displayed
  // 18 Check if "Form Before Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  // 19 Close errors
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 20 Click "Finish"
  commonActions.portalClickCustomButton(data.codeWizardFinish);
  // 21 Check if only a success message is displayed
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordUpdated,
  );
  // 22 Click "Previous" button
  commonActions.portalClickCustomButton(data.codeWizardPrevious);
  // 23 Check if  only "UJ After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder2);
  // 24 Close error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 25 Click Next again
  commonActions.portalClickCustomButton(data.codeWizardNext);
  // 26 Check if no error messages are displayed
  codeVerify.dontSeeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  codeVerify.dontSeeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordUpdated,
  );
  // 27 Logoff
  await commonActions.logoutFromApp();
});
