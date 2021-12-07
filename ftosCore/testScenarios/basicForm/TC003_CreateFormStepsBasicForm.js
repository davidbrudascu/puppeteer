// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const basicFormActions = require('~actions/basicFormActions');
// Data
const data = require('~data/basicForm/TC003_CreateFormStepsBasicForm');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const basicFormVerify = require('~actions/basicFormVerify');


// Author Victor Pana

Feature('Basic Form');

Scenario('User can create form with sections', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entity_AT_GenTempFURL);
  // 3 Expand "Data forms" section
  // 4 Click on "Insert" button
  // 5 Fill in "Name" with "ATStepsF"
  // 6 Check "is default" and "is default for edit"
  // 7 Save and Reload
  // 8 Go to 3rd Section (Steps)
  // 9 Check "Render section tabs as a bullet list"
  // 10 Click on "Insert" button
  // 11 Fill in Name with: First Step
  // 12 Fill in Display Name with: 1st Step AT
  // 13 Save and Reload
  // 14 Go to UI
  // 15 Click on Tools -> Source Code
  // 16 Paste the HTML Code (P4)
  // 17 Click Ok
  // 18 Click "Save and Close" icon -> Check if your section was added
  // 19 Click on "Insert" button
  // 20 Fill in Name with: Second Step
  // 21 Fill in DisplayName with: 2nd Step AT
  // 22 Save and Reload
  // 23 Go to Code
  // 24 Click on Tools -> Source Code
  // 25 Paste the HTML Code (P5)
  // 26 Click Ok
  // 27 Click "Save and Close" icon
  basicFormActions.createFormStepsBasicForm(data.sectionDataForms, data.form_AT_StepsCreateF, data.autoGenerateTemplateType, data.nameATStepsF, data.goToStepsTab, data.nameFirstStep, data.displayName1stStepAT,
      data.customHtmlP4, data.nameSecondStep, data.displayName2ndStepAT, data.goToUITab, data.customHtmlP5)
  // 28 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 29 Logoff
  await commonActions.logoutFromApp();
  // 30 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 31 Access your entity
  commonActions.accessDirectUrl(data.AT_StepsCreateFPortalUrl);
  // 32 Click on "Insert" icon
  // 33 The form is displayed and you're redirected to the 1st section -> Check the section name
  // 34 Fill in Name and Age (Check if Code and Value are not displayed)
  // 35 Click on 2nd Section -> check the section name
  // 36 Fill in Code and Value (Check if Name and Age are not displayed)
  // 37 Save and close
  // 38 Check your inserted record
  // 39 Open your record -> check if your form is displayed (Check if 1st section is displayed)
  basicFormVerify.verifyFormStepsBasicForm(data.insertButton, data.addAT_StepsCreateFview, data.displayName1stStepAT, data.name, data.Age, data.nameAuto1, data.valueAge,
      data.displayName2ndStepAT, data.Code, data.Value, data.codeAT1, data.value100, data.editAT_StepsCreateFview)
  // 40 Logoff
  await commonActions.logoutFromApp();

});
