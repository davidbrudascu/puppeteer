// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const fileActions = require('~actions/files/fileActions');
// Data
const data = require('~data/dataImportExport/createTemplate');
// Pages
const commonPage = require('~pages/commonPage');
const dataImExPage = require('~pages/dataImportExportPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const fileVerify = require('~actions/files/fileVerify');

// Author Sebastian Draghici
// AT-235
Feature('Data Import/Export');

Scenario('Data import - Create Template', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // CreateTemplate.xlsx
  const relExcelFilePath = '../ftosCore/testData/dataImportExport/CreateTemplate.xlsx';
  // Expected Data Import logs
  const dataImportLogs = [
    data.dataLogInserted1,
  ];
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Go to Import Template
  commonActions.accessDirectUrl(data.urlImportTemplate);
  // 3 Click on "Inset" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 4 Fill in Name with: AT_CreateTemplate
  commonActions.fillInTextValueInInput(dataImExPage.fields.dataImExName, data.dataImExName);
  // 5 Select your entity: AT_CreateTemplate
  commonActions.clickLookupTableButton(dataImExPage.buttons.dataImExEntityPopupBtn);
  commonActions.fillInPopupLookupTableWithValue(dataImExPage.selector.dataImExEntityLookupTable,
    data.dataImExName);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 6 Click on Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Click on "Insert" button" from List of Data Import Attributes
  fileActions.insertImportAttribute();
  // 8 Select your attribute: Name
  commonActions.clickLookupTableButton(dataImExPage.buttons.dataImExAttributePopupBtn);
  commonActions.fillInPopupLookupTableWithValue(dataImExPage.selector.dataImExAttributeLookupTable,
    data.dataImExAttr1);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 9 Fill in Column Name with: Name
  commonActions.fillInTextValueInInput(dataImExPage.fields.dataImExColumnName,
    data.dataImExAttrColumnName1);
  // 10 Select "Plain Field"
  commonActions.fillInOptionSetValueInInput(dataImExPage.fields.dataImExImpAttrType,
    data.dataImExImpAttrTypeOpt1);
  // 11 Click on "Save and New" icon
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Select your attribute: AT_EntForImportLkpId
  commonActions.clickLookupTableButton(dataImExPage.buttons.dataImExAttributePopupBtn);
  commonActions.fillInPopupLookupTableWithValue(dataImExPage.selector.dataImExAttributeLookupTable,
    data.dataImExAttr2);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 13 Fill in Column Name with: Lookup
  commonActions.fillInTextValueInInput(dataImExPage.fields.dataImExColumnName,
    data.dataImExAttrColumnName2);
  // 14 Select "Lookup Field"
  commonActions.fillInOptionSetValueInInput(dataImExPage.fields.dataImExImpAttrType,
    data.dataImExImpAttrTypeOpt2);
  // Click on "Save and New" icon
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15 Select your attribute: OptionSet
  commonActions.clickLookupTableButton(dataImExPage.buttons.dataImExAttributePopupBtn);
  commonActions.fillInPopupLookupTableWithValue(dataImExPage.selector.dataImExAttributeLookupTable,
    data.dataImExAttr3);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 16 Fill in Column Name with: OptionSet
  commonActions.fillInTextValueInInput(dataImExPage.fields.dataImExColumnName,
    data.dataImExAttrColumnName3);
  // 17 Select  "Optionset Field"
  commonActions.fillInOptionSetValueInInput(dataImExPage.fields.dataImExImpAttrType,
    data.dataImExImpAttrTypeOpt3);
  // 18 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19 Click on "Insert" button from List of Data Imports
  fileVerify.verifyEmptyDataTable();
  fileActions.insertListOfDataImports();
  // 20 Add your file
  fileActions.attachFileToInput(dataImExPage.selector.dataImExFileUpload, relExcelFilePath);
  // 21 Click on "Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 22 Click on "Start import" button
  // 23 Wait until Data import logs is generated
  await fileActions.startDataImport();
  fileVerify.verifyDataImportLogs(1, dataImportLogs);
  // 24 Logoff
  await commonActions.logoutFromApp();
});
