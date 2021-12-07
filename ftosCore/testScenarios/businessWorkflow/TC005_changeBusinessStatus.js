// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowConfigurationsActions = require('~actions/businessWorkflowConfigurationsActions');
// Data
const data = require('~data/create_businessWorkflowConfiguration_data');
// Verify
const businessWorkflowConfigurationsVerify = require('~actions/businessWorkflowConfigurationsVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can change the business workflow status of an entry', async () => {
  // Login in Portal App and access Entity page
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.bwEntityUrl);
  // Add entry and move to Step2 of the User Journey.
  businessWorkflowConfigurationsActions.addEntityEntry(data.bwEntityAddName);
  businessWorkflowConfigurationsVerify.verifyEntryCreationForChangeBWStatus(
    data.bwEntityEntrySuccessful,
  );
  businessWorkflowConfigurationsActions.bwChangeStatus();
  // Verify successful change status transition
  businessWorkflowConfigurationsVerify.verifySuccessfulChangeStatus(
    data.bwCurrentStatusVerification,
  );
  businessWorkflowConfigurationsActions.bwCheckBusinessTransactionsPage();
  businessWorkflowConfigurationsVerify.verifyStatusInBusinessTransitions(
    data.bwFromStatus,
    data.bwToStatus,
  );
  // Logout from App
  await commonActions.logoutFromApp();
});
