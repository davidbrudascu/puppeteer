// Actions
const commonActions = require('~actions/commonActions');
const uiDesignerActions = require('~actions/uiDesignerActions');
// Data
const data = require('~data/uiDesigner/TC006_AddChart');
// Verify
const uiDesignerVerify = require('~actions/uiDesignerVerify');

// Author Catalin Diaconu

Feature('UI Designer');

Scenario('User can add a chart using UI Designer', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access UI tab
  commonActions.accessDirectUrl(data.uiTabUrl);
  // Add chart using UI Designer
  await uiDesignerActions.addChart(data.chartType);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // II. Navigate to ..Portal/Main/entity/AT_UIDesigner/list
  commonActions.accessDirectUrl(data.formURLPortal);
  // The changes made are reflected in the Portal
  uiDesignerVerify.verifyChartPortal(data.chartType);
  // Logoff
  await commonActions.logoutFromApp();
});
