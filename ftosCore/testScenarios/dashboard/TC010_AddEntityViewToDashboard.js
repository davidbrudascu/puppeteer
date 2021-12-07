// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC010_AddEntityViewToDashboard.json');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');

// Author Catalin Diaconu

Feature('Dashboard');

Scenario('User adds an Entity View to Dashboard', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(
    data.urlDesigner,
    data.username,
    data.password,
  );
  // Navigate to Dashboard
  commonActions.accessDirectUrl(data.urlDashboard);
  // Add an Entity View Widget to dashboard and resize it
  dashboardActions.addEntityWidgetToDashboard(
    data.dashboardEntityName,
    data.entityViewWidget,
    data.entityDashboard,
    data.dashboardOption,
  );
  // Logoff
  await commonActions.logoutFromApp();
  // Login using Portal
  await commonActions.loginInApp(
    data.urlPortal,
    data.username,
    data.password,
  );
  // Verify if Entity View Widget is displayed
  dashboardVerify.verifyEntityViewWidgetAndContent(
    data.entityDashboard,
    data.entityView,
    data.code,
    data.nameUpdated,
  );
  // Access record and update Code
  dashboardActions.accessAT_DashEntityViewRecord(
    data.code,
    data.entityDashboard,
    data.codeUpdated,
  );
  // Verify again Record Content
  dashboardVerify.verifyAT_DashEntityViewContent(
    data.nameUpdated,
    data.codeUpdated,
  );
  // Logoff
  await commonActions.logoutFromApp();
});
