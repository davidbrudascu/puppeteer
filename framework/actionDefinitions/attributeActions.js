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
const businessEntityPage = require('~pages/businessEntityPage');

module.exports = {

  addAttributeAction(attributeName, attributeDName, attributeTableColumnName,
    attributeType, requiredLevel) {
    commonActions.waitForLoadersToFinish();
    I.waitForInvisible(commonPage.buttons.loaderButton, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.attributeNameField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.attributeNameField, `${attributeName}_${requiredLevel}`);
    I.fillField(attributePage.fields.attributeDisplayNameField, `${attributeDName}_${requiredLevel}`);
    I.fillField(attributePage.dropdown.attributeType, attributeType);
    if (attributeType == 'Text') {
      I.click(locate('p').withText(attributeType).inside('.dx-scrollable-content').at(2));
    } else {
      I.pressKey(constants.KEY_ENTER);
    }
    I.fillField(attributePage.fields.tableColumnName, `${attributeTableColumnName}_${requiredLevel}`);
    if (requiredLevel == 'IsIdentity') {
      I.fillField(attributePage.dropdown.requiredLevel, 'None');
      I.pressKey(constants.KEY_ENTER);
      this.markIsIdentity();
    } else if (requiredLevel == 'ReadOnly') {
      I.fillField(attributePage.dropdown.requiredLevel, 'None');
      I.pressKey(constants.KEY_ENTER);
      this.markReadOnlyAction();
    } else {
      I.fillField(attributePage.dropdown.requiredLevel, requiredLevel);
      I.pressKey(constants.KEY_ENTER);
    }
  },

  markReadOnlyAction() {
    I.waitForVisible(attributePage.buttons.isRequired, constants.SHORT_WAIT);
    I.click(attributePage.buttons.isRequired);
  },

  markIsIdentity() {
    I.waitForVisible(attributePage.buttons.isIdentity, constants.SHORT_WAIT);
    I.click(attributePage.buttons.isIdentity);
  },

  insertAttributeAction() {
    I.waitForVisible(businessEntityPage.buttons.attributesSectionButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.attributesSectionButton);
    I.waitForInvisible(businessEntityPage.buttons.attributesSectionLoader, constants.SHORT_WAIT);
    I.waitForVisible(businessEntityPage.buttons.insertAttributeButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertAttributeButton);
    I.waitForVisible(attributePage.fields.attributeNameField, constants.SHORT_WAIT);
  },

  insertNewRecord() {
    I.waitForVisible(businessEntityPage.buttons.insertNewAttributeButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertNewAttributeButton);
  },

  fillTextAttributeAction(attributeTextLength) {
    I.waitForVisible(attributePage.fields.lengthField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.lengthField, attributeTextLength);
  },

  fillNumericAttributeAction(attributePrecision) {
    I.waitForVisible(attributePage.fields.precisionField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.precisionField, attributePrecision);
  },

  fillLookupAttributeAction(relatedEntityName) {
    I.waitForVisible(attributePage.buttons.lookupToEntityDropdown, constants.SHORT_WAIT);
    I.click(attributePage.buttons.lookupToEntityDropdown);
    I.waitForVisible(attributePage.fields.addLookupAttributeTable, constants.SHORT_WAIT);
    commonActions.fillInDropdownLookupTableWithValue(attributePage.fields.addLookupAttributeTable, relatedEntityName);
    I.click(commonPage.buttons.menuOk);
    I.waitForInvisible(commonPage.buttons.menuOk, constants.SHORT_WAIT);
  },

  searchForAttributeByNameAction(attributeName) {
    I.waitForInvisible(commonPage.buttons.loaderButton, constants.SHORT_WAIT);
    I.waitForVisible(businessEntityPage.buttons.attributesSectionButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.attributesSectionButton);
    I.waitForInvisible(businessEntityPage.buttons.attributesSectionLoader, constants.SHORT_WAIT);
    I.waitForVisible(businessEntityPage.buttons.insertAttributeButton, constants.SHORT_WAIT);
    I.waitForVisible(businessEntityPage.fields.attributeNameSearchField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.attributeNameSearchField, attributeName);
    I.waitForVisible(locate('td').withText(attributeName).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  renameAndChangeLengthAction(newAttributeName, newLength) {
    I.waitForVisible(attributePage.fields.attributeDisplayNameField, constants.SHORT_WAIT);
    I.waitForClickable(attributePage.fields.attributeDisplayNameField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.attributeDisplayNameField, newAttributeName);
    I.fillField(attributePage.fields.lengthField, newLength);
    I.fillField(attributePage.dropdown.requiredLevel, 'Required');
    I.pressKey(constants.KEY_ENTER);
  },

  selectProductFromTableRelationshipNameAndAdd(relationshipName, numberOfRow) {
    const tdselector = `#ebsContainerContent_${relationshipName} .dx-datagrid-rowsview table tr:nth-child(${numberOfRow}) > td`;
    I.waitForVisible(tdselector, constants.SHORT_WAIT);
    I.moveCursorTo(tdselector);
    within(tdselector, () => {
      I.click('.dx-checkbox-icon');
    });
  },

  fillUpdateNameAndValueAttribute(updatedNameOfAttribute, updatedValueOfAttribute) {
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), updatedNameOfAttribute);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), updatedValueOfAttribute);
  },

  selectAndDeleteAttribute(attributeName) {
    I.waitForVisible(locate('td').withText(attributeName).inside(locate('tr')).last(), constants.SHORT_WAIT);
    I.click(locate('td').withText(attributeName).inside(locate('tr')).last());
    I.scrollTo(locate('div').withText('Delete').inside(locate('div').withAttr({ id: 'ebsToolbar' })).last());
    commonActions.clickToolbarButton('Delete');
    I.waitForVisible(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  async fillVAMaxLengthConstraint(overMaxLength, maxLength) {
    I.waitForVisible(businessEntityPage.fields.inputLengthAttributeField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.inputLengthAttributeField, overMaxLength);
    // 4	Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 5	Check if Length is "4000"
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputLengthAttributeField, maxLength);
  },

  async fillAndVerifyVAMaxPrecisionConstraint(overMaxPrecision, maxPrecision) {
    // 7	Try to fill in Precision with: 9 -> you are not able
    I.waitForVisible(businessEntityPage.fields.inputPrecisionAttributeField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.inputPrecisionAttributeField, overMaxPrecision);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputPrecisionAttributeField, '');
    // 8	Fill in Precision with: 8
    I.waitForVisible(businessEntityPage.fields.inputPrecisionAttributeField, constants.SHORT_WAIT);
    I.waitForClickable(businessEntityPage.fields.inputPrecisionAttributeField, constants.SHORT_WAIT);
    I.click(businessEntityPage.fields.inputPrecisionAttributeField);
    I.fillField(businessEntityPage.fields.inputPrecisionAttributeField, maxPrecision);
    // 9	Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 10	Check if Precision is: 8
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputPrecisionAttributeField, maxPrecision);
  },

  async addVARelatedForMaxLength(forMaxLength, maxLength) {
    // 12	Click on "Insert"
    I.waitForVisible(businessEntityPage.buttons.insertVARelatedForMaxLength, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertVARelatedForMaxLength);
    // 13	Select "ForMaxLength"
    I.waitForVisible(businessEntityPage.selector.selectRelatedEntityAttribute, constants.SHORT_WAIT);
    I.click(businessEntityPage.selector.selectRelatedEntityAttribute);
    I.waitForVisible(locate('div').withText(forMaxLength).inside(locate('div').withAttr({ role: 'option' })), constants.SHORT_WAIT);
    I.click(locate('div').withText(forMaxLength).inside(locate('div').withAttr({ role: 'option' })));
    // 14	Check if Length is "4000"
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputLengthAttributeField, maxLength);
  },

  async addVARelatedForMaxPrecision(ForMaxPrecision, maxPrecision) {
    // 16	Select "ForMaxPrecision"
    I.waitForVisible(businessEntityPage.selector.selectRelatedEntityAttribute, constants.SHORT_WAIT);
    I.click(businessEntityPage.selector.selectRelatedEntityAttribute);
    I.waitForVisible(locate('div').withText(ForMaxPrecision).inside(locate('div').withAttr({ role: 'option' })), constants.SHORT_WAIT);
    I.click(locate('div').withText(ForMaxPrecision).inside(locate('div').withAttr({ role: 'option' })));
    // 17	Check if Precision is: 8
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputPrecisionAttributeField, maxPrecision);
  },

  async deleteEntityDltLookup(name) {
    // 3 Expand "Data Model" section
    I.waitForVisible(businessEntityPage.link.dataModelLink, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.dataModelLink);
    // 4 Check "AT_EntForDeleteLkpId" and delete it
    await commonActions.selectCheckboxOfaRow(name);
    I.click(businessEntityPage.buttons.deleteDataModelButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForInvisible(locate('td').withText(name).inside(businessEntityPage.container.dataModelTableContainer), constants.SHORT_WAIT);
    commonVerify.verifyValueDontExistsInTable(businessEntityPage.container.dataModelTableContainer, name);
  },

  changeEntityValuesDltLookup(entityName, newDisplayName) {
    // 5 Access "AT_EntForEditLkpId"
    commonActions.doubleClickValueFromTable(businessEntityPage.container.dataModelTableContainer, entityName);
    // 6 Update Display Name from "Lookup - TBU" to "Lookup - Updated"
    I.waitForVisible(businessEntityPage.fields.displayNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.displayNameField, newDisplayName);
    // 7 Check "Is Read-only"
    this.markReadOnlyAction();
    // 8 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  attachFileToInputAttribute(attributeDName, pathToFile, requiredLevel) {
    const inputElm = locate('input').withAttr({ type: 'file' }).inside(locate('div').withAttr({ id: `ebsContainerContent_${attributeDName}_${requiredLevel}` }));
    I.waitForElement(inputElm, constants.SHORT_WAIT);
    I.attachFile(inputElm, pathToFile);
    // Wait until it is attached
    I.waitForElement(locate('div').withChild(locate('div').withAttr({ class: 'file-link-holder label' })).inside(locate('div').withAttr({ id: `ebsContainerContent_${attributeDName}_${requiredLevel}` })), constants.SHORT_WAIT);
  },

  async addNewLookupAttribute(attributeName, attributeDisplayName, columnName, attributeType, requiredLevel, entityLkpAttr2, lookupRelationshipName) {
    this.insertAttributeAction();
    this.addAttributeAction(attributeName, attributeDisplayName, columnName, attributeType, requiredLevel);
    this.fillLookupAttributeAction(entityLkpAttr2);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputLookupRelationshipName, lookupRelationshipName);
  },

  addAttrDefaultValue(nameAttribute, attributeDisplayName,
    attributeType, attributeLenght, defaultValue) {
    I.waitForVisible(attributePage.fields.attributeNameField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.attributeNameField, nameAttribute);
    I.fillField(attributePage.dropdown.attributeType, attributeType);
    I.click(locate('p').withAttr({ title: attributeType }).inside(attributePage.fields.scrollAttType));
    I.fillField(attributePage.fields.attributeDisplayNameField, attributeDisplayName);
    I.fillField(attributePage.fields.lengthField, attributeLenght);
    if (attributeType === 'Text Area') {
      I.fillField(attributePage.fields.defaultValueForTextArea, defaultValue);
    } else { I.fillField(attributePage.fields.defaultValue, defaultValue); }
  },

  addNumericAttrDefaultValue(nameAttribute, attributeDisplayName,
    attributeType, attributePrecision, defaultValue) {
    I.waitForVisible(attributePage.fields.attributeNameField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.attributeNameField, nameAttribute);
    I.fillField(attributePage.dropdown.attributeType, attributeType);
    I.click(locate('p').withText(attributeType).inside(attributePage.fields.scrollAttType));
    I.fillField(attributePage.fields.attributeDisplayNameField, attributeDisplayName);
    I.fillField(attributePage.fields.precision, attributePrecision);
    I.click(attributePage.fields.idDefaultValue);
    I.fillField(attributePage.fields.defaultValue, defaultValue);
  },

  addWholeNumberAttrDefaultValue(nameAttribute, attributeDisplayName, attributeType, defaultValue) {
    I.waitForVisible(attributePage.fields.attributeNameField, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.attributeNameField, nameAttribute);
    I.fillField(attributePage.dropdown.attributeType, attributeType);
    I.click(locate('p').withText(attributeType).inside(attributePage.fields.scrollAttType));
    I.fillField(attributePage.fields.attributeDisplayNameField, attributeDisplayName);
    I.click(attributePage.fields.idDefaultValue);
    I.fillField(attributePage.fields.defaultValue, defaultValue);
  },

  editNumericField(newValue, field) {
    I.waitForVisible(attributePage.fields.idDefaultValue, constants.SHORT_WAIT);
    I.click(attributePage.fields.idDefaultValue);
    I.pressKey([constants.KEY_CONTROL, constants.KEY_A]);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(field, newValue);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  editDefaultValue(text, urlText, textArea, urlTextArea, numeric, urlNumeric, wholeNumber, urlWholeNumber) {
    commonActions.accessDirectUrl(urlText);
    this.editTextField(text, attributePage.fields.defaultValue);
    commonActions.accessDirectUrl(urlTextArea);
    this.editTextField(textArea, attributePage.fields.defaultValueForTextArea);
    commonActions.accessDirectUrl(urlNumeric);
    this.editNumericField(numeric, attributePage.fields.defaultValue);
    commonActions.accessDirectUrl(urlWholeNumber);
    this.editNumericField(wholeNumber, attributePage.fields.defaultValue);
  },

  editTextField(newValue, field) {
    I.waitForVisible(field, constants.SHORT_WAIT);
    I.fillField(field, newValue);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deleteField() {
    I.waitForVisible(attributePage.fields.idDefaultValue, constants.SHORT_WAIT);
    I.click(attributePage.fields.idDefaultValue);
    I.pressKey([constants.KEY_CONTROL, constants.KEY_A]);
    I.pressKey(constants.KEY_DELETE);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deleteDefaultValue(urlText, urlTextArea, urlNumeric, urlWholeNumber) {
    commonActions.accessDirectUrl(urlText);
    this.deleteField();
    commonActions.accessDirectUrl(urlTextArea);
    this.deleteField();
    commonActions.accessDirectUrl(urlNumeric);
    this.deleteField();
    commonActions.accessDirectUrl(urlWholeNumber);
    this.deleteField();
  },

  async updateDefaultValueForTextArea(defaultValue, name, newValue) {
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAreaAtt, defaultValue);
    I.waitForVisible(attributePage.fields.inputForAtEntityDefaultTextAreaAtt, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.inputFieldNameEntityTextArea, name);
    I.fillField(attributePage.fields.inputForAtEntityDefaultTextAreaAtt, newValue);
  },

  async updateDefaultValueForText(defaultValue, name, newValue) {
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAtt, defaultValue);
    I.waitForVisible(attributePage.fields.inputForAtEntityDefaultTextAtt, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.inputFieldNameEntity, name);
    I.fillField(attributePage.fields.inputForAtEntityDefaultTextAtt, newValue);
  },

  async updateDefaultValueForNumeric(defaultValue, name, newValue) {
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultNumericAtt, defaultValue);
    I.waitForVisible(attributePage.fields.inputForAtEntityDefaultNumericAtt, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.inputFieldNameNumericEntity, name);
    I.fillField(attributePage.fields.inputForAtEntityDefaultNumericAtt, newValue);
  },

  async updateDefaultValueForWholeNumber(defaultValue, name, newValue) {
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultWholeNumberAtt, defaultValue);
    I.waitForVisible(attributePage.fields.inputForAtEntityDefaultWholeNumberAtt, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.inputFieldNameEntityWholeNumber, name);
    I.fillField(attributePage.fields.inputForAtEntityDefaultWholeNumberAtt, newValue);
  },
};
