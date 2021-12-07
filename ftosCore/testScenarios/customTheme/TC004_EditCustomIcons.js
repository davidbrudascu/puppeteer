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
const data = require('~data/customTheme/TC004_EditCustomIcons');

// Author Catalin Diaconu
// AT - 496

// If it doesn't work please check the custom folder from the Studio and Portal App
// Please check DPA-19539 for more info

Feature('Custom Theme');

Scenario('User can add custom icons to an entity in Portal Menu', async () => {
    await commonActions.loginInPortalApp(data.urlPortal, data.username, data.password);
    customThemeActions.pinEntityToHome(data.entityName);
    customThemeVerify.verifyIconEntityPortal(data.firstIconName, data.firstPosition);
    await commonActions.logoutFromApp();
    await commonActions.loginInStudioApp(data.urlDesigner, data.username, data.password);
    commonActions.accessDirectUrl(data.urlMenuItem);
    customThemeActions.selectIcon(data.iconClassName, data.secondIconName);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonActions.logoutFromApp();
    await commonActions.loginInStudioApp(data.urlPortal, data.username, data.password);
    commonActions.accessDirectUrl(data.urlMainPagePortal);
    customThemeVerify.verifyIconEntityPortal(data.secondIconName, data.firstPosition);
    await commonActions.logoutFromApp();
});
