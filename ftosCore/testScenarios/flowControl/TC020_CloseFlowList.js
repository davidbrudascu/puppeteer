// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC020_CloseFlowList.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-439

Feature('Flow Control');

Scenario('User can use the Close Flow Functionality to get redirected to Entity List', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to Form Driven Flow
  commonActions.accessDirectUrl(data.urlAddFCR);
  // Open Step 1 and add a flow control rule
  await flowControlActions.addCloseFlowRuleList(
    data.nameFlowControl,
    data.descriptionFlowControl,
    data.caseLabel,
    data.firstAttribute,
    data.operation,
    data.list,
    data.secondEntity,
    data.valueExpressionRule,
    data.searchColumn,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Navigate to form
  commonActions.accessDirectUrl(data.formPortalUrl);
  // Verify if the Form is redirecting to Entity List instead of step 2
  flowControlActions.insertFormList(
    data.valueExpressionRule,
    data.secondEntityPortalList,
  );
  await commonActions.logoutFromApp();
});
