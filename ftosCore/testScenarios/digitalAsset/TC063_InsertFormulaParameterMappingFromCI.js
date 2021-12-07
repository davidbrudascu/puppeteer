// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC063_InsertFormulaParameterMappingFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1155

Feature('Digital Asset');

Scenario('User can add a Formula parameter mapping to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Formula parameter mapping extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.formulaParameterMapping,
    data.configItemsType,
  );
  // Verify if Formula parameter mapping extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.formulaParameterMapping);
  await commonActions.logoutFromApp();
});
