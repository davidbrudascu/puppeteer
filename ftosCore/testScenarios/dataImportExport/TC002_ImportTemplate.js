// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const fileActions = require('~actions/files/fileActions');
// Data
const data = require('~data/dataImportExport/importTemplate');
// Pages
const commonPage = require('~pages/commonPage');
const dataImExPage = require('~pages/dataImportExportPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const fileVerify = require('~actions/files/fileVerify');


// Author Sebastian Draghici
// AT-235
Feature('Data Import/Export');

Scenario('Data import - Import Template', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // ImportTemplate.xlsx
  const relExcelFilePath = '../ftosCore/testData/dataImportExport/ImportTemplate.xlsx';
  const absExcelFilePath = `${process.cwd()}/ftosCore/testData/dataImportExport/ImportTemplate.xlsx`;
  // Expected Data Import logs
  const dataImportLogs = [
    data.dataLogInserted3,
  ];
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Go to Import Template
  commonActions.accessDirectUrl(data.urlImportTemplate);
  // 3 Access your template "AT_ImportTemplate"
  commonActions.doubleClickValueFromTable(dataImExPage.selector.dataImExTemplatesTable,
    data.existingTemplate);
  // 4 Go to List of Data Imports section and click on "Insert" button
  fileVerify.verifyEmptyDataTable();
  fileActions.insertListOfDataImports();
  // 5 Add your file
  fileActions.attachFileToInput(dataImExPage.selector.dataImExFileUpload, relExcelFilePath);
  // 6 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Click on "Start Import"
  // 8 Wait until the log is generated
  await fileActions.startDataImport();
  fileVerify.verifyDataImportLogs(1, dataImportLogs);
  // 9 Logoff
  await commonActions.logoutFromApp();
  // 10 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 11 Navigate to you entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 12 Check all value from table based on imported excel
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 13 Logoff
  await commonActions.logoutFromApp();
});
