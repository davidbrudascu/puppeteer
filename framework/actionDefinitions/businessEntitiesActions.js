const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const verifyFormAction = require('~actions/formActionsVerify');
// Pages
const commonPage = require('~pages/commonPage');
const businessEntityPage = require('~pages/businessEntityPage');
const digitalAssetPage = require('~pages/digitalAssetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const businessEntityVerify = require('~actions/businessEntityVerify');
const formPage = require("~pages/formPage");

module.exports = {
  insertNewBusinessEntity() {
    I.waitForVisible(commonPage.buttons.insertButton, constants.LONG_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.LONG_WAIT);
  },

  fillAllMandatoryFieldsForBusinessEntity(entityName, entityDisplayName,
    collectionName, primaryAttName, primaryAttDN) {
    within('.main-content', () => {
      I.fillField(businessEntityPage.fields.entitynameField, entityName);
      I.fillField(businessEntityPage.fields.displayNameField, entityDisplayName);
      I.fillField(businessEntityPage.fields.collectionNameField, collectionName);
      I.fillField(businessEntityPage.fields.primaryAttNameField, primaryAttName);
      I.fillField(businessEntityPage.fields.primaryAttDisplayNameField, primaryAttDN);
    });
  },

  // eslint-disable-next-line no-dupe-keys
  fillAllMandatoryFieldsForBusinessEntity(entityName, entityDisplayName, collectionName,
    description, primaryAttName, primaryAttDN, tableName, primaryAttTableColumn) {
    within('.main-content', () => {
      I.fillField(businessEntityPage.fields.entityNameField, entityName);
      I.fillField(businessEntityPage.fields.displayNameField, entityDisplayName);
      I.fillField(businessEntityPage.fields.collectionNameField, collectionName);
      I.fillField(businessEntityPage.fields.descriptionField, description);
      I.fillField(businessEntityPage.fields.primaryAttNameField, primaryAttName);
      I.fillField(businessEntityPage.fields.primaryAttDisplayNameField, primaryAttDN);
      I.fillField(businessEntityPage.fields.tableNameField, tableName);
      I.fillField(businessEntityPage.fields.primaryAttTableColumnField, primaryAttTableColumn);
    });
  },

  fillAllMandatoryFieldsForBusinessEditingEntity(entityUpdatedDisplayName,
    entityUpdatedDisplayCollectionName, entityUpdatedDescription) {
    I.fillField(businessEntityPage.fields.displayNameField, entityUpdatedDisplayName);
    I.fillField(businessEntityPage.fields.collectionNameField, entityUpdatedDisplayCollectionName);
    I.fillField(businessEntityPage.fields.descriptionField, entityUpdatedDescription);
    I.checkOption(businessEntityPage.checkbox.isAuditedCheckbox, 1);
    I.checkOption(businessEntityPage.checkbox.optimizationSearchDataCheckbox, 1);
  },

  selectStatusForBusinessEntity() {
    I.click(businessEntityPage.buttons.entityStatusButton);
    I.waitForVisible(businessEntityPage.selector.selectActiveStatusForBusinessEntity, constants.SHORT_WAIT);
    I.click(businessEntityPage.selector.selectActiveStatusForBusinessEntity);
    I.click(commonPage.buttons.forthButton);
    I.wait(3);
  },

  selectDataModelSubMenu() {
    I.waitForElement(businessEntityPage.link.dataModelLink, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.dataModelLink);
    I.waitForElement(businessEntityPage.selector.attributeType, constants.SHORT_WAIT);
  },

  selectExtendedModelSubMenu() {
    I.waitForElement(businessEntityPage.link.extendedModelLink, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.extendedModelLink);
    I.waitForElement(businessEntityPage.selector.extensionType, constants.SHORT_WAIT);
  },

  selectDataFormsSubMenu() {
    I.click(businessEntityPage.link.dataFormsLink);
    I.waitForElement(businessEntityPage.selector.attributeType, constants.SHORT_WAIT);
  },

  selectRelationshipReferenced() {
    I.waitForElement(businessEntityPage.link.relationshipReferenced, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.relationshipReferenced);
    I.waitForElement(businessEntityPage.selector.referencingEntity, constants.SHORT_WAIT);
  },

  selectRelationshipReferencing() {
    I.waitForVisible(businessEntityPage.link.relationshipReferencing, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.relationshipReferencing);
    I.waitForElement(businessEntityPage.selector.referencedEntity, constants.SHORT_WAIT);
  },

  selectReferencingEntityRelationship(entityNameRelationship) {
    I.click(businessEntityPage.buttons.referencingEntityRelationshipButton);
    I.waitForVisible(commonPage.buttons.forthRelationshipButton, constants.SHORT_WAIT);
    I.waitForVisible(businessEntityPage.fields.nameEntitySearchForField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.nameEntitySearchForField, entityNameRelationship);
    // FIXME
    I.wait(5);
    I.moveCursorTo(businessEntityPage.selector.firstEntityFromTableRelationshipSelector);
    I.click(businessEntityPage.selector.firstEntityFromTableRelationshipSelector);
    I.click(commonPage.buttons.forthRelationshipButton);
  },

  selectIsAuditedcheckbox() {
    I.waitForVisible(businessEntityPage.checkbox.isAuditedCheckbox, constants.SHORT_WAIT);
    I.checkOption(businessEntityPage.checkbox.isAuditedCheckbox, 1);
  },

  verifyViewAndFormForSmokeInPortal(primaryAttDN, dataForFormField) {
    I.waitForVisible(locate('div').withText(primaryAttDN).inside(locate('td').withAttr({ 'aria-label':'Column Name' })), constants.SHORT_WAIT)
    verifyFormAction.verifyFormInPortal(primaryAttDN, dataForFormField);
  },

  selectAttributeTypeAfterText(name) {
    I.waitForVisible(businessEntityPage.buttons.attributeTypeDropdownButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.attributeTypeDropdownButton);
    I.waitForVisible(locate('p').withText(name).inside(locate('div').withAttr({ role: 'listbox' })), constants.SHORT_WAIT);
    I.click(locate('p').withText(name).inside(locate('div').withAttr({ role: 'listbox' })));
  },

  deleteRowFromTableAfterText(table, name, deleteButton) {
    I.waitForVisible(locate('td').withText(name).inside(locate(table)), constants.SHORT_WAIT);
    I.click(locate('td').withText(name).inside(locate(table)));
    I.click(locate(deleteButton));
    I.click(commonPage.buttons.yesAnswerButton);
    commonActions.waitForLoadersToFinish();
  },

  async selectReferencedEntityRelationship(name, columnName) {
    I.click(businessEntityPage.buttons.referencedEntityIdButton);
    I.waitForVisible(businessEntityPage.buttons.okButtonReferencedEntityTable, constants.SHORT_WAIT);
    await commonActions.searchInTableAfterASpecificColumn(columnName, name, businessEntityPage.container.referencedRelationshipTableContainer);
    I.click(businessEntityPage.buttons.okButtonReferencedEntityTable);
    commonActions.waitForLoadersToFinish();
  },

  insertNewReferencingRelationship() {
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.insertButtonRelationshipReferencing);
    I.waitForVisible(businessEntityPage.fields.displayNameField, constants.SHORT_WAIT);
  },

  // Add entities to the relationship grid
  selectAutoTestRelAT_NtoNSameRel(row1, row2, row3, name) {
    // 5	Click on "Insert" button from Relationship grid
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.aT_NTONSAMERELInsertButton);
    // 6	Select Auto Test 1, Auto Test 3 and Auto Test 5
    I.waitForVisible(businessEntityPage.buttons.aT_NTONSAMERELLookUpGridOkButton, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(name), constants.SHORT_WAIT);
    I.click(locate('td').withAttr({ 'aria-colindex': '1' }).withAttr({ 'aria-label': 'Select row' }).inside(locate('tr').withAttr({ 'aria-rowindex': row1 })));
    I.click(locate('td').withAttr({ 'aria-colindex': '1' }).withAttr({ 'aria-label': 'Select row' }).inside(locate('tr').withAttr({ 'aria-rowindex': row2 })));
    I.click(locate('td').withAttr({ 'aria-colindex': '1' }).withAttr({ 'aria-label': 'Select row' }).inside(locate('tr').withAttr({ 'aria-rowindex': row3 })));
    // 7  Click "Ok"
    I.click(businessEntityPage.buttons.aT_NTONSAMERELLookUpGridOkButton);
    I.waitForVisible(commonPage.messagePopup.toast, constants.SHORT_WAIT);
  },

  selectAllEntitiesThenDeleteAT_NtoNSameRel(selectAllButton, deleteButton) {
    I.click(selectAllButton);
    I.click(deleteButton);
    I.waitForVisible(commonPage.messagePopup.toast, constants.SHORT_WAIT);
  },

  changeLookupEntity1toNRelationshipSame(name) {
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.entityLookUpButtonAT_1toNSame);
    commonActions.selectARowFromTableAfterText(name);
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.okButtonLookupContainerAT_1toNSame);
  },

  // Create new entity for Data model and fill name, display name, select lookup type, select lookup entity
  addNewAttribute(name, lookupType, displayName, lookupEntity) {
    // 3 Expand "Data Model" section
    this.selectDataModelSubMenu();
    // 4 Click Insert
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.insertDataModelButton);
    // 5 Add name to new Attribute : "AT_Create1toNSameLkpId"
    commonActions.fillField(businessEntityPage.fields.entityNameField, name);
    // 6 Select Type: "LookUp"
    this.selectAttributeTypeAfterText(lookupType);
    // 7 Add display name to new Attribute: "AT_Create1toNSameLkpId"
    commonActions.fillField(businessEntityPage.fields.displayNameField, displayName);
    // 8 Select Lookup to Entity: "AT_Create1ToNSame"
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.lookupToEntityDropdownButton);
    commonActions.fillInPopupLookupTableWithValue(businessEntityPage.container.lookupToEntityTableContainer, lookupEntity);
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.okButtonLookupEntityTable);
    // 9 Save and close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Create new entity for Referencing Relationship and fill name, display name, select referenced entity, verify referencing entity, verify relationship type, verify relationship constraint then verify relationship constraint again
  async createNewReferencingRelEntity(name, displayName, referencedEntity, referencingEntity, relationshipType, relationshipConstraint, relationshipConstraintSecond, columnName) {
    // 20 Click on Insert
    this.insertNewReferencingRelationship();
    // 21  Fill in Name with "AT_CreateNtoNSame_AT_CreateNtoNSame"
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    commonActions.fillField(businessEntityPage.fields.entityNameField, name);
    // 22  Fill in DisplayName with "AT_CreateNtoNSame_AT_CreateNtoNSame"
    commonActions.fillField(businessEntityPage.fields.displayNameField, displayName);
    // 23  Select Referenced Entity is "AT_CreateNtoNSame"
    await this.selectReferencedEntityRelationship(referencedEntity, columnName);
    // 24  Verify if Referencing Entity is "AT_CreateNtoNSame"
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.referencingEntityRelationshipField, referencingEntity);
    // 25  Check if Relationship type is: 2
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipTypeInputField, relationshipType);
    // 26  Check is constraint : empty
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, relationshipConstraint);
    I.click(businessEntityPage.fields.relationshipConstraintInputField);
    I.fillField(businessEntityPage.fields.relationshipConstraintInputField, relationshipConstraintSecond);
    I.click(businessEntityPage.fields.entityNameField);
    // 27  Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 28  Check if Constraint is: 0
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, relationshipConstraintSecond);
  },

  // Insert new entity, fill name and select lookup entity then save and reload
  insertNewEntitySelectLookup(name, lookupEntity) {
    // 3 Click on Insert
    this.insertNewBusinessEntity();
    // 4 Fill in Name with "Auto Test 5"
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    commonActions.fillField(businessEntityPage.fields.entityNameField, name);
    // 5 Select from lookup "Auto Test 1"
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.entityLookUpButtonAT_1toNSame);
    commonActions.fillInPopupLookupTableWithValue(businessEntityPage.container.aT_1toNSameRelLookupTableContainer, lookupEntity);
    I.click(businessEntityPage.buttons.okButtonLookupContainerAT_1toNSame);
    // 6 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Select entity, select lookup entity, save and reload then verify if lookup entity it's displayed in table
  selectEntity1toNRelSame(name) {
    // 12	Access "Auto Test 5" > Auto Test 5 edit form is displayed
    commonActions.doubleClickValueFromTable(businessEntityPage.container.aT_1toNSameRelTableContainer, name);
    // 13	Change Lookup -> Select Auto Test 5
    this.changeLookupEntity1toNRelationshipSame(name);
    // 14	Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 15	Check if relationship Grid contains "Auto Test 5"
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_1toNSameRelTableContainer, name);
  },

  // Insert new entity, verify lookup entity and fill name
  async insertNewEntity1toNRelSame(name, lookupEntity) {
    // 16	Click on "Insert" button from Grid
    commonActions.clickButtonAfterLocator(businessEntityPage.buttons.insertButtonContainerAT_1toNSame);
    // 17	Check if "Auto Test 5" is selected as lookup
    await businessEntityVerify.verifyLookupInput1toNRelationshipSame(lookupEntity);
    // 18	Fill in Name with "Auto Test 6"
    commonActions.fillField(businessEntityPage.fields.entityNameField, name);
    // 19	Save and Close
    commonActions.saveAndCloseAction();
  },

  // Verify records then delete all of them
  verifyAndDeleteRecordsAT_NtoNSameRel(value, firstRecord, secondRecord) {
    // 13	Access "Auto Test 2"
    commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultEntityTableContainer, value);
    // 14	Check if Relationship grid contains 2 records (Auto Test 1 and Auto Test 2)
    businessEntityVerify.verify2RecordsExistsInATableAT_NtoNSameRel(firstRecord, secondRecord);
    // 15	Select both of them
    // 16	Click on "Remove" button
    // 17 Check if the grid is empty
    this.selectAllEntitiesThenDeleteAT_NtoNSameRel(businessEntityPage.buttons.selectAllButtonLookUpAT_NtoNSameRel, businessEntityPage.buttons.aT_NTONSAMERELRemoveButton);
    commonVerify.verifyEmptyTableData();
  },

  insertEntityNtoNRel(name) {
    // 3	Fill in Name with: "Auto Test 5"
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.moveCursorTo(commonPage.buttons.insertButton);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entityNameField, name);
    // 4  Save and Reload
    commonActions.saveAndRefreshAction();
  },

  // Delete one records then access another and verify content in relationship grid
  deleteEntityAccessAnotherAT_NtoNSameRel(deleteEntity, accessEntity, firstGridEntity, secondGridEntity) {
    // 19	Select Auto Test 3 and delete it
    this.deleteRowFromTableAfterText(businessEntityPage.container.defaultEntityTableContainer, deleteEntity, commonPage.buttons.deleteButton);
    // 20	Access Auto Test 5
    commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultEntityTableContainer, accessEntity);
    // 21	Check if the grid contains only 2 record (Auto Test 1 and Auto Test 5)
    businessEntityVerify.verify2RecordsExistsInATableAT_NtoNSameRel(firstGridEntity, secondGridEntity);
  },

  // Verify if table has 2 entries then delete first one
  verifyRowsDeleteFirstEntry(firstEntry, secondEntry) {
    // 9	Check if there are 2 entries in relationship grid (Auto Test 2 and Auto Test 5)
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_1toNSameRelTableContainer, firstEntry);
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_1toNSameRelTableContainer, secondEntry);
    // 10	Select "Auto Test 2" and delete it -> Click Yes
    I.waitForVisible(locate('td').withText(firstEntry).inside(locate(businessEntityPage.container.aT_1toNSameRelTableContainer)), constants.SHORT_WAIT);
    I.click(locate('td').withText(firstEntry).inside(locate(businessEntityPage.container.aT_1toNSameRelTableContainer)));
    I.click(locate(businessEntityPage.buttons.deleteButtonAT_1toNSame));
    I.click(commonPage.buttons.yesAnswerButton);
    commonActions.waitForLoadersToFinish();
    // 11	Check if only 1 entry is displayed in your grid (Auto Test 5)
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_1toNSameRelTableContainer, secondEntry);
  },

  insertLookupAttribute(nameAttribute, lookupAttribute, displayNameAttribute, lookupEntityName, relationType) {
    I.waitForVisible(businessEntityPage.buttons.insertDataModelButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertDataModelButton);
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entityNameField, nameAttribute);
    commonActions.selectValueFromDropdown(businessEntityPage.buttons.attributeTypeDropdownButton, lookupAttribute);
    I.fillField(businessEntityPage.fields.displayNameField, displayNameAttribute);
    I.click(businessEntityPage.buttons.lookupToEntityDropdownButton);
    I.waitForVisible(businessEntityPage.fields.entitySearchField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entitySearchField, lookupEntityName);
    commonActions.selectARowFromTableAfterText(lookupEntityName);
    I.click(businessEntityPage.buttons.okButtonLookupEntityTable);
    I.waitForInvisible(businessEntityPage.buttons.okButtonLookupEntityTable, constants.SHORT_WAIT);
    this.clickValueFromDropdown(businessEntityPage.buttons.lookupRelationDropdownButton, relationType);
  },

  clickValueFromDropdown(selector, value) {
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.scrollTo(selector);
    I.click(selector);
    I.waitForVisible(locate('p').withText(value).inside(locate('div').withAttr({ role: 'option' })), constants.SHORT_WAIT);
    I.click(locate('p').withText(value).inside(locate('div').withAttr({ role: 'option' })));
  },

  insertBusinessEntity(entityName, entityDisplayName, collectionName, description, primaryAttName, primaryAttDN, tableName, primaryAttTableColumn) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.wait(3);
    this.fillAllMandatoryFieldsForBusinessEntity(
        entityName,
        entityDisplayName,
        collectionName,
        description,
        primaryAttName,
        primaryAttDN,
        tableName,
        primaryAttTableColumn
    );
    this.selectStatusForBusinessEntity();
  },

  updateDisplayName(displayName) {
    I.waitForVisible(businessEntityPage.fields.displayNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.displayNameField, displayName);
  },

  async accessEntity(search,nameEntity,columnName) {
    I.waitForVisible(digitalAssetPage.buttons.searchMenuItemButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.searchMenuItemButton);
    I.waitForVisible(digitalAssetPage.fields.searchMenuItemField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.searchMenuItemField, search);
    I.waitForVisible(businessEntityPage.fields.businessEntityField, constants.SHORT_WAIT);
    I.click(businessEntityPage.fields.businessEntityField);
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameEntity, businessEntityPage.container.defaultEntityTableContainer);
    const clickSelector = locate('td').withText(nameEntity).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(businessEntityPage.container.defaultEntityTableContainer);
    I.doubleClick(clickSelector);
    I.doubleClick(clickSelector);
  },

  insertDataForm(name){
    // access data form
    I.waitForVisible(businessEntityPage.buttons.dataFormButton,constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.dataFormButton);
    // insert data form
    I.waitForVisible(businessEntityPage.buttons.insertButtonDataForms, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertButtonDataForms);
    I.waitForVisible(businessEntityPage.fields.nameDataFormField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.nameDataFormField, name);
  },

  accessBusinessEntityList(search) {
    I.waitForVisible(digitalAssetPage.buttons.searchMenuItemButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.searchMenuItemButton);
    I.waitForVisible(digitalAssetPage.fields.searchMenuItemField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.searchMenuItemField, search);
    I.waitForVisible(businessEntityPage.fields.businessEntityField, constants.SHORT_WAIT);
    I.click(businessEntityPage.fields.businessEntityField);
  },

};
