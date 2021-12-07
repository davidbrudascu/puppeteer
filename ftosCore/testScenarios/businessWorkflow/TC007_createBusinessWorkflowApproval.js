// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowApprovalActions = require('~actions/businessWorkflowApprovalActions');
const businessWorkflowConfigurationsActions = require('~actions/businessWorkflowConfigurationsActions');
// Data
const data = require('~data/create_businessWorkflowApproval_data');
// Verify
const businessWorkflowConfigurationsVerify = require('~actions/businessWorkflowConfigurationsVerify');
const businessWorkflowApprovalVerify = require('~actions/businessWorkflowApprovalVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can create Approval rules to an existing business workflow.', async () => {
  // Login in Designer App and access direct the Business Workflow Transition Configuration page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.transitionURLForCreate);
  // Check the Requires Approval checkbox
  businessWorkflowApprovalActions.setRequiresApproval();
  // Navigate to Approvals tab and add Approval rule
  businessWorkflowApprovalActions.navigateToBWApprovalsTabCreate(data.approvalTabCreateURL);
  businessWorkflowApprovalActions.addApprovalRule(
    data.approvalRuleName,
    data.approvalRuleUserCompetence,
    data.approvalRuleRejectStatus,
    data.approvalEntityForm,
    data.approvalRuleRejectedText,
    data.approvalRuleApprovalText,
  );
  // Add Approval Triggers
  businessWorkflowApprovalActions.addApprovalTriggers(data.approvalTriggerName,
    data.approvalTriggerBWRule);
  businessWorkflowApprovalVerify.verifyApprovalTriggersSave(data.approvalTriggerName);
  // Verify that the Approval Rule was created
  businessWorkflowApprovalVerify.verifyApprovalRuleCreation(data.transitionURLForCreate,
    data.approvalRuleName);
  // Login in Portal App and access the entity for Approval
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalEntity);
  // Add record to send it to Approval
  businessWorkflowConfigurationsActions.addEntityEntry(data.recordName);
  businessWorkflowApprovalActions.sendToApproval();
  // Verify that the task has been sent to Approval
  businessWorkflowApprovalVerify.verifyCurrentStatus(data.statusLabel, data.currentStatus);
  // Verify Business Transition page for From Status, To Status and Requires Approval checkbox.
  businessWorkflowConfigurationsActions.bwCheckBusinessTransactionsPage();
  businessWorkflowConfigurationsVerify.verifyStatusInBusinessTransitions(data.bwFromStatus,
    data.bwToStatus);
  // Logout from App
  await commonActions.logoutFromApp();
});
