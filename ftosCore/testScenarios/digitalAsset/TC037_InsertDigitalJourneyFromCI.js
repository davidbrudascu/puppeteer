// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC037_InsertDigitalJourneyFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1135

Feature('Digital Asset');

Scenario('User can add a Digital Journey to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add a Digital Journey extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.columnName,
    data.digitalJourney,
    data.configItemsType,
  );
  // Verify if Digital Journey extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.digitalJourney);
  await commonActions.logoutFromApp();
});
