const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const approvalTasksPage = require('~pages/approvalTasksPage');
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {

  approveTaskAction(popupDialogYes) {
    // check if page is fully loaded by using a LONG_WAIT constant
    I.waitForElement(approvalTasksPage.locate.locateRelatedTable, constants.LONG_WAIT);
    // check if button is visible
    I.waitForElement(approvalTasksPage.buttons.approveButton, constants.SHORT_WAIT);
    I.click(approvalTasksPage.buttons.approveButton);
    commonActions.clickPopupDialog(popupDialogYes);
    // check for success toast message
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  rejectTaskAction(popupDialogYes) {
    // check if page is fully loaded by using a LONG_WAIT constant
    I.waitForElement(approvalTasksPage.locate.locateRelatedTable, constants.LONG_WAIT);
    // check if button is visible
    I.waitForElement(approvalTasksPage.buttons.rejectButton, constants.SHORT_WAIT);
    I.click(approvalTasksPage.buttons.rejectButton);
    commonActions.clickPopupDialog(popupDialogYes);
    // check for success toast message
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  needMoreInfoTaskAction(popupDialogYes) {
    // check if page is fully loaded by using a LONG_WAIT constant
    I.waitForElement(approvalTasksPage.locate.locateRelatedTable, constants.LONG_WAIT);
    // check if button is visible
    I.waitForElement(approvalTasksPage.buttons.needMoreInfoButton, constants.SHORT_WAIT);
    I.click(approvalTasksPage.buttons.needMoreInfoButton);
    commonActions.clickPopupDialog(popupDialogYes);
    // check for success toast message
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  navigateToRecordAfterApproval() {
    I.click(approvalTasksPage.buttons.showMoreDetails);
  },

  insertRecord(recordName) {
    // using LONG_WAIT because is the first page after login
    I.waitForElement(approvalTasksPage.locate.insertButton, constants.LONG_WAIT);
    I.click(approvalTasksPage.locate.insertButton);
    I.waitForVisible(approvalTasksPage.fields.recordNameField, constants.SHORT_WAIT);
    I.click(approvalTasksPage.fields.recordNameField);
    I.fillField(approvalTasksPage.fields.recordNameField, recordName);
    I.click(approvalTasksPage.buttons.recordFinishButton);
  },

  sendRecordToApproval() {
    I.waitForVisible(approvalTasksPage.buttons.sendToApprovalButton, constants.SHORT_WAIT);
    I.click(approvalTasksPage.buttons.sendToApprovalButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  navigateToRecordBWTransition(username) {
    I.waitForVisible(approvalTasksPage.buttons.businessTransactionButton, constants.SHORT_WAIT);
    I.click(approvalTasksPage.buttons.businessTransactionButton);
    I.waitForVisible(approvalTasksPage.locate.locateTransitionTable, constants.SHORT_WAIT);
    commonActions.doubleClickValueFromTable(
      approvalTasksPage.locate.locateTransitionTable,
      username,
    );
  },

  openApprovalTask(approvalUsername1, recordName) {
    commonActions.fillInTextValueInInput(
      approvalTasksPage.locate.subjectToApprovalSearchBoxField,
      recordName,
    );
    I.waitForElement(approvalTasksPage.locate.tableLoadingAnimationVisible, constants.SHORT_WAIT);
    I.waitForElement(approvalTasksPage.locate.tableLoadingAnimationInvisible, constants.LONG_WAIT);
    commonActions.doubleClickValueFromTable(
      approvalTasksPage.locate.approvalTaskResults,
      approvalUsername1,
    );
  },
};
