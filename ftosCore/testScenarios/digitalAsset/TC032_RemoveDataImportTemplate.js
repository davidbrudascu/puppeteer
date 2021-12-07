// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC032_RemoveDataImportTemplate.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');

// Author Avram Adina
// AT-1103

Feature('Digital Asset');

Scenario('User can remove a Data Import Template', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.dataImportFilesTab);
  await digitalAssetActions.deleteDataConfigDefinition(
    data.columnDataImportTemplate,
    data.dataImportTemplate,
  );
  digitalAssetVerify.verifyValueDontExistsTable(
    digitalAssetPage.containers.dataImportFilesContainer,
    data.dataImportTemplate,
  );
  await commonActions.logoutFromApp();
});
