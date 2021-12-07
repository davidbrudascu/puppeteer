// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Verify
const verifyAttributeActionsField = require('~actions/attributesVerify');
const verifyBusinessEntityAction = require('~actions/businessEntityVerify');
// Pages
const commonPage = require('~pages/commonPage');
const businessEntityPage = require('~pages/businessEntityPage');
const commonVerify = require('~actions/commonVerify');
// Data
const data = require('~data/entity/TC008_CreateEntityRelationship');

const I = actor();

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can create an entity relationship', async () => {
  // 1.Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entityUrl + data.entityId);
  // 3. Expand "Relationship referenced" section
  actionsBusinessEntity.selectRelationshipReferenced();
  // 4. Click on "Insert" button
  commonActions.clickButtonAfterLocator(commonPage.buttons.insertButtonRelationshipReferenced);
  // 5. Add a Name: AT_RelEntity1_AT_RelEntity2
  commonActions.fillField(
    businessEntityPage.fields.addNameRelationshipField,
    data.addRelationshipName,
  );
  // 6. Add a Display Name: AT_RelEntity1_AT_RelEntity2
  commonActions.fillField(
    businessEntityPage.fields.addDisplayNameRelationshipField,
    data.addRelationshipDisplayName,
  );
  // 7. Check if Referenced Entity field is pre-filled with "AT_RelEntity1"
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    businessEntityPage.fields.referencedEntityRelationshipField,
    data.addRelationshipReferencedEntity,
  );
  // 8. Click on Referencing Entity field (arrow icon) - a new window is displayed
  // 9. Search for AT_RelEntity2
  // 10. Click "Ok" button -> window is closed
  actionsBusinessEntity.selectReferencingEntityRelationship(data.referencingEntity2SearchFor);
  // 11. Check if Referencing Entity field is filled with "AT_RelEntity2"
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    businessEntityPage.fields.referencingEntityRelationshipField,
    data.referencingEntity2Field,
  );
  // 12. Check if Relationship type is 2 - readonly
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    businessEntityPage.fields.relationshipTypeField,
    data.relationshipTypeField,
  );
  // 13. Select Relationship Constrain: 0
  commonActions.clickButtonAfterLocator(
    businessEntityPage.fields.relationshipConstraintField,
    data.relationshipConstraint0Field,
  );
  commonActions.fillField(
    businessEntityPage.fields.relationshipConstraintField,
    data.relationshipConstraint0Field,
  );
  // 14. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15. Navigate to: "...Main#/entity/entity/list"
  commonActions.accessDirectUrl(data.urlToBusinessEntityList);
  // 16.  Search for: "AT_RelEntity1_AT_RelEntity2" - check if it's displayed in list
  verifyBusinessEntityAction.verifyIfBusinessEntityExistsInSearch(data.newEntityRelationship);
  // 17. Access "AT_RelEntity1_AT_RelEntity2"
  commonActions.selectARowFromTableAfterText(data.newEntityRelationship);
  await commonActions.getIdFromSelectedRowAndNavigate(
    data.entity_AT_RelEntity1_AT_RelEntity2Url,
    businessEntityPage.container.defaultEntityTableContainer,
  );
  // 18. Expand "Data Model"
  actionsBusinessEntity.selectDataModelSubMenu();
  // 19. "Check if there are 3 attributes:
  //      1. AT_RelEntity1Id - lookup
  I.waitForVisible(locate('td').withText(data.AT_RelEntity1id_NameAttributeDM).withAttr({ 'aria-colindex':'2'}), constants.SHORT_WAIT);
  I.waitForVisible(locate('td').withText(data.AT_RelEntity1id_DisplayNameAttributeDM).withAttr({ 'aria-colindex':'3'}), constants.SHORT_WAIT);
  I.waitForVisible(locate('td').withText(data.AT_RelEntity1id_AttributeTypeAttributeDM).withAttr({ 'aria-colindex':'4'}), constants.SHORT_WAIT);
  //      2. AT_RelEntity2Id - lookup
  I.waitForVisible(locate('td').withText(data.AT_RelEntity2id_NameAttributeDM).withAttr({ 'aria-colindex':'2'}), constants.SHORT_WAIT);
  I.waitForVisible(locate('td').withText(data.AT_RelEntity2id_DisplayNameAttributeDM).withAttr({ 'aria-colindex':'3'}), constants.SHORT_WAIT);
  I.waitForVisible(locate('td').withText(data.AT_RelEntity2id_AttributeTypeAttributeDM).withAttr({ 'aria-colindex':'4'}), constants.SHORT_WAIT);
  //      3. AT_RelEntity1_AT_RelEntity2id - pk"
  I.waitForVisible(locate('td').withText(data.AT_RelEntity1_AT_RelEntity2id_NameAttributeDM).withAttr({ 'aria-colindex':'2'}), constants.SHORT_WAIT);
  I.waitForVisible(locate('td').withText(data.AT_RelEntity1_AT_RelEntity2id_DisplayNameAttributeDM).withAttr({ 'aria-colindex':'3'}), constants.SHORT_WAIT);
  I.waitForVisible(locate('td').withText(data.AT_RelEntity1_AT_RelEntity2id_AttributeTypeAttributeDM).withAttr({ 'aria-colindex':'4'}), constants.SHORT_WAIT);
  // 20. Navigate again to: "...Main#/entity/entity/list"
  commonActions.accessDirectUrl(data.urlToBusinessEntityList);
  // 21. Search for "AT_RelEntity2"
  verifyBusinessEntityAction.verifyIfBusinessEntityExistsInSearch(data.entityATRelEntity2Name);
  // 22. Access "AT_RelEntity2"
  commonActions.accessDirectUrl(data.entityUrl + data.entityATRelEntity2Id);
  // 23. Expand "Relationship referencing" section
  actionsBusinessEntity.selectRelationshipReferencing();
  // 24. "Check if there are 2 relationships:
  //         1. ""AT_RelEntity1_AT_RelEntity2""
  //         2. ""AT_RelEntity1_AT_RelEntity22"""
  // 25. Access "AT_RelEntity1_AT_RelEntity2"
  I.waitForClickable(businessEntityPage.fields.tableColumnNameField, constants.SHORT_WAIT);
  I.click(businessEntityPage.fields.tableColumnNameField);
  commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultDivEntityTableContainer, data.attributeNameRelationshipReferencing1);
  // 26. "Check the details:
  //         1. Name: ""AT_RelEntity1_AT_RelEntity2""
  //         2. DisplayName: ""AT_RelEntity1_AT_RelEntity2""
  //         3. Referenced Entity: ""AT_RelEntity1""
  //         4. Referencing entity: ""AT_RelEntity2""
  //         5. Relationship Type: 2 - readonly
  //         6. Relationship Constraint: 0"
  I.waitForVisible(businessEntityPage.fields.tableColumnNameOnlyForViewField, constants.SHORT_WAIT);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputNameField, data.newEntityRelationship);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputDisplayNameField, data.displayNameNewEntityRelationship);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputReferencedEntityIdField, data.addRelationshipReferencedEntity);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputReferencingEntityIdField, data.referencingEntity2Field);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputRelationshipTypeField, data.relationshipTypeField);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, data.relationshipConstraint0Field);
  I.waitForVisible(businessEntityPage.fields.inputRelationshipTypeReadonlyField, constants.SHORT_WAIT);
  // 26	Update Constraint: set 1
  I.fillField(businessEntityPage.fields.relationshipConstraintInputField, data.relationshipConstraint1Field);
  // 27	Save and Reload -> a success message is displayed
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 28	Check if Constrain is 1
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, data.relationshipConstraint1Field);
  // 29	Update Constrain: set 2
  I.fillField(businessEntityPage.fields.relationshipConstraintInputField, data.relationshipConstraint2Field);
  // 30	Save and Reload -> a success message is displayed
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 31	Check if Constrain is 2
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, data.relationshipConstraint2Field);
  // 32. Go Back
  commonActions.goBackToPreviousPage();
  // 33. Expang again "Relationhip referencing" section
  actionsBusinessEntity.selectRelationshipReferencing();
  // 34. Access "AT_RelEntity1_AT_RelEntity22"
  commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultDivEntityTableContainer, data.attributeNameRelationshipReferencing2);
  I.waitForVisible(locate('td').withText(data.nameForView), constants.SHORT_WAIT);
  // 35. "Check the details:
  //      1. Name: ""AT_RelEntity1_AT_RelEntity22""
  //      2. DisplayName: ""AT_RelEntity1_AT_RelEntity22""
  //      3. Referenced Entity: AT_RelEntity1
  //      4. Referencing entity: AT_RelEntity2
  //      5. Relationship Type: 2
  //      6. Relationship Constraint: 0"
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputNameField, data.attributeNameRelationshipReferencing2);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputDisplayNameField, data.attributeNameRelationshipReferencing2);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputReferencedEntityIdField, data.attributeNameRelationshipReferencing1);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputReferencingEntityIdField, data.entityATRelEntity2Name);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputRelationshipTypeField, data.relationship1TypeField);
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.relationshipConstraintInputField, data.relationshipConstraint2Field);
  I.waitForVisible(businessEntityPage.fields.inputRelationshipTypeReadonlyField, constants.SHORT_WAIT);
  // 36 Logoff
  await commonActions.logoutFromApp();
});
