// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC001_InsertBCFulfilledNotFulfilledPk');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Flow Control');

Scenario('User can create flow control rule business condition on Primary Key ', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
  // Add new flow control rules Pk when business condition is fulfilled for Step 1
  flowControlActions.addNewFlowControlRulePkForStep1(
    data.flowControlName1,
    data.flowControlStep3,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Access */Main#/entity/entityformsection/edit/Step3IDHere/pageno/2
  commonActions.accessDirectUrl(data.flowControlStep3DesignerPage);
  commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  commonVerify.verifyEmptyTableData();
  // Add new flow control rules PK when business condition is not fulfilled for Step 3
  flowControlActions.addNewFlowControlRulePkForStep3(
    data.flowControlName2,
    data.flowControlStep1,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  //  Access */Main#/entity/AT_EntFControlBCIsFulfilledPk/list
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControlActionURL);
  commonVerify.verifyEmptyTableData();
  // Verify that  flow control rule Pk restrictions apply correctly
  flowControlVerify.verifyFlowControlPKInPortal(
    data.clickToInsert,
    data.nameRecordTest1,
    data.addFormTitleBCIsFulfilledPk,
    data.flowControlStep1,
    data.nextButton,
    data.editFormTitleBCIsFulfilledPk,
    data.flowControlStep3,
  );
  await commonActions.logoutFromApp();
});
