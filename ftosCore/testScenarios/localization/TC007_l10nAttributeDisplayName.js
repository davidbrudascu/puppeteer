// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/attributeDisplayName');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-216
Feature('Localization');

Scenario('Localization - Attribute Display Name', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlDesignerEntity);
  // 3 Extend "Data Model"
  commonActions.menuSectionExpand(data.sectionDataModel);
  // 4 Access "TextEN" attribute
  commonActions.searchByColumnValueInTable(
    l10nPage.selector.l10nDataModelTable,
    data.l10nSearchResourceName,
    data.l10nDisplayNameEn,
  );
  commonActions.doubleClickValueFromTable(
    l10nPage.selector.l10nDataModelTable,
    data.l10nDisplayNameEn,
  );
  // 5 Select "Romanian" language
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 6 Check if Display Name is "TextEN"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nDisplayNameEn);
  // 7 Check if Tooltip is: Tooltip EN
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrTooltip, data.l10nTooltipEn);
  // 8 Update Display Name: "TextRO"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName, data.l10nDisplayNameRo);
  // 9 Update Tooltip: Tooltip RO
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrTooltip, data.l10nTooltipRo);
  // 10 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 13 Access your Entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 14 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 15 Click on UI Config
  // 16 Select "English" language
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 17 Check if Display Name is "TextEN"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nLabelDisplayName,
    data.l10nDisplayNameEn);
  // 18 Check if Tooltip is: Tooltip EN
  await commonVerify.verifyTooltipTextOnField(l10nPage.fields.l10nAddTextTooltip,
    data.l10nTooltipEn);
  // 19 Click again on UI Config
  // 20 Select "Romanian" language
  await commonActions.changeApplicationLanguage(data.languageRo);
  commonActions.clickSidebarButton(data.insertButton);
  // 21 Check if Display Name is "TextRO"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nLabelDisplayName,
    data.l10nDisplayNameRo);
  // 22 Check if tooltip is: Tooltip RO
  await commonVerify.verifyTooltipTextOnField(l10nPage.fields.l10nAddTextTooltip,
    data.l10nTooltipRo);
  // 23 Logoff
  await commonActions.logoutFromApp();
});
