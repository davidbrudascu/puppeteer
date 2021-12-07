// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC027_InsertBusinessWorkflow.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1061

Feature('Digital Asset');

Scenario('User can insert a Business Workflow to CI tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.digitalAssetURL);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.businessWorkflow,
    data.type,
  );
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.businessWorkflow);
  await commonActions.logoutFromApp();
});
