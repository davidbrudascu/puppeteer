// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/entity/TC011_RemoveExistingRelationship');
// Pages
const attributePage = require('~pages/attributePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyAttributeActionsField = require('~actions/attributesVerify');

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can remove an existing entity relationship', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Navigate to your entity"...Main#/entity/entity/edit/{AT_RemoveEx1}"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_RemoveEx1_Name + data.portalViewList);
  // 3. Open your record (Auto Test InsIns1) -> edit form is displayed
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_RemoveEx1_Name + data.portalEditAttribute
    + data.autoTest_AT_RemoveEx1_Remove1_Id,
  );
  // 4. Check if relationship table is displayed and contains 3 records
  // ("Prod Remove1", "Prod Remove2" and ""Prod Remove3")
  verifyAttributeActionsField.searchAndVerifyForAProductInsertExistingTable(
    attributePage.fields.searchForRemoveProductExistingField,
    attributePage.fields
      .tableRowValueFrom_AT_RemoveEx1_AT_RemoveEx2EditAttributeInsertExistingField,
    data.valueOfProductRemove1,
  );
  verifyAttributeActionsField.searchAndVerifyForAProductInsertExistingTable(
    attributePage.fields.searchForRemoveProductExistingField,
    attributePage.fields
      .tableRowValueFrom_AT_RemoveEx1_AT_RemoveEx2EditAttributeInsertExistingField,
    data.valueOfProductRemove2,
  );
  verifyAttributeActionsField.searchAndVerifyForAProductInsertExistingTable(
    attributePage.fields.searchForRemoveProductExistingField,
    attributePage.fields
      .tableRowValueFrom_AT_RemoveEx1_AT_RemoveEx2EditAttributeInsertExistingField,
    data.valueOfProductRemove3,
  );
  commonActions.fillField(
    attributePage.fields.searchForRemoveProductExistingField,
    data.valueOfProductRemove,
  );
  // 5. Check 2 records ("Prod Remove1" and "Prod Remove2")
  attributeActions.selectProductFromTableRelationshipNameAndAdd(data.relationshipName, 1);
  attributeActions.selectProductFromTableRelationshipNameAndAdd(data.relationshipName, 2);
  // 6. Click on "Remove existing" button
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.removeExisting_AT_RemoveEx1_AT_RemoveEx2_RelationshipButton,
  );
  // 7. Check if the relationship table contains only 1 record "Prod Remove3"
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultRemove_AT_RemoveEx1_AT_RemoveEx2, data.valueOfProductRemove3)
  verifyAttributeActionsField.verifyRemovedProdNotExistInTable(data.valueOfProductRemove1, data.valueOfProductRemove2);
  // 8. Navigate to 2nd entity "...Main#/entity/AT_RemoveEx2/list"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_RemoveEx2_Name + data.portalViewList);
  // 9. Access "Prod Remove1" -> edit form is displayed
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.valueOfProductRemove1);
  // 10. Check if relation table is empty
  commonVerify.verifyEmptyTableData();
  // 11. Go back
  commonActions.goBackToPreviousPage();
  // 12. Access "Prod Remove2" -> edit form is displayed
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.valueOfProductRemove2);
  // commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_RemoveEx2_Name
  //   + data.portalEditAttribute + data.autoTest_AT_RemoveEx2_Remove2_Id);
  // 13. Check if relation table is empty
  commonVerify.verifyEmptyTableData();
  // 14. Go back
  commonActions.goBackToPreviousPage();
  // 15. Access "Prod Remove3" -> edit form is displayed
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.valueOfProductRemove3);
  // 16. Check if relation table contains 1 entry (Auto Test InsIns1)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultRemove_AT_RemoveEx1_AT_RemoveEx2, data.valueFromTable_ProdRemove3)
  // 17. Logoff
  await commonActions.logoutFromApp();
});
