// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/textAreaAttr');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-217
Feature('Localization');

Scenario('Localization - Text Area Attribute', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlEntity);
  // 3 Extend "Data Model"
  commonActions.menuSectionExpand(data.sectionDataModel);
  // 4 Click on Insert button
  commonActions.clickToolbarButton(data.insertButton);
  // 5 Fill in name
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrName, data.l10nAttrTextArea);
  // 6 Fill in DisplayName
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nAttrDisplayName);
  // 7 Select Attribute Type
  commonActions.fillInOptionSetValueInInput(l10nPage.fields.l10nAttrType, data.l10nAttrType);
  // 8 Check "Is Localizable"
  await commonActions.tickCheckbox(l10nPage.fields.l10nIsLocalizable,
    constants.CHECKMARK_TICKED);
  // Fill in mandatory length
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrLength,
    data.l10nAttrLength);
  // 9 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Logoff
  await commonActions.logoutFromApp();
  // 11 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 12 Access your Entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 13 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 14 Click on UI Config
  // 15 Select "English" language
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 16 Fill in TextArea with "EN Value"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nLocalizedTextArea,
    data.l10nLocalizedValueEn);
  // 17 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 18 Click again on UI Config
  // 19 Select "Romanian" language
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 20 Check if Display Name is "EN value"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nLocalizedTextArea,
    `${data.l10nLocalizedValueEn}\n`);
  // 21 Update it: "RO Value"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nLocalizedTextArea,
    data.l10nLocalizedValueRo);
  // 22 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nLocalizedTextArea,
    `${data.l10nLocalizedValueRo}\n`);
  // 23 Click again on UI Config
  // 24 Select "English" language
  await commonActions.changeApplicationLanguage(data.languageEn_RO);
  // 25 Check if value is "EN Value"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nLocalizedTextArea,
    `${data.l10nLocalizedValueEn}\n`);
  // 26 Logoff
  await commonActions.logoutFromApp();
});
