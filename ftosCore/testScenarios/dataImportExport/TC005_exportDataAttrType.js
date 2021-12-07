// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dataImportExport/exportDataAttrType');
// Pages
const dataImExPage = require('~pages/dataImportExportPage');
// Verify
const fileVerify = require('~actions/files/fileVerify');

const I = actor();

// Author Sebastian Draghici
// AT-236
Feature('Data Import/Export');

Scenario('BUG - DPA-20765: Data export - Attribute Type', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 3 Click on "Export" icon -> Export current set
  I.handleDownloads();
  commonActions.clickSidebarButton('Export');
  commonActions.clickExportCurrentDataButton(data.toolbarExportCurrent);
  I.amInPath('output/downloads');
  // 4 Open your generated file (.xls)
  let absExcelFilePath = `${process.cwd()}/config/output/downloads/${await I.grabFileNames()}`;
  I.say(absExcelFilePath);
  // 5 Check column name and order
  // 6 Check all cell values
  await fileVerify.verifyValuesInTableFromExcelFile(dataImExPage.selector.dataImExImportEntityTable,
    absExcelFilePath);
  // 7 Logoff
  await commonActions.logoutFromApp();
});
