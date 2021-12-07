// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC036_InsertConfigurationDataDefinitionFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1135

Feature('Digital Asset');

Scenario('User can add a Configuration Data Definition to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Configuration Data Definition extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.configurationDataDefinition,
    data.configItemsType,
  );
  // Verify if Configuration Data Definition extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.configurationDataDefinition);
  await commonActions.logoutFromApp();
});
