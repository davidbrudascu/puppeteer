// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC014_CloseFlowPrevContextNavToAnotherFlow');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');
const flowControlPage = require('~pages/flowControlPage');

// Author Victor Pana
// AT-381

Feature('Flow Control');

Scenario('User can add a close flow prev context for navigate to another step ', async () => {
      // Login as Designer
      await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
      // Open FDF and navigate to Flow Control tab from Step1
      commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
      // Select Close Flow - Previous Context
      flowControlActions.addCloseFlowNavigateTo(flowControlPage.list.navigateToPreviousContextOptionList);
      // Press Save & Close
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
      await commonActions.logoutFromApp();
      // Navigate to Portal and open entity
      await commonActions.loginInApp(data.urlPortal, data.username, data.password);
      commonActions.accessDirectUrl(data.portalFlowControlNavToAnotherStepURL);
      // Verify if the Form is redirect to Previous Context instead of step 2
      flowControlVerify.verifyFormRedirectToAnotherStep(data.clickToInsert, data.firstRecord, flowControlPage.labels.entityViewPrevContextLabel);
      commonActions.refreshPage();
      // Navigate to Portal and open entity
      commonActions.accessDirectUrl(data.portalFlowControlNavToAnotherStepURL);
      // Check the record was added to the entity
      flowControlVerify.verifyIfRecordAddedToEntity(data.viewPortalEntityCloseFlowE01, data.firstRecord)
      // Logoff
      await commonActions.logoutFromApp();
});
