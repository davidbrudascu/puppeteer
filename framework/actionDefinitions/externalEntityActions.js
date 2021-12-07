const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const externalEntityPage = require('~pages/externalEntityPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const data = require('~data/externalEntity/TC003_externalEntity_data');

module.exports = {
  insertEntity(
    extEntityName,
    extEntityDisplayName,
    extEntityCollectionName,
    extEntityPAName,
    extEntityPADisplayName,
    entityStatus,
  ) {
    // Using LONG_WAIT when accessing a new page and we need to wait for all elements to load.
    I.waitForElement(externalEntityPage.fields.businessEntityResultsField, constants.LONG_WAIT);
    I.click(externalEntityPage.buttons.entityInsertButton);
    I.waitForElement(externalEntityPage.fields.insertEntityLastField, constants.LONG_WAIT);
    I.click(externalEntityPage.buttons.entityTypeButton);
    I.click(externalEntityPage.selector.externalEntityTypeSelector);
    I.click(externalEntityPage.fields.entityNameField);
    I.fillField(externalEntityPage.fields.entityNameField, extEntityName);
    I.click(externalEntityPage.fields.entityDisplayNameField);
    I.fillField(externalEntityPage.fields.entityDisplayNameField, extEntityDisplayName);
    I.click(externalEntityPage.fields.entityCollectionNameField);
    I.fillField(externalEntityPage.fields.entityCollectionNameField, extEntityCollectionName);
    I.click(externalEntityPage.fields.entityPANameField);
    I.fillField(externalEntityPage.fields.entityPANameField, extEntityPAName);
    I.click(externalEntityPage.fields.entityPADisplayNameField);
    I.fillField(externalEntityPage.fields.entityPADisplayNameField, extEntityPADisplayName);
    commonActions.clickLookupTableButton(externalEntityPage.buttons.entityStatusButton);
    commonActions.doubleClickValueFromTable(
      externalEntityPage.popup.entityStatusTable,
      entityStatus,
    );
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  editEntity(
    extEntityEditDisplayName,
    extEntityEditCollectionName,
    extEntityEditDescriptionName,
  ) {
    I.click(externalEntityPage.fields.entityDisplayNameField);
    I.fillField(externalEntityPage.fields.entityDisplayNameField, extEntityEditDisplayName);
    I.click(externalEntityPage.fields.entityCollectionNameField);
    I.fillField(externalEntityPage.fields.entityCollectionNameField, extEntityEditCollectionName);
    I.click(externalEntityPage.fields.entityDescriptionField);
    I.fillField(externalEntityPage.fields.entityDescriptionField, extEntityEditDescriptionName);
    I.click(externalEntityPage.selector.optimizeSearchCheckboxFalse);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async searchDeleteEntity(entityName, columnDisplayName) {
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, entityName, externalEntityPage.container.defaultContainer);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entitySearchResultsField,
      entityName,
    );
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.dontSee(commonPage.checkbox.selectSingleResultCheckbox);
  },

  addExternalIdAttribute(entityAttributes, attributeName, attributeType, attributeDisplayName) {
    commonActions.menuSectionExpand(entityAttributes);
    I.waitForElement(externalEntityPage.buttons.insertAttributeButton, constants.LONG_WAIT);
    I.click(externalEntityPage.buttons.insertAttributeButton);
    // added a LONG_WAIT because it's loading a new page.
    I.waitForElement(externalEntityPage.fields.attrReadOnlyField, constants.LONG_WAIT);
    I.fillField(externalEntityPage.fields.attrNameField, attributeName);
    I.fillField(externalEntityPage.fields.attrTypeField, attributeType);
    I.click(externalEntityPage.selector.attrTypeSelector);
    I.click(externalEntityPage.selector.attrIsExternalIdCheckbox);
    I.fillField(externalEntityPage.fields.attrDisplayName, attributeDisplayName);
    I.seeInField(externalEntityPage.fields.attrTableColumnNameField, attributeName);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addLookupAttribute(
    entityAttributes,
    attributeName,
    attributeType,
    attributeDisplayName,
    lookupEntityName,
    lookupRelName,
  ) {
    commonActions.menuSectionExpand(entityAttributes);
    I.click(externalEntityPage.buttons.insertAttributeButton);
    // added a LONG_WAIT because it's loading a new page.
    I.waitForElement(externalEntityPage.fields.attrReadOnlyField, constants.LONG_WAIT);
    I.fillField(externalEntityPage.fields.attrNameField, attributeName);
    I.fillField(externalEntityPage.fields.attrTypeField, attributeType);
    I.click(externalEntityPage.selector.attrTypeLookupSelector);
    I.waitForInvisible(externalEntityPage.selector.attrIsExternalIdCheckbox, constants.SHORT_WAIT);
    I.fillField(externalEntityPage.fields.attrDisplayName, attributeDisplayName);
    I.seeInField(externalEntityPage.fields.attrTableColumnNameField, attributeName);
    I.click(externalEntityPage.buttons.attrLookupToEntityButton);
    I.waitForElement(externalEntityPage.fields.attrLookupSearchFiled, constants.SHORT_WAIT);
    I.fillField(externalEntityPage.fields.attrLookupSearchFiled, lookupEntityName);
    I.waitForElement(locate('td').withText(lookupEntityName), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(lookupEntityName));
    I.click(locate('td').withText(lookupEntityName));
    I.waitForElement(externalEntityPage.fields.attrLookupRelFiled, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(
      externalEntityPage.fields.attrLookupRelFiled,
      lookupRelName,
    );
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  insertEditRecords(externalEntityURL, recordOneName) {
    I.waitForElement(commonPage.buttons.insertButton, constants.LONG_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(commonPage.buttons.saveAndCloseButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY);
    commonActions.accessDirectUrl(externalEntityURL);
    I.refreshPage();
    I.waitForElement(locate('td').withText(recordOneName), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(recordOneName));
    I.click(locate('td').withText(recordOneName));
    // TODO change the wait to something else.
    //  Currently the page refreshes after it's opened, that's why a wait is a quick solution.
    I.wait(1);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY);
  },

  addAttrToExtEntity(entityAttributes, attributeName, attributeType) {
    I.waitForElement(externalEntityPage.fields.entityDisplayNameField, constants.LONG_WAIT);
    commonActions.menuSectionExpand(entityAttributes);
    I.waitForElement(externalEntityPage.buttons.insertAttributeButton , constants.SHORT_WAIT)
    I.click(externalEntityPage.buttons.insertAttributeButton);
    // added a LONG_WAIT because it's loading a new page.
    I.waitForElement(externalEntityPage.fields.attrReadOnlyField, constants.LONG_WAIT);
    I.fillField(externalEntityPage.fields.attrNameField, attributeName);
    I.fillField(externalEntityPage.fields.attrTypeField, attributeType);
    I.click(externalEntityPage.selector.attrTypeSelector);
    I.click(externalEntityPage.selector.attrIsExternalIdCheckbox);
    I.fillField(externalEntityPage.fields.attrDisplayName, attributeName);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY);
  },

  callActionByName(script) {
    I.executeScript(script);
    I.refreshPage();
  },

  async deleteAttr(attrOneName, attrTwoName, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, attrOneName, externalEntityPage.container.dataModelTableContainer);
    I.click(externalEntityPage.buttons.deleteAttributeButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // FIXME wait added to avoid conflict between finding elements and refresh
    I.wait(1);
    await commonActions.searchInTableAfterASpecificColumn(columnName, attrTwoName, externalEntityPage.container.dataModelTableContainer);
    I.click(externalEntityPage.buttons.deleteAttributeButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  editLookupAttribute(lookupAttrDescription, lookupAttrTooltip) {
    I.waitForElement(externalEntityPage.fields.entityDescriptionField, constants.LONG_WAIT);
    I.click(externalEntityPage.fields.entityDescriptionField);
    I.fillField(externalEntityPage.fields.entityDescriptionField, lookupAttrDescription);
    I.click(externalEntityPage.fields.attributeTooltipField);
    I.fillField(externalEntityPage.fields.attributeTooltipField, lookupAttrTooltip);
    I.checkOption(externalEntityPage.fields.attrReadOnlyField);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addLookupCorrelation(baseAttrName, refAttrName) {
    I.waitForElement(externalEntityPage.fields.lookupCorrelationField, constants.SHORT_WAIT);
    I.click(externalEntityPage.buttons.attrInsertCorrButton);
    I.waitForElement(externalEntityPage.buttons.baseAttrLookupButton, constants.SHORT_WAIT);
    I.click(externalEntityPage.buttons.baseAttrLookupButton);
    I.fillField(externalEntityPage.fields.baseAttrLookupField, baseAttrName);
    commonActions.selectARowFromTableAfterText(baseAttrName);
    I.click(externalEntityPage.buttons.reffAttrLookupButton);
    I.fillField(externalEntityPage.fields.refAttrLookupField, refAttrName);
    // FIXME using wait and xpath to select value from dropdown list.
    //  the common methods didnt work or custom locate
    I.wait(1);
    I.click(externalEntityPage.selector.refAttrValueSelect);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async deleteLookupAttr(entityAttributes, lookupAttrName, externalLookupAttrURL, baseAttrName, columnName) {
    I.waitForElement(externalEntityPage.fields.entityDisplayNameField, constants.LONG_WAIT);
    commonActions.menuSectionExpand(entityAttributes);
    await commonActions.searchInTableAfterASpecificColumn(columnName, lookupAttrName, externalEntityPage.container.dataModelTableContainer);
    // commonActions.selectARowFromTableAfterText(lookupAttrName);
    I.click(externalEntityPage.buttons.deleteAttributeButton);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY);
    commonActions.accessDirectUrl(externalLookupAttrURL);
    I.waitForElement(externalEntityPage.fields.lookupCorrelationField, constants.SHORT_WAIT);
    commonActions.selectARowFromTableAfterText(baseAttrName);
    I.click(externalEntityPage.buttons.attrDeleteCorrButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForElement(externalEntityPage.fields.entityDisplayNameField, constants.LONG_WAIT);
    commonActions.menuSectionExpand(entityAttributes);
    commonActions.selectARowFromTableAfterText(lookupAttrName);
    I.click(externalEntityPage.buttons.deleteAttributeButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForInvisible(locate('td').withText(lookupAttrName).inside(externalEntityPage.container.dataModelTableContainer), constants.SHORT_WAIT);
  },
};
