// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC010_EditDisplayMenuItem');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('BUG DPA-19410: Edit display menu item', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Access your menu section (Menu Section DN TBU)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourMenuSectionDNTBU, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourCustomEntityMenuItem(data.yourMenuSectionDNTBU);
  // 4	Update Display name -> Menu Section - Updated DN
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourMenuSectionDNUpdated);
  // 5	Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6	Access entity menu item from grid (AT_EntForUpdateMenuDN)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourMenuItemEntityTBU, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourCustomEntityMenuItem(data.yourMenuItemEntityTBU);
  // 7	Update Display name -> Menu Item Entity - Updated DN
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourMenuItemEntityUpdated);
  // 8	Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 9	Access Custom Journey menu item from grid (AT_CUJForUpdateMenuDN)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourMenuItemCUJTBU, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourCustomEntityMenuItem(data.yourMenuItemCUJTBU);
  // 10	Update Display name -> Menu Item CUJ - Updated DN
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourMenuItemCUJUpdated);
  // 11	Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12	Access Report menu item from grid (AT_ReportUpdateMenuDN)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourMenuItemReportTBU, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourCustomEntityMenuItem(data.yourMenuItemReportTBU);
  // 13	Update Display name -> Menu Item Report- Updated DN
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourMenuItemReportUpdatedDN);
  // 14	Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15	Logoff
  await commonActions.logoutFromApp();
  // 16	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.passwordPortal);
  // 17	Click on "Main Menu" icon
  commonActions.portalSideMenuOpen();
  // 18	Click on "Menu Section - Updated DN" (Also, verify if Menu Section DN TBU doesn't exist)
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.yourMenuSectionDNTBU);
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourMenuSectionDNUpdated);
  // 19	Click on "Menu Item Entity - Updated DN" (Also, verify if Menu Item Entity TBU doesn't exist)
  menuItemsVerify.waitForEntityLinkInvisible(data.yourMenuItemEntityTBU);
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourMenuItemEntityUpdated);
  // 20	Verify if list page is displayed ( List Title: Menu Item Entity - Updated DN list) AT_EntForUpdateMenuDN list
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntForUpdateMenuDN);
  // 21	Click again on Main Menu -> Menu Section - Updated DN
  commonActions.portalSideMenuOpen();
  // 22	Click on "Menu Item CUJ - Updated DN" (Also, verify if Menu Item CUJ TBU doesn't exist)
  menuItemsVerify.waitForEntityLinkInvisible(data.yourMenuItemCUJTBU);
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourMenuItemCUJUpdated);
  // 23	Verify if CUJ page is displayed
  menuItemsVerify.waitForViewPageIsDisplay(data.yourCUJForUpdateMenuDN);
  menuItemsVerify.waitForViewPageContentIsDisplay(data.viewPageUpdatedMenuDisplayName);
  // 24	Click again on Main Menu -> Menu Section - Updated DN
  commonActions.portalSideMenuOpen();
  // 25 Verify if "Menu Item Report - Updated DN" is displayed (Also, verify if Menu Item Report TBU doesn't exist)
  menuItemsVerify.waitForEntityLinkInvisible(data.yourMenuItemReportTBU);
  menuItemsVerify.waitForEntityLinkVisible(data.yourMenuItemReportUpdatedDN);
  // 26	Logoff
  await commonActions.logoutFromApp();
});
