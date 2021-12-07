// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC029_InvariantDateEquals');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-435

Feature('Flow Control');

Scenario('User is redirected to Step3 if Invariant Date Input is Equal with the given date', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlAddFCR);
  // Add Flow Control Rule on Step1
  flowControlActions.addNavigateToAnotherStepFCR(
    data.nameRule,
    data.descriptionRule,
    data.caseLabel,
    data.nameAttribute,
    data.operation,
    data.thirdStep,
    data.valueRuleExpression,
  );
  // Press Save & Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlEntityPortal);
  flowControlActions.fillInvariantDateEqualFormPortal(
    data.valueRuleExpression,
    data.editFormNamePortal,
    data.thirdStep,
    data.updatedDate,
    data.secondStep,
  );
  await commonActions.logoutFromApp();
});
