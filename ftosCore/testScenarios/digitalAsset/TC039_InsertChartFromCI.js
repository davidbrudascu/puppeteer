// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC039_InsertChartFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1132

Feature('Digital Asset');

Scenario('User can add a Chart to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Chart extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.chart,
    data.configItemsType,
  );
  // Verify if Chart extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.chart);
  await commonActions.logoutFromApp();
});
