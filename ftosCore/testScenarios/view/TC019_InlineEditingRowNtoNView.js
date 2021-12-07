// Actions
const commonActions = require('~actions/commonActions');
//  Data
const data = require('~data/view/TC019_InlineEditingRowNtoNView.json');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana

Feature('View');

Scenario('User can editing inline row  N to N  attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_InlineEditingCell/list/
  commonActions.accessDirectUrl(data.viewAT_InlineEditRel1_Auto1Record_Portal);
  // 3	Access Auto 1 record
  // 4	Check  the relationship table (Name and Code column; Value is not displayed)..
  // 5	Click on "Edit" link
  // 6	Check if only Code is not editable
  // 7	Update Name from "Record1" to "Record 1 Updated"
  // 8	Click Save link
  // 9	Click on "Insert" button
  // 10	Check the view (Name and Value are displayed; Code is not displayed)
  // 11	Check if Name is editable
  // 12	Check if Code is not editable
  // 13	Update "Record 2" to "Record 2 Updated"
  // 14	Select "Record 2 Updated"
  // 15	Click "Ok"
  // 16	Check if Record1 Updated and Record2 Updated are displayed in your relationship table
  await viewActionVerify.verifyInlineEditingRowNtoNViewInPortal(data.codeREC1, data.nameRecord1Updated, data.price200_00, data.nameRecord2, data.nameRecord2Updated);
  // 17	Logoff
  await commonActions.logoutFromApp();
});
