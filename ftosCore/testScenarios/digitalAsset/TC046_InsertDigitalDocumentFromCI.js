// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC046_InsertDigitalDocumentFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1142

Feature('Digital Asset');

Scenario('User can add a Digital Document to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Digital Document extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.digitalDocument,
    data.configItemsType,
  );
  // Verify if Digital Document extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.digitalDocument);
  await commonActions.logoutFromApp();
});
