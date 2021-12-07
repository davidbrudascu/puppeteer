// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC031_LookupEquals');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-436

Feature('Flow Control');

Scenario('User is redirected to Step3 if Lookup Input is Equal with the given record', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlAddFCR);
  flowControlActions.addNavigateToAnotherStepFCR(
    data.nameFCR,
    data.descriptionFCR,
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
  commonActions.accessDirectUrl(data.urlFirstEntityPortal);
  flowControlActions.insertFormLookupEquals(
    data.valueRuleExpression,
    data.nameFormPortal,
    data.thirdStep,
    data.secondRecord,
    data.secondStep,
  );
  await commonActions.logoutFromApp();
});
