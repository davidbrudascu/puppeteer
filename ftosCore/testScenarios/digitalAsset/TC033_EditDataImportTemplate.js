// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC033_EditDataImportTemplate.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');
// Add file
const pathFile = '../prerequisites/dataImportTemplate/TC033_EditDataImportTemplate.xlsx';

// Author Avram Adina
// AT-1102

Feature('Digital Asset');

Scenario('User can edit a Data Import Template', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  digitalAssetActions.openDigitalAsset();
  await commonActions.searchInTableAfterASpecificColumn(
    data.columnName,
    data.nameDA,
    digitalAssetPage.containers.defaultContainer,
  );
  await digitalAssetActions.editDataImportTemplate(
    data.columnNameDataImportTemplate,
    data.dataImportTemplate,
    digitalAssetPage.fields.basedDataImportTemplatesField,
    data.newDataImportTemplate,
    digitalAssetPage.buttons.okDataImportTemplateButton,
    data.columnName,
    digitalAssetPage.containers.dataImportTemplateContainer,
    pathFile,
    data.fileName,
    data.errorMessageForImportTwoFiles,
    digitalAssetPage.buttons.insertDataImportTemplateButton,
    digitalAssetPage.fields.daEditDataImportTemplateField,
    digitalAssetPage.fields.dataImportForEditField,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.searchInTableAfterASpecificColumn(
    data.columnNameDataImportTemplate,
    data.newDataImportTemplate,
    digitalAssetPage.containers.dataImportFilesContainer,
  );
  await commonActions.logoutFromApp();
});
