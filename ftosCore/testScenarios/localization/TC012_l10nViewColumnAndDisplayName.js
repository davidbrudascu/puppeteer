// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/viewColumnAndDisplayName');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');


// Author Sebastian Draghici
// AT-216
Feature('Localization');

Scenario('Localization - View Column and Display Name', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to Edit View
  commonActions.accessDirectUrl(data.urlEditView);
  // 3 Switch language: Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 4 Update DisplayName to "DN RO"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nViewDisplayNameRo);
  // 5 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6 Click on "Data" section
  commonActions.navigateToFormStep(data.tabData);
  // 7 Open your column (Name)
  commonActions.viewValueFromTable(l10nPage.selector.l10nEntityViewTable, data.l10nEntityColumn1En);
  // 8 Update Label: Nume
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nViewColumnLabel,
    data.l10nEntityColumn1Ro);
  // 9 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Logoff
  await commonActions.logoutFromApp();
  // 11 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 12 Check if selected language is: English
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 13 Access your Entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 14 Check if View name is "DN EN"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityList,
    data.l10nViewDisplayNameEn.toUpperCase());
  // 15 Check if 1st Column name is: Name
  await commonVerify.verifyValueExistsInLabel(l10nPage.selector.l10nViewTableColumn1Header,
    data.l10nEntityColumn1En);
  // 16 Check if 2nd Column name is: Age
  await commonVerify.verifyValueExistsInLabel(l10nPage.selector.l10nViewTableColumn2Header,
    data.l10nEntityColumn2En);
  // 17 Switch language: Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 18 Check if View name is "DN RO"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityList,
    data.l10nViewDisplayNameRo.toUpperCase());
  // 19 Check if 1st Column name is: Nume
  await commonVerify.verifyValueExistsInLabel(l10nPage.selector.l10nViewTableColumn1Header,
    data.l10nEntityColumn1Ro);
  // 20 Check if 2nd Column name is: Varsta
  await commonVerify.verifyValueExistsInLabel(l10nPage.selector.l10nViewTableColumn2Header,
    data.l10nEntityColumn2Ro);
  // 21 Logoff
  await commonActions.logoutFromApp();
});
