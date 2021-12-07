// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC069_InsertStyleSheetsCodeEditor');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-1218

Feature('Digital Asset');

Scenario('Developer role can insert new style sheets only on Digital Asset context', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDigitalAssetList);
  await commonActions.searchInTableAfterASpecificColumn(
    data.columnName,
    data.nameDA,
    commonPage.container.containerContent,
  );
  commonActions.doubleClickValueFromTable(commonPage.container.containerContent, data.nameDA);
  digitalAssetActions.setAsContextDigitalAsset();
  commonActions.accessDirectUrl(data.urlCodeEditor);
  digitalAssetVerify.verifyFilterButtonsCodeEditor();
  digitalAssetActions.filterDigitalAssetCodeEditor(data.nameDA);
  digitalAssetActions.filterItemTypeCodeEditor(data.styleSheets);
  digitalAssetActions.addStyleSheetCodeEditor(data.nameDA, data.styleSheets, data.nameStyleSheet);
  digitalAssetVerify.verifyStyleSheetCodeEditor(data.nameDA, data.styleSheets, data.nameStyleSheet);
  await commonActions.logoutFromApp();
});
