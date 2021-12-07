// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
const businessEntitiesActions = require('~actions/businessEntitiesActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/coding/TC018_EditScriptDataViewWith2Users');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeEditorVerify = require('~actions/codeEditorVerify');

// Author Mihaela Negoita
// AT-1210

Feature('Coding');

Scenario('A warning message is displayed when a user tries to edit a data view script that is check out by another user and not released.', async () => {
  // login with the first user and set DA as context
  await commonActions.loginInStudioApp(data.urlDesigner, data.username1, data.password);
  await digitalAssetActions.openDA(data.digitalAssetName, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  businessEntitiesActions.accessBusinessEntityList(data.search);
  // select a given entity and edit the fetch object expression from the default data view
  await viewActions.accessDataFromDefaultDataView(
    data.entityName,
    data.columnName,
    data.defaultView,
    data.viewNameColumn,
    data.dataViewCode,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  digitalAssetActions.closeDAasContext();
  await commonActions.logoutFromApp();
  // login with the second user and set DA as context
  await commonActions.loginInStudioApp(data.urlDesigner, data.username2, data.password);
  await digitalAssetActions.openDA(data.digitalAssetName, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  codeEditorActions.accessAdvancedCodeEditor(data.advancedCodEditorSearch);
  codeEditorVerify.verifyExistingFilters();
  // access default data view and verify the warning massage displayed
  codeEditorActions.accessDefaultDataView(
    data.digitalAssetName,
    data.entityName,
    data.username1,
    data.nameDefault,
  );
  await commonActions.logoutFromApp();
});
