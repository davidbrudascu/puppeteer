// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC019_CloseFlowPreviousContext');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-439

Feature('Flow Control');

Scenario('User can use the Close Flow Functionality to get redirected to Previous Context', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to Form Driven Flows
  commonActions.accessDirectUrl(data.urlAddFCR);
  // Open Step 1 and add a flow control rule
  flowControlActions.addCloseFlowRule(
    data.nameFlowControl,
    data.descriptionFlowControl,
    data.caseLabel,
    data.firstAttribute,
    data.operation,
    data.previousContext,
    data.valueExpressionRule,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Navigate to entity list
  commonActions.accessDirectUrl(data.entityPortalUrl);
  // Navigate to form
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify if the Form is redirecting to previous link(Entity list) instead of step 2
  flowControlActions.insertFormPreviousContext(
    data.valueExpressionRule,
    data.entityList,
  );
  await commonActions.logoutFromApp();
});
