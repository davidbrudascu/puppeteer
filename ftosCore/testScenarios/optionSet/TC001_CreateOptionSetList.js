// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const optionSetActions = require('~actions/optionSetActions');
// Data
const data = require('~data/optionSet/TC001_CreateOptionSetList');
// Pages
const commonPage = require('~pages/commonPage');
const optionSetPage = require('~pages/optionSetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const optionSetVerify = require('~actions/optionSetVerify');

// Author Victor Pana

Feature('Option Set');

Scenario('Create an option set list', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to: "...Main#/entity/optionset/list"
  commonActions.accessDirectUrl(data.accessOptionSetList);
  // 3 Click on "Insert" icon
  commonActions.clickSidebarButton(data.insertButton);
  // 4 Add Name: ATOSCreateList
  commonActions.fillField(optionSetPage.fields.inputNameField, data.nameOfOptionSet);
  // 5 Add Display Name: Auto Test Create OS List
  commonActions.fillField(optionSetPage.fields.inputDisplayNameField, data.displayNameOfOptionSet);
  // 6 Save and Reload -> Relation table is displayed
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7 Click on "Insert" button
  optionSetActions.insertOptionSet();
  // 8 Add 1st value (Name: S, DisplayName: Short, Value: 10)
  optionSetActions.addNewOptionSetItem(data.nameSOptionSetItem, data.displayNameShortOptionSetItem, data.valueTenOptionSetItem)
  // 9 Click on Save and New
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Add 2nd value (Name: M, DisplayName: Medium, Value: 20)
  optionSetActions.addNewOptionSetItem(data.nameMOptionSetItem, data.displayNameMediumOptionSetItem, data.valueTwentyOptionSetItem)
  // 11 Click on Save and New
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Add 3rd value (Name: L, DisplayName: Large and Value: 30)
  optionSetActions.addNewOptionSetItem(data.nameLOptionSetItem, data.displayNameLargeOptionSetItem, data.valueThirtyOptionSetItem)
  // 13 Click on Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 14 All added values are displayed in OptionItems list
  optionSetVerify.verifyAllAddedValueDisplayed(data.nameSOptionSetItem, data.nameMOptionSetItem, data.nameLOptionSetItem, data.valueTenOptionSetItem, data.valueTwentyOptionSetItem, data.valueThirtyOptionSetItem)
  // 15 Navigate to your entity "...Main#/entity/entity/edit/993a9a98-a4d6-4802-ad5d-e92ff60428cb
  commonActions.accessDirectUrl(data.accessYourEntityAT_OSListEnt);
  // 16 Expand "Data Model"
  optionSetActions.expandDataModel();
  // 17 Click on "Insert" button
  optionSetActions.insertNewAttributeButton();
  // 18 Select Attribute Type: "Option Set"
  optionSetActions.selectAttributeType(data.selectOptionSetAttributeType);
  // 19 Open "Option set" list
  optionSetActions.openOptionSetList();
  // 20 Search for Name: "ATOSCreateList"
  optionSetActions.searchForDisplayNameOfOptionSet(data.displayNameOfOptionSet);
  // 21 Open "Option Set - default value" list
  optionSetActions.optionSetDefaultValue();
  // 22 Check if there are 3 records (Name: S, M and L; Value: 10, 20 and 30)
  optionSetVerify.verifyAllValueDisplayedInPopupOptionSet(data.nameSOptionSetItem, data.nameMOptionSetItem, data.nameLOptionSetItem, data.valueTenOptionSetItem, data.valueTwentyOptionSetItem, data.valueThirtyOptionSetItem)
  optionSetActions.cancelOptionSetItemAttribute();
  // 23	Logoff
  await commonActions.logoutFromApp();
});
