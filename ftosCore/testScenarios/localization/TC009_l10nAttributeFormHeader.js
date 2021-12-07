// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/attributeFormHeader');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-216
Feature('Localization');

Scenario('Localization - Form Header', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 3 Access your User Joureny
  commonActions.accessDirectUrl(data.urlDesignerUj);
  // 4 Go to Headers  tab
  commonActions.navigateToFormStep(data.tabHeaders);
  // 5 Access your header
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nUjHeadersTable,
    data.l10nUjHeaderEn);
  // 6 Switch to Romania
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 7 Check if Display name is "English"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrLabel,
    data.l10nUjHeaderEn);
  // 8 Update Display name: "Romanian"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrLabel, data.l10nUjHeaderRo);
  // 9 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Logoff
  await commonActions.logoutFromApp();
  // 11 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 12 Navigate to your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 13 Open UI Config Container and check if selected language is English
  // (otherwise switch to english)
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 14 Access your Record
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nResourceTable,
    data.l10nUjEntity);
  // 15 Check if Header Name is: English
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityHeader,
    data.l10nUjHeaderEn.toUpperCase());
  // 16 Check if Header Value is: en
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityValue,
    data.l10nUjHeaderValueEn);
  // 17 Switch to Romania
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 18 Check if Header Name is: Romanian
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityHeader,
    data.l10nUjHeaderRo.toUpperCase());
  // 19 Check if Header Value is: en
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityValue,
    data.l10nUjHeaderValueEn);
  // 20 Check if Text is: en
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nViewText,
    data.l10nUjHeaderValueEn);
  // 21 Update Text: ro
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nViewText, data.l10nUjHeaderValueRo);
  // 22 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 23 Check if Header Value is: ro
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityValue,
    data.l10nUjHeaderValueRo);
  // 24 Check if Text is: ro
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nViewText,
    data.l10nUjHeaderValueRo);
  // 25 Switch to English
  await commonActions.changeApplicationLanguage(data.languageEn_RO);
  // 26 Check if Header value is: en
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityValue,
    data.l10nUjHeaderValueEn);
  // 27 Check if Text is: en
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nViewText,
    data.l10nUjHeaderValueEn);
  // 28 Logoff
  await commonActions.logoutFromApp();
});
