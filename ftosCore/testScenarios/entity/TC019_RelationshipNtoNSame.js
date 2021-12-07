// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/entity/TC019_RelationshipNtoNSame');
// Pages
const businessEntityPage = require('~pages/businessEntityPage');
// Verify
const businessEntityVerify = require('~actions/businessEntityVerify');
const commonVerify = require('~actions/commonVerify');


// Author Catalin Diaconu

Feature('Entity');

Scenario('Relationship NtoN Same', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity "...Main#/entity/AT_NtoNSameRel/list"
  commonActions.accessDirectUrl(data.urlAT_NToNSameRel);
  // 3 Fill in Name with: "Auto Test 5"
  // 4 Save and Reload
  actionsBusinessEntity.insertEntityNtoNRel(data.autoTest5);
  // 5  Select entities from the relationship grid
  actionsBusinessEntity.selectAutoTestRelAT_NtoNSameRel(
    data.rowAutoTest1,
    data.rowAutoTest3,
    data.rowAutoTest5,
    data.autoTest1,
  );
  // 6 Check if the grid contains 3 entries (Auto Test 1, Auto Test 3 and Auto Test 5)
  businessEntityVerify.verify3RecordsExistsInATableAT_NtoNSameRel(
    data.autoTest1,
    data.autoTest3,
    data.autoTest5,
  );
  // 7 Go back to list "...Main#/entity/AT_NtoNSameRel/list"
  commonActions.accessDirectUrl(data.urlAT_NToNSameRel);
  // 8 Access "Auto Test 1"
  commonActions.doubleClickValueFromTable(
    businessEntityPage.container.defaultEntityTableContainer,
    data.autoTest1,
  );
  // 9 Check if Grid contains only 1 record (Auto Test 1)
  commonVerify.verifyValueExistsInTable(
    businessEntityPage.container.aT_NTONSAMERELTableContainer,
    data.autoTest1,
  );
  // 10 Go back to list "...Main#/entity/AT_NtoNSameRel/list"
  commonActions.accessDirectUrl(data.urlAT_NToNSameRel);
  // 11 Access a record and delete all entries from the relationship grid
  actionsBusinessEntity.verifyAndDeleteRecordsAT_NtoNSameRel(
    data.autoTest2,
    data.autoTest1,
    data.autoTest2,
  );
  // 12 Go back to list "...Main#/entity/AT_NtoNSameRel/list"
  commonActions.accessDirectUrl(data.urlAT_NToNSameRel);
  // 13 Delete a record and verify if it is still present in the relationship grid
  actionsBusinessEntity.deleteEntityAccessAnotherAT_NtoNSameRel(
    data.autoTest3,
    data.autoTest5,
    data.autoTest1,
    data.autoTest5,
  );
  // 14 Logoff
  await commonActions.logoutFromApp();
});
