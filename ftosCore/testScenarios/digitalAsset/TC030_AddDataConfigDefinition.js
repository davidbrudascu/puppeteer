// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC030_AddDataConfigDefinition.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
// Add file
const pathFile = '../prerequisites/dataConfigDefinition/TC030_DataConfigDefinition.xml';
const pathWrongFile = '../prerequisites/dataConfigDefinition/TC030_AddDataConfigDefinition.txt';
const pathFileWrongData = '../prerequisites/dataConfigDefinition/TC030_AddDataConfigDefinitionWrongData.xml';

// Author Avram Adina
// AT-1100

Feature('Digital Asset');

Scenario('User can add a Data Config Definition ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.dataImportFilesTab);
  await digitalAssetActions.addDataImportTemplates(
    data.errorMessage,
    data.columnName,
    data.nameDataConfigDefinition,
    pathFile,
    data.fileName,
    digitalAssetPage.fields.basedDataConfigDefinitionField,
    data.errorMessageWrongFile,
    pathWrongFile,
    digitalAssetPage.buttons.insertDataConfigDefinitionButton,
    digitalAssetPage.containers.dataConfigDefinitionContainer,
    digitalAssetPage.buttons.okDataConfigDefinitionButton,
    pathFileWrongData,
    data.errorMessageWrongData,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyValueExistsInTable(
    digitalAssetPage.containers.dataImportFilesContainer,
    data.nameDataConfigDefinition,
  );
  await commonActions.logoutFromApp();
});
