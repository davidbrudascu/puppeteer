// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC024_RuleOn2EntityLoop');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// At-384

Feature('Flow Control');

Scenario('User is redirected to another FDF instead of Step2 of the current FDF ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to the first Form Driven Flow
  commonActions.accessDirectUrl(data.urlFirstFDFAddFCR);
  // Insert a Flow Control Rule on Step 1
  await flowControlActions.navigateToAnotherDJFCR(
    data.addFCR,
    data.nameFirstFCR,
    data.descriptionFirstFCR,
    data.caseLabel,
    data.firstFlowControl,
    data.operation,
    data.navigateToAnotherFlowCb,
    data.secondFlowControl,
    data.firstLookupAttribute,
    data.firstDRE,
    data.searchColumn,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Navigate to the second Form Driven Flow
  commonActions.accessDirectUrl(data.urlSecondFDFAddFCR);
  // Insert a Flow Control Rule on Step1
  await flowControlActions.navigateToAnotherDJFCR(
    data.addFCR,
    data.nameSecondFCR,
    data.descriptionSecondFCR,
    data.caseLabel,
    data.secondFlowControl,
    data.operation,
    data.navigateToAnotherFlowCb,
    data.firstFlowControl,
    data.secondLookupAttribute,
    data.secondDRE,
    data.searchColumn,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFirstFormPortal);
  // Insert a record for the first entity
  flowControlActions.addNameAT_Flow_control_E01(data.nameFirstRecord);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Insert a record for the second entity
  commonActions.accessDirectUrl(data.urlSecondEntityPortal);
  commonActions.clickSidebarButton(data.clickToInsert);
  flowControlActions.addNameAT_Flow_control_E02(data.nameSecondRecord);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.urlFirstEntityPortal);
  flowControlActions.addLookupAT_Flow_control_E01(
    data.nameFirstRecord,
    data.nameSecondRecord,
  );
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step2 of the first entity
  flowControlVerify.verifyFormStepPortal(
    data.nameEditFirstForm,
    data.secondStep,
  );
  commonActions.accessDirectUrl(data.urlSecondEntityPortal);
  // Access record and navigate to second step
  flowControlActions.addLookupAT_Flow_control_E02(
    data.nameSecondRecord,
    data.nameFirstRecord,
  );
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step2 of the second entity
  flowControlVerify.verifyFormStepPortal(
    data.nameEditSecondForm,
    data.secondStep,
  );
  commonActions.accessDirectUrl(data.urlFirstEntityPortal);
  // Update first record name
  flowControlActions.updateNameAT_Flow_control_E01(
    data.nameFirstRecord,
    data.updatedNameFirstRecord,
  );
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step 1 of the second entity
  flowControlVerify.verifyFormStepPortal(
    data.nameEditSecondForm,
    data.firstStep,
  );
  // Update second record name
  flowControlActions.addNameAT_Flow_control_E02(data.updatedNameSecondRecord);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step1 of the first entity
  flowControlVerify.verifyFormStepPortal(
    data.nameEditFirstForm,
    data.firstStep,
  );
  await commonActions.logoutFromApp();
});
