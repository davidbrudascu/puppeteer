// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC027_TextAttributeRuleIsBlank.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author: Andrei Fabian
// AT-383

Feature('Flow Control');

Scenario('User is redirected to Step3 if Text Input is blank', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFirstFDF);
  flowControlActions.addNavigateToAnotherStepFCR(
    data.ruleName,
    data.ruleDescription,
    data.caseLabel,
    data.firstFlowControl,
    data.operation,
    data.step3,
    data.firstDefineRuleExpresion,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlPortalList);
  flowControlActions.insertNewRecordSkipStep2(data.textPortal, data.textPortal2, data.fieldPortal);
  await commonActions.logoutFromApp();
});
