// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/formSections');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-231
Feature('Coding');

Scenario('Coding - Uj Sections Form After Js', async () => {
  // Toast message order
  const toastOrderStep1 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    },
  ];
  const toastOrderStep2 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey:
  commonActions.accessDirectUrl(data.urlUserJourney);
  // 3 Navigate to "Steps" section
  commonActions.navigateToFormStep(data.sectionSteps);
  // 4 Open Step1
  commonActions.doubleClickValueFromTable(codePage.selector.codeEntityStepsTable, data.codeStep1);
  // 5 Go to "Advanced" section
  commonActions.navigateToFormStep(data.sectionAdvanced);
  // 6 Fill in After Events
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAfterGenerateEditor,
    codePage.selector.codeMonacoEditor2,
    data.codeAfterJs,
  );
  // 7 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8 Logoff
  await commonActions.logoutFromApp();
  // 9 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 10 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntityEvents);
  // 11 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 12 Check if "Form Sec1 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrderStep1);
  // 13 Close errors
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 14 Click on 2nd section
  commonActions.portalNavigateToSectionStep(data.codeFormStep2);
  // 15 Check if "Form S2 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrderStep2);
  // 16 Close errors
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 17 Go back to 1st section
  commonActions.portalNavigateToSectionStep(data.codeFormStep1);
  // 18 Check if no error message is displayed
  commonVerify.dontSeeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 19 Fill in Name with: "Auto test"
  commonActions.fillInTextValueInInput(codePage.fields.codeEntityName, data.codeEntityName);
  // 20 Click on Save and Reload
  commonActions.saveAndRefreshAction();
  // 21 Check if a success message is displayed
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted,
  );
  // 22 Check if "Form Sec1 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrderStep1);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 23 Logoff
  await commonActions.logoutFromApp();
});
