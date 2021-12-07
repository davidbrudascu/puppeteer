// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const businessWorkflowApprovalPage = require('~pages/businessWorkflowApprovalPage');

// Verify
const commonVerify = require('~actions/commonVerify');

// Actions
const commonActions = require('~actions/commonActions');

module.exports = {
  navigateToBWApprovalsTabCreate(approvalTabCreate) {
    I.waitForVisible(businessWorkflowApprovalPage.tabs.approvalsTab, constants.SHORT_WAIT);
    I.amOnPage(approvalTabCreate);
    I.waitForVisible(businessWorkflowApprovalPage.buttons.insertApprovalsButton,
      constants.SHORT_WAIT);
  },

  navigateToBWApprovalsTabEdit(approvalTabEdit) {
    I.waitForVisible(businessWorkflowApprovalPage.tabs.approvalsTab, constants.SHORT_WAIT);
    I.amOnPage(approvalTabEdit);
    I.waitForVisible(businessWorkflowApprovalPage.buttons.insertApprovalsButton,
      constants.SHORT_WAIT);
  },

  setRequiresApproval() {
    I.waitForVisible(businessWorkflowApprovalPage.checkbox.requiresApproval, constants.SHORT_WAIT);
    I.checkOption(businessWorkflowApprovalPage.checkbox.requiresApproval);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.waitForLoadersToFinish(constants.TOAST_VANISH);
  },

  addApprovalRule(approvalRuleName,
    approvalRuleUserCompetence,
    approvalRuleRejectStatus,
    approvalEntityForm,
    approvalRuleRejectedText,
    approvalRuleApprovalText) {
    I.waitForVisible(businessWorkflowApprovalPage.fields.approvalResults);
    I.moveCursorTo(businessWorkflowApprovalPage.buttons.insertApprovalsButton);
    I.click(businessWorkflowApprovalPage.buttons.insertApprovalsButton);
    I.waitForVisible(businessWorkflowApprovalPage.fields.approvalRuleName, constants.SHORT_WAIT);
    // Add Approval Name
    I.fillField(businessWorkflowApprovalPage.fields.approvalRuleName, approvalRuleName);
    // Add User Competence
    commonActions.clickLookupTableButton(
      businessWorkflowApprovalPage.buttons.addUserCompetenceButton
    );
    I.waitForElement(
      businessWorkflowApprovalPage.buttons.userCompetencePageButton,
      constants.SHORT_WAIT,
    );
    I.click(businessWorkflowApprovalPage.buttons.userCompetencePageButton);
    commonActions.doubleClickValueFromTable(
      businessWorkflowApprovalPage.locate.userCompetenceTableLocate,
      approvalRuleUserCompetence,
    );
    // Add Rejected Business Workflow Status
    I.click(businessWorkflowApprovalPage.buttons.addRejectedStatus);
    I.waitForInvisible(businessWorkflowApprovalPage.fields.rejectedBWStatusLoader,
      constants.SHORT_WAIT);
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.rejectedStateIdLocate).withText(approvalRuleRejectStatus));
    // Select Entity Form
    I.click(businessWorkflowApprovalPage.buttons.addEntityFormButton);
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.entityFormIdLocate).withText(approvalEntityForm));
    // Add Rejected and Approval texts
    I.fillField(locate('textarea').inside(businessWorkflowApprovalPage.locate.rejectedTextLocate), approvalRuleRejectedText);
    I.fillField(locate('textarea').inside(businessWorkflowApprovalPage.locate.approvalTextLocate), approvalRuleApprovalText);
    // Save changes
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addApprovalTriggers(
    approvalTriggerName,
    approvalTriggerBWRule,
  ) {
    I.waitForElement(
      businessWorkflowApprovalPage.buttons.insertApprovalTriggersButton,
      constants.SHORT_WAIT,
    );
    I.scrollTo(businessWorkflowApprovalPage.locate.approvalTextLocate);
    I.click(businessWorkflowApprovalPage.buttons.insertApprovalTriggersButton);
    I.waitForVisible(businessWorkflowApprovalPage.locate.approvalTriggerPage,
      constants.SHORT_WAIT);
    // Fill the Add Approval Trigger form
    I.fillField(businessWorkflowApprovalPage.fields.approvalTriggersNameField, approvalTriggerName);
    I.click(businessWorkflowApprovalPage.buttons.approvalTriggersBWRuleButton);
    // I.waitForInvisible(locate('.dx-loadpanel-message').withText('Loading...'))
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWRuleLocate).withText(approvalTriggerBWRule));
    // Save changes
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  sendToApproval() {
    commonActions.clickButtonAfterLocator(businessWorkflowApprovalPage.buttons.chooseStatusButton);
    commonActions.clickButtonAfterLocator(businessWorkflowApprovalPage.buttons.bwStatusButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  editApprovalRule(
    existingApprovalRuleName,
    editApprovalRuleURL,
    editApprovalRuleName,
    editApprovalRuleUserCompetence,
    competenceApprovalModeType,
    approvalRuleAcceptedStatus,
    approvalDefaultEntityForm,
    approvalRuleRejectedText,
    approvalRuleApprovalText,
  ) {
    // Check if Approval Rule exists
    I.waitForVisible(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(existingApprovalRuleName).first(), constants.SHORT_WAIT);
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(existingApprovalRuleName).first());
    // Access the Approval Rule URL
    I.amOnPage(editApprovalRuleURL);
    I.waitForElement(businessWorkflowApprovalPage.fields.approvalRuleName, constants.SHORT_WAIT);
    // Change Name field: clear content then fill in with new value
    I.clearField(businessWorkflowApprovalPage.fields.approvalRuleName);
    I.fillField(businessWorkflowApprovalPage.fields.approvalRuleName, editApprovalRuleName);
    // Replace user competence
    commonActions.clickLookupTableButton(
      businessWorkflowApprovalPage.buttons.addUserCompetenceButton
    );
    I.waitForElement(
      businessWorkflowApprovalPage.buttons.userCompetencePageButton,
      constants.SHORT_WAIT,
    );
    I.click(businessWorkflowApprovalPage.buttons.userCompetencePageButton);
    commonActions.doubleClickValueFromTable(
      businessWorkflowApprovalPage.locate.userCompetenceTableLocate,
      editApprovalRuleUserCompetence,
    );
    // Enable the Is Advisory option
    I.click(businessWorkflowApprovalPage.buttons.isAdvisoryButton);
    // Change Competence Approval Mode
    I.click(businessWorkflowApprovalPage.fields.competenceApprovalModeField);
    I.click(businessWorkflowApprovalPage.fields.competenceModeAll);
    // Change Rejected Business Workflow Status
    I.click(businessWorkflowApprovalPage.buttons.addRejectedStatus);
    I.waitForInvisible(businessWorkflowApprovalPage.fields.rejectedBWStatusLoader,
      constants.SHORT_WAIT);
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.rejectedStateIdLocate).withText(approvalRuleAcceptedStatus));
    // Change Entity Form
    I.click(businessWorkflowApprovalPage.buttons.addEntityFormButton);
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.entityFormIdLocate).withText(approvalDefaultEntityForm));
    // Add Rejected and Approval texts
    I.fillField(locate('textarea').inside(businessWorkflowApprovalPage.locate.rejectedTextLocate), approvalRuleRejectedText);
    I.fillField(locate('textarea').inside(businessWorkflowApprovalPage.locate.approvalTextLocate), approvalRuleApprovalText);
    // Change Triggers Validation Mode
    I.scrollTo(businessWorkflowApprovalPage.buttons.insertApprovalTriggersButton);
    I.click(businessWorkflowApprovalPage.fields.triggersValidationModeField);
    I.clearField(businessWorkflowApprovalPage.fields.triggersValidationModeTextField);
    I.fillField(businessWorkflowApprovalPage.fields.triggersValidationModeTextField,
      competenceApprovalModeType);
    I.pressKey('Enter');
    // Save changes
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  editApprovalTriggers(
    existingApprovalTriggerName,
    approvalTriggerURL,
    editApprovalTriggerName,
    editApprovalTriggerBWRule,
    approvalTriggerEvaluationValue,
  ) {
    // Check if Approval Trigger exist
    I.seeElement(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(existingApprovalTriggerName).first());
    // Access the Approval Trigger URL
    I.amOnPage(approvalTriggerURL);
    // FIXME
    I.wait(3);
    I.waitForElement(businessWorkflowApprovalPage.fields.approvalTriggersNameField,
      constants.SHORT_WAIT);
    // Change the Add Approval Trigger form
    I.clearField(businessWorkflowApprovalPage.fields.approvalTriggersNameField);
    I.fillField(businessWorkflowApprovalPage.fields.approvalTriggersNameField,
      editApprovalTriggerName);
    // Change Entity Business Workflow Rule
    I.click(businessWorkflowApprovalPage.buttons.approvalTriggersBWRuleButton);
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWRuleLocate).withText(editApprovalTriggerBWRule));
    // Change Required Evaluation Value
    I.click(businessWorkflowApprovalPage.fields.requiredEvaluationValueField);
    I.click(locate('p').inside('.dx-popup-content').withText(approvalTriggerEvaluationValue));
    // Save changes
    I.click(commonPage.buttons.saveAndCloseButton);
  },

  deleteApprovalTriggers(editApprovalTriggerName) {
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.approvalBCLocate).withText(editApprovalTriggerName).first());
    I.click(businessWorkflowApprovalPage.buttons.deleteApprovalTriggerButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.saveAndCloseButton);
  },

  deleteApprovalRule(editApprovalRuleName) {
    I.click(locate('td').inside(businessWorkflowApprovalPage.locate.entityBWTransitionLocate).withText(editApprovalRuleName).first());
    I.click(businessWorkflowApprovalPage.buttons.deleteApprovalRuleButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },
};
