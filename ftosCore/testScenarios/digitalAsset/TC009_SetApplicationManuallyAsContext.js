// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC009_SetApplicationManuallyAsContext.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Page
const commonPage = require('~pages/commonPage');

// Author Miclea David
// AT-1017

Feature('Digital Asset');

Scenario('Set Application manually as context', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  await digitalAssetActions.openDA(data.digitalAssetName, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.setContextSuccess,
  );
  digitalAssetActions.closeDAasContext();
  await commonActions.logoutFromApp();
});
