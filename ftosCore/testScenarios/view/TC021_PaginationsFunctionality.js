// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/view/TC021_Paginations.json');
// Verify
const viewActionsVerify = require('~actions/viewActionsVerify');

// Author Catalin Diaconu

Feature('View');

Scenario('Automate "Pagination" functionality', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity ...Main#/entity/AT_Pagination/list/
  commonActions.accessDirectUrl(data.urlEntity);
  // 3 Verify if page sizes and page buttons are displayed
  await viewActionsVerify.verifyPageSizesAndSelectedPageSize(
    data.pageSize5,
    data.pageSize10,
    data.pageSize20,
  );
  // 4 Click on 5th page and "20" page size option and verify if records are displayed correctly
  await viewActions.selectPageAndVerifyContent(
    data.page5,
    data.record141,
    data.record150,
    data.record181,
    data.record200,
    data.record221,
  );
  // 5 Click on "5" page size option and verify if records are displayed correctly
  await viewActions.selectPageSizeAndVerifyContent(
    data.record131,
    data.record132,
    data.record133,
    data.record134,
    data.record135,
    data.record101,
    data.record105,
    data.page1,
    data.pageSize5,
  );
  // 6 Logoff
  await commonActions.logoutFromApp();
});
