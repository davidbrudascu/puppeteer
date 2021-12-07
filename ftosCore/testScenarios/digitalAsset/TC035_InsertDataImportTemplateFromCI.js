// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC035_InsertDataImportTemplateFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1138

Feature('Digital Asset');

Scenario('User can add a Data Import Template to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Data Import Template extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.dataImportTemplate,
    data.configItemsType,
  );
  // Verify if Data Import Template  extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.dataImportTemplate);
  await commonActions.logoutFromApp();
});
