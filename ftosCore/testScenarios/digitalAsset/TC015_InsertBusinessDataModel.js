// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC015_InsertBusinessDataModel.json');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1004

Feature('Digital Asset');

Scenario('User can insert a Business Data Model to CI tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.businessDataModel,
    data.type,
  );
  // Verify if Business Data Model extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.businessDataModel);
  await commonActions.logoutFromApp();
});
