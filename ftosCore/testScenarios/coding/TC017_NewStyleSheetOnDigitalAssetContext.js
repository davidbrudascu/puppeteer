// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
// Data
const data = require('~data/coding/TC017_NewStyleSheetOnDigitalAssetContext');
// Pages
const digitalAssetPage = require('~pages/digitalAssetPage');

// Author David Miclea
// AT-1198

Feature('Coding');

Scenario('Developer role can insert new style sheets only on Digital Asset context', async () => {
	await commonActions.loginInStudioApp(data.urlDesigner, data.username, data.password);
	await digitalAssetActions.openDA(data.digitalAssetName, data.columnName);
	digitalAssetActions.setAsContextDigitalAsset();
	commonActions.accessDirectUrl(data.advancedCodeEditorLink);
	codeEditorActions.clickCodeBlocksFilterByDigitalAsset(data.digitalAssetName);
	codeEditorActions.clickCodeBlocksFilterByItemType();
	codeEditorActions.insertItemType(data.item, data.itemAdd, data.nameStyleSheet);
	commonActions.saveAndCloseAction();
	digitalAssetActions.accessConfigurationItemsInfoTab();
	commonActions.refreshPage();
	await commonActions.searchInTableAfterASpecificColumn(data.columnRecordName, data.nameStyleSheet, digitalAssetPage.containers.defaultContainer);
	await commonActions.logoutFromApp();
});
