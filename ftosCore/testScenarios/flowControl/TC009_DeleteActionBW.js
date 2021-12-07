// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC009_DeleteActionBW');
// Verify
const flowControlVerify = require('~actions/flowControlVerify');

// Author Victor Pana
// AT-379

Feature('Flow Control');

Scenario('User can delete an action for business workflow.', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.goToActionTab);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  // Delete action
  flowControlActions.deleteActionBW(data.firstNameAction);
  commonActions.accessDirectUrl(data.goToStep1FlowControl);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  // Verify that the action deleted shouldn't occur for actions to be performed in Step 1
  flowControlVerify.verifyNoDataInActionsPerformedStep1();
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  // Verify that after deleted action applied correctly
  flowControlVerify.verifyDeleteActionsBW(
      data.clickToInsert,
      data.flowControlStep1,
      data.flowControlStep2,
      data.statusForWorkflow,
  );
  await commonActions.logoutFromApp();
});
