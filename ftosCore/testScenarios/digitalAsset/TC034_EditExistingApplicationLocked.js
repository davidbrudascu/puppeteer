// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC034_EditExistingApplicationLocked.json');
// Verify
const commonVerify = require('~actions/commonVerify');
const digitalAssetVerify = require('~actions/digitalAssetVerify');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Avram Adina
// AT-1105

Feature('Digital Asset');

Scenario('User cannot edit a digital asset when the status is locked', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  await commonVerify.verifyValueExistsInInputReadOnly(
    digitalAssetPage.fields.statusLockedReadOnlyField,
    data.locked,
  );
  digitalAssetVerify.verifyDAFieldsState(data.locked);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.errorMessage,
  );
  await commonActions.logoutFromApp();
});
