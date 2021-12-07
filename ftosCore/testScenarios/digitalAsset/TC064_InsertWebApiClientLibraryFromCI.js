// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC064_InsertWebApiClientLibraryFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1131

Feature('Digital Asset');

Scenario('User can add a Web Api Client Library to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Web Api Client Library extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.webApiClientLibrary,
    data.configItemsType,
  );
  // Verify if Web Api Client Library extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.webApiClientLibrary);
  await commonActions.logoutFromApp();
});
