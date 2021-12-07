// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Data
const data = require('~data/flowControl/TC010_EntityLoopNavToAnotherFlow');
// Verify
const flowControlVerify = require('~actions/flowControlVerify');

// Author Victor Pana
// AT-381

Feature('Flow Control');

Scenario('User can create a 3 entity loop', async () => {
      // Login to Portal
      await commonActions.loginInApp(data.urlPortal, data.username, data.password);
      commonActions.accessDirectUrl(data.portalFlowControlActionURL);
      flowControlActions.openRecordFromEntityViewList(data.firstRecord);
      // Verify flow control for 3 entity loop in portal
      await flowControlVerify.verifyFlowControl3EntityLoopInPortal(
          data.firstRecord,
          data.secondRecord,
          data.thirdRecord,
          data.editViewEntityLoopE01,
          data.editViewEntityLoopE02,
          data.editViewEntityLoopE03,
      );
      await commonActions.logoutFromApp();
});
