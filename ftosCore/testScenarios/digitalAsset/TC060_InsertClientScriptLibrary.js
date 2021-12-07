const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC060_InsertClientScriptLibrary');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Chelaru Alexandru
// AT-1133

Feature('Digital Asset');

Scenario('User can insert Client Script Library to CI tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);

  await digitalAssetActions.openDA(data.nameDigitalAsset, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();

  await digitalAssetActions.addDigitalAssetConfigurationItem(data.columnName, data.clientScriptLibrary, data.configItemsType);
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.clientScriptLibrary);

  await commonActions.logoutFromApp();
});
