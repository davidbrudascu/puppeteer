// Data
const data = require('~data/create_businessWorkflowApproval_data');
// Actions
const commonActions = require('~actions/commonActions');
const businessWorkflowApprovalActions = require('~actions/businessWorkflowApprovalActions');
// Verify
const businessWorkflowApprovalVerify = require('~actions/businessWorkflowApprovalVerify');

// Author Ionut Daniel Mindrescu

Feature('Business Workflow');

Scenario('User can edit Approval rules from an existing business workflow and delete them.', async () => {
  // Login in Designer App and access direct the Business Workflow Transition Configuration page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.transitionURLForEdit);
  // Navigate to Approval Tab
  businessWorkflowApprovalActions.navigateToBWApprovalsTabEdit(data.approvalTabEditURL);
  // Edit the existing Approval rule
  businessWorkflowApprovalActions.editApprovalRule(
    data.existingApprovalRuleName,
    data.editApprovalRuleURL,
    data.editApprovalRuleName,
    data.editApprovalRuleUserCompetence,
    data.competenceApprovalModeType,
    data.approvalRuleAcceptedStatus,
    data.approvalDefaultEntityForm,
    data.approvalRuleRejectedText,
    data.approvalRuleApprovalText,
  );
  // Edit the existing Approval Trigger
  businessWorkflowApprovalActions.editApprovalTriggers(
    data.existingApprovalTriggerName,
    data.approvalTriggerURL,
    data.editApprovalTriggerName,
    data.editApprovalTriggerBWRule,
    data.approvalTriggerEvaluationValue,
  );
  // Verify Approval Triggers after edit
  businessWorkflowApprovalVerify.verifyApprovalTriggersAfterEdit(
    data.editApprovalTriggerName,
    data.editApprovalTriggerBWRule,
    data.approvalTriggerEvaluationValue,
  );
  // Delete Approval Trigger
  businessWorkflowApprovalActions.deleteApprovalTriggers(data.editApprovalTriggerName);
  // Verify Approval Rule after edit
  businessWorkflowApprovalVerify.verifyApprovalRulesAfterEdit(
    data.editApprovalRuleName,
    data.editApprovalRuleUserCompetence,
    data.competenceApprovalModeType,
    data.approvalRuleAcceptedStatus,
  );
  // Delete Approval Rule
  businessWorkflowApprovalActions.deleteApprovalRule(data.editApprovalRuleName);
  // Verify that Approval Rule was deleted successfully
  businessWorkflowApprovalVerify.verifyApprovalRuleDelete(data.editApprovalRuleName);
  // Logout from App
  await commonActions.logoutFromApp();
});
