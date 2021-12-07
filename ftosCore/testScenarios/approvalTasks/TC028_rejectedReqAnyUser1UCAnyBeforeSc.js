// Actions
const commonActions = require('~actions/commonActions');
const approvalTaskActions = require('~actions/approvalTasksActions');
// Data
const commonData = require('~data/approvalTasks/commonApprovalTask_data');
const specificData = require('~data/approvalTasks/approvedReqAnyUser1UCAny_data');
// Verify
const approvalTaskVerify = require('~actions/approvalTasksVerify');

// Author Ionut Daniel Mindrescu

Feature('Approval Tasks ');

Scenario('Reject a request with IsAdvisory=True, Competence Approval Mode=Any with 2 Users/1 User Competence which has a Before Script.', async () => {
  // Create the Approval Task:
  // Login in Portal
  await commonActions.loginInApp(commonData.urlPortal, commonData.username, commonData.password);
  // Access an Entity and insert record
  commonActions.accessDirectUrl(specificData.entityUrl);
  approvalTaskActions.insertRecord(specificData.recordNameTC028);
  // Send record to Approval and verify it
  approvalTaskActions.sendRecordToApproval();
  approvalTaskVerify.verifyStatusChange(commonData.recordApprovalStatus);
  // Logout
  await commonActions.logoutFromApp();
  // Checked the Approval Tasks created and change the Approval status accordingly:
  // Login as Approval User 1
  await commonActions.loginInApp(commonData.urlPortal, specificData.approvalUsername1, commonData.password);
  // Access the Approval Tasks
  commonActions.accessDirectUrl(commonData.approvalTaskUrl);
  // Verify approval task creation with no user assigned
  approvalTaskVerify.verifySingleApprovalTaskCreationAdvisoryFalse(
    specificData.recordNameTC028,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
    commonData.emptyAssignedUser,
  );
  // Open Approval Task using the Subject Type, since no user is assigned
  approvalTaskActions.openApprovalTask(specificData.subjectType, specificData.recordNameTC028);
  // Approve the request as User 1
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
  approvalTaskVerify.verifyRecordAfterApproval(commonData.recordCurrentStatusRejected);
  // Navigate and verify that the script was executed
  commonActions.accessDirectUrl(specificData.recordRejectedBeforeScript);
  approvalTaskVerify.verifyScriptExecution();
  // Logout
  await commonActions.logoutFromApp();
});
