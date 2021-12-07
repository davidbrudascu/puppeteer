// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/view/TC016_InlineEditingBatchView');
// Verify
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana

Feature('View');

Scenario('User can editing inline batch attribute data view', async () => {
  // 1  Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2  Access your entity ...Main#/entity/AT_InlineEditingCell/list/
  commonActions.accessDirectUrl(data.viewAT_InlineEditingBatchPortal);
  // 3 Check if all columns are displayed (Name, Code, Currency, Date and User)
  // 4 Verify Name1: Product1a
  // 5 Update Name1: Product2a
  // 6 Verify Code1: Pra
  // 7 Check if Code1 is not editable
  // 8 Verify Currency1: Leu
  // 9 Update Currency1: Euro
  // 10 Verify Date1: 22/01/2020
  // 11 Update Date1: 25/01/2020
  // 12 Verify User1: host
  // 13 Check if User1 is not updatable
  // 14 Go to 2nd page
  // 15 Verify Name11 from 2nd page: Product1k
  // 16 Update Name11: Product2k
  // 17 Verify Code11: PRk
  // 18 Check if Code11 is not editable
  // 19 Click on "Save" icon ->a success message is displayed
  // 20 Check if there are 2 results on 2nd page (Product2a and Product2k)
  // 21 Check the Currency for both of them: Eur and Leu
  // 22 Check the date for Product2a (25/01/2020)
  // 23 Click on Product2a and update name: Product3a
  // 24 Click on Product2k and pdate name: Product3k
  // 25 Click on "Discard changes" icon
  // 26 Verify again Name11: Product 2a
  // 27 Verify again Name12: Product 2k
  viewActionVerify.verifyInlineEditingBatchViewInPortal(data.nameProduct1a, data.nameProduct2a, data.nameProduct3a, data.nameProduct1k, data.nameProduct2k, data.nameProduct3k, data.codePRa, data.codePRk, data.currencyLeu, data.currencyEuro, data.date22_01_2020, data.date25_01_2020, data.userHost);
  // 28 Logoff
  await commonActions.logoutFromApp();
});
