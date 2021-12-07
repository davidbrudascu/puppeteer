// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Verify
const businessEntityVerify = require('~actions/businessEntityVerify');
// Data
const data = require('~data/entity/TC017_CreateSameRelantionship');

// Author Catalin Diaconu

Feature('Entity');

Scenario('Create Same Relationship between entities', async () => {
  // 1 Log in Designer App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to Entity
  commonActions.accessDirectUrl(data.entityUrl + data.entity_AT_Create1toNSameId);
  // 3 Create new attribute in the Data Model Section
  actionsBusinessEntity.addNewAttribute(
    data.addDataModelAttributeName,
    data.lookUpAttributeType,
    data.addDataModelAttributeDisplayName,
    data.entityAT_Create1ToNSame,
  );
  // 4 Expand "Relationship Referencing" section
  actionsBusinessEntity.selectRelationshipReferencing();
  // 5 Verify Relationship Referencing Entity
  await businessEntityVerify.verifyRelationshipReferencingEntity(
    data.aT_Create1toNSame_AT_Create1toNSameLkpId,
    data.entityAT_Create1ToNSame,
    data.entityAT_Create1ToNSame,
    data.oneToMany,
    data.none,
  );
  // 7 Navigate to "AT_CreateNtoNSame" entity
  commonActions.accessDirectUrl(data.entityUrl + data.entity_CreateNtoNSameId);
  // 8 Expand again "Relationships Referencing" section
  actionsBusinessEntity.selectRelationshipReferencing();
  // 9 Create new attribute in Relationship Referencing Tab
  await actionsBusinessEntity.createNewReferencingRelEntity(
    data.nameAddRelationshipReferencing,
    data.displayNameAddRelationshipReferencing,
    data.referencedEntity,
    data.entityAT_CreateNtoNSame,
    data.manyToMany,
    data.empty,
    data.none,
    data.columnName,
  );
  // 10 Logoff
  await commonActions.logoutFromApp();
});
