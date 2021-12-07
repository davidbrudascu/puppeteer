// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC031_DeleteDataConfigDefinition.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');

// Author Avram Adina
// AT-1101

Feature('Digital Asset');

Scenario('User can delete a Data Config Definition ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.urlDataImportFiles);
  await digitalAssetActions.deleteDataConfigDefinition(
    data.columnDataConfig,
    data.dataConfigDefinition,
  );
  commonVerify.verifyValueDontExistsInTable(
    digitalAssetPage.containers.dataImportFilesContainer,
    data.dataConfigDefinition,
  );
  await commonActions.logoutFromApp();
});
