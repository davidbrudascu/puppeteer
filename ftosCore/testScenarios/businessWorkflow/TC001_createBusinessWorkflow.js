// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowActions = require('~actions/businessWorkflowActions');
// Data
const data = require('~data/create_businessWorkflow_data');
// Verify
const businessWorkflowVerify = require('~actions/businessWorkflowVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can create a simple business workflow, with one status and initial transition.', async () => {
  // Login in Studio App and access Business Workflow Design page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessWorkflowDesignerPage);
  // Complete a simple Business Workflow Creation
  businessWorkflowActions.insertNewBusinessWorkflow();
  businessWorkflowActions.fillAllMandatoryFieldsForBusinessWorkflow(data.businessWorkflowName);
  businessWorkflowActions.addBusinessWorkflowStatus(data.bwStatusOne);
  businessWorkflowActions.addBusinessWorkflowInitialTransitions(
    data.bwStatusOne,
    data.bwInitialStatusTransition,
  );
  // Verify that the added status and initial transitions were properly added and displayed
  businessWorkflowVerify.verifyBusinessWorkflowNewlyAddedStatusTransition(
    data.bwStatusOne,
    data.bwInitialStatusTransition,
  );
  // Verify that the added Business Workflow is displayed in the Business Workflow list
  commonActions.saveAndCloseAction();
  businessWorkflowVerify.verifyBusinessWorkflowInSearch(data.businessWorkflowName);
  // Logout from App
  await commonActions.logoutFromApp();
});
