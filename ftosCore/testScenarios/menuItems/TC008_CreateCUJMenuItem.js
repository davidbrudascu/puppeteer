// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC008_CreateCUJMenuItem');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Create CUJ menu item', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 4	Select Type = Custom Journey
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeCustomJourney);
  // 5	Select your journey (AT_CUJMenuPortal)
  menuItemsActions.selectYourCustomJourneyEntity(data.yourCUJMenuPortal);
  // 6	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7	Access Section (CUJ menu Section)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourEntityMenuSection, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.yourEntityMenuSection, data.yourEntityMenuSubSection);
  // 8	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 9	Select type = Custom Journey
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeCustomJourney);
  // 10	Select your journey (AT_CUJMenuSection)
  menuItemsActions.selectYourCustomJourneyEntity(data.yourCUJMenuSection);
  // 11	Add Display Name: CUJ MS DN
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.displayNameCUJMSDN);
  // 12	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 13	Access your section (CUJ Menu subSection)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourEntityMenuSubSection, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourCustomEntityMenuItem(data.yourEntityMenuSubSection);
  // 14	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 15	Select type = Custom Journey
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeCustomJourney);
  // 16	Select your entity (AT_CUJMenuSubSection)
  menuItemsActions.selectYourCustomJourneyEntity(data.yourCUJMenuSubSection);
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
  // 21	Check if your Journey is displayed (AT_CUJMenuPortal)
  // 22	Click on it
  menuItemsVerify.searchAfterEntityLinkVisibleAndClick(data.yourCUJMenuPortal);
  // 23	Check content (CUJ Menu Portal)
  menuItemsVerify.waitForViewPageContentIsDisplay(data.contentPageCUJMenuPortal);
  // 24	Click again on "main menu" icon
  commonActions.portalSideMenuOpen();
  // 25	Click on "CUJ Menu Section"
  commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, ' ');
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourEntityMenuSection);
  // 26	Check if CUJ Display Name is "CUJ MS DN"
  // 27	Click on it
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.displayNameCUJMSDN);
  // 28	Check content (CUJ Menu Section)
  menuItemsVerify.waitForViewPageContentIsDisplay(data.yourEntityMenuSection);
  // 29	Click again on "main menu" icon
  commonActions.portalSideMenuOpen();
  // 30	Click on "CUJ Menu Section"
  // 31	Click on "CUJ Menu subSection"
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourEntityMenuSubSection);
  // 32	Click on your journey "AT_CUJMenuSubSection"
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourCUJMenuSubSection);
  // 33	Check content (CUJ Menu subSection)
  menuItemsVerify.waitForViewPageContentIsDisplay(data.yourEntityMenuSubSection);
  // 34	Logoff
  await commonActions.logoutFromApp();
});
