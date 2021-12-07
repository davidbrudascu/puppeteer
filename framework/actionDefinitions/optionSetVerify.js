// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const optionSetPage = require('~pages/optionSetPage');


const I = actor();

module.exports = {
  verifyAllAddedValueDisplayed(firstName, secondName, thirdName, firstValue, secondValue, thirdValue) {
    // All added values are displayed in OptionItems list
    I.waitForVisible(locate('td').withText(firstName).inside(locate('tr').withAttr({'aria-rowindex':'1'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(firstValue).inside(locate('tr').withAttr({'aria-rowindex':'1'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(secondName).inside(locate('tr').withAttr({'aria-rowindex':'2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(secondValue).inside(locate('tr').withAttr({'aria-rowindex':'2'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(thirdName).inside(locate('tr').withAttr({'aria-rowindex':'3'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(thirdValue).inside(locate('tr').withAttr({'aria-rowindex':'3'})), constants.SHORT_WAIT);
  },

  verifyAllValueDisplayedInPopupOptionSet(nameSOptionSetItem, nameMOptionSetItem, nameLOptionSetItem, valueTenOptionSetItem, valueTwentyOptionSetItem, valueThirtyOptionSetItem){
    // All added values are displayed in OptionItems list
    I.waitForVisible(optionSetPage.labels.waitForPopupOptionSetList, constants.SHORT_WAIT);
    I.waitForVisible(optionSetPage.labels.columnNameOptionSet, constants.SHORT_WAIT);
    I.waitForVisible(optionSetPage.labels.columnValueOptionSet, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameSOptionSetItem).withAttr({'aria-colindex':'2'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(valueTenOptionSetItem).withAttr({'aria-colindex':'3'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameMOptionSetItem).withAttr({'aria-colindex':'2'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(valueTwentyOptionSetItem).withAttr({'aria-colindex':'3'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameLOptionSetItem).withAttr({'aria-colindex':'2'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(valueThirtyOptionSetItem).withAttr({'aria-colindex':'3'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})), constants.SHORT_WAIT);
  },

  async verifyOSAttributeValue(valueOptionSet){
    // 21	Check if "OS Attribute" value is "M"
    I.waitForVisible(optionSetPage.fields.nameOsAttributeField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputValueOsAttributeField, valueOptionSet);
  },

  async verifyNameAndIDOptionSetItem(optionSetItemOPT1, idReadonly){
    // 4	Check if Name is OPT1 - readonly
    I.waitForVisible(optionSetPage.fields.statusIdField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputNameReadOnly, optionSetItemOPT1)
    // 5	Check the Id - readonly
    await commonVerify.verifyValueExistsInInputReadOnly(optionSetPage.fields.inputIdReadOnly, idReadonly)
  },

  verifyErrorMessage(errorMessage){
    //Verify error message displayed
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessage);
    I.waitForVisible(optionSetPage.buttons.closeErrorMessage, constants.SHORT_WAIT);
    I.click(optionSetPage.buttons.closeErrorMessage);
  },

  verifyOptionSetItemsAvailable(optionSetItemOPT1,optionSetItemOPT2,optionSetItemOPT3){
    // 11	Check if all 3 items are available: "OPT1" "OPT2" and "OPT3"
    I.waitForVisible(locate('td').withText(optionSetItemOPT1).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemOPT2).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemOPT3).inside(locate('tr')), constants.SHORT_WAIT);
  },

  verifyIfOptionSetItemDeleted(optionSetItemOPT3){
    I.waitForInvisible(locate('td').withText(optionSetItemOPT3).inside(locate('tr')), constants.SHORT_WAIT);
  },

  verifyOnlyTwoOptionSetItems(optionSetItemOPT1, optionSetItemOPT2){
    // Check if there are only 2 items available: "OPT1" and "OPT2"
    I.waitForVisible(locate('td').withText(optionSetItemOPT1).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(optionSetItemOPT2).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForInvisible(optionSetPage.table.thirdColumnFieldTable, constants.SHORT_WAIT);
  },

  verifyOrderOptionSetItems(optionSetItemValue1, optionSetItemValue2, optionSetItemValue3, optionSetItemNone){
    // Check the new values and order: "OPT2", "OPT4 DN"and "OPT1 Updated"
    const valueNoneOptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemNone));
    const value2OptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemValue1));
    const value1OptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemValue2));
    const value3OptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemValue3));
    I.waitForVisible(valueNoneOptionSet.before(value2OptionSet), constants.SHORT_WAIT);
    I.waitForVisible(value2OptionSet.before(value1OptionSet), constants.SHORT_WAIT);
    I.waitForVisible(value1OptionSet.before(value3OptionSet), constants.SHORT_WAIT);
    I.click(locate('p').withText(optionSetItemValue2));
  },

  verifyOrderOptionSetItemsOrder(optionSetItemValue1, optionSetItemValue2, optionSetItemValue3, optionSetItemNone){
    // Check items order (Value2, Value1 and Value3)
    const valueNoneOptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemNone));
    const value2OptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemValue2));
    const value1OptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemValue1));
    const value3OptionSet = locate('.dx-list-item').withDescendant(locate('p').withText(optionSetItemValue3));
    I.waitForVisible(valueNoneOptionSet.before(value2OptionSet), constants.SHORT_WAIT);
    I.waitForVisible(value2OptionSet.before(value1OptionSet), constants.SHORT_WAIT);
    I.waitForVisible(value1OptionSet.before(value3OptionSet), constants.SHORT_WAIT);
    I.click(locate('p').withText(optionSetItemValue2));
  },
};
