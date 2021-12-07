// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC004_EditShortcutWidgetDashboard');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('User can edit shortcut widget dashboard', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your dashboard ...Main#/entity/dashboard/edit/712b4174-8b7d-4226-b2d9-6b46ebc5d38f/pageno/0
  commonActions.accessDirectUrl(data.entity_EditShortcutWidgetURL);
  // 3 Click on "Shortcut - AT_EntEditShortcutWidget" widget
  // 4 Update Title "Entity Shortcut Title"
  // 5 Update Description "Entity Shortcut Description"
  // 6 Update Tag "Entity Widget Tag"
  // 7 Check "Show Title"
  // 8 Click on "Save" button
  // 9 Click on "Shortcut - AT_EditCUJWidget" widget
  // 10 Update Title "CUJ Shortcut Title"
  // 11 Update Description "CUJ Shortcut Description"
  // 12 Update Tag "CUJ Shortcut Tag"
  // 13 Check "Show Title"
  // 14 Click on "Save" button
  // 15 Click on "AT_EntEditEntViewWidget (default)" widget
  // 16 Update Title "Entity View Widget Title"
  // 17 Click on "Save" button
  // 18 Check "Show on Portal" on Dashboard level
  dashboardActions.actionEditShortcutWidgetDashboard(data.nameShortcutAT_EntEditShortcutWidget, data.nameEntityShortcutTitle, data.nameEntityShortcutDescription, data.updateEntityWidgetTag, data.nameShortcutAT_EditCUJWidget, data.nameCUJShortcutTitle, data.nameCUJShortcutDescription, data.nameCUJShortcutTag, data.default_AT_EntEditEntViewWidget, data.updateEntityViewWidgetTitle);
  //  Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19 Logoff
  await commonActions.logoutFromApp();
  // 20 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 21 Access your Dashboard (Edit Shortcut Widget)
  // 22 Check 1st widget title: "Entity Shortcut Title"
  // 23 Check 1st widget description "Entity Shortcut Description"
  // 24 Check 1st widget tag:  "Entity Shortcut Tag"
  // 25 Click on 1st widget -> Form page is displayed
  // 26 Check 2nd widget title: "CUJ Shortcut Title"
  // 27 Check 2nd widget description "CUJ Shortcut Description"
  // 28 Check 2nd widget tag:  "CUJ Shortcut Tag"
  // 29 Click on 2nd widget -> CUJ Widget is displayed
  // 30 Check 3rd widget title: No title is displayed
  // 31 Check if list view is displayed (Dashboard1 record is displayed)
  dashboardVerify.verifyEditShortcutWidgetDashboard(data.dashboardEditShortcutWidget, data.nameEntityShortcutTitle, data.nameEntityShortcutDescription, data.firstEntityWidgetTag, data.formNameAT_EntEditShortcutWidget, data.titleCUJShortcutTitle, data.descriptionCUJShortcutDescription, data.tagCUJShortcutTag, data.nameDashboardCUJ, data.listViewDashboard1, data.titleEntityViewWidgetTitle);
  // 32 Logoff
  await commonActions.logoutFromApp();
});
