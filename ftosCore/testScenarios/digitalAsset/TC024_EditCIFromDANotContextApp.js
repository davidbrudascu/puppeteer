// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC024_EditCIFromDANotContextApp.json');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Avram Adina
// AT-1090

Feature('Digital Asset');

Scenario('User cannot edit an entity which are assigned to CI from DA while user is not in context application', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlBusinessEntityWithDA);
  digitalAssetActions.editBusinessEntityWithCI(data.newValue);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.errorMessage,
  );
  await commonActions.logoutFromApp();
});
