// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const basicFormActions = require('~actions/basicFormActions');
// Data
const data = require('~data/basicForm/TC001_CreateHTMLSourceCodeBasicForm');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const basicFormVerify = require('~actions/basicFormVerify');

// Author Victor Pana

Feature('Basic Form');

Scenario('User can create a form using HTML source code and mark as default', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entity_AT_CreateHTMLFURL);
  // 3 Expand "Data forms" section -> check if only "default" form is displayed and default and default for edit checkboxes are checked
  // 4 Click on "Insert" button
  // 5 Fill in "Name" with "ATHtmlF"
  // 6 Select the checkbox "is default for edit"
  // 7 Save and Reload
  // 8 Go to UI tab
  // 9 Click on "tools" -> Source Code
  // 10 Paste your HTML code
  // 11 Click on "Ok" button
  basicFormActions.createHTMLSourceCodeBasicForm(data.sectionDataForms, data.nameATHtmlF, data.isDefaultForEditCheckbox, data.goToUITab, data.customHtmlSample1)
  // 12 Click on Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 13 Logoff
  await commonActions.logoutFromApp();
  // 14 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 15 Access your entity's list:  "...Main#/entity/AT_CreateHTMLForm/list"
  commonActions.accessDirectUrl(data.AT_CreateHTMLFormPortalUrl);
  // 16 Click on "Insert" icon
  // 17 Check if your form is the default one (Name, Code, Age and Value)
  // 18 Fill in all fields (Name: Auto1, Code: AT1, Age: 30, Value: 100)
  // 19 Click on "Save and Reload" icon
  // 20 Check if your new created form is displayed (Code, Value and Name)
  // 21 Update Name (from Auto 1 to Updated)
  // 22 Click on "Save and Close" icon
  // 23 Check If the list view is displayed
  // 24 Check if the Name was updated
  await basicFormVerify.verifyCreateHTMLSourceCodeBasicForm(data.Name, data.Code, data.Value, data.Age, data.nameAuto1, data.codeAT1, data.value100, data.age30, data.nameUpdated, data.insertButton)
  // 25 Log off
  await commonActions.logoutFromApp();
});
