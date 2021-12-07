// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC058_InsertSystemParameterFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1158

Feature('Digital Asset');

Scenario('User can add a System Parameter to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a System Parameter extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.systemParameter,
    data.configItemsType,
  );
  // Verify if System Parameter extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.systemParameter);
  commonActions.refreshPage();
  await commonActions.logoutFromApp();
});
