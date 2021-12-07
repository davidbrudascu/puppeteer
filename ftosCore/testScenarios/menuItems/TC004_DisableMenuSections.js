// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC004_DisableMenuSection');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Disable menu sections', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/list
  commonActions.accessDirectUrl(data.accessMenuItemsListURL);
  // 3	Access your Menu Section (MenuSection Disable)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuSectionDisable, menuItemPage.container.defaultContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuSectionDisable, data.entityMenuDisableMS1);
  // 4	Check "Disabled" option
  menuItemsActions.checkDisableOptionMenuItem()
  // 5	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6	Access your Menu Section (MS for sub-MS Disable)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.subMenuSectionMSDisable, menuItemPage.container.defaultContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.subMenuSectionMSDisable, data.subMenuSectionDisable)
  // 7	Verify if 2 subMenu sections are displayed (subMenuSection Disable and subMenuSection enable)
  commonVerify.verifyValueExistsInTable(menuItemPage.container.childrenMenuItemsContainer, data.subMenuSectionDisable);
  commonVerify.verifyValueExistsInTable(menuItemPage.container.childrenMenuItemsContainer, data.subMenuSectionEnable);
  // 8	Access subMenuSectionDisable
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.subMenuSectionDisable, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.subMenuSectionDisable, data.entityEntForDisableSubMS1)
  // 9	Check "Disabled" option
  menuItemsActions.checkDisableOptionMenuItem()
  // 10	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11	Logoff
  await commonActions.logoutFromApp();
  // 12	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13	Click on "Main Menu" icon
  commonActions.portalSideMenuOpen();
  // 14	Verify if "MenuSection Disable" is not displayed
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.menuSectionDisable);
  // 15	Verify if "AT_EntForDisableMS1" entity is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityMenuDisableMS1);
  // 16	Click on "MS for sub-MS Disable"
  menuItemsActions.clearAndSearchAfterInMenuPortal()
  // 17	Verify if only subMenuSection Enable is displayed
  menuItemsVerify.waitForMenuSectionLabelVisible(data.subMenuSectionEnable)
  // 18	Verify if subMenuSection Disable is not displayed
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.subMenuSectionDisable)
  // 19	Verify if "AT_EntForDisableSubMS1" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityEntForDisableSubMS1)
  // 20	Logoff
  await commonActions.logoutFromApp();
});
