// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC044_InsertDataSourceFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1140

Feature('Digital Asset');

Scenario('User can add a Data Source to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Data Source extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.dataSource,
    data.configItemsType,
  );
  // Verify if Data Source extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.dataSource);
  await commonActions.logoutFromApp();
});
