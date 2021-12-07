// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC028_InsertBusinessWorkflowConfiguration.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Victor Pana
// AT-1000

Feature('Digital Asset');

Scenario('User can add a Business workflow configuration to CI tab', async () => {
  // Login Studio as 'AT_SystemUser'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.digitalAssetName, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a business workflow configuration from configuration items
  await digitalAssetActions.addConfigurationItem(data.configItemsType, data.columnName, data.businessEntity);
  // Verify if business workflow configuration was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.businessEntity);
  await commonActions.logoutFromApp();
});
