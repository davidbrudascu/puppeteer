// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const basicFormActions = require('~actions/basicFormActions');
// Data
const data = require('~data/basicForm/TC004_EditBasicForm');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const basicFormVerify = require('~actions/basicFormVerify');

// Author Victor Pana

Feature('Basic Form');

Scenario('User can edit a basic form', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entity_AT_EditFormURL);
  // 3 Expand "Data forms" section
  // 4 Access your form
  // 5 Go to 3rd Section (Steps)
  // 6 Access Section 1
  // 7 Update its name and display name (SCT Updated)
  // 8 Save and Close
  // 9 Switch SCT Updated with Section3
  // 10 Uncheck "render section tabs as bullet"
  basicFormActions.createEditBasicForm(data.sectionDataForms, data.dataFormName, data.goToStepsTab, data.nameSection1, data.nameSectionUpdated, data.displayNameSectionUpdated, data.nameSection2,
      data.nameSection3)
  // 11 Save and Reload
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Logoff
  await commonActions.logoutFromApp();
  // 13 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14 Navigate to your entity: "...Main#/entity/AT_EditForm/list"
  commonActions.accessDirectUrl(data.entity_AT_EditFormPortalURL);
  // 15 Click on "Insert" icon
  // 16 Check if your sections are rendered as tabs
  // 17 Check the section order (Section3, Section2 and SCT Updated)
  // 18 Fill in all fields from 1st section (Code and Value)
  // 19 Click on 2nd section
  // 20 Fill in all fields from 2nd section (Age)
  // 21 Click on 3rd section
  // 22 Fill in all fields from 3rd section (Name)
  // 23 Save and Close
  // 24 Check if your record is added in list
  basicFormVerify.verifyEditBasicForm(data.insertButton, data.nameSectionUpdated, data.nameSection2, data.nameSection3, data.codeAT1, data.value100, data.valueAge, data.nameAuto1)
  // 25 Logoff
  await commonActions.logoutFromApp();
});
