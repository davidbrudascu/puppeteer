// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC004_UpdateDelBCFulfilledNotFulfilledLk');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Flow Control');

Scenario('User can update/delete a flow control rule business on Lookup Key ', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  // Delete flow control Rule Lk
  flowControlActions.deleteFlowControlRules(data.flowControlName1);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  //  Access */Main#/entity/entityFormSectionRule/edit/InsertFCR_02IDHere
  commonActions.accessDirectUrl(data.flowControlStep3UpdateDesignerPage);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  flowControlActions.changeFlowControlStep(data.flowControlStep2);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  //  Access */Main#/entity/AT_EntFControlBCIsFulfilledLk_01_DelUpd/list
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that  flow control rule Lk restrictions apply correctly
  flowControlVerify.verifyFlowControlLKUpdateInPortal(
    data.clickToInsert,
    data.nameRecordTestB,
    data.addFormTitleBCIsFulfilledLk_01,
    data.flowControlStep1,
    data.nameRecordTestA,
    data.nextButton,
    data.editFormTitleBCIsFulfilledLk_01,
    data.flowControlStep3,
    data.flowControlStep2,
  );
  await commonActions.logoutFromApp();
});
