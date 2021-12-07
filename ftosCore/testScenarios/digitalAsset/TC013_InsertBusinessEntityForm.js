// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC013_InsertBusinessEntityForm');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Victor Pana
// AT-1001

Feature('Digital Asset');

Scenario('User can add a entity form to CI tab', async () => {
  // Login Studio as 'AT_SystemUser'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add an entity form in configuration items
  await digitalAssetActions.addConfigurationItem(data.configItemsType, data.columnEntity, data.businessEntity);
  // Verify if entity form was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.businessEntity);
  await commonActions.logoutFromApp();
});
