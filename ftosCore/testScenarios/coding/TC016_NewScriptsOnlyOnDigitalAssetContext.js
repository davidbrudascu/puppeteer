// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
// Data
const data = require('~data/coding/TC016_NewScriptsOnlyOnDigitalAssetContext');
// Pages
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author David Miclea
// AT-1199

Feature('Coding');

Scenario('Developer role can insert new scripts only on Digital Asset context', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  await digitalAssetActions.openDA(data.digitalAssetName, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.advancedCodeEditorLink);
  codeEditorActions.clickCodeBlocksFilterByDigitalAsset(data.digitalAssetName);
  codeEditorActions.insertItemType(data.item, data.itemAdd, data.nameScript);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  digitalAssetActions.accessConfigurationItemsInfoTab();
  commonActions.refreshPage();
  await commonActions.searchInTableAfterASpecificColumn(data.columnRecordName, data.nameScript, digitalAssetPage.containers.defaultContainer);
  await commonActions.searchInTableAfterASpecificColumn(
    data.columnRecordName,
    data.nameScript,
    digitalAssetPage.containers.defaultContainer,
  );
  await commonActions.logoutFromApp();
});
