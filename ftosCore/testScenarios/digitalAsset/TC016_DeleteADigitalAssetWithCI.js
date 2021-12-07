// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions');
// Data
const data = require('~data/digitalAsset/TC016_DeleteADigitalAssetWithCI');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');

// Author David Miclea
// AT-1060

Feature('Digital Asset');

Scenario('Delete a Digital Asset with CI.', async () => {
  await commonActions.loginInApp(data.urlStudio, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.listDigitalAssets);
  await commonActions.searchInTableAfterASpecificColumn(data.columnName, data.digitalAssetName, digitalAssetPage.containers.defaultContainer);
  digitalAssetActions.deleteDigitalAssetWithCI(data.warningMessage);
  await commonActions.logoutFromApp();
});
