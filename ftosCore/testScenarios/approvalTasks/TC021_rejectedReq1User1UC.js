// Actions
const commonActions = require('~actions/commonActions');
const approvalTaskActions = require('~actions/approvalTasksActions');
// Data
const commonData = require('~data/approvalTasks/commonApprovalTask_data');
const specificData = require('~data/approvalTasks/approvedReq1User1UC_data');
// Verify
const approvalTaskVerify = require('~actions/approvalTasksVerify');

// Author Ionut Daniel Mindrescu

Feature('Approval Tasks ');

Scenario('Reject a request with IsAdvisory=True, Competence Approval Mode=All with 1 User/1 User Competence.', async () => {
  // Create the Approval Task:
  // Login in Portal
  await commonActions.loginInApp(commonData.urlPortal, commonData.username, commonData.password);
  // Access an Entity and insert record
  commonActions.accessDirectUrl(specificData.entityUrl);
  approvalTaskActions.insertRecord(specificData.recordNameTC021);
  // Send record to Approval and verify it
  approvalTaskActions.sendRecordToApproval();
  approvalTaskVerify.verifyStatusChange(commonData.recordApprovalStatus);
  // Logout
  await commonActions.logoutFromApp();
  // Checked the Approval Task created and change the Approval status accordingly:
  // Login as Approval User
  await commonActions.loginInApp(commonData.urlPortal, specificData.approvalUsername1, commonData.password);
  // Access the Approval Tasks
  commonActions.accessDirectUrl(commonData.approvalTaskUrl);
  // Verify approval task creation
  approvalTaskVerify.verifySingleApprovalTaskCreationAdvisoryTrue(
    specificData.recordNameTC021,
    specificData.approvalUsername1,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
  );
  // Open Approval Task
  approvalTaskActions.openApprovalTask(specificData.approvalUsername1, specificData.recordNameTC021);
  // Approve the request
  approvalTaskActions.rejectTaskAction(commonData.popupDialogYes);
  // Verify the task after approval
  approvalTaskVerify.verifyTaskAfterStatusChange(
    commonData.taskStatusInactive,
    commonData.transitionMessage,
    commonData.approvalDecisionRejected,
    specificData.approvalUsername1,
  );
  // Navigate and Verify the record status after approval
  approvalTaskActions.navigateToRecordAfterApproval();
  approvalTaskVerify.verifyRecordAfterApproval(commonData.recordCurrentStatusAccepted);
  // Logout
  await commonActions.logoutFromApp();
});
