// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC038_InsertActionGroup');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Chelaru Alexandru
// AT-1123

Feature('Digital Asset');

Scenario('User can insert Action Group to CI tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);

  await digitalAssetActions.openDA(data.nameDigitalAsset, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();

  await digitalAssetActions.addDigitalAssetConfigurationItem(data.columnName, data.actionGroup, data.configItemsType);
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.actionGroup);

  await commonActions.logoutFromApp();
});
