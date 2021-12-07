// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions');
// Data
const data = require('~data/digitalAsset/TC017_DeleteADigitalAssetWithoutCI');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');

// Author David Miclea
// AT-1059

Feature('Digital Asset');

Scenario('Delete a Digital Asset without CI.', async () => {
  await commonActions.loginInApp(data.urlStudio, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.listDigitalAssets);
  await commonActions.searchInTableAfterASpecificColumn(
    data.columnName,
    data.digitalAssetName,
    digitalAssetPage.containers.defaultContainer,
  );
  digitalAssetActions.deleteDigitalAssetWithOutCI();
  await digitalAssetVerify.verifyIfDigitalAssetWasDeleted(
    data.columnName,
    data.digitalAssetName,
    digitalAssetPage.containers.defaultContainer,
  );
  await commonActions.logoutFromApp();
});
