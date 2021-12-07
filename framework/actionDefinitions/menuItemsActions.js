// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');

const I = actor();

module.exports = {
  insertNewMenuItemsChildrenGrid(){
    // Click on "Insert" from MENU ITEMS CHILDREN grid
    I.waitForVisible(menuItemPage.fields.menuItemsChildrenGridField, constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.buttons.insertNewMenuItemBtn, constants.SHORT_WAIT);
    I.wait(3);
    I.click(menuItemPage.buttons.insertNewMenuItemBtn);
  },

  selectTypeOfMenuItem(typeOfMenuItem) {
    // 	Select "Entity" from Type
    I.waitForVisible(menuItemPage.labels.addMenuItemBtn, constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.buttons.addMenuTypeListBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.addMenuTypeListBtn);
    I.waitForVisible(locate('p').withText(typeOfMenuItem).inside(locate('div').withAttr({ role: 'option' })), constants.SHORT_WAIT);
    I.click(locate('p').withText(typeOfMenuItem).inside(locate('div').withAttr({ role: 'option' })));
  },

  selectYourEntity(yourEntity){
    // 	Select your entity "AT_EntMenuViewForm"
    I.waitForVisible(menuItemPage.labels.businessEntityField, constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.buttons.entityIdDropboxBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.entityIdDropboxBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.entityDataGrid, yourEntity);
  },

  selectYourCustomJourneyEntity(yourEntity){
    // 	Select your Custom Journey entity
    I.waitForVisible(menuItemPage.labels.customJourneyEntityField, constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.buttons.customIdDropboxBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.customIdDropboxBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.customDataGrid, yourEntity);
  },

  selectYourReportEntity(yourEntity){
    // 	Select your Report entity
    I.waitForVisible(menuItemPage.labels.reportEntityField, constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.buttons.reportEntityBtn, constants.SHORT_WAIT);
    I.waitForVisible(menuItemPage.buttons.reportEntityDropboxBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.reportEntityDropboxBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.reportDataGrid, yourEntity);
    I.click(menuItemPage.buttons.okReportDropboxBtn);
  },

  selectYourEntityView(entityView){
    // 	Select view "menuView"
    I.waitForVisible(menuItemPage.buttons.entityViewBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.entityViewBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.viewEntityGrid, entityView);
  },

  insertEntityForm(entityForm){
    // 	Select insert form "insertMenu"
    I.waitForVisible(menuItemPage.buttons.insertEntityFormBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.insertEntityFormBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.entityFormIdGrid, entityForm);
  },

  insertEditEntityForm(editEntityForm){
    // 	Select Edit form "editMenu"
    I.waitForVisible(menuItemPage.buttons.insertEditEntityFormBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.insertEditEntityFormBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.editEntityFormIdGrid, editEntityForm);
    I.waitForVisible(menuItemPage.buttons.insertEditEntityFormBtn, constants.SHORT_WAIT);
    I.click(menuItemPage.buttons.insertEditEntityFormBtn);
    commonActions.fillInDropdownLookupTableWithValue(menuItemPage.labels.editEntityFormIdGrid, editEntityForm);
  },

  uncheckMenuDisplayNameAsViewTitle() {
    // UnCheck "Use Menu Display Name as View Title"
    I.waitForVisible(menuItemPage.checkbox.useMenuDisplayName, constants.SHORT_WAIT);
    I.click(menuItemPage.checkbox.useMenuDisplayName);
  },

  fillNameAndCodeValues(nameValue, codeValue) {
    // 	Fill in Name and Code with: Auto Test Form View 1/ATFV1
    I.fillField(menuItemPage.fields.inputNameField, nameValue);
    I.fillField(menuItemPage.fields.inputCodeField, codeValue);
  },

  fillNameUpdate(nameUpdate) {
    // 	Update Name: Auto Test Form View Updated
    I.fillField(menuItemPage.fields.inputNameField, nameUpdate);
  },

  fillNameValueAndCodeValues(nameValue, codeValue, valueValue) {
    // 	Fill in Name, Code and Value: Auto Test Insert 1, ATI1, 100
    I.fillField(menuItemPage.fields.inputNameField, nameValue);
    I.fillField(menuItemPage.fields.inputCodeField, codeValue);
    I.fillField(menuItemPage.fields.inputValueField, valueValue);
  },

  deleteYourMenuSection() {
    //	Delete your Menu Section
  I.click(menuItemPage.buttons.deleteMenuSectionBtn);
  I.waitForVisible(commonPage.buttons.yesAnswerButton);
  I.click(commonPage.buttons.yesAnswerButton);
  },

  accessYourMenuSectionAndWaitAnEntity(menuSectionDelete, waitUntilYourEntityOccur) {
    // 	Access your Menu Section (MenuSection Delete)
    I.waitForVisible(locate('td').withText(menuSectionDelete).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.click(locate('td').withText(menuSectionDelete).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last());
    I.doubleClick(locate('td').withText(menuSectionDelete).last());
    I.click(locate('td').withText(menuSectionDelete).last());
    I.waitForVisible(locate('td').withText(waitUntilYourEntityOccur).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
  },

  accessYourEntityMenuItem(yourEntity){
    I.waitForVisible(locate('td').withText(yourEntity).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.scrollTo(locate('td').withText(yourEntity).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last());
    I.wait(2);
    commonActions.doubleClickValueFromTable(menuItemPage.container.defaultContainer, yourEntity);
    I.wait(3);
    I.waitForVisible(menuItemPage.fields.resultForNodataInTable, constants.SHORT_WAIT);
  },

  accessYourCustomEntityMenuItem(entityATCustomJourney){
    I.waitForVisible(locate('td').withText(entityATCustomJourney).inside(locate('tr').withAttr( { 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.wait(2);
    commonActions.doubleClickValueFromTable(menuItemPage.container.childrenMenuItemsContainer, entityATCustomJourney);
    I.wait(3);
    I.waitForVisible(menuItemPage.fields.resultForNodataInTable, constants.SHORT_WAIT);
  },

  accessYourReportEntityMenuItem(entityATReport){
    I.waitForVisible(locate('td').withText(entityATReport).inside(locate('tr').withAttr( { 'aria-rowindex': '1' })).last(), constants.SHORT_WAIT);
    I.wait(2);
    commonActions.doubleClickValueFromTable(menuItemPage.container.childrenMenuItemsContainer, entityATReport);
    I.wait(3);
    I.waitForVisible(menuItemPage.fields.resultReportForNodataInTable, constants.SHORT_WAIT);
  },

  deleteYourMenuSectionAndVerifyEmptyTable() {
    //	Delete your Menu Section
    I.click(menuItemPage.buttons.deleteMenuSectionBtn);
    I.waitForVisible(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.dontSee(commonPage.checkbox.selectSingleResultCheckbox);
  },

  waitForFirstRowInTableAndSelected(valueForWait){
    I.waitForVisible(locate('td').withText(valueForWait).inside(locate('tr').withAttr({ 'aria-rowindex': '1' }).withAttr({ 'aria-selected': 'true' })), constants.SHORT_WAIT);
  },

  waitForFirstRowInTable(valueForWait){
    I.waitForVisible(locate('td').withText(valueForWait).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside('#ebsContainerContent_menuItem_parentMenuItemid_menuItem_children'), constants.SHORT_WAIT);
  },

  waitForSecondRowInTable(valueForWait){
    I.waitForVisible(locate('td').withText(valueForWait).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })).inside('#ebsContainerContent_menuItem_parentMenuItemid_menuItem_children'), constants.SHORT_WAIT);
  },

  unselectSecondTableRow(){
    I.waitForVisible(menuItemPage.checkbox.divForCheckForAll, constants.SHORT_WAIT);
    I.click(menuItemPage.checkbox.selectAllRecordsFromTale);
    I.click(menuItemPage.checkbox.unselectSecondElementFromTable);
  },

  checkDisableOptionMenuItem() {
    // 	Check "Disabled" option
    I.waitForVisible(menuItemPage.checkbox.disableMenuItemCheckbox, constants.SHORT_WAIT);
    I.click(menuItemPage.checkbox.disableMenuItemCheckbox);
  },

  clearAndSearchAfterInMenuPortal(){
    I.click(menuItemPage.fields.clearSearchFieldPortal);
    commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, 'MS');
  },

  async switchMenuItemsOrder(switchMSChangeOrder1, switchMSChangeOrder2, yourMSChangeOrder, columnDisplayName) {
    //	Switch "MS - Change Order1" with "MS-Change Order2"
    I.waitForVisible(locate('td').withText(switchMSChangeOrder1).inside(locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children' })), constants.SHORT_WAIT);
    I.scrollTo(locate('td').withText(switchMSChangeOrder1));
    const orderIndex1 = await I.grabAttributeFrom(locate('tr').withAttr({ role: 'row' }).withDescendant(locate('td').withText(switchMSChangeOrder1)), 'aria-rowindex');
    const orderIndex2 = await I.grabAttributeFrom(locate('tr').withAttr({ role: 'row' }).withDescendant(locate('td').withText(switchMSChangeOrder2)), 'aria-rowindex');
    I.dragAndDrop(locate('td').withText(switchMSChangeOrder1), locate('td').withText(switchMSChangeOrder2));
    //	Verify if success message is displayed
    // 	Check if order index are updated (switched)
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('td').withText(switchMSChangeOrder1).inside(locate('tr').withAttr({ 'aria-rowindex': orderIndex2 })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(switchMSChangeOrder2).inside(locate('tr').withAttr({ 'aria-rowindex': orderIndex1 })), constants.SHORT_WAIT);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, yourMSChangeOrder, menuItemPage.container.childrenMenuItemsContainer);
    // commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, yourMSChangeOrder);
    I.waitForVisible(locate('td').withText(switchMSChangeOrder2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  moveMenuItemOnTopOfTable(firstMenuItem, secondMenuItem){
    //Move CUJ on top of table
  I.dragAndDrop(locate('td').withText('AT_CujForChangeMIOrder').inside(locate('tr').withAttr({ 'aria-rowindex': '4' })), locate('td').withText('AT_EntForChangeMIOrder1').inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
  },
};

