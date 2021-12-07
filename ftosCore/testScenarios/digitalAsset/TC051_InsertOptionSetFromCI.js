// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC051_InsertOptionSetFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1151

Feature('Digital Asset');

Scenario('User can add an Option Set to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add an Option Set extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.displayName,
    data.optionSet,
    data.configItemsType,
  );
  // Verify if Option Set extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.optionSet);
  await commonActions.logoutFromApp();
});
