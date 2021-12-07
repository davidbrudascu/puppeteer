// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/view/TC001_CreateDataView');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana
// JIRA ID: AT-59

Feature('View');

Scenario('User can create a view with display name - data section', async () => {
  // 1. Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Access your entity
  commonActions.accessDirectUrl(data.viewAT_CreateViewDataURL);
  // 3. Expand Data Views
  // 4. Click on "insert" button
  // 5. Fill in Name "NewView"
  //   Fill in Display Name: "New View DN"
  // 6. Check "isDefault"
  // 7. Save and Reload
  // 8. Go to "data" section
  // 9. Fill in Data with: Name,Age
  // 10. Fill in Sort Expression: Age*desc
  viewActions.createNewDataView(data.dataViewsTab, data.insertButton, data.newViewName,
    data.newDisplayName, data.dataTab, data.dataName, data.dataSortExpression);
  // 11. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12. Logoff
  await commonActions.logoutFromApp();
  // 13. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14. Access your entity "Main#/entity/AT_CreateViewData/list
  commonActions.accessDirectUrl(data.viewAT_CreateViewDataPortal);
  // 15. Check your columns (Name and Age)
  //    Check view Display Name "New View DN"
  // 16. Check records order: (Auto Test 3, 4, 2, 1)
  viewActionVerify.verifyCreateDataViewInPortal(data.newDisplayName, data.columnName,
    data.columnAge, data.recordAuto3, data.recordAuto4, data.recordAuto2, data.recordAuto1);
  // 17. Logoff
  await commonActions.logoutFromApp();
});
