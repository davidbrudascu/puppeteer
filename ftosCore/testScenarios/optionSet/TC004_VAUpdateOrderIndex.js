// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const optionSetActions = require('~actions/optionSetActions');
// Data
const data = require('~data/optionSet/TC004_VAUpdateOrderIndex');
// Pages
const commonPage = require('~pages/commonPage');
const optionSetPage = require('~pages/optionSetPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const optionSetVerify = require('~actions/optionSetVerify');

// Author Victor Pana

Feature('Option Set');

Scenario('Virtual attribute - update order index', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to your OptionSet list "...Main#/entity/optionset/edit/5bf73568-e1ef-43dc-b10c-a265a26e55f4
  commonActions.accessDirectUrl(data.accessYourVAOptionSetlist);
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
  // 8	Check "OPT3"
  commonActions.selectARowFromTableAfterText(data.optionSetItemOPT3);
  // 9	Click on "Delete" button
  optionSetActions.deleteOptionSetItem();
  // 10	Check if "OPT3" item was deleted
  optionSetVerify.verifyIfOptionSetItemDeleted(data.optionSetItemOPT3);
  // 11	Check if there are only 2 items available: "OPT1" and "OPT2"
  optionSetVerify.verifyOnlyTwoOptionSetItems(data.optionSetItemOPT1, data.optionSetItemOPT2);
  // 12	Click on "Insert" button -> insert form is displayed
  optionSetActions.insertOptionSet()
  // 13	Fill with Name: OPT4
  optionSetActions.addNewOptionSetItem(data.optionSetItemOPT4, data.optionSetItemDisplayNameOTP4, data.valueOptionSetItemOPT4)
  // 14	Fill with DisplayName: OPT4 DN
  // 15	Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16	Change Option Items order (OPT2, OPT4 and OPT1 Updated)
  optionSetActions.changeOptionSetItemsUpdated(data.optionSetItemOPT1, data.optionSetItemOPT2, data.optionSetItemOPT4);
  // 17	Logoff
  await commonActions.logoutFromApp();
  // 18	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 19	Access your entity: "...Main#/entity/AT_VAOSChangeOrder/list"
  commonActions.accessDirectUrl(data.accessYourEntityPortal);
  // 20	Click on insert
  commonActions.clickSidebarButton(data.insertButton);
  // 21	Check if Optionset value is: "OPT1 Updated"
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputOptionsetItem, data.optionSetItemOPT1Updated)
  // 22	Drop-down optionset list
  optionSetActions.selectFromDropdownOptionSetList();
  // 23	Check the new values and order: "OPT2", "OPT4 DN"and "OPT1 Updated"
  optionSetVerify.verifyOrderOptionSetItems(data.optionSetItemOPT2, data.optionSetItemDisplayNameOTP4, data.optionSetItemOPT1Updated, data.optionSetItemNone)
  // 24	Select "OPT4"
  // 25	Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 26	Check if [none] is back again
  await commonVerify.verifyValueExistsInInput(optionSetPage.fields.inputOptionsetItem, data.optionSetItemNone)
  // 27	Logoff
  await commonActions.logoutFromApp();
});
