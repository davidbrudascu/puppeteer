// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dataImportExport/exportDataRelationship');
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

Scenario('Data export - Relationship', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 3 Access your record (Parent1)
  commonActions.doubleClickValueFromTable(dataImExPage.selector.dataImExImportEntityTable,
    data.entityRecord);
  // 4 Check if your language is EN
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 5 Click on Export -> Export all set
  I.handleDownloads();
  commonActions.clickToolbarButton('Export');
  commonActions.clickExportAllDataButton(data.toolbarExportAll);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  I.amInPath('output/downloads');
  // 6 Check your exported file (contains 11 results)
  commonActions.clickResultsPerPageInTable('20');
  let absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 7 Click on 5 results per page
  commonActions.clickResultsPerPageInTable('5');
  // 8 Click on Export -> Export current set
  I.handleDownloads();
  commonActions.clickToolbarButton('Export');
  commonActions.clickExportCurrentDataButton(data.toolbarExportCurrent);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  I.amInPath('output/downloads');
  // 9 Check your exported file (contains 5 results)
  absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 10 Switch on RO language
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 11 Search by Code: AT1
  commonActions.searchByColumnValueNotEqualsFilterInTable(dataImExPage.selector.dataImExRelLookupTable,
    data.dataImExCodeColumn, data.dataImExCode);
  // 12 Click on Export -> current set
  I.handleDownloads();
  commonActions.clickToolbarButton('Exporta');
  commonActions.clickExportCurrentDataButton(data.toolbarExportaSetulCurent);
  I.amInPath('output/downloads');
  // 13 Check your exported file (contains 2 results)
  absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 14 Logoff
  await commonActions.logoutFromApp();
});
