// Actions
const commonActions = require('~actions/commonActions');
//  Data
const data = require('~data/view/TC018_InlineEditing1toNView.json');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana

Feature('View');

Scenario('User can editing inline row  1 to N  attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_InlineEditingCell/list/
  // commonActions.accessDirectUrl(data.viewAT_InlineRelParent_Auto1Record_Portal);
  // 3	Access Auto 1 record
  commonActions.accessDirectUrl(data.viewAT_InlineRelParent_Auto1Record_Portal);
  // 4	Check  the relationship table (Name and Code column; Value is not displayed)
  // 5	Check if "Child1" is editable
  // 6	Check if "CH1" is not editable
  // 7	Update "Child1" to "Child1 Updated"
  // 8	Click on "View" link
  // 9	Form is displayed
  // 10	Check if Name is "Child 1 Updated"
  await viewActionVerify.verifyInlineEditing1toNViewInPortal(
    data.nameChild1,
    data.codeCH1,
    data.nameChild1Updated,
    data.formEditAT_InlineRelChild,
    data.formAT_InlineRelChild,
  );
  // 11	Logoff
  await commonActions.logoutFromApp();
});
