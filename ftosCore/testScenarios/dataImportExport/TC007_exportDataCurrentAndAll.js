// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dataImportExport/exportDataCurrentAndAll');
// Pages
const dataImExPage = require('~pages/dataImportExportPage');
const commonPage = require('~pages/commonPage');
// Verify
const fileVerify = require('~actions/files/fileVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');

const I = actor();

// Author Sebastian Draghici
// AT-236
Feature('Data Import/Export');

Scenario('Data export - Current and All', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 3 Click on "5" -> in order to display only 5 results per page
  commonActions.clickResultsPerPageInTable('5');
  // 4 Click on "Export" icon -> Export current set
  I.handleDownloads();
  commonActions.clickSidebarButton('Export');
  commonActions.clickExportCurrentDataButton(data.toolbarExportCurrent);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  I.amInPath('output/downloads');
  // 5 Open your generated file (.xls)
  let absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  // 6 Check if only 5 results were exported
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 7 Click on "Export" icon -> Export all data set
  I.handleDownloads();
  commonActions.clickExportAllDataButton(data.toolbarExportAll);
  I.amInPath('output/downloads');
  // 8 Open your generated file (.xls)
  absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  // 9 Check if 11 results were exported
  commonActions.clickResultsPerPageInTable('20');
  // 10 Check column name and order
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 11 Logoff
  await commonActions.logoutFromApp();
});
