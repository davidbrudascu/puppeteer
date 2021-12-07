const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC066_InsertCodeBlock.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Chelaru Alexandru
// AT-1134

Feature('Digital Asset');

Scenario('User can insert Code Block to CI tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);

  await digitalAssetActions.openDA(data.nameDigitalAsset, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();

  await digitalAssetActions.addDigitalAssetConfigurationItem(data.columnName, data.codeBlock, data.configItemsType);
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.codeBlock);

  await commonActions.logoutFromApp();
});
