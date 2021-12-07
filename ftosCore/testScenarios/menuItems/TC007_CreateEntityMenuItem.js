// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC007_CreateEntityMenuItem');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Create entity menu item', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  //3	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 4	Select Type = Entity
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeEntity);
  // 5	Select your entity (AT_EntMenuPortal)
  menuItemsActions.selectYourEntity(data.yourEntMenuPortal);
  // 6	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7	Access the "Entity Menu Section" from  MENU ITEMS CHILDREN grid
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourEntityMenuSection, menuItemPage.container.childrenMenuItemsContainer);
  // commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.yourEntityMenuSection)
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.yourEntityMenuSection, data.yourEntityMenuSubSection);
  // 8	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 9	Select type = Entity
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeEntity);
  // 10	Select your entity (AT_EntMenuSection)
  menuItemsActions.selectYourEntity(data.yourEntMenuSection);
  // 11	Add display name: Entity MS DN
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.displayNameEntityMSDN);
  // 12	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 13	Access the subSection (Entity Menu subSection) associated to "Entity Menu Section"
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourEntityMenuSubSection, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourCustomEntityMenuItem(data.yourEntityMenuSubSection);
  // 14	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 15	Select type = Entity
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeEntity);
  // 16	Select your entity (AT_EntMenuSubSection)
  menuItemsActions.selectYourEntity(data.yourEntMenuSubSection);
  // 17	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 18	Logoff
  await commonActions.logoutFromApp();
  // 19	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 20	Click on "main menu" icon
  commonActions.portalSideMenuOpen();
  // 21	Check if your Entity is displayed (AT_EntMenuPortal)
  menuItemsVerify.searchAfterEntityLinkVisibleAndClick(data.yourEntMenuPortal);
  // 22	Click on it
  menuItemsVerify.searchAfterEntityLinkVisibleAndClick(data.yourEntMenuPortal);
  // 23	Check if view is displayed "AT_ENTMENUPORTAL LIST"
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntMenuPortalDisplay);
  // 24	Click again on "main menu" icon
  commonActions.portalSideMenuOpen();
  // 25	Click on "Entity Menu Section"
  commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, ' ');
  menuItemsVerify.waitForMenuSectionLabelVisible(data.yourEntityMenuSection);
  // 26	Verify display name: Entity MS DN
  // 27	Click on it
  menuItemsVerify.searchAfterEntityLinkVisibleAndClick(data.displayNameEntityMSDN);
  // 28	Check if view is displayed "AT_ENTMENUSECTION LIST"  AT_EntMenuSection list
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntMenuSectionDisplay);
  // 29	Click again on "main menu" icon
  commonActions.portalSideMenuOpen();
  // 30	Click on "Entity Menu Section"
  // 31	Click on "Entity Menu subSection"
  // 32	Click on your entity "AT_EntMenuSubSection"
  commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, data.yourEntMenuSubSection);
  menuItemsVerify.waitForMenuSectionLabelVisible(data.yourEntityMenuSection);
  menuItemsVerify.waitForMenuSectionLabelVisible(data.yourEntityMenuSubSection);
  menuItemsVerify.searchAfterEntityLinkVisibleAndClick(data.yourEntMenuSubSection);
  // 33	Check if view is displayed "AT_ENTMENUSUBSECTION LIST"
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntMenuSubSectionDisplay);
  // 34	Logoff
  await commonActions.logoutFromApp();
});
