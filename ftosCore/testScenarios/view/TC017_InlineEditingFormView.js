// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/view/TC017_InlineEditingFormView');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana

Feature('View');

Scenario('User can editing inline form attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_InlineEditingCell/list/
  commonActions.accessDirectUrl(data.viewAT_InlineEditingFormPortal);
  // 3 Check if all columns are displayed (Name, Code, Description, Price, Currency, Size and User)
  // 4 Click on "Edit" link -> a form is displayed
  // 5 Verify Name: Product1a
  // 6 Update name: Product2a
  // 7 Verify Description: short
  // 8 Verify Currency: Leu
  // 9 Update Currency: Euro
  // 10 Verify User: host
  // 11 Check if User is not editable
  // 12 Verify Code: PRa
  // 13 Check if Code is not editable
  // 14 Verify Price: 2000.25
  // 15 Update Price: 0.50
  // 16 Verify Size: S
  // 17 Click on Save
  // 18 A success message is displayed
  // 19 Verify Name: Product2a
  // 20 Verify Code: PRa
  // 21 Verify Description: short
  // 22 Verify Price: 0.50
  // 23 Verify Size: S
  // 24 Verify User: host
  // 25 Click again on "edit'
  // 26 Update Name: Product3z
  // 27 Click on "Cancel" button - form is closed
  // 28 Check again Name: Product2a
  // 29 Click again on "edit"
  // 30 Update Name: Product3z
  // 31 Click on "View full item" -> form is displayed
  // 32 Check Name: Product2a
  await viewActionVerify.verifyInlineEditingFormViewInPortal(data.nameProduct1a, data.nameProduct2a, data.nameProduct3z, data.descriptionShort, data.currencyLeu, data.currencyEuro, data.userHost, data.codePRa, data.price2000_25, data.price0_50, data.sizeS);
  // 33 Logoff
  await commonActions.logoutFromApp();
});
