// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/htmlFormAttribute');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const l10nVerify = require('~actions/localizationVerify');

// Author Sebastian Draghici
// AT-215
Feature('Localization');

Scenario('BUG DPA-19359 : Localization - HTML form attribute', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity
  commonActions.accessDirectUrl(data.urlDesignerEntity);
  // 3 Expand data form
  commonActions.menuSectionExpand(data.sectionDataForms);
  // 4 Access your default form
  commonActions.doubleClickValueFromTable(
    l10nPage.selector.l10nDataFormTable,
    data.dataFormDefault,
  );
  // 5 Click on UI
  commonActions.navigateToFormStep(data.tabUi);
  // 6 Open Tools -> Source Code
  // 7 Paste your HTML
  // 8 Click "Ok"
  commonActions.fillInCustomTinyMceEditor(
    l10nPage.selector.l10nTinyMceLoc,
    l10nPage.selector.l10nTinyMceId,
    data.l10nHtmlCode,
  );
  // 9 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Navigate to Localization Resources
  commonActions.accessDirectUrl(data.urlLocalizationResources);
  // 11 Search for Resource Key
  commonActions.searchByColumnValueInTable(
    l10nPage.selector.l10nResourceTable,
    data.l10nSearchResourceKey,
    data.l10nResourceKey,
  );
  // 12 Check English value
  // 13 Check Romanian value
  await l10nVerify.checkNameValues(data.l10nCultureEn, data.l10nValueEn,
    data.l10nCultureRo, data.l10nValueRo);
  // 14 Logoff
  await commonActions.logoutFromApp();
  // 15 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 16 Navigate to your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 17 Click on Insert icon
  commonActions.clickSidebarButton(data.insertButton);
  // 18 Open UI Config container
  // 19 Select English
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 20 Check attribute display name
  await l10nVerify.verifyLocalizationHtmlAttrib(data.l10nValueEn, data.l10nResourceKey);
  // 21 Open again UI Config container
  // 22 Select Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  commonActions.clickSidebarButton(data.insertButton);
  // 23 Check attribute display name
  await l10nVerify.verifyLocalizationHtmlAttrib(data.l10nValueRo, data.l10nResourceKey);
  // 24 Logoff
  await commonActions.logoutFromApp();
});
