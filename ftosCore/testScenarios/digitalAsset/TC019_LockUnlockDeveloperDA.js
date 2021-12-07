// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC019_LockUnlockDeveloperDA.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalina Rajala
// AT-1013

Feature('Digital Asset');

Scenario('Developer role cannot lock/unlock a digital asset', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlLockedDA);
  digitalAssetVerify.verifyDAFieldsState(data.locked);
  digitalAssetActions.unlockDigitalAssetFailed(data.locked, data.errorMessage);
  commonActions.accessDirectUrl(data.urlUnlockedDA);
  digitalAssetVerify.verifyDAFieldsState(data.unlocked);
  digitalAssetActions.lockDigitalAssetFailed(data.unlocked, data.errorMessage);
  await commonActions.logoutFromApp();
});
