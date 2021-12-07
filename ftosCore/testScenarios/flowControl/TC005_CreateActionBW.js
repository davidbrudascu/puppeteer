// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC005_CreateActionBW');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana
// AT-379

Feature('Flow Control');

Scenario('User can create actions for business workflow.', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.goToActionTab);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  commonVerify.verifyEmptyTableData();
  // Add first Action for BW
  flowControlActions.insertActionChangeStatusFromStatusBW(data.firstNameAction, data.statusNew, data.statusInProgress);
  // Add second Action for BW
  flowControlActions.insertActionChangeStatusFromStatusBW(data.secondNameAction, data.statusInProgress, data.statusApproved);
  // Add actions to be performed in Step 1
  commonActions.accessDirectUrl(data.goToStep1FlowControl);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  flowControlActions.addActionsToBePerformedForStep1BW(data.firstNameAction, data.secondNameAction);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await  commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that actions for business workflow apply correctly
  flowControlVerify.verifyActionsForBW(
      data.clickToInsert,
      data.flowControlStep1,
      data.flowControlStep2,
      data.nextButton,
      data.statusNew,
      data.statusInProgress,
      data.statusApproved,
  );
  await commonActions.logoutFromApp();
});
