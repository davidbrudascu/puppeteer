// Actions
const commonActions = require('~actions/commonActions');
const reportActions = require('~actions/reportActions');
// Data
const data = require('~data/reports/TC003_CreateGeneralCustomReport');
// Verify
const commonVerify = require('~actions/commonVerify');
const reportVerify = require('~actions/reportVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Reports');

Scenario('User can create a general custom report for entity.', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.reportListURL);
  // create general custom report
  reportActions.createGeneralCustomReport(
      data.clickToInsert,
      data.reportNameField,
      data.reportDisplayNameField
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // add custom report item
  reportActions.addCustomReportItems(data.reportStartDate, data.reportEndDate, data.reportPath, data.reportItemCustomName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  const getId = await commonActions.getIdForYourEntity(data.idReport);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalDocReportURL + getId);
  // verify in portal that an error is displayed
  reportVerify.verifyReportErrorInPortal();
  await commonActions.logoutFromApp();
});
