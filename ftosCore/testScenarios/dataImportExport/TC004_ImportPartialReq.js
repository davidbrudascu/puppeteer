// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const fileActions = require('~actions/files/fileActions');
// Data
const data = require('~data/dataImportExport/importPartialReq');
// Pages
const commonPage = require('~pages/commonPage');
const dataImExPage = require('~pages/dataImportExportPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const fileVerify = require('~actions/files/fileVerify');

// Author Sebastian Draghici
// AT-235
Feature('Data Import/Export');

Scenario('Data import - Partial Req', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // ImportTemplate - Req.xlsx
  const relExcelFilePath = '../ftosCore/testData/dataImportExport/ImportTemplate - Req.xlsx';
  // Expected Data Import logs
  const dataImportLogs = [
    data.dataLogCannotInsert1,
    data.dataLogCannotInsert2,
    data.dataLogInserted2,
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Go to Import Template
  commonActions.accessDirectUrl(data.urlImportTemplate);
  // 3 Access your template "AT_ImportReq"
  commonActions.doubleClickValueFromTable(dataImExPage.selector.dataImExTemplatesTable,
    data.existingTemplate);
  // 4 Go to List of Data Imports section and click on "Insert" button
  fileVerify.verifyEmptyDataTable();
  fileActions.insertListOfDataImports();
  // 5 Add your file
  fileActions.attachFileToInput(dataImExPage.selector.dataImExFileUpload, relExcelFilePath);
  // 6 Uncheck "Roll Back"
  await commonActions.tickCheckbox(dataImExPage.checkbox.dataImExRollBackCheckbox,
    constants.CHECKMARK_UNTICKED);
  // 7 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8 Click on "Start Import"
  // 9 Wait until the log is generated
  // 10 Check your log message
  await fileActions.startDataImport();
  fileVerify.verifyDataImportLogs(2, dataImportLogs);
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13 Navigate to you entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 14 Check if you have 2 results
  commonVerify.verifyValueExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqName1);
  commonVerify.verifyValueExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqCode1);
  commonVerify.verifyValueExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqName2);
  commonVerify.verifyValueExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqCode2);
  // Don't have 3 4 5 6
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqName3);
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqName4);
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqCode4);
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqName5);
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqCode5);
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqName6);
  commonVerify.verifyValueDontExistsInTable(dataImExPage.selector.dataImExImportEntityTable,
    data.dataImExReqCode6);
  // 15 Logoff
  await commonActions.logoutFromApp();
});
