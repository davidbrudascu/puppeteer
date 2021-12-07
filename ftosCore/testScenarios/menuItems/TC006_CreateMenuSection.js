// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC006_CreateMenuSection');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Create menu sections - subsection', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Click on Insert button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid()
  // 4	Select Type = Menu Section
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeMenuSection)
  // 5	Add Display Name = Auto Menu Section
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.displayNameAutoMenuSection);
  // 6	Click on Save&Reload button
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 8	Select Type = Menu Section
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeMenuSection);
  // 9	Add Display Name = Auto Menu sub-Section2
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.displayNameAutoMenuSubSection2);
  // 10	Click on Save&Close button
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11	Click on "Insert" button from Auto Menu Section - MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 12	Select Type = Menu Section
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeMenuSection);
  // 13	Add Display Name = Auto Menu sub-Section1
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.displayNameAutoMenuSubSection1);
  // 14	Click on Save&Reload button
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15	Click on "Insert" button from Auto Menu Section - MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 16	Select Type = Entity
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeEntity);
  // 17	Select your entity (AT_EntForMenuSection1)
  menuItemsActions.selectYourEntity(data.yourEntForMenuSection1);
  // 18	Click on Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19	Logoff
  await commonActions.logoutFromApp();
  // 20	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 21	CLick on Main Menu icon
  commonActions.portalSideMenuOpen();
  // 22	Click on your menu section (Auto Menu Section)
  commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, data.yourEntForMenuSection1);
  menuItemsVerify.waitForMenuSectionLabelVisible(data.displayNameAutoMenuSection);
  // 23	Check if only 1 sub-section is displayed (Auto Menu sub-Section1 - displayed; Auto Menu sub-Section2 -   not displayed)
  menuItemsVerify.waitForMenuSectionLabelVisible(data.displayNameAutoMenuSubSection1);
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.displayNameAutoMenuSubSection2)
  // 24	Click on Auto Menu sub-Section1
  // 25	Check if only 1 menuItem is displayed (AT_EntForMenuSection1)
  // 26	Click on your entity
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourEntForMenuSection1)
  // 27	View page is displayed (AT_ENTFORMENUSECTION1 LIST)
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageIsDisplay)
  // 28	Logoff
  await commonActions.logoutFromApp();
});
