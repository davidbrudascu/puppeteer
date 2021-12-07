// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Page
const commonPage = require('~pages/commonPage');
// Data
const data = require('~data/dashboard/TC005_DeleteAndChangeOrderWidgetDashboard');
// Verify
const commonVerify = require('~actions/commonVerify');
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('User can delete and change order shortcut widget dashboard', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your dashboard ...Main#/entity/dashboard/edit/89dc86c3-c511-4c9d-a613-2a47ce1246f5/pageno/0
  commonActions.accessDirectUrl(data.entity_DeleteWidgetChangeOrderURL);
  // 3 Click on your Widget (AT_DeleteWidget)
  // 4 Click Delete button
  // 5 Click on 2nd widget
  // 6 Click Delete button
  // 7 Click on 3rd widget
  // 8 Click Delete button
  // 9 Check "Show on portal" on dashboard level
  dashboardActions.actionDeleteWidgetDashboard(data.nameAT_DeleteWidget, data.nameChangeWidgetOrder2Widget, data.nameChangeWidgetOrder1Widget)
  // 10 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11 Navigate to your dashboard ...Main#/entity/dashboard/edit/4aed826f-00d3-4249-9559-57c6add934a6/pageno/0
  commonActions.accessDirectUrl(data.entity_ChangeWidgetOrderURL);
  // 12 Make 1st widget larger
  // 13 Switch position between them
  dashboardActions.actionChangeOrderWidgetDashboard(data.nameAT_DeleteWidget, data.nameChangeWidgetOrder2Widget, data.nameChangeWidgetOrder1Widget)
  // 14 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15 Logoff
  await commonActions.logoutFromApp();
  // 16 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 17 Access your Dashboard "Delete Widget"
  // 18 Verify there are no widgets visible
  // 19 Access your Dashboard "Change Widget Order"
  // 20 Check if your widgets order and size are ok
  dashboardVerify.verifyDeleteAndChangeOrderWidgetDashboard(data.nameDeleteWidgetDashboard, data.nameAT_DeleteWidget,
      data.nameChangeWidgetOrder1Widget, data.nameChangeWidgetOrder2Widget, data.nameChangeWidgetOrderDashboard, data.nameChangeWidget1, data.nameChangeWidget2);
  // 21 Logoff
  await commonActions.logoutFromApp();
});
