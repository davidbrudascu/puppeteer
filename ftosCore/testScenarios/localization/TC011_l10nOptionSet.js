// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/optionSet');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-216
Feature('Localization');

Scenario('Localization - Option Set', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to OptionSet
  commonActions.accessDirectUrl(data.urlOptionSet);
  // 3 Switch language: Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 4 Access "French" item
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nOptionSetTable,
    data.l10nOptionSetFr);
  // 5 Check if DisplayName is: French
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nOptionSetFr);
  // 6 Update DisplayName: Franceza
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nOptionSetFr_RO);
  // 7 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8 Logoff
  await commonActions.logoutFromApp();
  // 9 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 10 Access your Entity: "…Main#/entity/AT_LocalizeOS/list
  commonActions.accessDirectUrl(data.urlPortalOptionSet);
  // 11 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 12 Check if default value for OS is: "French"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrOsLocalize,
    data.l10nOptionSetFr);
  // 13 Open OptionSet
  // 14 Check if the following values are displayed: "French and English"
  commonVerify.verifyValuesExistInOptionSet(l10nPage.fields.l10nAttrOsLocalize,
    [data.l10nOptionSetEn, data.l10nOptionSetFr]);
  // 15 Select "French"
  commonActions.fillInOptionSetValueInInput(l10nPage.fields.l10nAttrOsLocalize,
    data.l10nOptionSetFr);
  // 16 Click on Save and Refresh
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 17 Check in list if French is displayed
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrOsLocalize,
    data.l10nOptionSetFr);
  // 18 Switch to Romanian Language
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 19 Check in list if "Franceza" is displayed
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrOsLocalize,
    data.l10nOptionSetFr_RO);
  // 20 Check if default value for OS is: "Franceza"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrOsLocalize,
    data.l10nOptionSetFr_RO);
  // 21 Open OptionSet
  // 22 Check if the following values are displayed: "Franceza and English"
  commonVerify.verifyValuesExistInOptionSet(l10nPage.fields.l10nAttrOsLocalize,
    [data.l10nOptionSetEn, data.l10nOptionSetFr_RO]);
  // 23 Select English
  commonActions.fillInOptionSetValueInInput(l10nPage.fields.l10nAttrOsLocalize,
    data.l10nOptionSetEn);
  // 24 Click on "Save and Refresh
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 25 Check in list if the following values are displayed: Franceza and English
  commonVerify.verifyValuesExistInOptionSet(l10nPage.fields.l10nAttrOsLocalize,
    [data.l10nOptionSetEn, data.l10nOptionSetFr_RO]);
  // 26 Logoff
  await commonActions.logoutFromApp();
});
