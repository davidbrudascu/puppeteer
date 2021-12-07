// Actions
const commonActions = require('~actions/commonActions');
const reportActions = require('~actions/reportActions');
// Data
const data = require('~data/reports/TC001_CreateReportEntityDocument');
// Verify
const commonVerify = require('~actions/commonVerify');
const reportVerify = require('~actions/reportVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Reports');

Scenario('User can create a document report for entity.', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.reportListURL);
  // create a custom entity report
  reportActions.createReportEntityDocument(
    data.clickToInsert,
    data.reportNameField,
    data.reportDisplayNameField,
    data.entityCreateDoc,
    data.reportFieldName,
    data.reportFileName,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // add report item
  reportActions.addReportItems(
    data.reportStartDate,
    data.reportEndDate,
    data.reportDocumentName,
    data.reportItemDocumentName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.portalDocReportURL);
  // verify if action button is display in portal
  reportVerify.verifyReportEntityDocument(data.reportDisplayNameField);
  await commonActions.logoutFromApp();
});
