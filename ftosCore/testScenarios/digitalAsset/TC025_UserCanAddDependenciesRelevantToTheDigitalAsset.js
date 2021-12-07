// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions');
// Data
const data = require('~data/digitalAsset/TC025_UserCanAddDependenciesRelevantToTheDigitalAsset');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');

// Author David Miclea
// AT-1060

Feature('Digital Asset');

Scenario('User Can AddDependencies Relevant To The DigitalAsset.', async () => {
  await commonActions.loginInApp(data.urlStudio, data.username, data.password, data.toastMessage);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.dependenciesTab);
  await digitalAssetActions.insertDependenciesForDigitalAsset(data.columnName, data.digitalAssetReferencedName, digitalAssetPage.containers.containerForReferencedDigitalAsset);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH, data.toastMessage);
  await digitalAssetVerify.verifyDigitalAssetDependencies(data.columnDigitalAsset, data.digitalAssetReferencedName, digitalAssetPage.containers.applicationDependencyContainer);
  await commonActions.logoutFromApp();
});
