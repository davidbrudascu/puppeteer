// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowActions = require('~actions/businessWorkflowActions');
// Data
const data = require('~data/create_businessWorkflow_data');
// Verify
const businessWorkflowVerify = require('~actions/businessWorkflowVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can edit a business workflow: attach entity, add new status and transition', async () => {
  // Login in Studio App and access Business Workflow Design page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessWorkflowDesignerPage);
  // Search and edit a business workflow
  businessWorkflowActions.searchAndEditBusinessWorkflow(data.businessWorkflowBeforeEditName);
  // Perform the edit actions: attach entity, add new status and transition
  businessWorkflowActions.attachEntityToBusinessWorkflow(data.entityName, data.toastSuccessMessage);
  businessWorkflowActions.addBusinessWorkflowStatus(data.bwStatusTwo);
  businessWorkflowActions.addBusinessWorkflowTransitions(data.bwStatusOne, data.bwStatusTwo);
  // Verify that the added status and transitions were properly added and displayed
  businessWorkflowVerify.verifyBusinessWorkflowEditStatusTransition(
    data.bwStatusTwo,
    data.bwStatusTransition,
  );
  // Verify that the attached Entity is displayed properly
  businessWorkflowActions.navigateToBWMainTab();
  businessWorkflowVerify.verifyBusinessWorkflowEditEntity(data.entityName);
  // Verify that the edited Business Workflow is displayed properly in Business Workflow list
  commonActions.saveAndCloseAction();
  businessWorkflowVerify.verifyBusinessWorkflowInSearch(data.businessWorkflowName);
  // Logout from App
  await commonActions.logoutFromApp();
});
