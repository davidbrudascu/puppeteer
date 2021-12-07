// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC052_InsertPortalProfileFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1152

Feature('Digital Asset');

Scenario('User can add a Portal Profile to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Portal Profile extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.portalProfile,
    data.configItemsType,
  );
  // Verify if Portal Profile extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.portalProfile);
  await commonActions.logoutFromApp();
});
