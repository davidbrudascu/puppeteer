// Actions
const commonActions = require('~actions/commonActions');
const approvalTaskActions = require('~actions/approvalTasksActions');
// Data
const commonData = require('~data/approvalTasks/commonApprovalTask_data');
const specificData = require('~data/approvalTasks/approvedReq2User1UCAll_data');
// Verify
const approvalTaskVerify = require('~actions/approvalTasksVerify');

// Author Ionut Daniel Mindrescu

Feature('Approval Tasks ');

Scenario('Return (Need More Info) a request with IsAdvisory=True, Competence Approval Mode=All with 2 Users/1 User Competence.', async () => {
  // Create the Approval Task:
  // Login in Portal
  await commonActions.loginInApp(commonData.urlPortal, commonData.username, commonData.password);
  // Access an Entity and insert record
  commonActions.accessDirectUrl(specificData.entityUrl);
  approvalTaskActions.insertRecord(specificData.recordNameTC037);
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
  // Verify approval task creation
  approvalTaskVerify.verifyMultipleApprovalTaskCreation1UC(
    specificData.recordNameTC037,
    specificData.approvalUsername1,
    specificData.approvalUsername2,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
  );
  // Open Approval Task for User 1
  approvalTaskActions.openApprovalTask(specificData.approvalUsername1, specificData.recordNameTC037);
  // Approve the request as User 1
  approvalTaskActions.needMoreInfoTaskAction(commonData.popupDialogYes);
  // Verify the task after approval
  approvalTaskVerify.verifyTaskAfterStatusChange(
    commonData.taskStatusInactive,
    commonData.transitionMessage,
    commonData.approvalDecisionNMI,
    specificData.approvalUsername1,
  );
  // Verify that related task is pending
  approvalTaskVerify.verifyPendingApprovalTask(specificData.approvalUsername2);
  // Logout
  await commonActions.logoutFromApp();
  // Approve the ask as User 2:
  // Login as Approval User 2
  await commonActions.loginInApp(commonData.urlPortal, specificData.approvalUsername2, commonData.password);
  // Access the Approval Tasks
  commonActions.accessDirectUrl(commonData.approvalTaskUrl);
  // Open Approval Task for User 2
  approvalTaskActions.openApprovalTask(specificData.approvalUsername2, specificData.recordNameTC037);
  // Verify that the task was cancelled
  approvalTaskVerify.verifyTaskAfterRelatedRejected(
    commonData.taskStatusInactive,
    commonData.rejectTransitionMessage,
  );
  // Navigate and Verify the record status after approval
  approvalTaskActions.navigateToRecordAfterApproval();
  approvalTaskVerify.verifyRecordAfterApproval(commonData.recordCurrentStatusNeedMoreInfo);
  // Logout
  await commonActions.logoutFromApp();
});
