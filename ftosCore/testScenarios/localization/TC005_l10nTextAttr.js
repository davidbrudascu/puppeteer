// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/textAttr');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');


// Author Sebastian Draghici
// AT-217
Feature('Localization');

Scenario('Localization - Text Attribute', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlEntity);
  // 3 Extend "Data Model"
  commonActions.menuSectionExpand(data.sectionDataModel);
  // 4 access your Attribute "LocalizedAttr"
  commonActions.searchByColumnValueInTable(
    l10nPage.selector.l10nDataModelTable,
    data.l10nSearchResourceName,
    data.l10nResourceName,
  );
  commonActions.doubleClickValueFromTable(
    l10nPage.selector.l10nDataModelTable,
    data.l10nResourceName,
  );
  // 5 Check "Is Localizable"
  await commonActions.tickCheckbox(l10nPage.fields.l10nIsLocalizable,
    constants.CHECKMARK_TICKED);
  // 6 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Logoff
  await commonActions.logoutFromApp();
  // 8 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 9 Access your Entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 10 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 11 Click on UI Config
  // 12 Select "English" language
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 13 Fill in LocalizedAttr with "EN Value"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nLocalizedAttr,
    data.l10nLocalizedValueEn);
  // 14 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15 Click again on UI Config
  // 16 Select "Romanian" language
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 17 Check if Display Name is "EN value"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nLocalizedAttr,
    data.l10nLocalizedValueEn);
  // 18 Update it: "RO Value"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nLocalizedAttr,
    data.l10nLocalizedValueRo);
  // 19 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nLocalizedAttr,
    data.l10nLocalizedValueRo);
  // 20 Click again on UI Config
  // 21 Select "Engleza" language
  await commonActions.changeApplicationLanguage(data.languageEn_RO);
  // 22 Check if value is "EN Value"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nLocalizedAttr,
    data.l10nLocalizedValueEn);
  // 23 Go back to list
  commonActions.clickSidebarButton(data.backButton);
  // 24 Check if you have one result
  commonVerify.verifyValueDontExistsInTable(l10nPage.selector.l10nResourceTable,
    data.l10nLocalizedValueRo);
  // 25 Check if LocalizedAttr is "EN Value"
  commonVerify.verifyValueExistsInTable(l10nPage.selector.l10nResourceTable,
    data.l10nLocalizedValueEn);
  // 26 Switch to Romania
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 27 Check if LocalizedAttr is "RO Value"
  commonVerify.verifyValueDontExistsInTable(l10nPage.selector.l10nResourceTable,
    data.l10nLocalizedValueEn);
  commonVerify.verifyValueExistsInTable(l10nPage.selector.l10nResourceTable,
    data.l10nLocalizedValueRo);
  // 28 Logoff
  await commonActions.logoutFromApp();
});
