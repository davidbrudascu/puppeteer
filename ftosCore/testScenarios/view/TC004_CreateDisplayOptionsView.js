// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/view/TC004_CreateDisplayOptionsView');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana
// JIRA ID: AT-59

Feature('View');

Scenario('User can create a view - display options', async () => {
  // 1. Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Access your entity
  commonActions.accessDirectUrl(data.viewAT_CreateDisplayOptionsURL);
  // 3. Expand Data Views
  // 4. Access your view (default)
  // 5. Check "ShowViewButton"
  // 6. Go to Data secton
  // 7. Check "Allow Editing" for Code
  // 8. Save and Reload
  // 9. Go to Code section/Display Options
  // 10. Paste the JSON
  viewActions.createNewDisplayOptionView(data.defaultViewURL, data.dataTab,
    data.codeTab, data.displayOptionExpressionMonaco, data.displayOptionsTab);
  // 11. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12. Logoff
  await commonActions.logoutFromApp();
  // 13. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14. Access your entity
  commonActions.accessDirectUrl(data.viewAT_CreateViewDisplayOptionsPortal);
  // 15. "Check your view:
  //       Column header is not displayed
  //       Filter row is not displayed
  //       Only 5 result are displayed per page"
  // 16. Check if 1st Column is not editable
  // 17. Check if 2nd Column is editable
  // 18. Update the Code
  // 19. Check 1st record (Auto Test 1) and click on "delete"
  // 20. "Check the message:
  //      1. Message title: Auto Test
  //      2. message body: AT Are you sure?
  //      3. Yes button: ""AT Yes""
  //      4. No button: ""AT NO"""
  // 21. Click on "AT Yes"
  // 22. Check if your record was deleted
  // 23. Check if you have only 5 results per page
  await viewActionVerify.verifyCreateDisplayOptionsViewInPortal(data.nameAT_CreateViewDisplayOptionsList, data.nameAutoTest1, data.nameAutoTest2, data.notEditable, data.codeAT1, data.updateCode, data.checkTitleAutoTest, data.checkBodyAT, data.checkButtonATYes, data.checkButtonATNO);
  // 24. Logoff
  await commonActions.logoutFromApp();
});
