const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC065_InsertAdvancedAnalytics.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Chelaru Alexandru
// AT-1124

Feature('Digital Asset');

Scenario('User can insert Advanced Analytis to CI tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);

  await digitalAssetActions.openDA(data.nameDigitalAsset, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();

  await digitalAssetActions.addDigitalAssetConfigurationItem(data.columnName.toLowerCase(), data.advancedAnalytics, data.configItemsType);
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.advancedAnalytics);

  await commonActions.logoutFromApp();
});
