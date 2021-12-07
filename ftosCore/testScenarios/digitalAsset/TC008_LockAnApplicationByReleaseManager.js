// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC008_LockAnApplicationByReleaseManager.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Miclea David
// AT-1012
Feature('Digital Asset');

Scenario('Lock an application by release manager', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.digitalAssetURL);
  digitalAssetVerify.verifyDAFieldsState(data.unlocked);
  digitalAssetActions.lockDigitalAsset(data.unlocked);
  digitalAssetVerify.verifyDAFieldsState(data.locked);
  await commonActions.logoutFromApp();
});
