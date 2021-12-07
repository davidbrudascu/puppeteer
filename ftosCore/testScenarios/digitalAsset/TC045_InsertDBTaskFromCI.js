// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC045_InsertDBTaskFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1141

Feature('Digital Asset');

Scenario('User can add a DB Task to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a DB Task extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.DBTask,
    data.configItemsType,
  );
  // Verify if DB Task extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.DBTask);
  await commonActions.logoutFromApp();
});
