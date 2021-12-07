// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const fileActions = require('~actions/files/fileActions');
// Data
const data = require('~data/dataImportExport/importErrorLimitWrongLkp');
// Pages
const commonPage = require('~pages/commonPage');
const dataImExPage = require('~pages/dataImportExportPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const fileVerify = require('~actions/files/fileVerify');

// Author Sebastian Draghici
// AT-235
Feature('Data Import/Export');

Scenario('Data import - Error, Limit or Wrong Lookup', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // ImportTemplate - Limit.xlsx
  const relExcelFilePath1 = '../ftosCore/testData/dataImportExport/ImportTemplate - Limit.xlsx';
  // ImportTemplate - Wrong Lookup.xlsx
  const relExcelFilePath2 = '../ftosCore/testData/dataImportExport/ImportTemplate - Wrong Lookup.xlsx';
  // Expected Data Import logs
  const dataImportLogs = [
    data.dataLogInserted0,
    data.dataLogTruncated,
  ];
  const dataImportLogs2 = [
    data.dataLogInserted0_2,
    data.dataLogWrongLkp,
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Go to Import Template
  commonActions.accessDirectUrl(data.urlImportTemplate);
  // 3 Access your template "AT_ImportLimit"
  commonActions.doubleClickValueFromTable(dataImExPage.selector.dataImExTemplatesTable,
    data.existingTemplate);
  // 4 Go to List of Data Imports section and click on "Insert" button
  fileVerify.verifyEmptyDataTable();
  fileActions.insertListOfDataImports();
  // 5 Add your file
  fileActions.attachFileToInput(dataImExPage.selector.dataImExFileUpload, relExcelFilePath1);
  // 6 Check "Roll Back"
  await commonActions.tickCheckbox(dataImExPage.checkbox.dataImExRollBackCheckbox,
    constants.CHECKMARK_TICKED);
  // 7 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8 Click on "Start Import"
  // 9 Wait until the log is generated
  // 10 Check your log message
  await fileActions.startDataImport();
  fileVerify.verifyDataImportLogs(2, dataImportLogs);
  // 11 Navigate again to "Go to Import Template"…Main#/entity/dataimport/list""
  commonActions.accessDirectUrl(data.urlImportTemplate);
  // 12 Access your template "AT_ImportWrongLkp"
  commonActions.doubleClickValueFromTable(dataImExPage.selector.dataImExTemplatesTable,
    data.existingTemplate2);
  fileVerify.verifyEmptyDataTable();
  // 13 Go to List of Data Imports section and click on "Insert" button
  fileActions.insertListOfDataImports();
  // 14 Add your file
  fileActions.attachFileToInput(dataImExPage.selector.dataImExFileUpload, relExcelFilePath2);
  // 15 Check "Roll Back"
  await commonActions.tickCheckbox(dataImExPage.checkbox.dataImExRollBackCheckbox,
    constants.CHECKMARK_TICKED);
  // 16 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 17 Click on "Start Import"
  // 18 Wait until the log is generated
  // 19 Check your log message
  await fileActions.startDataImport();
  fileVerify.verifyDataImportLogs(2, dataImportLogs2);
  // 20 Logoff
  await commonActions.logoutFromApp();
  // 21 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 22 Navigate to you entity (AT_ImportLimit)
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 23 Check if you have 0 results
  fileVerify.verifyEmptyDataTable();
  // 24 Navigate to you entity (AT_ImportWrongLkp)
  commonActions.accessDirectUrl(data.urlPortalEntity2);
  // 25 Check if you have 0 results
  fileVerify.verifyEmptyDataTable();
  // 26 Logoff
  await commonActions.logoutFromApp();
});
