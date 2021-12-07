// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowConfigurationsActions = require('~actions/businessWorkflowConfigurationsActions');
// Data
const data = require('~data/create_businessWorkflowConfiguration_data');
// Verify
const businessWorkflowConfigurationsVerify = require('~actions/businessWorkflowConfigurationsVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can edit a business workflow configuration.', async () => {
  // Login in Studio App and access Business Workflow Design page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessWorkflowConfigurationPage);
  // Find and edit Business Workflow Configuration
  businessWorkflowConfigurationsActions.findAndEditBusinessWorkflowConfiguration(
    data.editBusinessWorkflowName,
    data.editBWURL,
  );
  businessWorkflowConfigurationsActions.navigateToBWCBusinessConditionTab();
  // Edit Business Conditions: change Name, add Code, Description, remove/add rules
  commonActions.accessDirectUrl(data.editBWBusinessConditionsURL);
  businessWorkflowConfigurationsActions.deleteRuleBusinessCondition();
  businessWorkflowConfigurationsActions.editBusinessConditionsDetails(
    data.editBWBusinessConditionName,
    data.businessConditionCode,
    data.businessConditionDescription,
  );
  businessWorkflowConfigurationsActions.addBusinessConditionRules(
    data.ruleValueInvariantDate,
    data.ruleValueName,
    data.ruleValueCreatedOn,
    data.ruleCreatedOn,
    data.ruleIsLessThan,
    data.ruleAddCondition,
    data.ruleAddName,
    data.ruleAddInvDate,
  );
  // Verify that business condition modifications have been saved successfully.
  businessWorkflowConfigurationsVerify.verifyBusinessConditionAfterEdit(
    data.editBWBusinessConditionName,
    data.businessConditionCode,
    data.businessConditionDescription,
  );
  // Logout from App
  await commonActions.logoutFromApp();
});
