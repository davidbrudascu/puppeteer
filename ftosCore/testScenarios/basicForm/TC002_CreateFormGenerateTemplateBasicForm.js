// Actions
const commonActions = require('~actions/commonActions');
const basicFormActions = require('~actions/basicFormActions');
// Data
const data = require('~data/basicForm/TC002_CreateFormGenerateTemplateBasicForm')
// Verify
const basicFormVerify = require('~actions/basicFormVerify');

// Author Victor Pana

Feature('Basic Form');

Scenario('User can create a form using autogenerate Template', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entity_AT_GenTempFURL);
  // 3 Expand "Data forms" section
  // 4 Click on "Insert" button
  // 5 Fill in "Name" with "ATGenerateF"
  // 6 Check "is default" and "is default for edit"
  // 7 Check "Auto Generate Template" checkbox
  // 8 Select 2 columns
  // 9 Save and Reload
  // 10 Go to 2nd Section (UI) -> check if all attributes are displayed - name, Age, Value and Code
  basicFormActions.createGenerateTemplateBasicForm(data.sectionDataForms, data.nameGenTemplForm, data.autoGenerateTemplateType, data.nameATGenerateF, data.select2Columns,
      data.goToUITab, data.name, data.Value, data.Code, data.Age)
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login usinng Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13 Access your entity
  commonActions.accessDirectUrl(data.AT_GenTempFPortalUrl);
  // 14 Click on "Insert" button
  // 15 Check if the form is ok (2 columns/2 rows and contains all fields - Name, Code, Value and Age)
  // 16 Fill in all fields and click save and Reload
  // 17 Check if your form is still displayed
  basicFormVerify.verifyGenerateTemplateBasicForm(data.AT_GenTempFPortalUrl, data.insertButton, data.name, data.Value, data.Code, data.Age, data.nameAuto1, data.codeAT1, data.value100,
      data.valueAge, data.editAT_GenTempF)
  // 18 Logoff
  await commonActions.logoutFromApp();
});
