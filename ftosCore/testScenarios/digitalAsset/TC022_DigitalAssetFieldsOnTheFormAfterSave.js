// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC022_DigitalAssetFieldsOnTheFormAfterSave.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Avram Adina
// AT-1058

Feature('Digital Asset');

Scenario('User can create a DA from the home page and view the fields of a digital asset after saving', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  digitalAssetActions.insertDigitalAsset();
  digitalAssetActions.createDigitalAsset(
    data.nameDigitalAsset,
    data.code,
    data.description,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  digitalAssetVerify.verifyDigitalAssetTabs();
  digitalAssetVerify.verifyGeneralTab(data.unlocked);
  digitalAssetVerify.verifyCiTab();
  digitalAssetVerify.verifyCiMigrationTab();
  await commonActions.logoutFromApp();
});
