// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC002_DeleteMenuSections');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('BUG DPA-19359: Delete menu sections', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Delete your Menu Section (MenuSection Delete)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuSectionDelete, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.deleteYourMenuSection(data.menuSectionDelete);
  // 4	Verify if an error message displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      data.vaToastAttributeRequired);
  commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      data.vaToastAttributeRequired,
  );
  // 5	Access your Menu Section (MenuSection Delete)
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuSectionDelete, data.yourEntity_EntForDeleteMS1);
  // 6	Delete your entity menu item  AT_EntForDeleteMS1
  commonActions.selectARowFromTableAfterText(data.yourEntity_EntForDeleteMS1);
  menuItemsActions.deleteYourMenuSectionAndVerifyEmptyTable();
  // 7	Go back to  your Menu Section (MenuSection Delete)
  commonActions.goBackToPreviousPage();
  menuItemsActions.waitForFirstRowInTableAndSelected(data.menuSectionDelete)
  // 8	Delete your Menu Section (MenuSection Delete)
  menuItemsActions.deleteYourMenuSectionAndVerifyEmptyTable();
  // 9	Access your Menu Section (MS for sub-MS Delete)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuSectionSubMSDelete, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuSectionSubMSDelete, data.subMenuSectionDelete);
  // 10	Verify if 2 subMenu sections are displayed (subMenuSection Delete and subMenuSection Active)
  menuItemsActions.waitForFirstRowInTable(data.subMenuSectionDelete);
  menuItemsActions.waitForSecondRowInTable(data.subMenuSectionActive);
  // 11	Delete subMenuSectionDelete
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.subMenuSectionDelete, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.deleteYourMenuSectionAndVerifyEmptyTable();
  // 12	Logoff
  await commonActions.logoutFromApp();
  // 13	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14	Click on "Main Menu" icon
  commonActions.portalSideMenuOpen();
  // 15	Verify if "MenuSection Delete" is not displayed
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.menuSectionDelete);
  // 16	Verify if "AT_EntForDeleteMS1" entity is not displayed
  menuItemsVerify.waitForEntityLinkInvisible(data.yourEntity_EntForDeleteMS1)
  // 17	Click on "MS for sub-MS Delete"
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.menuSectionSubMSDelete)
  // 18	Verify if only subMenuSection Active is displayed subMenuSection Active
  menuItemsVerify.waitForMenuSectionLabelVisible(data.subMenuSectionActive)
  // 19	Verify if subMenuSection Delete is not displayed
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.subMenuSectionDelete)
  // 20	Logoff
  await commonActions.logoutFromApp();
});
