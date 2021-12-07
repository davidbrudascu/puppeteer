// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const businessWorkflowApprovalPage = require('~pages/businessWorkflowApprovalPage');

module.exports = {
  verifyApprovalTriggersSave(approvalTriggerName) {
    I.waitForVisible(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(approvalTriggerName).first(), constants.SHORT_WAIT);
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(approvalTriggerName).first());
  },

  verifyApprovalRuleCreation(transitionURL, approvalRuleName) {
    I.amOnPage(transitionURL);
    I.waitForVisible(businessWorkflowApprovalPage.tabs.approvalsTab, constants.SHORT_WAIT);
    I.click(businessWorkflowApprovalPage.tabs.approvalsTab);
    I.waitForVisible(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(approvalRuleName).first(), constants.SHORT_WAIT);
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(approvalRuleName).first());
  },

  verifyCurrentStatus(statusLabel, currentStatus) {
    // FIXME added wait() because the see() is faster and sees the old status
    I.wait(2);
    I.waitForVisible(businessWorkflowApprovalPage.buttons.bwCurrentStatus, constants.SHORT_WAIT);
    I.see(currentStatus, businessWorkflowApprovalPage.buttons.bwCurrentStatus);
  },

  verifyApprovalTriggersAfterEdit(
    editApprovalTriggerName,
    editApprovalTriggerBWRule,
    approvalTriggerEvaluationValue,
  ) {
    I.waitForElement(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(editApprovalTriggerName).first(), constants.SHORT_WAIT);
    // Verify Name
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(editApprovalTriggerName).first());
    // Verify Entity Business Workflow Rule
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(editApprovalTriggerBWRule).first());
    // Verify Required Evaluation Value
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(approvalTriggerEvaluationValue).first());
  },

  verifyApprovalRulesAfterEdit(
    editApprovalRuleName,
    editApprovalRuleUserCompetence,
    competenceApprovalModeType,
    approvalRuleAcceptedStatus,
  ) {
    I.waitForElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(editApprovalRuleName).first(), constants.SHORT_WAIT);
    // Verify Name
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(editApprovalRuleName).first());
    // Verify User Competence
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(editApprovalRuleUserCompetence).first());
    // Verify Triggers Validation Mode
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(competenceApprovalModeType).first());
    // Verify Rejected Business Workflow Status
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(approvalRuleAcceptedStatus).first());
  },

  verifyApprovalRuleDelete(editApprovalRuleName) {
    I.dontSeeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(editApprovalRuleName).first());
  },
};
