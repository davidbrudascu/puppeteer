// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const optionSetPage = require('~pages/optionSetPage');

const I = actor();

module.exports = {
  addNewOptionSetItem(name, displayName, valueName){
    // Add new option set item
    I.waitForVisible(optionSetPage.fields.valueDivInputField, constants.SHORT_WAIT);
    commonActions.fillField(optionSetPage.fields.inputNameField, name);
    commonActions.fillField(optionSetPage.fields.inputDisplayNameField, displayName);
    commonActions.fillField(optionSetPage.fields.inputValueNameField, valueName);
  },

  insertOptionSet(){
    // Click on "Insert" from Option set
    I.waitForVisible(optionSetPage.table.relationTableDisplayed, constants.SHORT_WAIT)
    I.waitForVisible(optionSetPage.buttons.insertOptionSetItemBtn, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.insertOptionSetItemBtn);
  },

  expandDataModel(){
    I.waitForVisible(optionSetPage.labels.dataModelLink, constants.SHORT_WAIT);
    I.click(optionSetPage.labels.dataModelLink);
    I.waitForVisible(optionSetPage.labels.attributeDataModelLabel, constants.SHORT_WAIT);
  },

  insertNewAttributeButton(){
    //  Click on "Insert" button
    I.waitForVisible(optionSetPage.buttons.insertNewAttributeBtn, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.insertNewAttributeBtn);
  },

  selectAttributeType(selectAttributeType) {
    // Select Attribute Type: "Option Set"
    I.waitForVisible(optionSetPage.buttons.selectTypeAttributeBtn, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.selectTypeAttributeBtn);
    I.waitForVisible(locate('p').withText(selectAttributeType), constants.SHORT_WAIT);
    I.click(locate('p').withText(selectAttributeType));
  },

  openOptionSetList() {
    // Open "Option set" list
    I.waitForVisible(optionSetPage.buttons.openOptionSetList, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.openOptionSetList);
  },

  searchForDisplayNameOfOptionSet(displayNameOfOptionSet){
    // Search for Option Set Name:
    commonActions.fillInDropdownLookupTableWithValue(optionSetPage.table.optionSetTableAnchor, displayNameOfOptionSet);
    I.waitForVisible(optionSetPage.buttons.okOptionSetListBtn, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.okOptionSetListBtn);
  },

  optionSetDefaultValue(){
    // Open "Option Set - default value" list
    I.wait(3);
    I.waitForVisible(optionSetPage.buttons.openOptionSetDefaultValue, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.openOptionSetDefaultValue);
  },

  selectRequiredLevel(requiredLevel){
    //	Select Required level: None
    I.click(optionSetPage.buttons.selectRequiredLevel);
    I.waitForVisible(locate('p').withText(requiredLevel), constants.SHORT_WAIT);
    I.click(locate('p').withText(requiredLevel));
  },

  selectOptionSetAttribute(nameMOptionSetItem){
    // Select value
    commonActions.selectARowFromTableAfterText(nameMOptionSetItem);
    // Click "ok"
    I.click(optionSetPage.buttons.okSelectedOptionSetItem);
    I.wait(3);
  },

  cancelOptionSetItemAttribute(){
    I.click(optionSetPage.buttons.cancelPopupButton);
    I.wait(3);
  },

  selectOSAttribute(optionSetItem){
    // Select OS Attribute value: L
    I.click(optionSetPage.buttons.selectOSAttribute);
    I.waitForVisible(locate('p').withText(optionSetItem), constants.SHORT_WAIT);
    I.click(locate('p').withText(optionSetItem));
  },

  accessOptionSetItem(optionSetItem){
    //	Access option set item
    I.waitForVisible(locate('td').withText(optionSetItem).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.click(locate('td').withText(optionSetItem).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    commonActions.doubleClickValueFromTable(optionSetPage.container.defaultContainer, optionSetItem);
  },

  deleteOptionSetItem(){
    //	Click on "Delete" button
    I.waitForVisible(optionSetPage.buttons.deleteOptionSetItemBtn, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.deleteOptionSetItemBtn);
    I.waitForVisible(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  changeOptionSetItems(optionSetItemValue1, optionSetItemValue2, optionSetItemValue3){
    I.waitForVisible(locate('td').withText(optionSetItemValue1).inside(locate('tr').withAttr({'aria-rowindex': '1'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue2).inside(locate('tr').withAttr({'aria-rowindex': '2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue3).inside(locate('tr').withAttr({'aria-rowindex': '3'})), constants.SHORT_WAIT);
    I.dragAndDrop(locate('td').withText(optionSetItemValue2).inside(locate('tr').withAttr({'aria-rowindex': '2'})), locate('td').withText(optionSetItemValue1).inside(locate('tr').withAttr({'aria-rowindex': '1'})));
    I.waitForVisible(locate('td').withText(optionSetItemValue2).inside(locate('tr').withAttr({'aria-rowindex': '1'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue1).inside(locate('tr').withAttr({'aria-rowindex': '2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue3).inside(locate('tr').withAttr({'aria-rowindex': '3'})), constants.SHORT_WAIT);
  },

  changeOptionSetItemsUpdated(optionSetItemValue1, optionSetItemValue2, optionSetItemValue3){
    I.waitForVisible(locate('td').withText(optionSetItemValue1).inside(locate('tr').withAttr({'aria-rowindex': '1'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue2).inside(locate('tr').withAttr({'aria-rowindex': '2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue3).inside(locate('tr').withAttr({'aria-rowindex': '3'})), constants.SHORT_WAIT);
    I.dragAndDrop(locate('td').withText(optionSetItemValue1).inside(locate('tr').withAttr({'aria-rowindex': '1'})), locate('td').withText(optionSetItemValue3).inside(locate('tr').withAttr({'aria-rowindex': '3'})));
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('td').withText(optionSetItemValue2).inside(locate('tr').withAttr({'aria-rowindex': '1'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue3).inside(locate('tr').withAttr({'aria-rowindex': '2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemValue1).inside(locate('tr').withAttr({'aria-rowindex': '3'})), constants.SHORT_WAIT);
  },

  selectOptionSetItem(optionSetItemOPT4){
    //	Drop-down optionset list
    I.click(optionSetPage.buttons.dropdownOptionSet1List);
    //	Select "OPT4"
    I.waitForVisible(locate('p').withText(optionSetItemOPT4), constants.SHORT_WAIT);
    I.click(locate('p').withText(optionSetItemOPT4));
  },

  selectFromDropdownOptionSetItems(){
    I.click(optionSetPage.buttons.dropdownoptionSet2List);
  },

  selectFromDropdownOptionSetList(){
    I.click(optionSetPage.buttons.dropdownoptionSetList);
  },
};

