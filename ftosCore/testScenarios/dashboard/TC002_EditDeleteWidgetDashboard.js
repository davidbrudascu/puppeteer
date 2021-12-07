// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC002_EditDeleteWidgetDashboard');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('User can edit and delete widget dashboard', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to ...Main#/entity/dashboard/list
  commonActions.accessDirectUrl(data.entity_dashboardURL);
  // 3 Select "DashboardDelete"
  // 4 Click on "Delete" icon -> Click yes
  // 5 Access "DashboardEdit"
  // 6 Check "Show on Portal"
  // 7 Update Display Name: "Update Dashboard"
  // 8 Delete your Widget
  dashboardActions.actionEditDeleteWidgetDashboard(data.nameDashboardDelete, data.toolbarButtonDelete, data.deleteYES, data.nameDashboardEdit, data.nameUpdateDashboard, data.HTMLDeleteWidget)
  // 9 Click on "Save and Close"
  // 10 Save and Close HTML - DeleteWidget
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11 Logoff
  await commonActions.logoutFromApp();
  // 12 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13 Check if "DashboardDelete" is not displayed
  // 14 Check if "DashboardHide" is not displayed
  // 15 Check if "Dashboard Update" is displayed
  // 16 Click on it
  // 17 Check if your widget is not displayed
  dashboardVerify.verifyEditDeleteWidgetDashboard(data.nameDashboardDelete, data.nameDashboardHide, data.nameUpdateDashboard, data.widgetDeleteWidget)
  // 18 Logoff
  await commonActions.logoutFromApp();

});
