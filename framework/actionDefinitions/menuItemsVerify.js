// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const menuItemPage = require('~pages/menuItemPage');

const I = actor();

module.exports = {
  verifyEntityViewFormDisplayed(updateDisplayName, viewNameViewLevelDN, columnName, columnCode) {
    // 	Click on "Entity Menu View Form" -> view page is displayed searchMenuHolder
    I.fillField(locate('input').withAttr({ id: 'mainMenuSearchInput' }), updateDisplayName);
    I.waitForVisible(locate('a').withText(updateDisplayName).inside(locate('div').withAttr({ id: 'menuSideScroll' })), constants.SHORT_WAIT);
    I.click(locate('a').withText(updateDisplayName).inside(locate('div').withAttr({ id: 'menuSideScroll' })));
    //	Check view name: "View Level DN"
    I.waitForVisible(locate('h5').withText(viewNameViewLevelDN).inside(locate('div').withAttr({ id: 'listViewContainerId' })), constants.SHORT_WAIT);
    // 	Check column (Name and Code)
    I.waitForVisible(locate('div').withText(columnName).inside(locate('td').withAttr({ 'aria-label': 'Column Name' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnCode).inside(locate('td').withAttr({ 'aria-label': 'Column Code' })), constants.SHORT_WAIT);
  },

  verifyInsertMenuDisplayed(checkEntityForm, columnName, columnCode, columnValue) {
    // 	Verify if "insertMenu" form is displayed (Name and Code attributes are displayed; Value is not displayed)
    I.waitForVisible(locate('h4').withText(checkEntityForm), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(columnValue), constants.SHORT_WAIT);
  },

  verifyEditMenuDisplayed(checkEditEntityForm, columnName, columnCode, columnValue) {
    //	Verify if editMenu form is displayed (only Name is displayed; Code and value are not displayed)
    I.waitForVisible(locate('h4').withText(checkEditEntityForm), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(columnValue), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(columnCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
  },

  verifyViewNameEntityDisplayed(checkViewNameForm, columnName, nameUpdate, columnCode, columnValue) {
    // 	Check view name "AT_EntMenuViewForm" and column: Name
    I.waitForVisible(locate('h5').withText(checkViewNameForm), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName).inside(locate('td').withAttr({ 'aria-label': 'Column Name' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameUpdate).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(columnValue), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(columnCode).withAttr({ 'aria-label': 'Column Code' }), constants.SHORT_WAIT);
  },

  verifyDefaultFormDisplayed(checkDefaultForm, columnName, columnCode, columnValue) {
    // 	Verify if "default" form is displayed (Name, Code and Value attributes are displayed)
    I.waitForVisible(locate('h4').withText(checkDefaultForm), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnCode), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnValue), constants.SHORT_WAIT);
  },

  async verifyDefaultFormStillDisplayed(editEntityViewForm, checkDefaultForm, columnName, columnCode, columnValue, nameValue, codeValue, valueValue) {
    // 	Verify if "default" form is still displayed (Name, Code and Value attributes are displayed) with value
    I.waitForVisible(locate('span').withText(editEntityViewForm), constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(checkDefaultForm), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnCode), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnValue), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name'})), nameValue);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code'})), codeValue);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value'})), valueValue);
  },

  waitForMenuSectionLabelVisible(waitForVisibleItem){
    I.waitForVisible(locate('label').withText(waitForVisibleItem), constants.SHORT_WAIT);
  },

  waitForMenuSectionLabelVisibleAndClick(waitForVisibleItem){
    I.waitForVisible(locate('label').withText(waitForVisibleItem), constants.SHORT_WAIT);
    I.click(locate('label').withText(waitForVisibleItem));
  },

  waitForMenuSectionLabelInvisible(waitForInvisibleItem){
    I.waitForInvisible(locate('label').withText(waitForInvisibleItem), constants.SHORT_WAIT);
  },

  waitForEntityLinkVisible(waitForVisibleItem){
    I.waitForVisible(locate('a').withText(waitForVisibleItem), constants.SHORT_WAIT);
  },

  waitForEntityLinkVisibleAndClick(waitForVisibleItem){
    I.waitForVisible(locate('a').withText(waitForVisibleItem), constants.SHORT_WAIT);
    I.click(locate('a').withText(waitForVisibleItem));
  },

  waitForEntityLinkInvisible(waitForInvisibleItem){
    I.waitForInvisible(locate('a').withText(waitForInvisibleItem), constants.SHORT_WAIT);
  },

  waitForViewPageIsDisplay(viewPageIsDisplay){
    I.waitForVisible(locate('h5').withText(viewPageIsDisplay), constants.SHORT_WAIT);
  },

  waitForViewPageContentIsDisplay(viewPageIsDisplay){
    I.waitForVisible(locate('h4').withText(viewPageIsDisplay), constants.SHORT_WAIT);
  },

  searchAfterEntityLinkInvisible(searchAfterEntity){
    commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, searchAfterEntity);
    I.waitForInvisible(locate('a').withText(searchAfterEntity), constants.SHORT_WAIT);
  },

  searchAfterEntityLinkVisible(searchAfterEntity) {
    commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, searchAfterEntity);
    I.waitForVisible(locate('a').withText(searchAfterEntity), constants.SHORT_WAIT);
  },

  searchAfterEntityLinkVisibleAndClick(searchAfterEntity) {
    commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, searchAfterEntity);
    I.waitForVisible(locate('a').withText(searchAfterEntity), constants.SHORT_WAIT);
    I.click(locate('a').withText(searchAfterEntity));
  },

  verifyEntitiesForDeleteMenuItems(businessEntity, yourEntityDeleteMI2, yourEntityDeleteMI3, entityReport, entityATReport, customJourney, entityATCustomJourney){
    // Check if there are 3 entities (1 Entity, 1 CUJ and 1 Report)
    I.waitForVisible(locate('div').withText(businessEntity).inside(locate('td').withAttr({ 'aria-colindex': '4' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntityDeleteMI2).withAttr({ 'aria-colindex': '4' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntityDeleteMI3).withAttr({ 'aria-colindex': '4' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(entityReport).inside(locate('td').withAttr({ 'aria-colindex': '5' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(entityATReport).withAttr({ 'aria-colindex': '5' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(customJourney).inside(locate('td').withAttr({ 'aria-colindex': '6' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(entityATCustomJourney).withAttr({ 'aria-colindex': '6' }), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(menuItemPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
  },

  verifyEntitiesForDisableMenuItems(businessEntity, yourEntityDeleteMI2, yourEntityDeleteMI3, entityReport, entityATReport, customJourney, entityATCustomJourney){
    // Check if there are 3 entities (1 Entity, 1 CUJ and 1 Report)
    I.waitForVisible(locate('div').withText(businessEntity).inside(locate('td').withAttr({ 'aria-colindex': '4' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntityDeleteMI2).withAttr({ 'aria-colindex': '4' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntityDeleteMI3).withAttr({ 'aria-colindex': '4' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(entityReport).inside(locate('td').withAttr({ 'aria-colindex': '5' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(entityATReport).withAttr({ 'aria-colindex': '5' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(customJourney).inside(locate('td').withAttr({ 'aria-colindex': '6' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(entityATCustomJourney).withAttr({ 'aria-colindex': '6' }), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(menuItemPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
  },

  verifyMenuItemsBeforeDelete(yourEntForChangeMIOrder1, yourEntForChangeMIOrder2, yourEntForChangeMIOrder3, yourSubMenuChangeOrder, yourCujForChangeMIOrder){
    //verify Menu Items before delete
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder1, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder2).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder2, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourSubMenuChangeOrder).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder3, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder3).inside(locate('tr').withAttr({ 'aria-rowindex': '4' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder4, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourCujForChangeMIOrder).inside(locate('tr').withAttr({ 'aria-rowindex': '5' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder5, constants.SHORT_WAIT);
  },

  verifyIfOrderIndexUpdatedAfterDelete(yourEntForChangeMIOrder1, yourEntForChangeMIOrder3, yourSubMenuChangeOrder, yourCujForChangeMIOrder){
    //	verify if order index were updated
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder1, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourSubMenuChangeOrder).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder2, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder3).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder3, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourCujForChangeMIOrder).inside(locate('tr').withAttr({ 'aria-rowindex': '4' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder4, constants.SHORT_WAIT);
  },

  verifyOrderIndexAfterMoveOnTopOfMenuItem(yourCujForChangeMIOrder, yourEntForChangeMIOrder1, yourSubMenuChangeOrder, yourEntForChangeMIOrder3){
    // 10	Verify again if order index were updated
    I.waitForVisible(locate('td').withText(yourCujForChangeMIOrder).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder1, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder1).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder2, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourSubMenuChangeOrder).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder3, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntForChangeMIOrder3).inside(locate('tr').withAttr({ 'aria-rowindex': '4' })).last(), constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.table.tableIndexOrder4, constants.SHORT_WAIT);
  },

  verifyEntitiesAfterDeleteMenuItems(entityATReport,entityATCustomJourney, yourEntityDeleteMI2, yourEntityDeleteMI3){
    I.waitForInvisible(locate('td').withText(entityATReport).inside(locate('div').withAttr({id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_toolbar_item_2'})), constants.SHORT_WAIT);
    I.waitForInvisible(locate('td').withText(entityATCustomJourney).inside(locate('div').withAttr({id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_toolbar_item_2'})), constants.SHORT_WAIT);
    I.waitForInvisible(locate('td').withText(yourEntityDeleteMI2).inside(locate('div').withAttr({id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_toolbar_item_2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(yourEntityDeleteMI3), constants.SHORT_WAIT);
 },

  verifyMenuSectionOrder(switchMSChangeOrder1, switchMSChangeOrder2){
    // Verify if MS - Change order 2 is above of MS - Change Order 1
    const menuSection2 = locate('li').withAttr({ class: 'has-children primary' }).withDescendant(locate('label').withText(switchMSChangeOrder2));
    const menuSection1 = locate('li').withAttr({ class: 'has-children primary' }).withDescendant(locate('label').withText(switchMSChangeOrder1));
    I.waitForVisible(menuSection2.before(menuSection1), constants.SHORT_WAIT)
  },

  verifyItemsOrderInPortal(yourMSForChangeMIOrder, yourCujForChangeMIOrder, yourEntForChangeMIOrder1, yourSubMenuChangeOrder, yourEntForChangeMIOrder3){
    // 19	"Verify Items order:
    // 1. AT_CujForChangeMIOrder
    const msForChangeMIOrder = locate('label').withText(yourMSForChangeMIOrder);
    const at_CujForChangeMIOrder = locate('ul').withAttr({ class: 'expanded' }).withDescendant(locate('a').withText(yourCujForChangeMIOrder));
    I.waitForVisible(msForChangeMIOrder.before(at_CujForChangeMIOrder), constants.SHORT_WAIT)
    I.waitForVisible(locate('label').withText(yourMSForChangeMIOrder).before(locate('ul').withAttr({ class: 'expanded' }).withDescendant(locate('a').withText(yourCujForChangeMIOrder))), constants.SHORT_WAIT);
    // 2. AT_EntForChangeMIOrder1
    const at_CujForChangeMIOrder2 = locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourCujForChangeMIOrder));
    const at_EntForChangeMIOrder1 = locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourEntForChangeMIOrder1));
    I.waitForVisible(at_CujForChangeMIOrder2.before(at_EntForChangeMIOrder1), constants.SHORT_WAIT)
    I.waitForVisible(locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourCujForChangeMIOrder)).before(locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourEntForChangeMIOrder1))), constants.SHORT_WAIT);
    // 3. subMenuS - Change Order
    const subMenuSChangeOrder = locate('li').withAttr({ class: 'has-children' }).withDescendant(locate('label').withText(yourSubMenuChangeOrder));
    I.waitForVisible(at_EntForChangeMIOrder1.before(subMenuSChangeOrder), constants.SHORT_WAIT)
    I.waitForVisible(locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourEntForChangeMIOrder1)).before(locate('li').withAttr({ class: 'has-children' }).withDescendant(locate('label').withText(yourSubMenuChangeOrder))), constants.SHORT_WAIT);
    // 4. AT_EntForChangeMIOrder3"
    const at_EntForChangeMIOrder3 = locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourEntForChangeMIOrder3));
    I.waitForVisible(subMenuSChangeOrder.before(at_EntForChangeMIOrder3), constants.SHORT_WAIT)
    I.waitForVisible(locate('li').withAttr({ class: 'has-children' }).withDescendant(locate('label').withText(yourSubMenuChangeOrder)).before(locate('li').withAttr({ class: 'leaf-menu-item' }).withDescendant(locate('a').withText(yourEntForChangeMIOrder3))), constants.SHORT_WAIT);
  },
};
