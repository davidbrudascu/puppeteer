// Constants
const constants = require('~config/constants');
// Page
const commonPage = require('~pages/commonPage');
const chartsPage = require('~pages/chartsPage');
const dashboardPage = require('~pages/dashboardPage');
// Actions
const commonActions = require('~actions/commonActions');
const chartsActions = require('~actions/chartsActions');
// Verify
const commonVerify = require('~actions/commonVerify');
const chartsVerify = require('~actions/chartsVerify');


const I = actor();

module.exports = {
  selectOverrideColor(color) {
    I.waitForVisible(chartsPage.dropdowns.overrideColor, constants.SHORT_WAIT);
    I.click(chartsPage.dropdowns.overrideColor);
    I.waitForVisible(locate('div').withText(color).inside(chartsPage.selector.dropdownOption), constants.SHORT_WAIT);
    I.click(locate('div').withText(color).inside(chartsPage.selector.dropdownOption));
  },

  addChartWidgetToDashboard(charts, chartDashboard) {
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.click(dashboardPage.selector.widgetDropdownList);
    I.selectOption(dashboardPage.selector.widgetDropdownList, charts);
    I.fillField(dashboardPage.fields.chartWidgetInputField, chartDashboard);
    I.pressKey(constants.KEY_ENTER);
    I.click(dashboardPage.buttons.addWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('div').withAttr({ chartname: chartDashboard }).inside('#designer'), constants.SHORT_WAIT);
    I.moveCursorTo(locate('div').withAttr({ chartname: chartDashboard }).inside('#designer'));
    I.waitForVisible(chartsPage.selector.resizableWidgetDashboard.inside(locate('div').withAttr({ description: `Chart - ${chartDashboard}` })), constants.SHORT_WAIT);
    I.dragAndDrop(chartsPage.selector.resizableWidgetDashboard.inside(locate('div').withAttr({ description: `Chart - ${chartDashboard}` })), dashboardPage.selector.dashboardPanel);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async deleteChart(chartName, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, chartName, chartsPage.container.defaultContainer);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  },

  addChart(name, chartBaseType, chartType, chartTitle, nameField, valueField, legendHorizontalAlignment, legendVerticalAlignment, overrideColor, axisXTitle, axisYTitle, code) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(chartsPage.fields.nameInput, constants.SHORT_WAIT);
    I.fillField(chartsPage.fields.nameInput, name);
    commonActions.selectValueFromDropdown(chartsPage.dropdowns.chartBaseType, chartBaseType);
    commonActions.selectValueFromDropdown(chartsPage.dropdowns.chartType, chartType);
    I.fillField(chartsPage.fields.chartTitleInput, chartTitle);
    I.fillField(chartsPage.fields.nameFieldInput, nameField);
    I.fillField(chartsPage.fields.valueInputField, valueField);
    I.click(chartsPage.checkbox.showLegendCheckbox);
    I.waitForVisible(chartsPage.dropdowns.legendHorizontalAlignment, constants.SHORT_WAIT);
    commonActions.selectValueFromDropdown(chartsPage.dropdowns.legendHorizontalAlignment, legendHorizontalAlignment);
    commonActions.selectValueFromDropdown(chartsPage.dropdowns.legendVerticalAlignment, legendVerticalAlignment);
    I.click(chartsPage.checkbox.showLabelsCheckbox);
    this.selectOverrideColor(overrideColor);
    I.fillField(chartsPage.fields.axisXTitleInput, axisXTitle);
    I.fillField(chartsPage.fields.axisYTitleInput, axisYTitle);
    commonActions.fillInCustomMonacoEditor(
      chartsPage.selector.firstLineFetchExpressionCodeEditor,
      chartsPage.selector.monacoCodeEditor1,
      code,
    );
  },

  editChart(chartTitle, chartType, color) {
    I.waitForVisible(chartsPage.fields.chartTitleInput, constants.SHORT_WAIT);
    I.fillField(chartsPage.fields.chartTitleInput, chartTitle);
    commonActions.selectValueFromDropdown(chartsPage.dropdowns.chartType, chartType);
    I.click(chartsPage.checkbox.showLegendCheckbox);
    I.click(chartsPage.checkbox.showLabelsCheckbox);
    this.selectOverrideColor(color);
  },
};
