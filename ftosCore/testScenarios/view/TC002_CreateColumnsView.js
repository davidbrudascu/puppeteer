// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/view/TC002_CreateColumnsView');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana
// JIRA ID: AT-59

Feature('View');

Scenario('User can create a view with no display name - columns section + disable column', async () => {
  // 1. Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Access your entity
  commonActions.accessDirectUrl(data.viewAT_CreateColumnsURL);
  // 3. Expand Data Views
  // 4. Click on "insert" button
  // 5. Fill in Name "NewView"
  // 6. Check "isDefault"
  // 7. Save and Reload
  // 8. Go to "data" section
  // 9. Click on "Insert" button
  // 10. Fill in Attribute Name: Name and in Label: Product Name
  // 11. Save and New
  // 12. Fill in Attribute Name: Code and in Label: Product Code
  // 13. Save and New
  // 14. Fill in Attribute Name: Value, Label: Product Value and Check Disabled
  viewActions.createNewColumnsView(data.dataViewsTab, data.newViewName,
    data.newDisplayName, data.showDisplayName, data.dataTab, data.nameName, data.labelProductName,
    data.nameCode, data.labelProductCode, data.nameValue, data.labelProductValue);
  // 15. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 17. Logoff
  await commonActions.logoutFromApp();
  // 18. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 19. Access your entity "Main#/entity/AT_CreateViewColumn/list
  commonActions.accessDirectUrl(data.viewAT_CreateColumnsViewPortal);
  // 20. Check your columns (Product Name and Product Code); Check if Value column is not displayed
  // 21. Check if the View Name is "AT_CreateViewColumn's List"
  viewActionVerify.verifyCreateColumnsViewInPortal(data.columnProductName, data.columnProductCode, data.columnProductValue, data.nameAT_CreateViewColumnList);
  // 22. Logoff
  await commonActions.logoutFromApp();
});
