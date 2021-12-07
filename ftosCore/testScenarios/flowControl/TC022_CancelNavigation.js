// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC022_CancelNavigation');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-440

Feature('Flow Control');

Scenario('User can use the "Cancel Navigation" functionality on a Flow Control', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access Form Driven Flow
  commonActions.accessDirectUrl(data.urlAddFCR);
  // Insert Cancel Navigation Rule
  flowControlActions.addCancelNavigationRule(
    data.nameFlowControlRule,
    data.descriptionFlowControlRule,
    data.caseLabel,
    data.firstFlowControl,
    data.operation,
    data.cancelNavigationMessage,
    data.firstDRE,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Navigate to portal form
  commonActions.accessDirectUrl(data.urlFormPortal);
  flowControlActions.insertCancelNavigationForm(data.firstDRE);
  // Verify that user is not redirected to step2
  flowControlVerify.verifyFormStepPortal(
    data.nameFormPortal,
    data.firstStep,
  );
  await commonActions.logoutFromApp();
});
