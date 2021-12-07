// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/entity/TC015_FormRelationship');

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can create a form entity relationship', async () => {
  // 1.  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2.  Navigate to your entity"...Main#/entity/AT_RelFormParent/list/"
  commonActions.accessDirectUrl(data.viewAT_RelFormParent_Portal);
  // 3	Open your record (Parent1) -> edit form is displayed
  // 4	Check if relationship table is displayed and is empty
  // 5	Click on "Insert" button -> a new form is displayed
  // 6	Check the form (title Name: INSERT REL FORM and Attributes: Name and Code)
  // 7	Fill in Name with Child1
  // 8	Fill in Code with CH1
  // 9	Save and Reload -> a new form is displayed
  // 10	Check the form (title Name: REL FORM and Attributes: Name, Code and Parent)
  // 11	Check if Parent is: Parent1, Name: Child1 and Code CH1
  // 12	Click "Go Back" icon
  // 13	Access again "Child1"
  // 14	Check the form (title Name: REL FORM and Attributes: Name, Code and Parent)
  await viewActions.createAndEditNewRelFormParentView(data.recordParent1, data.nameRelationshipTableNoData, data.attributeName, data.attributeCode, data.nameChild1, data.codeCH1, data.attributeParent)
  // 15	Navigate to your entity"...Main#/entity/AT_RelFormChild/list/"
  commonActions.accessDirectUrl(data.viewAT_RelFormChild_Portal);
  // 16	Click on Insert (Check form title: Default)
  // 17	Fill in the following fields (Name: Child0, Value: 1000, Description: Desc Auto)
  // 18	Save and Reload -> a new form is displayed
  // 19	Check the form (title Name: Edit FORM and Attributes: Name, Code and Value)
  // 20	Check Name: Child2
  // 21	Check Value: 1000
  // 22 Check Code: empty
  await viewActions.insertNewRelFormChildView(data.toolbarButtonInsert, data.nameChild0, data.value1000, data.descriptionDescAuto, data.attributeName, data.attributeCode, data.attributeValue, data.codeEmpty)
  // 23	Logoff
  await commonActions.logoutFromApp();
});
