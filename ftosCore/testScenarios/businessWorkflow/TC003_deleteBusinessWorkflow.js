// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowActions = require('~actions/businessWorkflowActions');
// Data
const data = require('~data/create_businessWorkflow_data');
// Verify
const businessWorkflowVerify = require('~actions/businessWorkflowVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can delete a business workflow: delete a BW with Entity attached and without Entity attached', async () => {
  // Login in Studio App and access Business Workflow Design page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessWorkflowDesignerPage);
  // Search and delete a business workflow with Entity attached
  businessWorkflowActions.searchAndDeleteABusinessWorkflow(data.businessWorkflowDeleteErrorName);
  // Verify that an appropriate error message is returned
  businessWorkflowVerify.verifyBusinessWorkflowEntityDelete(data.deleteBWError);
  // Search and delete a business workflow with Entity attached
  businessWorkflowActions.searchAndDeleteABusinessWorkflow(data.businessWorkflowDeleteName);
  // Verify that the deleted Business Workflow was deleted
  // and is not displayed anymore in Business Workflow list
  businessWorkflowVerify.verifyBusinessWorkflowDelete(data.businessWorkflowDeleteName);
  // Logout from App
  await commonActions.logoutFromApp();
});
