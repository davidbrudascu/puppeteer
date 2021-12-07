// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC057_EditAnExistingApplicationDependenciesTab.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
const constants = require('~config/constants');

// Author Miclea David
// AT-1098

Feature('Digital Asset');

Scenario('Edit An Existing Application Dependencies Tab', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  await digitalAssetActions.openDA(data.nameDaReference, data.columnName);
  digitalAssetActions.selectDigitalTab(data.dependenciesTab);
  await digitalAssetActions.selectMinimumPlatformVersionDA(data.columnName, data.mvpNewReference);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await digitalAssetActions.insertDependenciesForDigitalAsset(data.columnName, data.nameDaReferential, digitalAssetPage.containers.containerForReferencedDigitalAsset);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH, data.toastMessage);
  await commonActions.searchInTableAfterASpecificColumn(data.columnDigitalAsset, data.nameDaReferential, digitalAssetPage.containers.defaultContainer);
  digitalAssetActions.deleteReferenceDigitalAsset();
  commonActions.saveAndCloseAction();
  await commonActions.logoutFromApp();
});
