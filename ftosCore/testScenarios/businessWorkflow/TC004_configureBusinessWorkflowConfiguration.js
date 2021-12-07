// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowConfigurationsActions = require('~actions/businessWorkflowConfigurationsActions');
// Data
const data = require('~data/create_businessWorkflowConfiguration_data');
// Verify
const businessWorkflowConfigurationsVerify = require('~actions/businessWorkflowConfigurationsVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can activate/deactivate a business workflow on an Entity and add business conditions.', async () => {
  // Login in Studio App and access Business Workflow Design page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessWorkflowConfigurationPage);
  // Find and edit Business Workflow Configuration
  businessWorkflowConfigurationsActions.findAndEditBusinessWorkflowConfiguration(
    data.businessWorkflowConfigurationName,
  );
  // Deactivate/activate a Business Workflow on an Entity
  businessWorkflowConfigurationsActions.deactivateBusinessWorkflow();
  businessWorkflowConfigurationsActions.activateBusinessWorkflow();
  // Add two business conditions: first with one rule condition,
  // second with two rules condition and then verify it
  businessWorkflowConfigurationsActions.navigateToBWCBusinessConditionTab();
  businessWorkflowConfigurationsActions.addOneBusinessCondition(
    data.businessConditionNameOne,
    data.businessConditionNameRule,
    data.businessConditionNameTwo,
    data.ruleValueInvariantDate,
    data.ruleAddCondition,
    data.ruleAddName,
    data.ruleAddInvDate,
  );
  businessWorkflowConfigurationsVerify.verifyBusinessConditionCreation(
    data.businessConditionNameOne,
  );
  // Logout from App
  await commonActions.logoutFromApp();
});
