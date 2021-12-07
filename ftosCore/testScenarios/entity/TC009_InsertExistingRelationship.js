// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/entity/TC009_InsertExistingRelationship');
// Pages
const commonPage = require('~pages/commonPage');
const businessEntityPage = require('~pages/businessEntityPage');
const attributePage = require('~pages/attributePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyAttributeActionsField = require('~actions/attributesVerify');

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can insert an existing entity relationship', async () => {
  // 1.  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2.  Navigate to 1st entity "...Main#/entity/AT_InsertEx1/list/"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_InsertEx1_Name + data.portalViewList);
  commonVerify.verifyEmptyTableData();
  // 3. Click on "Insert" icon
  commonActions.clickButtonAfterLocator(commonPage.buttons.insertButton);
  // 4. Fill in all fields: Name - Auto Test Insert 1, Code: AT1
  commonActions.fillField(
    businessEntityPage.fields.primaryAttributeField, data.nameAutoTestAttribute,
  );
  commonActions.fillField(
    businessEntityPage.fields.secondAttributeField, data.codeAT1Attribute,
  );
  // 5. Click "Save and Reload" icon
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6. Check if relationship table is displayed and is empty
  commonVerify.verifyEmptyTableData();
  commonActions.seeInField(attributePage.fields.relationshiptableName, data.nameRelationshipTable);
  // 7. Click on "Insert existing" button -> A new window is opened
  commonActions.clickButtonAfterLocator(attributePage.buttons.insertExistingButton);
  // 8. Check if a list with all available results are displayed (values from P4)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultPopupTableContainer, data.valueOfProduct4)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultPopupTableContainer, data.valueOfProduct3)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultPopupTableContainer, data.valueOfProduct5)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultPopupTableContainer, data.valueOfProduct1)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultPopupTableContainer, data.valueOfProduct2)
  // 9. Select 2 of them
  attributeActions.selectProductFromTableRelationshipNameAndAdd(data.relationshipName, 1);
  attributeActions.selectProductFromTableRelationshipNameAndAdd(data.relationshipName, 2);
  // 10. Click "Ok" Button -> window is closed
  commonActions.clickButtonAfterLocator(attributePage.buttons.okInsertExistingButton);
  // 11. Check if the new entries were added in your table
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultAT_InsertEx1_AT_InsertEx2TableContainer, data.valueOfProduct1)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultAT_InsertEx1_AT_InsertEx2TableContainer, data.valueOfProduct2)
  // 12. Navigate to 2nd entity "...Main#/entity/AT_InsertEx2/list"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_InsertEx2_Name + data.portalViewList);
  // 13. Open 1st entry from table (Produs 1) -> edit form is displayed
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.valueOfProduct1);
  // 14. Check if the relationship table is displayed
  commonActions.seeInField(attributePage.fields.relationshiptableName, data.nameRelationshipTable);
  // 15. Check if one entry is available (Name: Auto Test Insert 1, Code: ATI1)
  verifyAttributeActionsField.searchAndVerifyForAProductInsertExistingTable(
    attributePage.fields.searchEditAttributeInsertExistingField,
    attributePage.fields.tableRowValueFromEditAttributeInsertExistingField,
    data.nameAutoTestAttribute,
  );
  // 16. Go back
  commonActions.goBackToPreviousPage();
  // 17. Open 2nd entry from table (Produs 2) -> edit form is displayed
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.valueOfProduct2);
  // 18. Check if one entry is available (Name: Auto Test Insert 1, Code: ATI1)
  verifyAttributeActionsField.searchAndVerifyForAProductInsertExistingTable(
    attributePage.fields.searchEditAttributeInsertExistingField,
    attributePage.fields.tableRowValueFromEditAttributeInsertExistingField,
    data.nameAutoTestAttribute,
  );
  // 19. Logoff
  await commonActions.logoutFromApp();
});
