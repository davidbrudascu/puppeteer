// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC055_InsertServerAutomationScriptLibraryFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1156

Feature('Digital Asset');

Scenario('User can add a Server Automation Script Library to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Server Automation Script Library extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.sequencer,
    data.configItemsType,
  );
  // Verify if Server Automation Script Library extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.sequencer);
  await commonActions.logoutFromApp();
});
