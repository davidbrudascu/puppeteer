// Constants
const constants = require('~config/constants');
// Page
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
const chartsActions = require('~actions/chartsActions');
// Verify
const commonVerify = require('~actions/commonVerify');
const chartsVerify = require('~actions/chartsVerify');
// Data
const data = require('~data/charts/TC002_EditChart.json');

// Author Catalin Diaconu
// AT-529

Feature('Charts');

Scenario('User can edit charts and view them in Portal', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlChart);
  chartsActions.editChart(
    data.chartTitle,
    data.chartType,
    data.red,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  chartsVerify.verifyEditChartWidget(data.dashboardName, data.chartName);
  await commonActions.logoutFromApp();
});
