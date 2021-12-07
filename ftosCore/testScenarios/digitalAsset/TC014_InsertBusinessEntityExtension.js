// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC014_InsertBusinessEntityExtension');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Victor Pana
// AT-997

Feature('Digital Asset');

Scenario('User can add a Business Entity Extension to CI tab', async () => {
  // Login Studio as 'AT_SystemUser'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a business entity extension from configuration items
  await digitalAssetActions.addConfigurationItem(data.configItemsType, data.columnEntity, data.businessEntity);
  // Verify if business entity extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.businessEntity);
  await commonActions.logoutFromApp();
});
