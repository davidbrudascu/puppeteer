// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC001_CreateWidgetDashboard');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const dashboardVerify = require('~actions/dashboardVerify');


// Author Victor Pana

Feature('Dashboard');

Scenario('User can create a widget for dashboard', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/HtmlWidget/list"
  commonActions.accessDirectUrl(data.entity_AT_HtmlWidgetURL);
  // 3 Click on Insert icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert)
  // 4 Add a name "AddWidget"
  // 5 Add a title "Auto Widget"
  // 6 Save and Reload
  // 7 Go to "Code" tab
  // 8 Open Source Code and fill with: <h4>Auto Test</h4>
  dashboardActions.actionCreateWidgetCodeTabDashboard(data.nameAddWidget, data.nameAutoWidget, data.goToCodeTab, data.customHtmlP4)
  // 9 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Navigate to Dashboard ...Main#/entity/dashboard/list
  commonActions.accessDirectUrl(data.entity_dashboardURL);
  // 11 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert)
  // 12 Fill in Name with "CreateDashboard"
  // 13 Fill in Display name with: "Auto Test"
  // 14 Check "Show in Home page"
  // 15 Save and Reload
  // 16 Select "HTML Widget" from drop-down list
  // 17 Select your widget (AddWidget / Auto Widget)
  // 18 Click on "AddHTML"
  dashboardActions.actionCreateWidgetDashboard(data.nameCreateDashboard, data.nameAutoTest, data.selectHtmlWidget, data.nameAutoWidget, data.selectHTMLAutoWidget)
  // 19 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 20 Logoff
  await commonActions.logoutFromApp();
  // 21 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 22 Check if your Dashboard is displayed (Auto Test)
  // 23 Click on it
  // 24 Check if Your widget is displayed
  dashboardVerify.verifyCreateWidgetDashboard(data.nameAutoTest)
  // 25 Logoff
  await commonActions.logoutFromApp();
});
