// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC011_ChangeItemsOrder');
// Pages
const menuItemPage = require('~pages/menuItemPage');
// Verify
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('BUG DPA-20368:Change Items Order', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Switch "MS - Change Order1" with "MS-Change Order2"
  // 4	Verify if success message is displayed
  // 5	Check if order index are updated (switched)
  await menuItemsActions.switchMenuItemsOrder(data.switchMSChangeOrder1, data.switchMSChangeOrder2, data.yourMSChangeOrder, data.columnDisplayName);
  // 4	Verify if success message is displayed
  // 5	Check if order index are updated (switched) - Nu hardcoda; Sunt sanse ca testele anterioare sa modifica Order Indexul. Extragi inainte de pasl asta sa vezi ce order Index au MS-Change Order 1, 2
  // 6	Access "MS for Change MI Order" menu section
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourMSForChangeMIOrder, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.yourMSForChangeMIOrder, data.yourEntForChangeMIOrder1);
  // 7	Delete "AT_EntForChangeMIOrder2" menu itemCheck if the success message is displayed
  menuItemsVerify.verifyMenuItemsBeforeDelete(data.yourEntForChangeMIOrder1, data.yourEntForChangeMIOrder2, data.yourEntForChangeMIOrder3, data.yourSubMenuChangeOrder, data.yourCujForChangeMIOrder)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourEntForChangeMIOrder2, menuItemPage.container.childrenMenuItemsContainer);
  commonActions.selectARowFromTableAfterText(data.yourEntForChangeMIOrder2);
  menuItemsActions.deleteYourMenuSection();
  commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, '');
  // 8	verify if order index were updated
  menuItemsVerify.verifyIfOrderIndexUpdatedAfterDelete(data.yourEntForChangeMIOrder1, data.yourEntForChangeMIOrder3, data.yourSubMenuChangeOrder, data.yourCujForChangeMIOrder);
  // 9	Move CUJ on top of table
  menuItemsActions.moveMenuItemOnTopOfTable(data.yourCujForChangeMIOrder, data.yourEntForChangeMIOrder1);
  // 10	Verify again if order index were updated
  menuItemsVerify.verifyOrderIndexAfterMoveOnTopOfMenuItem(data.yourCujForChangeMIOrder, data.yourEntForChangeMIOrder1, data.yourSubMenuChangeOrder, data.yourEntForChangeMIOrder3);
  // 11	Logoff
  await commonActions.logoutFromApp();
  // 12	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.passwordPortal);
  // 13	Open "Main Menu"
  commonActions.portalSideMenuOpen();
  // 14	Verify if MS - Change order 2 is above of MS - Change Order 1
  menuItemsVerify.verifyMenuSectionOrder(data.switchMSChangeOrder1, data.switchMSChangeOrder2);
  // 15	Click on MS - Change Order 2 - verify if contains "AT_EntForChangeMSOrder2" entity
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.switchMSChangeOrder2);
  // 16	Click on MS - Change Order2/AT_EntForChangeMSOrder2 -> verify if AT_EntForChangeMSOrder2 list is displayed
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourEntForChangeMSOrder2);
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntForChangeMSOrder2);
  // 17	Click on MS - Change Order 1 - verify if contains "AT_EntForChangeMSOrder1" entity
  commonActions.portalSideMenuOpen();
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.switchMSChangeOrder1);
  // 18	Click on MS - Change Order1/AT_EntForChangeMSOrder1 -> verify if AT_EntForChangeMSOrder1 list is displayed
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourEntForChangeMSOrder1);
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntForChangeMSOrder1);
  // 19	Click again on Main Menu -> MS for Change MI Order
  commonActions.portalSideMenuOpen();
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourMSForChangeMIOrder);
  // 19	"Verify Items order:
  menuItemsVerify.verifyItemsOrderInPortal(
    data.yourMSForChangeMIOrder,
    data.yourCujForChangeMIOrder,
    data.yourEntForChangeMIOrder1,
    data.yourSubMenuChangeOrder,
    data.yourEntForChangeMIOrder3,
  );
  // 1. AT_CujForChangeMIOrder
  // 2. AT_EntForChangeMIOrder1
  // 3. subMenuS - Change Order
  // 4. AT_EntForChangeMIOrder3"
  // 20	Click on MS for Change MI Order/AT_CujForChangeMIOrder -> Verify if CUJ content is displayed
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourCujForChangeMIOrder);
  menuItemsVerify.waitForViewPageIsDisplay(data.yourCujForChangeMIOrder);
  menuItemsVerify.waitForViewPageContentIsDisplay(data.viewPageDisplayChangeMenuItemOrder);
  // 21	Click on MS for Change MI Order/AT_EntForCnangeMIOrder1 -> Verify if AT_EntForCnangeMIOrder1 list page is displayed
  commonActions.portalSideMenuOpen();
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourEntForChangeMIOrder1);
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntForChangeMIOrder1);
  // 22	Click on MS for Change MI Order/subMenuS - Change Order1/AT_EntForChangeMIOrder4 -> Verify if AT_EntForChangeMIOrder4 list page is displayed
  commonActions.portalSideMenuOpen();
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourSubMenuChangeOrder);
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourEntForChangeMIOrder4);
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntForChangeMIOrder4);
  // 23	Click on MS for Change MI Order/AT_EntForChangeMIOrder3 -> Verify if AT_EntForChangeMIOrder3 list page is displayed
  commonActions.portalSideMenuOpen();
  menuItemsVerify.waitForEntityLinkVisibleAndClick(data.yourEntForChangeMIOrder3);
  menuItemsVerify.waitForViewPageIsDisplay(data.viewPageEntForChangeMIOrder3);
  // 24	Logoff
  await commonActions.logoutFromApp();
});
