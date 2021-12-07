// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/view/TC014_InlineEditingCelView');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana

Feature('View');

Scenario('User can inline editing cell attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_InlineEditingCell/list/
  commonActions.accessDirectUrl(data.viewAT_InlineEditingCellDatePortal);
  // 3 Check if all columns are displayed (Name, Code, Price, Currency, Bool)
  // 4 Verify Name: Laptop 2
  // 5 Update Name: Lpt Update -> a success message is displayed
  // 6 Verify Code: LPT
  // 7 Check if Code is not updatable
  // 8 Verify Price: 2,000.27
  // 9 Update Price: leave it empty (0) -> a success message is displayed
  // 10 Verify Bool: yes
  // 11 Update Bool: no -> a success message is displayed
  // 12 Verify Currency: Leu
  // 13 Update Currency: Euro  -> a success message is displayed
  viewActionVerify.verifyInlineEditingCelViewInPortal(data.nameLaptop2, data.nameLptUpdate, data.codeLPT, data.price2000_27, data.price0, data.currencyLeu, data.currencyEuro);
  // 14 Logoff
  await commonActions.logoutFromApp();
});
