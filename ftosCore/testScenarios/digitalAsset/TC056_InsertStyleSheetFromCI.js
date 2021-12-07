// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC056_InsertStyleSheetFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1157

Feature('Digital Asset');

Scenario('User can add a Style Sheet to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Style Sheet extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.styleSheet,
    data.configItemsType,
  );
  // Verify if Style Sheet extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.styleSheet);
  await commonActions.logoutFromApp();
});
