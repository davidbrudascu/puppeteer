// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC002_UnlockDigitalAsset.json');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalin Diaconu
// AT-1014

Feature('Digital Asset');

Scenario('User can unlock a Digital Asset using Release Manager security role', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.setContextSuccess,
  );
  digitalAssetActions.lockDigitalAsset(data.unlocked);
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.lockSuccessMessage,
  );
  await digitalAssetVerify.verifyDAIsLocked(
    data.inputLocator,
    data.textAreaLocator,
    data.true,
    data.locked,
    data.secondVersion,
  );
  digitalAssetActions.accessConfigurationItemsInfoTab();
  digitalAssetVerify.verifyCIBtnAreInvisible();
  digitalAssetActions.selectDigitalTab(data.generalTab);
  digitalAssetActions.unlockDigitalAssetSuccess(data.locked);
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.unlockSuccessMessage,
  );
  await digitalAssetVerify.verifyDigitalAssetState(data.unlocked);
  digitalAssetActions.closeDAasContext();
  await commonActions.logoutFromApp();
});
