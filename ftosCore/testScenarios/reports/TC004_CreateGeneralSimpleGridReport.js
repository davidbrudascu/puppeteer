// Actions
const commonActions = require('~actions/commonActions');
const reportActions = require('~actions/reportActions');
// Data
const data = require('~data/reports/TC004_CreateGeneralSimpleGridReport');
// Verify
const commonVerify = require('~actions/commonVerify');
const reportVerify = require('~actions/reportVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Reports');

Scenario('User can create a general simple grid report for entity.', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.reportListURL);
  // create general simple grid report
  reportActions.createGeneralSimpleGridReport(data.clickToInsert, data.reportNameField, data.reportDisplayNameField);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // add general grid report item
  reportActions.addGeneralGridReportItems(data.reportStartDate, data.reportEndDate, data.entityDataSource, data.reportItemGridName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  const getId = await commonActions.getIdForYourEntity(data.idReport);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalDocReportURL + getId);
  // verify that show button is displayed
  reportVerify.verifyGeneralSimpleGridReport();
  await commonActions.logoutFromApp();
});
