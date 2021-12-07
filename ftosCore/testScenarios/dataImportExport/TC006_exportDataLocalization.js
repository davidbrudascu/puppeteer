// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dataImportExport/exportDataLocalization');
// Pages
const dataImExPage = require('~pages/dataImportExportPage');
// Verify
const fileVerify = require('~actions/files/fileVerify');

const I = actor();

// Author Sebastian Draghici
// AT-236
Feature('Data Import/Export');

Scenario('BUG DPA-20796: Data export - Localization', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 3 Switch to EN language
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 4 Click on "Export" icon -> Export current set
  I.handleDownloads();
  commonActions.clickSidebarButton('Export');
  commonActions.clickExportCurrentDataButton(data.toolbarExportCurrentEn);
  I.amInPath('output/downloads');
  // 5 Open your generated file (.xls)
  let absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  // 6 Check column name and order
  // 7 Check all cell values
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 8 Switch to RO language
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 9 Click on "Export" icon -> Export current set
  I.handleDownloads();
  commonActions.clickSidebarButton('Export');
  commonActions.clickExportCurrentDataButton(data.toolbarExportCurrentRo);
  I.amInPath('output/downloads');
  // 10 Open your generated file (.xls)
  absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  // 11 Check column name and order
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 12 Logoff
  await commonActions.logoutFromApp();
});
