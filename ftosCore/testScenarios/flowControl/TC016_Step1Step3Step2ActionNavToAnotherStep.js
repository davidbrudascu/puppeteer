// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC016_Step1Step3Step2ActionNavToAnotherStep');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');
const flowControlPage = require('~pages/flowControlPage');


// Author Victor Pana
// AT-381

Feature('Flow Control');

Scenario('User can create step1-step3-step2 action for navigate to another step ', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Open FDF and navigate to Flow Control tab from Step1
  commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
  // Navigate to another step - Step 3
  flowControlActions.navigateToAnotherStep(flowControlPage.table.rowStep3Table);
  // Add action to be performed
  flowControlActions.addActionsToBePerformedForStep1(data.firstNameAction);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.flowControlStep3DesignerPage);
  // Navigate to another step - Step 2
  flowControlActions.navigateToAnotherStep(flowControlPage.table.rowStep2Table);
  // Add action to be performed
  flowControlActions.addActionsToBePerformedForStep1(data.firstNameAction);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Navigate to Portal and open entity
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalFlowControl1NavToAnotherStepURL);
  // Verify that navigate to another step and  actions apply correctly
  flowControlVerify.verifyNavigateToAnotherStepAction(data.clickToInsert, data.firstRecord, data.editViewEntityStep3, data.editViewEntityStep2);
  await commonActions.logoutFromApp();
});
