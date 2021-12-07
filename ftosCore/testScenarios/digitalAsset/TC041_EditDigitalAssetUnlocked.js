// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC041_EditDigitalAssetUnlocked.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');

// Author Catalin Diaconu
// AT-1106

Feature('Digital Asset');

Scenario('User can open a digital asset for edit', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDAList);
  await commonActions.searchInTableAfterASpecificColumn(
    data.nameColumn,
    data.nameDA,
    digitalAssetPage.containers.defaultContainer,
  );
  commonActions.doubleClickValueFromTable(digitalAssetPage.containers.defaultContainer, data.nameDA);
  await digitalAssetVerify.verifyDAStatus(data.unlockedStatus);
  digitalAssetVerify.verifyDAFieldsState(data.unlockedStatus, data.username);
  await commonActions.logoutFromApp();
});
