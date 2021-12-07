// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/view/TC015_InlineEditingRowView');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana

Feature('View');

Scenario('User can inline editing row attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_InlineEditingCell/list/
  commonActions.accessDirectUrl(data.viewAT_InlineEditingRowPortal);
  // 3 Check if all columns are displayed (Name, Code, Currency, Price, Size and TVA)
  // 4 Click on "Edit" link
  // 5 Verify Name: Laptop
  // 6 Update Name: Lpt Update
  // 7 Verify Code: LPT1
  // 8 Update Code: leave it empty
  // 9 Verify Currency: Leu
  // 10 Update Currency: Euro
  // 13 Verify Price: 2,000,25
  // 14 Update Price: 2.55
  // 15 Verify Size: S
  // 16 Update Size: L
  // 17 Verify TVA: 0.19
  // 18 Check if TVA is not editable
  // 19 Click on Save
  // 20 A success message is displayed
  await viewActionVerify.verifyInlineEditingRowViewInPortal(
    data.nameLaptop,
    data.nameLptUpdate,
    data.nameLPT1,
    data.currencyLeu,
    data.currencyEuro,
    data.sizeS,
    data.sizeL,
    data.price2000_25,
    data.price2_55,
    data.tva0_19,
  );
  // 21 Logoff
  await commonActions.logoutFromApp();
});
