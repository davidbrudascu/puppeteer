// Actions
const commonActions = require('~actions/commonActions');
const reportActions = require('~actions/reportActions');
// Data
const data = require('~data/reports/TC005_EditDeleteReport');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Reports');

Scenario('User can edit and delete report.', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.reportEditURL);
  // edit a report item
  reportActions.editReportItem(data.reportEndDate, data.reportStartDate, data.reportItemEditName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // delete a report item
  reportActions.deleteReportItems(data.reportItemEditName);
  // update report
  reportActions.updateReport(data.reportNameFieldUpdated, data.reportDisplayNameFieldUpdated);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.reportListURL);
  // delete report
  reportActions.deleteReport(data.reportNameFieldUpdated, data.clickToDelete);
  await commonActions.logoutFromApp();
});
