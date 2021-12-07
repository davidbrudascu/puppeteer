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

Scenario('Approve a request with IsAdvisory=True, Competence Approval Mode=All with 1 User/1 User Competence which has an After Script.', async () => {
  // Create the Approval Task:
  // Login in Portal
  await commonActions.loginInApp(commonData.urlPortal, commonData.username, commonData.password);
  // Access an Entity and insert record
  commonActions.accessDirectUrl(specificData.entityUrl);
  approvalTaskActions.insertRecord(specificData.recordNameTC011);
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
    specificData.recordNameTC011,
    specificData.approvalUsername1,
    commonData.competenceLevel1,
    commonData.taskStatusActive,
  );
  // Open Approval Task
  approvalTaskActions.openApprovalTask(specificData.approvalUsername1, specificData.recordNameTC011);
  // Approve the request
  approvalTaskActions.approveTaskAction(commonData.popupDialogYes);
  // Verify the task after approval
  approvalTaskVerify.verifyTaskAfterStatusChange(
    commonData.taskStatusInactive,
    commonData.transitionMessage,
    commonData.approvalDecisionApproved,
    specificData.approvalUsername1,
  );
  // Navigate and Verify the record status after approval
  approvalTaskActions.navigateToRecordAfterApproval();
  approvalTaskVerify.verifyRecordAfterApproval(commonData.recordCurrentStatusAccepted);
  // Navigate and verify that the script was executed
  commonActions.accessDirectUrl(specificData.recordApprovedAfterScript);
  approvalTaskVerify.verifyScriptExecution();
  // Logout
  await commonActions.logoutFromApp();
});
