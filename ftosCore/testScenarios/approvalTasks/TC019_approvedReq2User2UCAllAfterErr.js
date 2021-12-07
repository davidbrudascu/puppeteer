// Actions
const commonActions = require('~actions/commonActions');
const approvalTaskActions = require('~actions/approvalTasksActions');
// Data
const commonData = require('~data/approvalTasks/commonApprovalTask_data');
const specificData = require('~data/approvalTasks/approvedReq2User2UCAll_data');
// Verify
const approvalTaskVerify = require('~actions/approvalTasksVerify');

// Author Ionut Daniel Mindrescu

Feature('Approval Tasks ');

Scenario('Approve a request with IsAdvisory=True, Competence Approval Mode=All with 2 Users/2 User Competence which has an After Script Error.', async () => {
  // Create the Approval Task:
  // Login in Portal
  await commonActions.loginInApp(commonData.urlPortal, commonData.username, commonData.password);
  // Access an Entity and insert record
  commonActions.accessDirectUrl(specificData.entityUrl);
  approvalTaskActions.insertRecord(specificData.recordNameTC019);
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
  // Verify approval task creation for User 1 from User Competence 1
  approvalTaskVerify.verifySingleApprovalTaskCreationAdvisoryTrue(
    specificData.recordNameTC019,
    specificData.approvalUsername1,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
  );
  // Logout
  await commonActions.logoutFromApp();
  // Checked the Approval Tasks created and change the Approval status accordingly:
  // Login as Approval User 2
  await commonActions.loginInApp(commonData.urlPortal, specificData.approvalUsername2, commonData.password);
  // Access the Approval Tasks
  commonActions.accessDirectUrl(commonData.approvalTaskUrl);
  // Verify approval task creation for User 1 from User Competence 1, logged in as User 2
  approvalTaskVerify.verifySingleApprovalTaskCreationAdvisoryTrue(
    specificData.recordNameTC019,
    specificData.approvalUsername1,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
  );
  // Open Approval Task for User 1 as User 2
  approvalTaskActions.openApprovalTask(specificData.approvalUsername1, specificData.recordNameTC019);
  // Approve the request as User 2
  approvalTaskActions.approveTaskAction(commonData.popupDialogYes);
  // Verify the task after approval
  approvalTaskVerify.verifyTaskAfterStatusChange(
    commonData.taskStatusInactive,
    commonData.transitionMessage,
    commonData.approvalDecisionApproved,
    specificData.approvalUsername2,
  );
  // Navigate and Verify the record status after approval error. The record should be send in previous status
  approvalTaskActions.navigateToRecordAfterApproval();
  approvalTaskVerify.verifyRecordAfterApproval(commonData.recordCurrentStatusNeedMoreInfo);
  // Navigate to record Business Workflow Transition
  approvalTaskActions.navigateToRecordBWTransition(commonData.username);
  // Verify that the Approval Error box has the error comment
  await approvalTaskVerify.verifyApprovalErrorScript(commonData.approvalErrorScript);
  // Logout
  await commonActions.logoutFromApp();
});
