// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC012_AddCustomEntityShortcutDashboard.json');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');


// Author Catalin Diaconu

Feature('Dashboard');

Scenario('User can add a custom entity shortcut to dashboard', async () => {
  // Login using Designer
  await commonActions.loginInApp(
    data.urlDesigner,
    data.username,
    data.password,
  );
  // Navigate to Dashboard
  commonActions.accessDirectUrl(data.urlDashboard);
  // Add 2 shortcut widgets to dashboard
  dashboardActions.addShortcutWidgets(
    data.shortcut,
    data.entity,
    data.entityDashboard,
    data.form,
    data.shortcutEntity,
  );
  // Logoff
  await commonActions.logoutFromApp();
  // Login using Portal
  await commonActions.loginInApp(
    data.urlPortal,
    data.username,
    data.password,
  );
  // Access widget and insert record name and value
  dashboardActions.accessShortcutWidget(
    data.entityDashboard,
    data.widgetTest,
    data.step1,
    data.step2,
    data.value,
  );
  // Verify if record is displayed
  // TODO Bug -> DPA-16036
  dashboardVerify.verifyFormShortcutWidget(
    data.entityDashboard,
    data.widgetTest,
    data.value,
  );
  // Logoff
  await commonActions.logoutFromApp();
});
