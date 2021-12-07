// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const businessEntityPage = require('~pages/businessEntityPage');
const attributePage = require('~pages/attributePage');
const digitalAssetPage = require('~pages/digitalAssetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Actions
const commonActions = require('~actions/commonActions');

module.exports = {
  verifyAttributesAndPropertiesUponCreatingNewlyBusinessEntity(entityName, primaryAttName) {
    I.seeInField(businessEntityPage.fields.tableNameField, entityName);
    I.seeInField(businessEntityPage.fields.primaryAttTableColumnField, primaryAttName);
    I.seeNumberOfElements(commonPage.properties.mandatoryProperties, 9);
  },

  verifyIfBusinessEntityExistsInSearch(entityDisplayName) {
    commonActions.waitForLoadersToFinish();
    // FIXME added wait() because the page is loading slow after use  accessDirectUrl method
    I.wait(5);
    I.waitForElement(businessEntityPage.fields.entitySearchField, constants.SHORT_WAIT);
    I.waitForClickable(businessEntityPage.fields.entitySearchField, constants.SHORT_WAIT);
    I.click(businessEntityPage.fields.entitySearchField);
    I.fillField(businessEntityPage.fields.entitySearchField, entityDisplayName);
    I.waitForVisible(locate('td').withText(entityDisplayName).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  verifyDetailsOnField(container, verifyDetailsOnField) {
    I.waitForVisible(container, constants.SHORT_WAIT);
    within(container, () => {
      I.see(verifyDetailsOnField);
    });
  },

  verifyIfAttributeExistsInSearch(attributeName, attributeDisplayName, attributeType) {
    I.waitForClickable(businessEntityPage.fields.iconForSearchForText, constants.SHORT_WAIT);
    I.click(businessEntityPage.fields.iconForSearchForText);
    I.waitForVisible(businessEntityPage.fields.iconForSearchForEquals, constants.SHORT_WAIT);
    I.click(businessEntityPage.fields.iconForSearchForEquals);
    I.waitForVisible(businessEntityPage.fields.attributeDataModelField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.attributeDataModelField, attributeName);
    I.waitForVisible(businessEntityPage.buttons.resultForSearch2ndLineDataModel,
      constants.SHORT_WAIT);
    // FIXME
    I.wait(3);
    I.see(attributeName, businessEntityPage.buttons.resultForSearch2ndLineDataModel);
    I.see(attributeDisplayName,
      businessEntityPage.buttons.resultForSearch2ndLine3rdColumnDataModel);
    I.see(attributeType, businessEntityPage.buttons.resultForSearch2ndLine4thColumnDataModel);
  },

  verifyIfAttributeDataFormExistsInSearch(attributeName, attributeDisplayName) {
    I.waitForVisible(businessEntityPage.fields.attributeDataFormField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.attributeDataFormField, attributeName);
    // FIXME
    I.wait(3);
    I.see(attributeName, businessEntityPage.buttons.resultForSearch2ndLineDataForms);
    I.see(attributeDisplayName,
      businessEntityPage.buttons.resultForSearch2ndLine3rdColumnDataForms);
  },

  verifyEditingBusinessEntity(entityName, entityDisplayName, collectionName,
    primaryAttName, primaryAttDN, entityDefaultEntityStatus) {
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.seeInField(businessEntityPage.fields.entityNameField, entityName);
    I.seeInField(businessEntityPage.fields.displayNameField, entityDisplayName);
    I.seeInField(businessEntityPage.fields.collectionNameField, collectionName);
    I.seeInField(businessEntityPage.fields.primaryAttNameField, primaryAttName);
    I.seeInField(businessEntityPage.fields.primaryAttDisplayNameField, primaryAttDN);
    I.seeInField(businessEntityPage.fields.defaultEntityStatusField, entityDefaultEntityStatus);
    I.seeNumberOfElements(commonPage.properties.readonlyProperties, 5);
  },

  verifyEditBusinessEntityInPortal(listNameAutoTest, attributeAddAutoTest) {
    // 11. Check if List name is displayed properly: (Auto Test TBU DCN list)
    I.waitForVisible(locate('h5').withText(listNameAutoTest).inside(locate('div').withAttr({ id: 'ebsContainer' })), constants.SHORT_WAIT);
    // 12. Click on "Insert" icon
    I.waitForVisible(businessEntityPage.buttons.insertNewAttributeButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertNewAttributeButton);
    // 13. Check if "Add Auto Test TBU Entity" is displayed
    I.waitForVisible(locate('span').withText(attributeAddAutoTest).inside(locate('div').withAttr({ id: 'ebsContainer' })), constants.SHORT_WAIT);
  },

  async verifyLookupInput1toNRelationshipSame(name) {
    I.waitForVisible(businessEntityPage.fields.lookUpFieldInputAT_1toNSame, constants.SHORT_WAIT);
    const actualValue = await I.grabValueFrom(businessEntityPage.fields.lookUpFieldInputAT_1toNSame);
    I.assert(actualValue, name);
  },

  // Verify records in the relationship grid
  verify3RecordsExistsInATableAT_NtoNSameRel(firstName, secondName, thirdName) {
    // 8	Check if the grid contains 3 entries (Auto Test 1, Auto Test 3 and Auto Test 5)
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_NTONSAMERELTableContainer, firstName);
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_NTONSAMERELTableContainer, secondName);
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_NTONSAMERELTableContainer, thirdName);
  },

  // Verify records in relationship grid
  verify2RecordsExistsInATableAT_1toNSameRel(firstName, secondName) {
    // 20 Check if relationship Grid contains "Auto Test 5" and "Auto Test 6"
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_1toNSameRelTableContainer, firstName);
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_1toNSameRelTableContainer, secondName);
    I.switchToPreviousTab();
  },

  // Verify Record exists in relationship referencing table, access it then verify content
  async verifyRelationshipReferencingEntity(entityName, referencedEntity, referencingEntity, relationshipType, relationshipConstraint) {
    // 11 Check If "AT_Create1toNSame_AT_Create1toNSameLkpId_" record is displayed
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.relationshipReferencingTableContainer, entityName);
    // 12 I access "AT_Create1toNSame_AT_Create1toNSameLkpId_"
    commonActions.doubleClickValueFromTable(businessEntityPage.container.relationshipReferencingTableContainer, entityName);
    // 13 Check if Referenced Entity is "AT_Create1toNSame"
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.referencedEntityRelationshipField, referencedEntity);
    // 14 Check if Referencing Entity is "AT_Create1toNSame"
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.referencingEntityRelationshipField, referencingEntity);
    // 15 Check if Relationship Type is: 1
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipTypeField, relationshipType);
    // 16 Check if Relationship Constraint is: 0
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, relationshipConstraint);
  },

  // Verify if entity is displayed as lookup then edit it
  async verifyLookupAndEditIt(name) {
    // 7 Check if "Auto Test 1" is still displayed as lookup
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.lookUpFieldInputAT_1toNSame, name);
    // 8 Click on "Edit" icon for "Auto Test 1" -> Auto Test 1 edit form is displayed
    I.waitForVisible(businessEntityPage.buttons.editLookupButtonAT_1toNSame, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.editLookupButtonAT_1toNSame);
    I.switchToNextTab();
  },

  verify2RecordsExistsInATableAT_NtoNSameRel(firstName, secondName) {
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_NTONSAMERELTableContainer, firstName);
    commonVerify.verifyValueExistsInTable(businessEntityPage.container.aT_NTONSAMERELTableContainer, secondName);
  },

  verifyEntityExistsInSearch(entityName, displayName) {
    I.waitForVisible(businessEntityPage.fields.entitySearchField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entitySearchField, entityName);
    I.waitForVisible(locate('td').withText(entityName).inside(businessEntityPage.container.defaultEntityTableContainer), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(displayName).inside(businessEntityPage.container.defaultEntityTableContainer), constants.SHORT_WAIT);
  },

  async verifyExistDataForm(columnName,dataFormName){
    // access data form
    I.waitForVisible(businessEntityPage.buttons.dataFormButton,constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.dataFormButton);
    // verify
    await commonActions.searchInTableAfterASpecificColumn(columnName,dataFormName,businessEntityPage.container.dataFormsTableContainer)
  },

  async verifyIfDataForm2LinkedToDA2(columnName,dataFormName){
    I.waitForVisible(digitalAssetPage.buttons.configurationItemButtonInfoContainer,constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.configurationItemButtonInfoContainer);
    await commonActions.searchInTableAfterASpecificColumn(columnName,dataFormName,digitalAssetPage.containers.ciContainer)
  },

  async verifyIfExist2DataFormLinked(nameDA1,nameDA2,nameDataForm1,nameDataForm2,columnName1,columnName2){
    // access data form
    I.waitForVisible(businessEntityPage.buttons.dataFormButton,constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.dataFormButton)
    // verify DataForm1 linked to DA1
    await commonActions.searchInTableAfterASpecificColumn(columnName1,nameDataForm1,businessEntityPage.container.dataFormsTableContainer);
    await commonActions.searchInTableAfterASpecificColumn(columnName2,nameDA1,businessEntityPage.container.dataFormsTableContainer)
    // access data form
    commonActions.refreshPage();
    I.waitForVisible(businessEntityPage.buttons.dataFormButton,constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.dataFormButton)
    // verify DataForm1 linked to DA2
    await commonActions.searchInTableAfterASpecificColumn(columnName1,nameDataForm2,businessEntityPage.container.dataFormsTableContainer);
    await commonActions.searchInTableAfterASpecificColumn(columnName2,nameDA2,businessEntityPage.container.dataFormsTableContainer)
  }
};
