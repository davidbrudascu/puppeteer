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
const data = require('~data/charts/TC001_AddDeleteChart');

// Author Catalin Diaconu
// AT-529

Feature('Charts');

Scenario('User can add charts and view them in Portal', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlChartList);
  chartsActions.addChart(
    data.name,
    data.chartBaseType,
    data.chartType,
    data.chartTitle,
    data.nameField,
    data.valueField,
    data.legendHorizontalAlignment,
    data.legendVerticalAlignment,
    data.overrideColor,
    data.axisXTitle,
    data.axisYTitle,
    data.code,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.urlDashboard);
  chartsActions.addChartWidgetToDashboard(
    data.charts,
    data.name,
  );
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  chartsVerify.verifyChartWidget(data.name, data.dashboardName);
  await commonActions.logoutFromApp();
  commonActions.accessDirectUrl(data.urlChartList);
  await chartsActions.deleteChart(data.name, data.columnName);
  await commonActions.logoutFromApp();
});
