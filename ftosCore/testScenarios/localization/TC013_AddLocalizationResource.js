// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const localizationAction = require('~actions/localizationResourceActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const localizationResourcePage = require('~pages/localizationResourcePage');
const commonPage = require('~pages/commonPage');
// Data
const data = require('~data/localization/TC013_AddLocalizationResource');

// Author Catalina Rajala
// AT-1164

Feature('Localization');

Scenario('Localization Resources - Insert new localization resource', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlLocalizationResourceList);
  localizationAction.addLocalizationResource(
    data.moduleName,
    data.resourceKey,
    data.value,
    data.cultureName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.searchInTableAfterASpecificColumn(data.moduleNameColumn, data.moduleName, localizationResourcePage.container.defaultContainer);
await commonActions.logoutFromApp();
});
