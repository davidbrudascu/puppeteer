// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC017_ActionNavToAnotherFlow');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');
const flowControlPage = require('~pages/flowControlPage');


// Author Victor Pana
// AT-381

Feature('Flow Control');

Scenario('User can add action for navigate to another flow ', async () => {
      // Login as Designer
      await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
      // Open FDF and navigate to Flow Control tab from Step1
      commonActions.accessDirectUrl(data.flowControlFDF1Step1DesignerPage);
      // Navigate to another Flow Digital Journey
      flowControlActions.navigateToAnotherFlowDigitalJourney(data.formDrivenFlowSecond, data.textAttribute);
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
      // Open Second FDF and navigate to Flow Control tab from Step1
      commonActions.accessDirectUrl(data.flowControlFDF2Step1DesignerPage);
      // Navigate to another step - Step 2
      flowControlActions.navigateToAnotherStep(flowControlPage.table.rowStep2Table);
      flowControlActions.addActionsToBePerformedForStep1(data.firstNameAction);
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
      await commonActions.logoutFromApp();
      await commonActions.loginInApp(data.urlPortal, data.username, data.password);
      // Navigate to Portal and open entity
      commonActions.accessDirectUrl(data.portalFlowControl1NavToAnotherStepURL);
      flowControlActions.openRecordFromEntityViewList(data.firstRecord);
      // Verify that navigate to another flow and  actions apply correctly
      flowControlVerify.verifyNavigateToAnotherFlowAction(data.secondRecord, data.editViewNavToAnotherFlow, data.editViewEntityStep1, data.editViewEntityStep2);
      await commonActions.logoutFromApp();
});
