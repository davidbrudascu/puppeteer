// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC008_EditActionBW');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');

// Author Victor Pana
// AT-379

Feature('Flow Control');

Scenario('User can edit an action for business workflow.', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.goToActionTab);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  // Edit an action
  flowControlActions.editActionBW(data.firstNameAction);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that after edited action applied correctly
  flowControlVerify.verifyEditActionsBW(
      data.clickToInsert,
      data.flowControlStep1,
      data.flowControlStep2,
      data.statusNew,
      data.statusApproved,
  );
  await commonActions.logoutFromApp();
});
