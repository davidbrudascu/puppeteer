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

module.exports = {
  verifyEntityAttributes(
    entityAttributes,
    entityAttrId,
    entityAttrName,
    entityAttrUserId,
    entityAttrCreatedBy,
    entityAttrModifiedBy,
    entityAttrBusinessUnit,
    entityAttrCreatedOn,
    entityAttrModifiedOn,
    entityAttrStatus,
  ) {
    commonActions.menuSectionExpand(entityAttributes);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrId,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrName,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrUserId,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrCreatedBy,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrModifiedBy,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrBusinessUnit,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrCreatedOn,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrModifiedOn,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      entityAttrStatus,
    );
  },

  verifyEntityForm(entityForm, entityFormName) {
    commonActions.menuSectionExpand(entityForm);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedFormsFields,
      entityFormName,
    );
  },

  verifyEntityView(entityView, entityViewName) {
    commonActions.menuSectionExpand(entityView);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedViewsFields,
      entityViewName,
    );
  },

  verifyEntityPortal(entityColumnName) {
    I.waitForElement(externalEntityPage.fields.entityColumnField, constants.LONG_WAIT);
    I.see(entityColumnName, externalEntityPage.fields.entityColumnField);
  },

  verifyEntityDetails(
    extEntityType,
    extEntityName,
    extEntityDisplayName,
    extEntityCollectionName,
    extEntityDescriptionName,
    extEntityPAName,
    extEntityPADisplayName,
    entityStatus,
  ) {
    // Using LONG_WAIT when accessing a new page and we need to wait for all elements to load.
    I.waitForElement(externalEntityPage.fields.entityTypeField, constants.LONG_WAIT);
    // Check for value in fields and field type
    I.seeInField(externalEntityPage.fields.entityTypeField, extEntityType);
    I.waitForElement(externalEntityPage.fields.entityTypeReadOnlyField, constants.SHORT_WAIT);
    I.seeInField(externalEntityPage.fields.entityNameField, extEntityName);
    I.waitForElement(externalEntityPage.fields.entityNameReadOnlyField, constants.SHORT_WAIT);
    I.seeInField(externalEntityPage.fields.entityDisplayNameField, extEntityDisplayName);
    I.seeInField(externalEntityPage.fields.entityCollectionNameField, extEntityCollectionName);
    I.seeInField(externalEntityPage.fields.entityDescriptionField, extEntityDescriptionName);
    I.seeInField(externalEntityPage.fields.entityPANameField, extEntityPAName);
    I.waitForElement(externalEntityPage.fields.entityPANameReadOnlyField, constants.SHORT_WAIT);
    I.seeInField(externalEntityPage.fields.entityPADisplayNameField, extEntityPADisplayName);
    I.waitForElement(
      externalEntityPage.fields.entityPADisplayNameReadOnlyField,
      constants.SHORT_WAIT,
    );
    I.seeInField(externalEntityPage.fields.entityStatusField, entityStatus);
    I.waitForElement(externalEntityPage.selector.optimizeSearchCheckboxFalse, constants.SHORT_WAIT);
  },

  async verifyEntityAfterEdit(businessEntityURL, extEntityEditDisplayName, columnDisplayName) {
    commonActions.accessDirectUrl(businessEntityURL);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, extEntityEditDisplayName, externalEntityPage.container.defaultContainer);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entitySearchResultsField,
      extEntityEditDisplayName,
    );
  },

  verifyUpdatedEntityPortal(columnName) {
    I.waitForElement(externalEntityPage.fields.entityListViewField, constants.LONG_WAIT);
    I.see(columnName, externalEntityPage.fields.entityListViewField);
  },

  verifyUserIdBU(userId, businessUnit) {
    I.waitForElement(locate('td').withText(userId), constants.LONG_WAIT);
    I.seeElement(locate('td').withText(userId));
    I.seeElement(locate('td').withText(businessUnit));
  },

  verifyAttribute() {
    I.seeElement(externalEntityPage.fields.attrRONameField);
    I.seeElement(externalEntityPage.fields.attrROTypeField);
    I.seeElement(externalEntityPage.fields.attrROExternal);
    I.seeElement(externalEntityPage.fields.attrROColumnNameField);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyLookupAttribute() {
    I.seeElement(externalEntityPage.fields.attrRONameField);
    I.seeElement(externalEntityPage.fields.attrROTypeField);
    I.seeElement(externalEntityPage.fields.attrROExternal);
    I.seeElement(externalEntityPage.fields.attrROColumnNameField);
    I.seeElement(externalEntityPage.fields.attrROLookupField);
    I.seeElement(externalEntityPage.fields.attrROLookupRelField);
    I.seeElement(externalEntityPage.fields.lookupCorrelationField);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyAttributeList(entityAttributes, attrOneName, attrTwoName) {
    commonActions.menuSectionExpand(entityAttributes);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      attrOneName,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.entityExtendedModelField,
      attrTwoName,
    );
  },

  verifyDeletedAttr(attrOneName, attrTwoName) {
    I.waitForInvisible(locate('td').withText(attrOneName).inside(externalEntityPage.container.dataModelTableContainer), constants.SHORT_WAIT);
    I.waitForInvisible(locate('td').withText(attrTwoName).inside(externalEntityPage.container.dataModelTableContainer), constants.SHORT_WAIT);
  },

  verifyLookupAttr(lookupAttrDescription, lookupAttrTooltip) {
    I.waitForElement(externalEntityPage.fields.entityDescriptionField, constants.SHORT_WAIT);
    commonVerify.verifyValueExistsInInput(
      externalEntityPage.fields.entityDescriptionField,
      lookupAttrDescription,
    );
    commonVerify.verifyValueExistsInInput(
      externalEntityPage.fields.attributeTooltipField,
      lookupAttrTooltip,
    );
    I.seeElement(externalEntityPage.selector.attrReadOnlyCheckedField);
  },

  verifyLookupCorrelation(baseAttrName, refAttrName) {
    I.waitForElement(externalEntityPage.fields.lookupCorrelationField, constants.SHORT_WAIT);
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.lookupCorrelationField,
      baseAttrName,
    );
    commonVerify.verifyValueExistsInTable(
      externalEntityPage.fields.lookupCorrelationField,
      refAttrName,
    );
  },

  verifyChangesInPortal(lookupAttrTooltip) {
    I.waitForElement(commonPage.buttons.insertButton, constants.LONG_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(externalEntityPage.fields.lookupAttrROField, constants.SHORT_WAIT);
    I.seeElement(locate('div').withAttr({ 'data-original-title': lookupAttrTooltip }));
  },
};
