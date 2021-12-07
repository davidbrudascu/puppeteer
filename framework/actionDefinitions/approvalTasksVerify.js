const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const approvalTasksPage = require('~pages/approvalTasksPage.js');
// Verify
const commonVerify = require('~actions/commonVerify.js');

module.exports = {

  verifySingleApprovalTaskCreationAdvisoryTrue(
    recordName,
    approvalUsername1,
    competenceLevel1,
    taskStatusActive,
  ) {
    // Check if table is visible
    // using a LONG_WAIT constant because is the first page accessed after login
    I.waitForElement(approvalTasksPage.locate.locateTable, constants.LONG_WAIT);
    // Verify that Approval Task is created for certain user
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, recordName);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, approvalUsername1);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, competenceLevel1);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, taskStatusActive);
  },

  verifySingleApprovalTaskCreationAdvisoryFalse(
    recordName,
    competenceLevel1,
    taskStatusActive,
    emptyAssignedUser,
  ) {
    // Check if table is visible
    // using a LONG_WAIT constant because is the first page accessed after login
    I.waitForElement(approvalTasksPage.locate.locateTable, constants.LONG_WAIT);
    // Verify that Approval Task is created but no assigned user
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, recordName);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, competenceLevel1);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, taskStatusActive);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, emptyAssignedUser);
  },

  verifyMultipleApprovalTaskCreation1UC(
    recordName,
    approvalUsername1,
    approvalUsername2,
    competenceLevel1,
    taskStatusActive,
  ) {
    // Check if table is visible
    // using a LONG_WAIT constant because is the first page accessed after login
    I.waitForElement(approvalTasksPage.locate.locateTable, constants.LONG_WAIT);
    // Verify that Approval Tasks are created for each user
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, recordName);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, approvalUsername1);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, approvalUsername2);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, competenceLevel1);
    commonVerify.verifyValueExistsInTable(approvalTasksPage.locate.locateTable, taskStatusActive);
  },

  verifyTaskAfterStatusChange(
    taskStatusInactive,
    transitionMessage,
    approvalDecision,
    approvalUsername,
  ) {
    I.waitForElement(locate('p').withAttr({ id: approvalTasksPage.locate.approvalTasksTaskStatus }).withText(taskStatusInactive), constants.SHORT_WAIT);
    I.seeElement(locate('p').withAttr({ id: approvalTasksPage.locate.approvalTasksTaskStatus }).withText(taskStatusInactive));
    I.seeElement(locate('span').withAttr({ id: approvalTasksPage.locate.approvalTasksMessageTransition }).withText(transitionMessage));
    I.seeElement(locate('b').withAttr({ id: approvalTasksPage.locate.approvalTasksApprovalDecision }).withText(approvalDecision));
    I.seeElement(locate('b').withAttr({ id: approvalTasksPage.locate.approvalTasksApprovalUser }).withText(approvalUsername));
  },

  verifyTaskAfterRelatedRejected(taskStatusInactive, rejectTransitionMessage) {
    I.waitForElement(locate('p').withAttr({ id: approvalTasksPage.locate.approvalTasksTaskStatus }).withText(taskStatusInactive), constants.SHORT_WAIT);
    I.seeElement(locate('p').withAttr({ id: approvalTasksPage.locate.approvalTasksTaskStatus }).withText(taskStatusInactive));
    I.seeElement(locate('span').withAttr({ id: approvalTasksPage.locate.rejectTaskCancelled }).withText(rejectTransitionMessage));
  },

  verifyPendingApprovalTask(approvalUsername2) {
    commonVerify.verifyValueExistsInTable(
      approvalTasksPage.locate.relatedApprovalTaskResults,
      approvalUsername2,
    );
  },

  verifyRecordAfterApproval(recordCurrentStatusAccepted) {
    I.waitForElement(locate('span').withText(recordCurrentStatusAccepted).inside(approvalTasksPage.locate.currentRecordBusinessStatus), constants.SHORT_WAIT);
    I.seeElement(locate('span').withText(recordCurrentStatusAccepted).inside(approvalTasksPage.locate.currentRecordBusinessStatus));
  },

  verifyStatusChange(recordApprovalStatus) {
    I.waitForElement(locate('span').withText(recordApprovalStatus).inside(approvalTasksPage.locate.currentRecordBusinessStatus), constants.SHORT_WAIT);
    I.seeElement(locate('span').withText(recordApprovalStatus).inside(approvalTasksPage.locate.currentRecordBusinessStatus));
  },

  verifyScriptExecution() {
    I.waitForElement(approvalTasksPage.locate.scriptSuccessCheckbox, constants.SHORT_WAIT);
    I.seeElement(approvalTasksPage.locate.scriptSuccessCheckbox);
  },

  verifyScriptNonExecution() {
    I.waitForElement(approvalTasksPage.locate.scriptFailCheckbox, constants.SHORT_WAIT);
    I.seeElement(approvalTasksPage.locate.scriptFailCheckbox);
  },

  async verifyApprovalErrorScript(approvalErrorScript) {
    I.waitForElement(approvalTasksPage.fields.approvalErrorField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(
        approvalTasksPage.fields.approvalErrorField,
        approvalErrorScript,
    );
  },
};
