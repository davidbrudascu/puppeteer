// Actions
const commonActions = require('~actions/commonActions');
const reportActions = require('~actions/reportActions');
// Data
const data = require('~data/reports/TC002_CreateReportEntityCustom');
// Verify
const commonVerify = require('~actions/commonVerify');
const reportVerify = require('~actions/reportVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Reports');

Scenario('User can create a custom report for entity.', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.reportListURL);
  // create a custom entity report
  reportActions.createReportEntityCustom(
      data.clickToInsert,
      data.reportNameField,
      data.reportDisplayNameField,
      data.entityCreateDoc,
      data.reportFieldName,
      data.reportFileName
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // add custom report item
  reportActions.addCustomReportItems(data.reportStartDate, data.reportEndDate, data.reportPath, data.reportItemCustomName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalDocReportURL);
  // Verify that your report occurs correctly in portal
  reportVerify.verifyReportEntityCustom(data.reportDisplayNameField)
  await commonActions.logoutFromApp();
});
