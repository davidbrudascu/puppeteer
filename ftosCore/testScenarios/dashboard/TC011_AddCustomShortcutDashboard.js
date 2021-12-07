// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC011_AddCustomShortcutDashboard.json');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');

// Author Catalin Diaconu

Feature('Dashboard');

Scenario('User can add a custom shortcut to dashboard', async () => {
  // Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to Dashboard ...Main#/entity/dashboard/list
  commonActions.accessDirectUrl(data.urlDashboard);
  // Add custom shortcut widget to dashboard
  await dashboardActions.addCustomShortcutWidget(
    data.nameColumn,
    data.nameDashboard,
    data.shortcut,
    data.customAction,
    data.entityCustomAction,
  );
  // Logoff
  await commonActions.logoutFromApp();
  // Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Verify custom shortcut widgets
  dashboardVerify.verifyCustomShortcutWidgets(
    data.shortcutLinkWidget,
    data.dashShortcutWidget,
    data.dashShortcutWidgetContent,
    data.formRecord,
  );
  // 20 Logoff
  await commonActions.logoutFromApp();
});
