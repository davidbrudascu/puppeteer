// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/attributeFormSection');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-216
Feature('Localization');

Scenario('Localization - Form Section', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to User Journey
  // 3 Access your User Joureny
  commonActions.accessDirectUrl(data.urlDesignerUj);
  // 4 Go to Steps tab
  commonActions.navigateToFormStep(data.tabSteps);
  // 5 Access Step1
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nUjStepsTable, data.l10nUjStep1En);
  // 6 Click on UI Config Container
  // 7 Check if selected language is English
  // (otherwise: select English + click save and reload on form and open again the container)
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 8 Switch to Romania
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 9 Check if Display name is "Step1"
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nUjStep1En);
  // 10 Update Display name: "Pas 1"
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName, data.l10nUjStep1Ro);
  // 11 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Logoff
  await commonActions.logoutFromApp();
  // 13 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 14 Navigate to your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 15 Open UI Config Container and check if selected language is English
  // (otherwise switch to english)
  await commonActions.changeApplicationLanguage(data.languageEn);
  // 16 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 17 Check if 1st step displayName is: Step1
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nUjStep1, data.l10nUjStep1En);
  // 18 Check if 2nd step displayName is: Step2
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nUjStep2, data.l10nUjStep2En);
  // 19 Open again UI Config Container
  // 20 Switch to Romannia
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 21 Click again on Insert icon
  commonActions.clickSidebarButton(data.insertButton);
  // 22 Check if 1st Step displayName is: Pas1
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nUjStep1, data.l10nUjStep1Ro);
  // 23 Check if 2nd step displayName is: Step2
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nUjStep2, data.l10nUjStep2En);
  // 24 Logoff
  await commonActions.logoutFromApp();
});
