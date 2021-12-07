// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/entityDisplayNameAndCollectionName');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Sebastian Draghici
// AT-216
Feature('Localization');

Scenario('Localization - Entity Display Name and Collection Name, label', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.urlEntity);
  // 3 Switch language: Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 4 Check if DisplayName is: Localize DN English
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nEntityDisplayNameEn);
  // 5 Check if Collection Name is: Localize CN English
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrCollectionName,
    data.l10nEntityCollectionNameEn);
  // 6 Update DisplayName Localize DN Romanian
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nEntityDisplayNameRo);
  // 7 Update Collection Name: Localize CN Romanian
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrCollectionName,
    data.l10nEntityCollectionNameRo);
  // 8 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 9 Navigate to rel
  commonActions.accessDirectUrl(data.urlEntityRel);
  // 10 Check if Displayname is: English
  await commonVerify.verifyValueExistsInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nRelDisplayNameEn);
  // 11 Update Display name: Romanian
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttrDisplayName,
    data.l10nRelDisplayNameRo);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Logoff
  await commonActions.logoutFromApp();
  // 13 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 14 Access your Entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 15 Check if the list name is: "Localize CN English List"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityList,
    `${data.l10nEntityCollectionNameEn} List`.toUpperCase());
  // 16 Access your Record
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nResourceTable, data.l10nEntityName);
  // 17 Check if form title is "Edit Localize DN English"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityTitle,
    `Edit ${data.l10nEntityDisplayNameEn}`.toUpperCase());
  // 18 Check if relationship label is "English"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityRel,
    data.languageEn.toUpperCase());
  // 19 Go back to List
  commonActions.clickSidebarButton(data.backButton);
  // 20 Switch language: Romanian
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 21 Check if list name is "Lista de Localizare CN Romanian"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityList,
    `Lista de ${data.l10nEntityCollectionNameRo}`.toUpperCase());
  // 22 Access your record
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nResourceTable, data.l10nEntityName);
  // 23 Check if form name is: "Adaugare Localizare DN Romanian"
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityTitle,
    `Modificare ${data.l10nEntityDisplayNameRo}`.toUpperCase());
  // 24 Check if Relationship label is: Romanian
  await commonVerify.verifyValueExistsInLabel(l10nPage.labels.l10nEntityRel,
    data.languageRo.toUpperCase());
  // 25 Logoff
  await commonActions.logoutFromApp();
});
