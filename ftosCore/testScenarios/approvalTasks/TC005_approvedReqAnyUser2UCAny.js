// Actions
const commonActions = require('~actions/commonActions');
const approvalTaskActions = require('~actions/approvalTasksActions');
// Data
const commonData = require('~data/approvalTasks/commonApprovalTask_data');
const specificData = require('~data/approvalTasks/approvedReqAnyUser2UCAny_data');
// Verify
const approvalTaskVerify = require('~actions/approvalTasksVerify');

// Author Ionut Daniel Mindrescu

Feature('Approval Tasks ');

Scenario('Approve a request with IsAdvisory=False, Competence Approval Mode=Any with 2 Users/2 User Competence.', async () => {
  // Create the Approval Task:
  // Login in Portal
  await commonActions.loginInApp(commonData.urlPortal, commonData.username, commonData.password);
  // Access an Entity and insert record
  commonActions.accessDirectUrl(specificData.entityUrl);
  approvalTaskActions.insertRecord(specificData.recordNameTC005);
  // Send record to Approval and verify it
  approvalTaskActions.sendRecordToApproval();
  approvalTaskVerify.verifyStatusChange(commonData.recordApprovalStatus);
  // Logout
  await commonActions.logoutFromApp();
  // Checked the Approval Tasks created
  // Login as Approval User 1
  await commonActions.loginInApp(commonData.urlPortal, specificData.approvalUsername1, commonData.password);
  // Access the Approval Tasks
  commonActions.accessDirectUrl(commonData.approvalTaskUrl);
  // Verify approval task creation with no assigned user
  approvalTaskVerify.verifySingleApprovalTaskCreationAdvisoryFalse(
    specificData.recordNameTC005,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
    commonData.emptyAssignedUser,
  );
  // Logout
  await commonActions.logoutFromApp();
  // Checked the Approval Tasks created and change the Approval status accordingly with User 2:
  // Login as Approval User 2
  await commonActions.loginInApp(commonData.urlPortal, specificData.approvalUsername2, commonData.password);
  // Access the Approval Tasks
  commonActions.accessDirectUrl(commonData.approvalTaskUrl);
  // Verify approval task logged in as User 2
  approvalTaskVerify.verifySingleApprovalTaskCreationAdvisoryFalse(
    specificData.recordNameTC005,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
    commonData.emptyAssignedUser,
  );
  // Open Approval Task
  approvalTaskActions.openApprovalTask(specificData.subjectType, specificData.recordNameTC005);
  // Approve the request as User 2
  approvalTaskActions.approveTaskAction(commonData.popupDialogYes);
  // Verify the task after approval
  approvalTaskVerify.verifyTaskAfterStatusChange(
    commonData.taskStatusInactive,
    commonData.transitionMessage,
    commonData.approvalDecisionApproved,
    specificData.approvalUsername2,
  );
  // Navigate and Verify the record status after approval
  approvalTaskActions.navigateToRecordAfterApproval();
  approvalTaskVerify.verifyRecordAfterApproval(commonData.recordCurrentStatusAccepted);
  // Logout
  await commonActions.logoutFromApp();
});
