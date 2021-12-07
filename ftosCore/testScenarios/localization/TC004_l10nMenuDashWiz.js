// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/localization/menuDashWiz');
// Verify
const l10nVerify = require('~actions/localizationVerify');

// Author Sebastian Draghici
// AT-215
Feature('Localization');

Scenario('BUG DPA-19359 : Localization - Menu, Dashboard, Wizard', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.l10nUser, data.l10nPass);
  // 2 Click on "Localize English" Dashboard
  commonActions.portalClickSelectDashboard(data.l10nDashboardEn);
  // 3 Check if wizard title is: Localize EN
  // 4 Check if wizard content is: Widget English
  await l10nVerify.verifyWizardDetails(data.l10nWidgetNameEn, data.l10nWizTitleEn,
    data.l10nWizContentEn);
  // 5 Open Menu
  commonActions.portalSideMenuOpen();
  // 6 Check if section name is displayed: "Menu Section EN"
  // 7 Click on it
  commonActions.portalClickSideMenuItem(constants.MENU_SECTION, data.l10nMenuSectionEn);
  // 8 Check if one menu item is displayed: Entity EN
  commonActions.portalClickSideMenuItem(constants.MENU_ITEM, data.l10nMenuItemEn);
  // 9 Close Menu
  commonActions.clickSidebarButton(data.backButton);
  // 10 Switch language to RO
  await commonActions.changeApplicationLanguage(data.languageRo);
  // 11 Click on "Localizare Romana" Dashboard
  commonActions.portalClickSelectDashboard(data.l10nDashboardRo);
  // 12 Check if 1 wizard is displayed
  // 13 Check if wizard title is: Localize RO
  // 14 Check if wizard content is: Widget Romana
  await l10nVerify.verifyWizardDetails(data.l10nWidgetNameRo, data.l10nWizTitleRo,
    data.l10nWizContentRo);
  // 15 Open Menu
  commonActions.portalSideMenuOpen();
  // 16 Check if section name is displayed: "Sectiune Meniu RO"
  // 17 Click on it
  commonActions.portalClickSideMenuItem(constants.MENU_SECTION, data.l10nMenuSectionRo);
  // 18 Check if one menu item is displayed: Entittate RO
  commonActions.portalClickSideMenuItem(constants.MENU_ITEM, data.l10nMenuItemRo);
  // 19 Close Menu
  commonActions.clickSidebarButton(data.backButton);
  // 20 Logoff
  await commonActions.logoutFromApp();
});
