// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC005_BranchDigitalAssetObsolete.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalin Diaconu
// AT-1029

Feature('Digital Asset');

Scenario('User can branch a Digital Asset with items in Configuration List', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDigitalAssetList);
  await digitalAssetActions.accessDigitalAsset(data.nameDigitalAsset, data.columnName, data.falseState);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.configurationItems);
  digitalAssetActions.branchDigitalAsset(data.branchDigitalAssetName);
  digitalAssetVerify.verifyBranchingSuccess(
    data.generalTab,
    data.urlBranchingDA,
    data.nameDigitalAsset,
  );
  await commonActions.logoutFromApp();
});
