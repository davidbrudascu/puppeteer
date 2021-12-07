// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/entity/TC018_Relationship1toNSame');
// Verify
const businessEntityVerify = require('~actions/businessEntityVerify');

// Author Catalin Diaconu

Feature('Entity');

Scenario('1 to N Same Relationship', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access you entity: "...Main#/entity/AT_1toNSameRel/list"
  commonActions.accessDirectUrl(data.entityUrl);
  // 3 Create a new attribute
  actionsBusinessEntity.insertNewEntitySelectLookup(data.autoTest5, data.autoTest1);
  // 4 Verify lookup entity and edit it
  await businessEntityVerify.verifyLookupAndEditIt(data.autoTest1);
  // 5 Verify entries in the relationship grid
  actionsBusinessEntity.verifyRowsDeleteFirstEntry(data.autoTest2, data.autoTest5);
  // 6 Select lookup entity and verify if it appears in the relationship grid
  actionsBusinessEntity.selectEntity1toNRelSame(data.autoTest5);
  // 7 Create new attribute and verify lookup entity
  await actionsBusinessEntity.insertNewEntity1toNRelSame(data.autoTest6, data.autoTest5);
  // 8 Verify if the relationship grid contains 2 entries
  businessEntityVerify.verify2RecordsExistsInATableAT_1toNSameRel(data.autoTest5, data.autoTest6);
  // 9 Log Off
  await commonActions.logoutFromApp();
});
