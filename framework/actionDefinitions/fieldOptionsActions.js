// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');
const formPage = require('~pages/formPage');
const fieldOptionPage = require('~pages/fieldOptionPage');

module.exports = {
  async addLookupFieldOption(lookupAttributeName, columnName) {
    I.waitForVisible(formPage.buttons.attributeField, constants.SHORT_WAIT);
    I.click(formPage.buttons.attributeField);
    if (lookupAttributeName === 'att_text') {
      I.waitForVisible(fieldOptionPage.buttons.iconForSearchForText, constants.SHORT_WAIT);
      I.click(fieldOptionPage.buttons.iconForSearchForText);
      I.waitForVisible(fieldOptionPage.buttons.iconForSearchForEquals, constants.SHORT_WAIT);
      I.click(fieldOptionPage.buttons.iconForSearchForEquals);
      await commonActions.searchInTableAfterASpecificColumn(
        columnName,
        lookupAttributeName,
        fieldOptionPage.container.anchorContainerForFieldOption,
      );
    } else {
      await commonActions.searchInTableAfterASpecificColumn(
        columnName,
        lookupAttributeName,
        fieldOptionPage.container.anchorContainerForFieldOption,
      );
    }

    I.click(attributePage.buttons.okAttribute);
    I.waitForInvisible(attributePage.buttons.okAttribute, constants.SHORT_WAIT);
  },

  async selectLookupViewName(lookupViewName, columnViewName) {
    I.waitForVisible(fieldOptionPage.buttons.lookupAsDropdownViewButton, constants.SHORT_WAIT);
    I.click(fieldOptionPage.buttons.lookupAsDropdownViewButton);
    await commonActions.searchInTableAfterASpecificColumn(columnViewName, lookupViewName, attributePage.container.attributePopupLKPViewContainer);
    I.click(fieldOptionPage.buttons.okAttribute);
    I.waitForInvisible(fieldOptionPage.buttons.okAttribute, constants.SHORT_WAIT);
  },

  markLookupAsDropdown() {
    I.waitForVisible(formPage.buttons.lookupAsDropdownCheckbox, constants.SHORT_WAIT);
    I.click(formPage.buttons.lookupAsDropdownCheckbox);
  },
  uncheckShowEditButton() {
    I.waitForVisible(fieldOptionPage.checkbox.showEditButtonDefaultCheckbox, constants.SHORT_WAIT);
    I.click(fieldOptionPage.checkbox.showEditButtonDefaultCheckbox);
    I.waitForVisible(fieldOptionPage.checkbox.showEditButtonCheckedCheckbox, constants.SHORT_WAIT);
    I.click(fieldOptionPage.checkbox.showEditButtonCheckedCheckbox);
    I.waitForVisible(fieldOptionPage.checkbox.showEditButtonUnCheckCheckbox, constants.SHORT_WAIT);
  },

  uncheckShowInsertButton() {
    I.waitForVisible(fieldOptionPage.checkbox.showInsertButtonDefaultCheckbox, constants.SHORT_WAIT);
    I.click(fieldOptionPage.checkbox.showInsertButtonDefaultCheckbox);
    I.waitForVisible(fieldOptionPage.checkbox.showInsertButtonCheckedCheckbox, constants.SHORT_WAIT);
    I.click(fieldOptionPage.checkbox.showInsertButtonCheckedCheckbox);
    I.waitForVisible(fieldOptionPage.checkbox.showInsertButtonUnCheckCheckbox, constants.SHORT_WAIT);
  },

  markVirtualAttributeCheckbox() {
    I.waitForVisible(fieldOptionPage.checkbox.useVirtualAttributeCheckbox, constants.SHORT_WAIT);
    I.moveCursorTo(fieldOptionPage.checkbox.useVirtualAttributeCheckbox);
    I.click(fieldOptionPage.checkbox.useVirtualAttributeCheckbox);
  },

  markShowEditButton() {
    I.click(fieldOptionPage.checkbox.showEditButtonCheckbox);
  },

  addFieldOption() {
    I.waitForVisible(fieldOptionPage.tabs.fieldOptionsTab, constants.SHORT_WAIT);
    I.forceClick(fieldOptionPage.tabs.fieldOptionsTab);
    I.waitForVisible(fieldOptionPage.fields.noDataField, constants.SHORT_WAIT);
    I.click(formPage.buttons.insertFieldOption);
  },

  deleteFieldOption(sectionFieldOptions, attributeCode, deleteButton, popupDialogYes) {
    commonActions.navigateToFormStep(sectionFieldOptions);
    I.waitForVisible(formPage.buttons.insertFieldOption, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(attributeCode).inside(formPage.container.fieldOptionsTable), constants.SHORT_WAIT);
    commonActions.selectARowFromTableAfterText(attributeCode);
    // Click Delete
    commonActions.clickToolbarButton(deleteButton);
    // Click Confirm
    commonActions.clickPopupDialog(popupDialogYes);
  },

  async showRadioButtonAction(attributeName, columnDisplayName) {
    I.waitForVisible(formPage.buttons.attributeField, constants.SHORT_WAIT);
    I.click(formPage.buttons.attributeField);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, attributeName, attributePage.container.attributePopupLKPContainer);
    I.waitForClickable(attributePage.buttons.okAttribute, constants.SHORT_WAIT);
    I.click(attributePage.buttons.okAttribute);
    I.waitForClickable(formPage.buttons.radioButtonCheckbox, constants.SHORT_WAIT);
    I.click(formPage.buttons.radioButtonCheckbox);
  },

  async makeRequiredVAFieldOptions(attributeName, columnDisplayName, level) {
    I.waitForVisible(formPage.buttons.virtualAttributeField, constants.SHORT_WAIT);
    I.click(formPage.buttons.virtualAttributeField);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, attributeName, attributePage.container.virtualAttributeTableContainer);
    I.click(attributePage.buttons.okVirtualAttribute);
    I.waitForInvisible(attributePage.buttons.okVirtualAttribute, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.requiredLevelAttributeField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.requiredLevelAttributeField, level);
    I.pressKey(constants.KEY_ENTER);
  },

  async selectLookupVAFieldOptions(attributeName, columnDisplayName) {
    I.waitForVisible(formPage.buttons.virtualAttributeField, constants.SHORT_WAIT);
    I.click(formPage.buttons.virtualAttributeField);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, attributeName, attributePage.container.virtualAttributeTableContainer);
    I.click(attributePage.buttons.okVirtualAttribute);
    I.waitForInvisible(attributePage.buttons.okVirtualAttribute, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.checkboxes.lookupAsDropdownCheckbox);
    I.click(attributePage.checkboxes.lookupAsDropdownCheckbox);
  },

  async readOnlyFieldOption(attributeName, columnDisplayName) {
    I.waitForVisible(formPage.buttons.attributeField, constants.SHORT_WAIT);
    I.click(formPage.buttons.attributeField);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, attributeName, attributePage.container.attributePopupLKPContainer);
    I.waitForClickable(attributePage.buttons.okAttribute, constants.SHORT_WAIT);
    I.click(attributePage.buttons.okAttribute);
    I.waitForInvisible(attributePage.buttons.okAttribute, constants.SHORT_WAIT);
    I.waitForClickable(fieldOptionPage.checkbox.makeReadOnly, constants.SHORT_WAIT);
    I.click(fieldOptionPage.checkbox.makeReadOnly);
  },

  async makeRequiredFieldOptions(attributeName, columnDisplayName) {
    I.waitForVisible(formPage.buttons.attributeField, constants.SHORT_WAIT);
    I.click(formPage.buttons.attributeField);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, attributeName, attributePage.container.attributePopupLKPContainer);
    I.waitForClickable(attributePage.buttons.okAttribute, constants.SHORT_WAIT);
    I.click(attributePage.buttons.okAttribute);
    I.waitForInvisible(attributePage.buttons.okAttribute, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.requiredLevelAttributeField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.requiredLevelAttributeField, 'Required');
    I.pressKey(constants.KEY_ENTER);
  },

  // Access the first form 'insert' and check the validation for same attribute on Field option
  async accessInsertFormAddCodeAttrAgain(sectionDataForms, insertForm, fieldOptionsTab, attributeCode, errorMessage, columnDisplayName) {
    I.waitForVisible(fieldOptionPage.fields.inputEntityType, constants.SHORT_WAIT);
    commonActions.menuSectionExpand(sectionDataForms);
    commonActions.doubleClickValueFromTable(formPage.container.defaultContainerContent,
      insertForm);
    commonActions.navigateToFormStep(fieldOptionsTab);
    // I.waitForVisible(fieldOptionPage.tabs.fieldOptionsTab, constants.SHORT_WAIT);
    // I.click(fieldOptionPage.tabs.fieldOptionsTab);
    I.waitForVisible(locate('td').withText(attributeCode).inside('#ebsContainerContent_sys_entityformoptionfield_entityform'), constants.SHORT_WAIT);
    I.click(formPage.buttons.insertFieldOption);
    await this.makeRequiredFieldOptions(attributeCode, columnDisplayName);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY,
      errorMessage);
    commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      errorMessage,
    );
    commonActions.goBackToPreviousPage();
    I.waitForVisible(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForVisible(locate('td').withText(attributeCode).inside('#ebsContainerContent_sys_entityformoptionfield_entityform'), constants.SHORT_WAIT);
    I.waitForInvisible(fieldOptionPage.table.secondRowEntityFormTable, constants.SHORT_WAIT);
  },

  // Access the second form 'edit' and Code readonly attribute on Field option
  async accessEditFormAddCodeAttr(sectionDataForms, editForm, attributeCode, columnDisplayName){
    commonActions.menuSectionExpand(sectionDataForms);
    commonActions.doubleClickValueFromTable(formPage.container.defaultContainerContent,
      editForm);
    this.addFieldOption()
    await this.readOnlyFieldOption(attributeCode, columnDisplayName);
  },

  // Access the default form
  accessDefaultForm(sectionDataForms, defaultForm){
    I.waitForVisible(fieldOptionPage.fields.inputEntityType, constants.SHORT_WAIT);
    commonActions.menuSectionExpand(sectionDataForms);
    commonActions.doubleClickValueFromTable(formPage.container.defaultContainerContent,
      defaultForm);
  },

  // Add new entry in Portal
  addNewEntryInPortal(inputName) {
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, inputName);
    I.click(fieldOptionPage.checkbox.radioButtonYes);
  },

  async addEntityFormField(attribute, defaultValue, columnName) {
    I.waitForVisible(fieldOptionPage.fields.attributeField, constants.SHORT_WAIT);
    await this.addLookupFieldOption(attribute, columnName);
    if (attribute === 'att_text_area') {
      I.waitForVisible(attributePage.fields.defaultValueForTextArea, constants.SHORT_WAIT);
      I.fillField(attributePage.fields.defaultValueForTextArea, defaultValue);
    } else {
      I.waitForVisible(attributePage.fields.idDefaultValue, constants.SHORT_WAIT);
      I.click(attributePage.fields.idDefaultValue);
      I.fillField(attributePage.fields.defaultValue, defaultValue);
    }
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async insertEntityFromField(text, textDefaultValue, textArea, textAreaDefaultValue, numeric, numericDefaultValue, wholeNumber, wholeNumberDefaultValue, columnName) {
    this.addFieldOption();
    await this.addEntityFormField(text, textDefaultValue, columnName);
    this.addNewFieldOption();
    await this.addEntityFormField(textArea, textAreaDefaultValue, columnName);
    this.addNewFieldOption();
    await this.addEntityFormField(numeric, numericDefaultValue, columnName);
    this.addNewFieldOption();
    await this.addEntityFormField(wholeNumber, wholeNumberDefaultValue, columnName);
  },

  async insertAttEntityFromField(text, textArea, numeric, wholeNumber, columnName) {
    this.addFieldOption();
    await this.addAttEntityFormField(text, columnName);
    this.addNewFieldOption();
    await this.addAttEntityFormField(textArea, columnName);
    this.addNewFieldOption();
    await this.addAttEntityFormField(numeric, columnName);
    this.addNewFieldOption();
    await this.addAttEntityFormField(wholeNumber, columnName);
  },

  async addAttEntityFormField(attribute, columnName) {
    I.waitForVisible(fieldOptionPage.fields.attributeField, constants.SHORT_WAIT);
    await this.addLookupFieldOption(attribute, columnName);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addNewFieldOption() {
    I.waitForVisible(fieldOptionPage.tabs.fieldOptionsTab, constants.SHORT_WAIT);
    I.click(fieldOptionPage.tabs.fieldOptionsTab);
    I.waitForVisible(formPage.buttons.insertFieldOption, constants.SHORT_WAIT);
    I.click(formPage.buttons.insertFieldOption);
  },
};
