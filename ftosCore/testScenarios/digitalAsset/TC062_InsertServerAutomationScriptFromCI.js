// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC062_InsertServerAutomationScriptFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1155

Feature('Digital Asset');

Scenario('User can add a Server Automation Script to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Server Automation Script extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.serverAutomationScript,
    data.configItemsType,
  );
  // Verify if Server Automation Script extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.serverAutomationScript);
  await commonActions.logoutFromApp();
});
