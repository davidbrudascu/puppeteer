// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC068_DAIsHighlightedWhenDAIsInContext');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-1217

Feature('Digital Asset');

Scenario('Digital Asset is highlighted in Code Editor when it is in context', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDigitalAssetList);
  await commonActions.searchInTableAfterASpecificColumn(data.columnName, data.nameDA, commonPage.container.containerContent);
  commonActions.doubleClickValueFromTable(commonPage.container.containerContent, data.nameDA);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.urlCodeEditor);
  digitalAssetVerify.verifyFilterButtonsCodeEditor();
  digitalAssetVerify.verifyDAIsHighlightedInCodeEditor(data.nameDA, data.cssColor);
  digitalAssetActions.closeDAasContext();
  await commonActions.logoutFromApp();
});
