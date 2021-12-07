// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC013_AddChartsToDashboard.json');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');

// Author Catalin Diaconu

Feature('Dashboard');

Scenario('User can add charts to Dashboard', async () => {
  // Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to Dashboard ...Main#/entity/dashboard/list
  commonActions.accessDirectUrl(data.urlDashboard);
  // Add chart to dashboard
  dashboardActions.addChartToDashboard(
    data.charts,
    data.chartDashboard,
  );
  // Logoff
  await commonActions.logoutFromApp();
  // Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // Verify Chart widget parameters
  dashboardVerify.verifyChartWidget(data.chartDashboard);
  // Logoff
  await commonActions.logoutFromApp();
});
