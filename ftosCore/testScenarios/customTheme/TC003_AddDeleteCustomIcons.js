// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const customThemeActions = require('~actions/customThemeActions');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const customThemeVerify = require('~actions/customThemeVerify');
// Data
const data = require('~data/customTheme/TC003_AddDeleteCustomIcons.json');

// Author Catalin Diaconu
// AT - 496

// If it doesn't work please check the custom folder from the Studio and Portal App
// Please check DPA-19539 for more info

Feature('Custom Theme');

Scenario('User can edit/delete custom icons in Portal Menu', async () => {
  await commonActions.loginInStudioApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlMenuItemsList);
  customThemeActions.addMenuItemEntityIcon(
      data.entityType,
      data.entityName,
      data.iconClassName,
      data.iconName,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInPortalApp(data.urlPortal, data.username, data.password);
  customThemeActions.pinEntityListToHome(data.entityName);
  customThemeVerify.verifyIconEntityPortal(data.iconName, data.firstPosition);
  await commonActions.logoutFromApp();
  await commonActions.loginInStudioApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlMenuItemsList);
  customThemeActions.deleteMenuItem(data.entityName);
  await commonActions.logoutFromApp();
});
