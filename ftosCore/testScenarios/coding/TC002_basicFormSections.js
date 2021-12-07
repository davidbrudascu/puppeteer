// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const codeAction = require('~actions/codeActions');
// Data
const data = require('~data/coding/basicFormSections');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-227
Feature('Coding');

Scenario('Coding - Basic Form Sections After Js', async () => {
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
  // 2 Access your Data form
  commonActions.accessDirectUrl(data.urlEntityDataForm);
  // 3 Navigate to "Steps" section
  commonActions.navigateToFormStep(data.sectionSteps);
  // 4 Open S1
  commonActions.doubleClickValueFromTable(codePage.selector.codeEntityStepsTable, data.codeStep1);
  // 5 Go to "Advanced" section
  commonActions.navigateToFormStep(data.sectionAdvanced);
  // 6 Fill in After Events
  codeAction.checkOutCodeEditor(codePage.buttons.checkoutCodeAfterGenerateButton);
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
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 11 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 12 Check if "Form Sec1 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrderStep1);
  // 13 Close error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 14 Click on 2nd section
  commonActions.portalNavigateToSectionStep(data.codeFormStep2);
  // 15 Check if "S2 After Events" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrderStep2);
  // 16 Close error
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
  // 19 Fill in Name field
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
  // 23 Logoff
  await commonActions.logoutFromApp();
});
