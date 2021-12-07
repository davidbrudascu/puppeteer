// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC018_SetAndUpdateMinimumPlatformVersion.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Avram Adina
// AT-1064

Feature('Digital Asset');

Scenario('User can set and edit minimum platform version', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.urlDAList);
  commonActions.clickButtonAfterLocator(commonPage.buttons.insertButton);
  digitalAssetActions.createDigitalAsset(
    data.nameDigitalAsset,
    data.code,
    data.description,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await digitalAssetActions.selectMinimumPlatformVersionDA(data.columnName, data.version);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  digitalAssetVerify.verifyMinimumPlatformVersion(data.version);
  await commonActions.logoutFromApp();
});
