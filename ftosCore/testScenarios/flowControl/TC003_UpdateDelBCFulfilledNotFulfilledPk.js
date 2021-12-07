// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC003_UpdateDelBCFulfilledNotFulfilledPk');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Flow Control');

Scenario('User can update/delete a flow control rule business on Primary Key ', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  // Delete flow control Rule Pk
  flowControlActions.deleteFlowControlRules(data.flowControlName1);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  //  Access */Main#/entity/entityFormSectionRule/edit/InsertFCR_02IDHere
  commonActions.accessDirectUrl(data.flowControlStep3UpdateDesignerPage);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  flowControlActions.changeFlowControlStep(data.flowControlStep2);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp()
  //  Access */Main#/entity/AT_EntFControlBCIsFulfilledPkDelUpd/list
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that  flow control rule Pk restrictions apply correctly
  flowControlVerify.verifyFlowControlPKUpdateInPortal(
      data.clickToInsert,
      data.nameRecordTest1,
      data.addFormTitleBCIsFulfilledPk,
      data.flowControlStep1,
      data.nextButton,
      data.flowControlStep2,
      data.editFormTitleBCIsFulfilledPk,
      data.flowControlStep3,
  );
  await commonActions.logoutFromApp();
});
