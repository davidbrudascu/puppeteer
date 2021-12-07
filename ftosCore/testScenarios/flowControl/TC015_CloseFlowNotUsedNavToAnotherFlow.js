// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC015_CloseFlowNotUsedNavToAnotherFlow');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana
// AT-381

Feature('Flow Control');

Scenario('User can add a close flow not used for navigate to another step ', async () => {
      // Login as Designer
      await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
      // Open FDF and navigate to Flow Control tab from Step1
      commonActions.accessDirectUrl(data.flowControl1Step1DesignerPage);
      // Check that Navigate to another Step is already checked
      flowControlActions.navigateToAnotherStepRadioCheckboxChecked();
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
      // Open FDF and navigate to Flow Control tab from Step2
      commonActions.accessDirectUrl(data.flowControl2Step1DesignerPage);
      // Check that Navigate to another Step is already checked
      flowControlActions.navigateToAnotherStepRadioCheckboxChecked();
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
      await commonActions.logoutFromApp();
      // Navigate to Portal and open the record first entity
      await commonActions.loginInApp(data.urlPortal, data.username, data.password);
      commonActions.accessDirectUrl(data.portalFlowControl1NavToAnotherStepURL);
      flowControlActions.openRecordFromEntityViewList(data.firstRecord);
      // Verify if the Form is redirect second step of current entity form
      flowControlVerify.verifyRedirectStep2FirstEntity(data.editViewEntityNotUsedE01, data.secondRecord, data.Step2);
      // Navigate to Portal and open the record second entity
      commonActions.accessDirectUrl(data.portalFlowControl2NavToAnotherStepURL);
      flowControlActions.openRecordFromEntityViewList(data.secondRecord);
      // Check that you are redirect to second step of the second entity
      flowControlVerify.verifyRedirectStep2SecondEntity(data.editViewEntityNotUsedE02, data.firstRecord, data.Step2);
      // Logoff
      await commonActions.logoutFromApp();
});
