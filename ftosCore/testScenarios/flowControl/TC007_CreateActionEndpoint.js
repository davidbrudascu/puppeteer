// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC007_CreateActionEndpoint');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana
// AT-379

Feature('Flow Control');

Scenario('User can create action endpoint for business workflow.', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.goToActionTab);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  commonVerify.verifyEmptyTableData();
  // Add new Action Endpoint (Call Custom Processor)
  flowControlActions.insertActionEndpoint(data.firstNameAction);
  commonActions.accessDirectUrl(data.goToStep1FlowControl);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  // Add actions to be performed in Step 1
  flowControlActions.addActionsToBePerformedForStep1(data.firstNameAction);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // 15	Navigate to Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that endpoint action applied correctly
  flowControlVerify.verifyActionsForEndpoint(
      data.clickToInsert,
      data.flowControlStep1,
      data.infoMessageScript,
  );
  await commonActions.logoutFromApp();
});
