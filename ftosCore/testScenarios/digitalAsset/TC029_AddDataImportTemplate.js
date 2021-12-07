// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC029_AddDataImportTemplate.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
// Add file
const pathFile = '../prerequisites/dataImportTemplate/TC029_AddDataImportTemplate.xlsx';
const pathWrongFile = '../prerequisites/dataImportTemplate/TC029_AddDataImportTemplate.txt';

// Author Avram Adina
// AT-1099

Feature('Digital Asset');

Scenario('User can add an Data Import Template ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.dataImportFilesTab);
  await digitalAssetActions.addDataImportTemplates(
    data.errorMessage,
    data.columnName,
    data.nameDataImportTemplate,
    pathFile,
    data.fileName,
    digitalAssetPage.fields.basedDataImportTemplatesField,
    data.errorMessageWrongFile,
    pathWrongFile,
    digitalAssetPage.buttons.insertDataImportTemplateButton,
    digitalAssetPage.containers.dataImportTemplateContainer,
    digitalAssetPage.buttons.okDataImportTemplateButton,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyValueExistsInTable(
    digitalAssetPage.containers.dataImportFilesContainer,
    data.nameDataImportTemplate,
  );
  await commonActions.logoutFromApp();
});
