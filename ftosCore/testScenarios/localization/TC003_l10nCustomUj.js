// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/customUj');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const l10nVerify = require('~actions/localizationVerify');

// Author Sebastian Draghici
// AT-215
Feature('Localization');

Scenario('Localization - Custom User Journey', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to Custom User Journey
  commonActions.accessDirectUrl(data.urlDesignerCustomUj);
  // 3 Access your Custom User Journey
  commonActions.searchByColumnValueInTable(
    l10nPage.selector.l10nCustomUjTable,
    data.l10nSearchCujName,
    data.l10nCustomUj,
  );
  commonActions.doubleClickValueFromTable(
    l10nPage.selector.l10nCustomUjTable,
    data.l10nCustomUj,
  );
  // 4 Go to Code step
  commonActions.navigateToFormStep(data.tabCode);
  // 5 Open Source Code
  // 6 Paste your HTML
  commonActions.fillInCustomTinyMceEditor(
    l10nPage.selector.l10nTinyMceLoc,
    l10nPage.selector.l10nTinyMceId,
    data.l10nHtmlCode,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Navigate to Localization Resources
  commonActions.accessDirectUrl(data.urlLocalizationResources);
  // 8 Search for Resource Key
  commonActions.searchByColumnValueInTable(
    l10nPage.selector.l10nResourceTable,
    data.l10nSearchResourceKey,
    data.l10nResourceKey,
  );
  // 9 Check English value
  // 10 Check Romanian value
  await l10nVerify.checkNameValues(data.l10nCultureEn, data.l10nValueEn,
    data.l10nCultureRo, data.l10nValueRo, data.secondPosition);
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 13 Navigate to your custom UJ
  commonActions.accessDirectUrl(data.urlPortalCuj);
  // 14 Open UI Config container
  // 15 Select English
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 16 Check attribute display name
  await l10nVerify.verifyLocalizationHtmlAttrib(data.l10nValueEn, data.l10nResourceKey);
  // 17 Open again UI Config container
  // 18 Select Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 19 Check attribute display name
  await l10nVerify.verifyLocalizationHtmlAttrib(data.l10nValueRo, data.l10nResourceKey);
  // 20 Logoff
  await commonActions.logoutFromApp();
});
