// Constants
const constants = require('~config/constants');
// Page
const commonPage = require('~pages/commonPage');
const chartsPage = require('~pages/chartsPage');
const dashboardPage = require('~pages/dashboardPage')
// Actions
const commonActions = require('~actions/commonActions');
const chartsActions = require('~actions/chartsActions');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
    verifyChartWidget(chartDashboard, dashboardName) {
        I.waitForVisible(locate('a').withAttr({ 'data-dashboard-name': dashboardName }).inside(chartsPage.selector.tablist), constants.SHORT_WAIT);
        I.click(locate('a').withAttr({ 'data-dashboard-name': dashboardName }).inside(chartsPage.selector.tablist));
        I.waitForVisible(locate('div').withAttr({ chartname: chartDashboard }), constants.SHORT_WAIT);
        // using wait because the animation for chart is slower than waitingForElement.
        I.wait(2);
        I.seeElementInDOM(chartsPage.chart.firstColumnValue);
        I.seeElementInDOM(chartsPage.chart.firstColumnName);
        I.seeElementInDOM(chartsPage.chart.firstColumnChart);
        I.seeElementInDOM(chartsPage.chart.secondColumnValue);
        I.seeElementInDOM(chartsPage.chart.secondColumnName);
        I.seeElementInDOM(chartsPage.chart.secondColumnChart);
        I.seeElementInDOM(chartsPage.chart.thirdColumnValue);
        I.seeElementInDOM(chartsPage.chart.thirdColumnName);
        I.seeElementInDOM(chartsPage.chart.thirdColumnChart);
        I.seeElementInDOM(chartsPage.chart.nameAxisX);
        I.seeElementInDOM(chartsPage.chart.nameAxisY);
    },

    verifyEditChartWidget(dashboardName, chartDashboard) {
        I.waitForVisible(locate('a').withAttr({ 'data-dashboard-name': dashboardName }).inside(chartsPage.selector.tablist), constants.SHORT_WAIT);
        I.click(locate('a').withAttr({ 'data-dashboard-name': dashboardName }).inside(chartsPage.selector.tablist));
        I.waitForVisible(locate('div').withAttr({ chartname: chartDashboard }), constants.SHORT_WAIT);
        // using wait because the animation for chart is slower than waitingForElement.
        I.wait(2);
        I.seeElementInDOM(chartsPage.chart.chartEditFirstColumn);
        I.seeElementInDOM(chartsPage.chart.firstColumnName);
        I.dontSeeElementInDOM(chartsPage.chart.firstColumnValue);
        I.seeElementInDOM(chartsPage.chart.chartEditSecondColumn);
        I.seeElementInDOM(chartsPage.chart.secondColumnName);
        I.dontSeeElementInDOM(chartsPage.chart.secondColumnValue);
        I.seeElementInDOM(chartsPage.chart.chartEditThirdColumn);
        I.seeElementInDOM(chartsPage.chart.thirdColumnName);
        I.dontSeeElementInDOM(chartsPage.chart.thirdColumnValue);
        I.dontSeeElementInDOM(chartsPage.chart.chartLegend);
        I.seeElementInDOM(chartsPage.chart.chartEditTitle);
    }
}
