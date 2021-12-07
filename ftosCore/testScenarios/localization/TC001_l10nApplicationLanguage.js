// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/applicationLanguage');
// Pages
const commonPage = require('~pages/commonPage');
const l10nPage = require('~pages/localizationPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const l10nVerify = require('~actions/localizationVerify');

// Author Sebastian Draghici
// AT-214

Feature('Localization');

Scenario('BUG DPA-19359 : Localization - Application Language', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to Application Language
  commonActions.accessDirectUrl(data.urlAppLanguage);
  // 3 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 4 Fill in Name
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttributeName, data.l10nName);
  // 5 Fill in Culture
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttributeCulture, data.l10nCulture);
  // 6 Fill in ISO Code
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttributeIso, data.l10nIso);
  // 7 Fill in Currency
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttributeCurrency, data.l10nCurrency);
  // 8 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordInserted,
  );
  // 9 Navigate to Application Language
  commonActions.accessDirectUrl(data.urlLocalizationResources);
  // Search after module name
  await commonActions.searchInTableAfterASpecificColumn(data.columnName1, data.moduleName, commonPage.container.containerContent);
  // Search after resource key
  await commonActions.searchInTableAfterASpecificColumn(data.columnName2, data.resourceKey, commonPage.container.containerContent);
  // Search after English Value
  await commonActions.searchInTableAfterASpecificColumn(data.columnName3, data.l10nMyAccountEn, commonPage.container.containerContent);
  // Search after Culture Name
  await commonActions.searchInTableAfterASpecificColumn(data.columnName4, data.l10nCulture, commonPage.container.containerContent);
  // 11 Select the record
  // 12 Access it
  commonActions.doubleClickValueFromTable(l10nPage.selector.l10nResourceTable, data.l10nCulture);
  // 13 Fill in Value field
  commonActions.fillInTextValueInInput(l10nPage.fields.l10nAttributeValue, data.l10nMyAccountDe);
  // 14 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(
    commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.toastRecordUpdated,
  );
  // 15 Logoff
  await commonActions.logoutFromApp();
  // 16 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 17 Select Language
  await commonActions.changeApplicationLanguage(data.l10nName);
  // 18 Click on "Profile"
  await commonActions.clickProfileMenu();
  // 19 Check if text is displayed
  await l10nVerify.verifyProfileItem(data.l10nMyAccountDe);
  await commonActions.clickProfileMenu();
  // 20 Logoff
  await commonActions.logoutFromApp();
});
