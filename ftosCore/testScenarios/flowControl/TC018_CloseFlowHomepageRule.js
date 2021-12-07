// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC018_CloseFlowHomepageRule');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-439

Feature('Flow Control');

Scenario('User can use the Close Flow Functionality to get redirected to Homepage', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access to Form Driven Flow
  commonActions.accessDirectUrl(data.urlAddFCR);
  // Open Step 1 and add a flow control rule
  flowControlActions.addCloseFlowRule(
    data.nameFlowControl,
    data.descriptionFlowControl,
    data.caseLabel,
    data.firstAttribute,
    data.operation,
    data.homepage,
    data.valueExpressionRule,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Access Form Url in Portal
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify if the Form is redirecting to homepage instead of step 2
  flowControlActions.insertFormCloseFlowHomepage(data.valueExpressionRule);
  await commonActions.logoutFromApp();
});
