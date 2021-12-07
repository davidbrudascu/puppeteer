// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/virtualAttributeData');
// Pages
const commonPage = require('~pages/commonPage');
const vaPage = require('~pages/virtualAttributePage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  verifyVaDefaultCustomAttributes() {
    I.waitForVisible(vaPage.selector.attributeRequired, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.selector.attributeRequired, constants.SHORT_WAIT);
    // Verify attribute prop Text - Required
    I.seeElement(locate(vaPage.selector.attributeRequired)
      .withAttr({ id: vaPage.selector.vaAttributeTextId }));
  },

  verifyVaDefaultRelatedAttributes() {
    I.waitForElement(vaPage.fields.vaAttributeName, constants.SHORT_WAIT);
    // Verify attributes:
    // 1. Name - text ; has maxlength and tabindex
    I.seeElement(locate(vaPage.fields.vaAttributeName).withAttr({ maxlength: '100' }));
    I.seeElement(locate(vaPage.fields.vaAttributeName).withAttr({ tabindex: '0' }));
    // 2. Product: Lookup ; has class .dx-state-readonly
    I.seeElement(locate(vaPage.selector.vaAttributeLookupTableState)
      .withAttr({ id: vaPage.selector.vaAttributeRelatedProductId }));
    // 3. Related Value: readonly
    I.seeElement(locate(vaPage.fields.vaAttributeRelatedValue).withAttr({ 'aria-readonly': 'true' }));
    // 4. Related Code: readonly
    I.seeElement(locate(vaPage.fields.vaAttributeRelatedCode).withAttr({ 'aria-readonly': 'true' }));
    // 5. Related Currency: readonly"
    I.seeElement(locate(vaPage.fields.vaAttributeRelatedCurrency).withAttr({ 'aria-readonly': 'true' }));
    // 6. Related Description: readonly
    I.seeElement(locate(vaPage.fields.vaAttributeRelatedDescription).withAttr({ 'aria-readonly': 'true' }));
  },

  verifyVaDefaultOwnerAttributes() {
    I.waitForVisible(vaPage.fields.vaAttributeName, constants.SHORT_WAIT);
    // Verify your attributes:
    // 1. Name - text ; has maxlength and tabindex
    I.seeElement(locate(vaPage.fields.vaAttributeName).withAttr({ maxlength: '100' }));
    I.seeElement(locate(vaPage.fields.vaAttributeName).withAttr({ tabindex: '0' }));
    // 2. Product: Lookup ; has class .dx-state-readonly
    I.seeElement(locate(vaPage.selector.vaAttributeLookupTableState)
      .withAttr({ id: vaPage.selector.vaAttributeOwnerProductId }));
    // 3. Related Name: text ; has maxlength and tabindex
    I.seeElement(locate(vaPage.fields.vaAttributeRelatedName).withAttr({ maxlength: '100' }));
    I.seeElement(locate(vaPage.fields.vaAttributeRelatedName).withAttr({ tabindex: '0' }));
    // 4. Related Code: text ; has maxlength and tabindex
    I.seeElement(locate(vaPage.fields.vaAttributeOwnerCode).withAttr({ maxlength: '3' }));
    I.seeElement(locate(vaPage.fields.vaAttributeOwnerCode).withAttr({ tabindex: '0' }));
    // 5. Related Value: text ; has tabindex
    I.seeElement(locate(vaPage.fields.vaAttributeOwnerValue).withAttr({ tabindex: '0' }));
    // 6. Related Currency: Lookup ; has class .dx-state-readonly
    I.seeElement(locate(vaPage.selector.vaAttributeLookupTableState)
      .withAttr({ id: vaPage.selector.vaAttributeOwnerCurrencyId }));
  },

  verifyAndOpenRelatedOwnerEntityFromTable() {
    // Wait for any loader to vanish
    I.waitForInvisible({ class: commonPage.popup.loadIndicator }, constants.SHORT_WAIT);
    I.waitForVisible(vaPage.selector.vaMenuItemsTable, constants.SHORT_WAIT);
    // Verify if "Keyboard" is displayed in list
    commonVerify.verifyValueExistsInTable(vaPage.selector.vaMenuItemsTable,
      data.vaAttributeOwnerRelatedName);
    // Access it - double click
    commonActions.doubleClickValueFromTable(vaPage.selector.vaMenuItemsTable,
      data.vaAttributeOwnerRelatedName);
  },

  verifyHeaderItemsAttribute(nameHeaderVAAttribute, nameVAAttr)  {
    I.waitForVisible(vaPage.labels.headerItemsHolderLabel, constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withText(nameHeaderVAAttribute), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameVAAttr), constants.SHORT_WAIT);
  },

  verifyHeaderItemsAttrNotDisplayed(nameHeaderVAAttribute, nameVAAttr)  {
    I.waitForVisible(vaPage.labels.headerItemsHolderLabel, constants.SHORT_WAIT);
    I.waitForInvisible(locate('h5').withText(nameHeaderVAAttribute), constants.SHORT_WAIT);
    I.waitForInvisible(locate('span').withText(nameVAAttr), constants.SHORT_WAIT);
  },

  verifyRemoveHeaderVA(firstRecord, nameHeaderVADateAttribute, attributeDate, nameHeaderVALookupAttribute, nameHeaderVANameAttribute, name_02VA)  {
    commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, firstRecord);
    this.verifyHeaderItemsAttrNotDisplayed(nameHeaderVADateAttribute, attributeDate);
    this.verifyHeaderItemsAttrNotDisplayed(nameHeaderVALookupAttribute, firstRecord);
    this.verifyHeaderItemsAttribute(nameHeaderVANameAttribute, name_02VA);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },
};
