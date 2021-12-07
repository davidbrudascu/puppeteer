// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const optionSetActions = require('~actions/optionSetActions');
// Data
const data = require('~data/optionSet/TC003_EditOSItemsList');
// Pages
const commonPage = require('~pages/commonPage');
const optionSetPage = require('~pages/optionSetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const optionSetVerify = require('~actions/optionSetVerify');

// Author Victor Pana

Feature('Option Set');

Scenario('Edit Option set items list', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to your OptionSet list "...Main#/entity/optionset/edit/{ATEditOSlist}"
  commonActions.accessDirectUrl(data.accessYourOptionSetList1);
  // 3	Access OPT1
  optionSetActions.accessOptionSetItem(data.optionSetItemOPT1)
  // 4	Check if Name is OPT1 - readonly
  await optionSetVerify.verifyNameAndIDOptionSetItem(data.optionSetItemOPT1, data.idReadonly)
  // 5	Check the Id - readonly
  // 6	Update Display Name: OPT1 Updated
  commonActions.fillInTextValueInInput(optionSetPage.fields.inputDisplayNameField, data.optionSetItemOPT1Updated);
  // 7	Click on "Save and Close"
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8	Check "OPT2"
  commonActions.selectARowFromTableAfterText(data.optionSetItemOPT2);
  // 9	Click on "Delete" button
  optionSetActions.deleteOptionSetItem();
  // 10	An error message is displayed
  optionSetVerify.verifyErrorMessage(data.errorMessage);
  // 11	Check if all 3 items are available: "OPT1" "OPT2" and "OPT3"
  optionSetVerify.verifyOptionSetItemsAvailable(data.optionSetItemOPT1,data.optionSetItemOPT2,data.optionSetItemOPT3)
  // 12	Check "OPT3"
  commonActions.selectARowFromTableAfterText(data.optionSetItemOPT3);
  // 13	Click on "Delete" button
  optionSetActions.deleteOptionSetItem();
  // 14	Check if "OPT3" item was deleted
  optionSetVerify.verifyIfOptionSetItemDeleted(data.optionSetItemOPT3);
  // 15	Check if there are only 2 items available: "OPT1" and "OPT2"
  optionSetVerify.verifyOnlyTwoOptionSetItems(data.optionSetItemOPT1, data.optionSetItemOPT2);
  // 16	Click on "Insert" button -> insert form is displayed
  optionSetActions.insertOptionSet()
  // 17	Fill with Name: OPT4
  optionSetActions.addNewOptionSetItem(data.optionSetItemOPT4, data.optionSetItemDisplayNameOTP4, data.valueOptionSetItemOPT4)
  // 18	Fill with DisplayName: OPT4 DN
  // 19	Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 20	Navigate to your OptionSet list "...Main#/entity/optionset/edit/447a97a7-61d1-4345-8a07-7070c7ddb7b3"
  commonActions.accessDirectUrl(data.accessYourOptionSetList2);
  // 21	Change items order (Value2, Value 1 and Value 3)
  optionSetActions.changeOptionSetItems(data.optionSetItemValue1, data.optionSetItemValue2, data.optionSetItemValue3);
  // 22	Logoff
  await commonActions.logoutFromApp();
  // 23	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 24	Access your entity: "...Main#/entity/AT_OSEditItemsList/list"
  commonActions.accessDirectUrl(data.accessYourEntityPortal);
  // 25	Access your entry "Test Update OS list"
  commonActions.doubleClickValueFromTable(optionSetPage.container.defaultContainer, data.attributeOptionSetItem);
  // 26	Check if Optionset1 value is: "OPT1 Updated"
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputOptionsetItem1, data.optionSetItemOPT1Updated);
  // 27	Drop-down optionset list
  // 28	Select "OPT4"
  optionSetActions.selectOptionSetItem(data.optionSetItemOPT4)
  // 29	Check if OptionSet2 default value is: Value 3
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputOptionsetItem2, data.optionSetItemValue2);
  // 30	Open Optionset2
  optionSetActions.selectFromDropdownOptionSetItems();
  // 31	Check items order (Value2, Value1 and Value3)
  optionSetVerify.verifyOrderOptionSetItemsOrder(data.optionSetItemValue1, data.optionSetItemValue2, data.optionSetItemValue3, data.optionSetItemNone)
  // 32	Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 33	Check if the new selected value is still there (OPT4)
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputOptionsetItem1, data.optionSetItemDisplayNameOTP4);
  // 34	Logoff
  await commonActions.logoutFromApp();
});
