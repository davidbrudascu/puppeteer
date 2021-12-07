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
  editProductLookupTableValue() {
    // Click on "edit" icon for "Laptop"
    I.waitForVisible(vaPage.fields.vaAttributeProductLookupTableEdit, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.fields.vaAttributeProductLookupTableEdit, constants.SHORT_WAIT);
    I.click(vaPage.fields.vaAttributeProductLookupTableEdit);
    // Continue without saving
    // Change Value from 2000 to 3000
    I.switchToNextTab();
    I.waitForVisible(vaPage.fields.vaAttributeEntValue, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.vaAttributeEntValue, data.vaAttributeNewRelatedValue);
  },

  clickEditProductFromLookupTable() {
    // Click on "edit" icon for "Laptop"
    I.waitForVisible(vaPage.fields.vaAttributeProductLookupTableEdit, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.fields.vaAttributeProductLookupTableEdit, constants.SHORT_WAIT);
    I.click(vaPage.fields.vaAttributeProductLookupTableEdit);
  },

  selectLookUpAT_LocalizeVA(name) {
    I.waitForVisible(vaPage.buttons.dropdownLookupArrowAT_LocalizeVA, constants.SHORT_WAIT);
    I.click(vaPage.buttons.dropdownLookupArrowAT_LocalizeVA);
    I.waitForVisible(vaPage.buttons.okButtonLookupTableAT_LocalizeVA, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(name).inside(locate(vaPage.container.lookupContainerAT_LocalizeVA)), constants.SHORT_WAIT);
    I.click(locate('td').withText(name).inside(locate(vaPage.container.lookupContainerAT_LocalizeVA)));
    I.click(vaPage.buttons.okButtonLookupTableAT_LocalizeVA);
  },

  // Verify display name, change language, verify display name then modify it
  async verifyDnLocalizeVA(firstDisplayName, secondDisplayName, language) {
    // 3	Check if Display name is "CustomTest-EN"
    await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeDisplayName, firstDisplayName);
    // 4	Switch to "ro" language
    await commonActions.changeApplicationLanguage(language);
    // 5	Check again if display name is still "CustomTest-EN"
    await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeDisplayName, firstDisplayName);
    // 6	Update Display name to "CustomTest-RO"
    commonActions.fillField(vaPage.fields.vaAttributeDisplayName, secondDisplayName);
    // 7	Save and Close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Verify display name and update it
  async changeDisplayNameChangeLanguageLocalizeVA(firstDisplayName, secondDisplay, language) {
    // 9	Check if Display name is "Related Code-EN"
    await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeDisplayName, firstDisplayName);
    // 10	Update Display name to "Related Code-RO"
    commonActions.fillField(vaPage.fields.vaAttributeDisplayName, secondDisplay);
    // 11	Save and Reload
    commonActions.saveAndRefreshAction();
    // 12 Switch language again to "en"
    await commonActions.changeApplicationLanguage(language);
    // 13	Check again the display name "Related Code-EN"
    await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeDisplayName, firstDisplayName);
  },

  // Verify labels and add lookup
  async addVirtualAttributeEnLocalizeVA(insertBtn, nameLabel, lookupLabel, firstCustomLabel, secondCustomLabel, lookup, customInput) {
    // 17	Click on Insert
    commonActions.clickSidebarButton(insertBtn);
    // 18	Check if your attributes are: Name, Lookup, CustomTest-RO and Related Code-EN;
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.nameLabel, nameLabel);
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.lookupAT_LocalizeVALabel, lookupLabel);
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.customTestAT_LocalizeVALabel, firstCustomLabel);
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.relatedCodeAT_LocalizeVALabel, secondCustomLabel);
    // 19	Select from lookup "Name1";
    this.selectLookUpAT_LocalizeVA(lookup);
    // 20	Check if Value for Related Code-EN is "COD1EN"
    await commonVerify.verifyValueExistsInInput(vaPage.fields.relatedCodeEnAT_LocalizeVAField, customInput);
    // 21 Save and reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Verify labels and add lookup
  async addVirtualAttributeRoLocalizeVA(language, nameLabel, lookupLabel, firstCustomLabel, secondCustomLabel, lookup, customInput) {
    // 22	Switch to "ro" language
    await commonActions.changeApplicationLanguage(language);
    // 23	Check again if your attributes are: Name, Lookup, CustomTest-RO and RelatedCode-RO
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.nameLabel, nameLabel);
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.lookupAT_LocalizeVALabel, lookupLabel);
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.customTestAT_LocalizeVALabel, firstCustomLabel);
    await commonVerify.verifyValueExistsInLabel(vaPage.labels.relatedCodeAT_LocalizeVALabel, secondCustomLabel);
    // 24	Select a value from lookup "Name1"
    this.selectLookUpAT_LocalizeVA(lookup);
    // 25	Check if Value for Related Code-EN is "COD1RO"
    await commonVerify.verifyValueExistsInInput(vaPage.fields.relatedCodeEnAT_LocalizeVAField, customInput);
  },

  clickOkPopupTableButton(okPopupButton) {
    I.waitForVisible(okPopupButton);
    I.waitForClickable(okPopupButton);
    I.click(okPopupButton);
    I.waitForInvisible(okPopupButton);
  },

  addVirtualAttributeHeaderItems(nameHeaderVATextAttribute, virtualAttr) {
    I.waitForVisible(vaPage.buttons.insertNewHeaderItems, constants.SHORT_WAIT);
    I.click(vaPage.buttons.insertNewHeaderItems);
    I.waitForVisible(vaPage.fields.labelHeaderVAField, constants.SHORT_WAIT);
    I.click(vaPage.fields.labelHeaderVAField);
    I.fillField(vaPage.fields.labelHeaderVAField, nameHeaderVATextAttribute);
    I.waitForVisible(vaPage.checkbox.useVirtualAttribute, constants.SHORT_WAIT);
    I.click(vaPage.checkbox.useVirtualAttribute);
    I.waitForVisible(vaPage.buttons.dropdownVirtualAttributeId, constants.SHORT_WAIT);
    I.click(vaPage.buttons.dropdownVirtualAttributeId);
    commonActions.fillInDropdownLookupTableWithValue(vaPage.container.virtualAttributeTableContainer, virtualAttr);
    I.waitForVisible(vaPage.buttons.okPopupVirtualAttributeBtn, constants.SHORT_WAIT);
    I.click(vaPage.buttons.okPopupVirtualAttributeBtn);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  removeLookupAttributeFromForm() {
    I.waitForVisible(vaPage.buttons.dropdownLookup02_to_01Button, constants.SHORT_WAIT);
    I.click(vaPage.buttons.dropdownLookup02_to_01Button);
    I.waitForVisible(vaPage.buttons.removeLookupAttributeButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.removeLookupAttributeButton);
    I.waitForInvisible(vaPage.buttons.removeLookupAttributeButton, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
  },

  async removeTwoHeaderItems(nameHeaderVADateAttribute, nameHeaderVALookupAttribute, nameHeaderVANameAttribute) {
    await commonActions.selectCheckboxOfaRow(nameHeaderVADateAttribute);
    await commonActions.selectCheckboxOfaRow(nameHeaderVALookupAttribute);
    I.waitForClickable(vaPage.buttons.deleteHeaderItemsButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.deleteHeaderItemsButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForVisible(locate('td').withText(nameHeaderVANameAttribute).inside(vaPage.container.entityFormHeaderItemContainer));
    I.waitForInvisible(locate('td').withText(nameHeaderVADateAttribute).inside(vaPage.container.entityFormHeaderItemContainer));
    I.waitForInvisible(locate('td').withText(nameHeaderVALookupAttribute).inside(vaPage.container.entityFormHeaderItemContainer));
  },

  addNewRecordRemoveHeaderItems(clickToInsert, secondRecord, nameVA, nameVATextAttr, thirdRecord, attributeDate) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(vaPage.fields.inputName01Field, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.fields.inputName01Field, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputName01Field, secondRecord);
    I.fillField(vaPage.fields.inputNameVAField, nameVA);
    I.fillField(vaPage.fields.inputNameAtt_textVAField, nameVATextAttr);
    I.waitForVisible(vaPage.buttons.dropdownLookup02_to_01Button, constants.SHORT_WAIT);
    I.click(vaPage.buttons.dropdownLookup02_to_01Button);
    commonActions.fillInDropdownLookupTableWithValue(vaPage.container.popupLkpGridContainer, thirdRecord);
    I.waitForVisible(vaPage.buttons.okPopupLookupgridButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.okPopupLookupgridButton);
    I.waitForInvisible(vaPage.buttons.okPopupLookupgridButton, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputNameAtt_DateVAField, attributeDate);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addNewRecordEditHeaderVa(clickToInsert, firstRecord, nameVATextAttr, nameVA, attributeDate) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(vaPage.fields.inputName01Field, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.fields.inputName01Field, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputName01Field, firstRecord);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.refreshPage();
    commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, firstRecord);
    I.waitForVisible(vaPage.fields.inputNameAtt_textVAField, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputNameAtt_textVAField, nameVATextAttr);
    I.fillField(vaPage.fields.inputNameVAField, nameVA);
    I.fillField(vaPage.fields.inputNameAtt_DateVAField, attributeDate);
    I.waitForVisible(vaPage.buttons.dropdownLookup02_to_01Button, constants.SHORT_WAIT);
    I.click(vaPage.buttons.dropdownLookup02_to_01Button);
    commonActions.fillInDropdownLookupTableWithValue(vaPage.container.popupLkpGridContainer, firstRecord);
    I.waitForVisible(vaPage.buttons.okPopupLookupgridButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.okPopupLookupgridButton);
    I.waitForInvisible(vaPage.buttons.okPopupLookupgridButton, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  editRecordHeaderVirtualAttribute(nameVAUpdate, nameVATextAttrUpdate, attributeDateUpdate) {
    I.fillField(vaPage.fields.inputNameVAField, nameVAUpdate);
    I.fillField(vaPage.fields.inputNameAtt_textVAField, nameVATextAttrUpdate);
    I.fillField(vaPage.fields.inputNameAtt_DateVAField, attributeDateUpdate);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addNewRecordCreateHeaderVa(clickToInsert, firstRecord, nameVA, nameVATextAttr, nameVANumericAttr, attributeDate, attributeInvariantDate) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(vaPage.fields.inputName01Field, constants.SHORT_WAIT);
    I.waitForClickable(vaPage.fields.inputName01Field, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputName01Field, firstRecord);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.refreshPage();
    commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, firstRecord);
    I.waitForVisible(vaPage.fields.inputNameVAField, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputNameVAField, nameVA);
    I.fillField(vaPage.fields.inputNameAtt_textVAField, nameVATextAttr);
    I.fillField(vaPage.fields.inputNameAtt_numericVAField, nameVANumericAttr);
    I.waitForVisible(vaPage.buttons.dropdownLookup02_to_01Button, constants.SHORT_WAIT);
    I.click(vaPage.buttons.dropdownLookup02_to_01Button);
    commonActions.fillInDropdownLookupTableWithValue(vaPage.container.popupLkpGridContainer, firstRecord);
    I.waitForVisible(vaPage.buttons.okPopupLookupgridButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.okPopupLookupgridButton);
    I.waitForInvisible(vaPage.buttons.okPopupLookupgridButton, constants.SHORT_WAIT);
    I.fillField(vaPage.fields.inputNameAtt_DateVAField, attributeDate);
    I.fillField(vaPage.fields.inputNameAtt_InvarDateVAField, attributeInvariantDate);
    I.click(vaPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  emptyValuesForHeaderItems() {
    I.click(vaPage.fields.inputNameAtt_textVAField);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.click(vaPage.fields.inputNameAtt_numericVAField);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.waitForClickable(vaPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(vaPage.buttons.finishButton);
  },

  navigateToPreviousTab() {
    I.switchToPreviousTab();
  },

  refreshPage() {
    I.refreshPage();
  },

  navigateToNextTab() {
    I.switchToNextTab();
  },

  closeCurrentTab() {
    I.closeCurrentTab();
  },

  closeOtherTabs() {
    I.closeOtherTabs();
  },
};
