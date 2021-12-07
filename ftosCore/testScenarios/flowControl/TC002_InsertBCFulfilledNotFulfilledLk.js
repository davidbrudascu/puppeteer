// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC002_InsertBCFulfilledNotFulfilledLk');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Flow Control');

Scenario('User can create flow control rule business condition on Lookup key  ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
  // Add new flow control rules LK when business condition is fulfilled for Step 1
  flowControlActions.addNewFlowControlRuleLkForStep1(
      data.flowControlName1,
      data.businessCondition2,
      data.businessCondition3,
      data.businessCondition1,
      data.flowControlStep3,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.flowControlStep3DesignerPage);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  commonVerify.verifyEmptyTableData();
  // Add new flow control rules LK when business condition is not fulfilled for Step 3
  flowControlActions.addNewFlowControlRuleLkForStep3(
      data.flowControlName2,
      data.flowControlStep1,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  //  Access */Main#/entity/AT_EntFControlBCIsFulfilledLk/list
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that  flow control rule Lk restrictions apply correctly
  flowControlVerify.verifyFlowControlLKInPortal(
    data.clickToInsert,
    data.nameRecordTestB,
      data.addFormTitleBCIsFulfilledLk_01,
      data.flowControlStep1,
      data.nameRecordTestA,
      data.nextButton,
      data.editFormTitleBCIsFulfilledLk_01,
      data.flowControlStep3,
  );
  await commonActions.logoutFromApp();
});
