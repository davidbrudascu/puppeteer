// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions');
// Data
const data = require('~data/digitalAsset/TC010_DigitalAssetInsertAttribute');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const commonPage = require('~pages/commonPage');
const digitalAssetPage = require('~pages/digitalAssetPage');
// Constants
const constants = require('~config/constants');

// Author David Miclea
// AT-1003

Feature('Digital Asset');

Scenario('Insert Attribute in Digital Asset.', async () => {
  // Login to Studio
  await commonActions.loginInApp(data.urlStudio, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.setContextSuccess,
  );
  digitalAssetActions.selectTypeOfCI(data.tabCI, data.typeOfCI);
  await digitalAssetActions.fillFieldsForAttributeCI(data.columnNameAttribute, data.searchAfterNameAttribute, digitalAssetPage.containers.ciDataContainer);
  digitalAssetActions.insertCIItems();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH, data.CiAddedSuccessMessage);
  digitalAssetActions.closeDAasContext();
  await commonActions.logoutFromApp();
});
