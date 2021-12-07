// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC026_AfterCloseDARedirectHomePage.json');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Avram Adina
// AT-1092

Feature('Digital Asset');

Scenario('User can close a DA after redirect to the Home Page', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDA);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.urlBusinessEntityList);
  digitalAssetActions.closeDAasContext();
  commonVerify.verifyIfHomePageVisible();
  await commonActions.logoutFromApp();
});
