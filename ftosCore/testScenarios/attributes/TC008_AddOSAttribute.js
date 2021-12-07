// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const optionSetActions = require('~actions/optionSetActions');
// Data
const data = require('~data/attributes/TC002_AddOSAttribute');
// Pages
const commonPage = require('~pages/commonPage');
const optionSetPage = require('~pages/optionSetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const optionSetVerify = require('~actions/optionSetVerify');

// Author Victor Pana

Feature('Attributes');

Scenario('Add an Option set attribute', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to your entity "...Main#/entity/entity/edit/736be442-d20c-4ee0-a109-aa8c1d9d9ff8"
  commonActions.accessDirectUrl(data.accessYourEntity);
  // 3	Expand "Data Model"
  optionSetActions.expandDataModel()
  // 4	Click on "Insert" button
  optionSetActions.insertNewAttributeButton();
  // 5	Add Name: "OSAttribute"
  commonActions.fillField(optionSetPage.fields.inputNameField, data.nameOSAttribute);
  // 6	Select Attribute Type: "Option Set"
  optionSetActions.selectAttributeType(data.selectOptionSetAttributeType);
  // 7	Add Display name: "OS Attribute"
  commonActions.fillField(optionSetPage.fields.inputDisplayNameField, data.displayOSAttribute);
  // 8	Table Column Name: is pre-filled with "OSAttribute"
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputTableColumnNameField, data.nameOSAttribute);
  // 9	Select Required level: None
  optionSetActions.selectRequiredLevel(data.requiredLevel)
  // 10	Open "Option set" list
  optionSetActions.openOptionSetList();
  // 11	Search for Name: "ATCreateOSAttr"
  optionSetActions.searchForDisplayNameOfOptionSet(data.displayNameOfOptionSet);
  // 12	Open "Option Set - default value" list
  optionSetActions.optionSetDefaultValue();
  // 13	Check if there are 3 records (Name: S, M and L; Value: 10, 20 and 30)
  optionSetVerify.verifyAllValueDisplayedInPopupOptionSet(data.nameSOptionSetItem, data.nameMOptionSetItem, data.nameLOptionSetItem, data.valueTenOptionSetItem, data.valueTwentyOptionSetItem, data.valueThirtyOptionSetItem)
  // 14	Select M
  // 15	Click "ok"
  optionSetActions.selectOptionSetAttribute(data.nameMOptionSetItem);
  // 16	Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 17	Logoff
  await commonActions.logoutFromApp();
  // 18	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 19	Navigate to your business entity: "....Main#/entity/AT_OSAttrEnt/list"
  commonActions.accessDirectUrl(data.accessYourEntityPortal);
  // 20	Click on "Insert" icon -> insert form is displayed
  commonActions.clickSidebarButton(data.insertButton);
  // 21	Check if "OS Attribute" value is "M"
  await optionSetVerify.verifyOSAttributeValue(data.displayNameMediumOptionSetItem);
  // 22	Select OS Attribute value: L
  optionSetActions.selectOSAttribute(data.displayNameLargeOptionSetItem);
  // 23	Fill in Name: Test 1
  commonActions.fillField(optionSetPage.fields.inputNamePortalField, data.valueOfTestAttribute);
  // 24	Click save and reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 25	Check if the new value is still there (and not the default one)
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputValueOsAttributeField, data.displayNameLargeOptionSetItem);
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputNamePortalField, data.valueOfTestAttribute);
  // 26	Logoff
  await commonActions.logoutFromApp();
});
