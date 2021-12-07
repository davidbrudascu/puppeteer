// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/entity/TC010_InsertInsertExistingRelationship');

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can insert insert an existing entity relationship', async () => {
  // 1.  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2.  Navigate to 1st entity "...Main#/entity/AT_InsIns1/list/"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_InsIns1_Name + data.portalViewList);
  // 3. Open your record (Auto Test InsIns1) -> edit form is displayed
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_InsIns1_Name + data.portalEditAttribute
    + data.autoTest_InsIns1_Id,
  );
  // 4	Check if relationship table "AT_InsIns2" is displayed and is empty
  // 5. Click on "Insert existing" button -> A new window is opened
  // 6. Check if the table is empty
  // 7. Click on "Insert" button -> A new window is displayed
  // 8 Check the form (Name: default and Attributes: Name, Code and Value)
  // 9	Fill in (Name: Prod1, Code: PR1, Value: 100)
  // 10 Click on "Save and Close" - > Window is closed
  // 11	Added entry is displayed in list
  // 12	Select it
  // 13	Click "Ok" Button -> window is closed
  // 14. Check if the new entries were added in your table
  // 15	Open your record (Prod1) -> RelationForm is displayed
  // 16	Check the form (FormName: RelationForm and Attributes: Name: Prod1 and Value 100; Code is not displayed)
  // 17	Check if relationship table is displayed
  // 18	Check if one entry is displayed in table (Name: AutoTest InsIns1)
  await viewActions.insertInsertExistingRelationship(data.nameRelationshipTable, data.nameRelationshipTableNoData, data.relationshipName, data.attributeName, data.attributeCode, data.attributeValue, data.nameInsInsertAttribute,
      data.valueOfCodePR1, data.valueOfValue100, data.valueOfProd1, data.formNameRelationForm, data.entity_AT_InsIns1_Name, data.entryNameAutoTestInsIns1)
  // 19	Logoff
  await commonActions.logoutFromApp();
});
