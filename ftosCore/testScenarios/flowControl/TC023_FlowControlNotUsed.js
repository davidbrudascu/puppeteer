// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC023_FlowControlNotUsed');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-440

Feature('Flow Control');

Scenario('User is redirected to Step 2 of the current FDF instead of another FDF', async () => {
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
  // Press Save & Close
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
  // Add a record for the first entity
  commonActions.accessDirectUrl(data.urlFirstFormPortal);
  flowControlActions.addNameAT_FlowControl_RuleNok_E01(data.nameRecordE1);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add a record for the second entity
  commonActions.accessDirectUrl(data.urlSecondEntityPortal);
  commonActions.clickSidebarButton(data.clickToInsert);
  flowControlActions.addNameAT_FlowControl_RuleNok_E02(data.nameRecordE2);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.urlFirstEntityPortal);
  flowControlActions.addLookupAT_FlowControl_RuleNok_E01(
    data.nameRecordE1,
    data.nameRecordE2,
  );
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step2 of the first entity
  flowControlVerify.verifyFormStepPortal(
    data.editFirstFormName,
    data.secondStep,
  );
  commonActions.accessDirectUrl(data.urlSecondEntityPortal);
  flowControlActions.accessSecondStepAT_Flow_control_ruleNok_E02(
    data.nameRecordE2,
  );
  // Check that you are redirected to Step2 of the second entity
  flowControlVerify.verifyFormStepPortal(
    data.editSecondFormName,
    data.secondStep,
  );
  commonActions.accessDirectUrl(data.urlFirstEntityPortal);
  flowControlActions.updateNameAT_FlowControl_RuleNok_E01(
    data.nameRecordE1,
    data.updatedNameRecordE1,
  );
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step2 of the first entity
  flowControlVerify.verifyFormStepPortal(
    data.editFirstFormName,
    data.secondStep,
  );
  commonActions.accessDirectUrl(data.urlSecondEntityPortal);
  flowControlActions.updateNameAT_FlowControl_RuleNok_E02(
    data.nameRecordE2,
    data.updatedNameRecordE2,
  );
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check that you are redirected to Step2 of the second entity
  flowControlVerify.verifyFormStepPortal(
    data.editSecondFormName,
    data.secondStep,
  );
  // Logoff.
  await commonActions.logoutFromApp();
});
