// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC004_BranchNotAllowedForNoConfig.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-1026

Feature('Digital Asset');

Scenario('User cannot branch an project with no existing configuration items', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  await digitalAssetActions.openDA(data.nameDigitalAsset, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.configurationTab);
  digitalAssetActions.branchDigitalAsset(data.branchDigitalAssetName);
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.branchError,
  );
  await commonActions.logoutFromApp();
});
