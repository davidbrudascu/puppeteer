// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC035_BoolIsFalse.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-438

Feature('Flow Control');

Scenario('User is redirected to Step3 if bool attribute is false', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlAddFCR);
  flowControlActions.addNavigateToAnotherStepFCR(
    data.nameRule,
    data.descriptionRule,
    data.caseLabel,
    data.nameAttribute,
    data.operation,
    data.thirdStep,
    data.valueRuleExpression,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlEntityPortal);
  flowControlActions.insertFormBoolIsFalse(
    data.nameFormPortal,
    data.secondStep,
    data.thirdStep,
  );
  await commonActions.logoutFromApp();
});
