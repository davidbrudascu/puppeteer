// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC006_IncrementalVersioningUnlockedApp');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalin Diaconu
// AT-1039

Feature('Digital Asset');

Scenario('Release Manager can have incremental versioning available on unlocked apps', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDA);
  // Get the current version of the app
  let version = await digitalAssetActions.getDAVersion();
  digitalAssetActions.unlockDigitalAssetSuccess(data.locked);
  // Verify the status of the app
  await commonVerify.verifyValueExistsInInput(digitalAssetPage.fields.statusInputField, data.unlocked);
  // Verify the version of the app
  await digitalAssetVerify.verifyVersionOfDA(version);
  // Get again the current version
  version = await digitalAssetActions.getDAVersion();
  digitalAssetActions.lockDigitalAsset(data.unlocked);
  // Verify that the version hasn't changed
  await digitalAssetVerify.verifyVersionOfDA(version);
  await commonActions.logoutFromApp();
});
