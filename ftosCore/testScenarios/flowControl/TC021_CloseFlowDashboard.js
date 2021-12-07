// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC021_CloseFlowDashboard');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-439

Feature('Flow Control');

Scenario('User can use the Close Flow Functionality to get redirected to Main Dashboard', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access Form Driven Flow
  commonActions.accessDirectUrl(data.urlAddFCR);
  // Add a close flow rule on step 1
  flowControlActions.addCloseFlowRuleDashboard(
    data.nameFlowControl,
    data.descriptionFlowControl,
    data.caseLabel,
    data.firstAttribute,
    data.operation,
    data.dashboard,
    data.mainDashboard,
    data.valueExpressionRule,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Access Form Portal
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Form redirects to 'Main Dashboard' instead of step 2
  flowControlActions.insertFormDashboard(data.valueExpressionRule, data.mainDashboard);
  await commonActions.logoutFromApp();
});
