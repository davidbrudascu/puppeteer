// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC020_RemoveAttributeConnectionLinkInCITab.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1062

Feature('Digital Asset');

Scenario('User can remove Attribute Connection Link in CI tab of an unlocked Application', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.digitalAssetURL);
  digitalAssetActions.accessConfigurationItemTab();
  await digitalAssetActions.deleteCI(data.columnName, data.businessEntity);
  digitalAssetVerify.verifyCiDeleteSuccess(data.businessEntity);
  await commonActions.logoutFromApp();
});
