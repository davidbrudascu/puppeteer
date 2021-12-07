// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dashboardActions = require('~actions/dashboardActions');
// Data
const data = require('~data/dashboard/TC003_EditHTMLWidgetDashboard');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('User can edit HTML widget dashboard', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to HTML Widget ...Main#/entity/HtmlWidget/list
  commonActions.accessDirectUrl(data.entity_HtmlWidgetListURL);
  // 3 Access your Widget (TBU_HTMLWidget)
  // 4 Update Title from TBU HTML Widget -> Updated HTML Widget
  // 5 Save and Reload
  // 6 Access Code section
  // 7 Open Source Code
  // 8 Replace code with: <h4>Update Content for HTML Widget</h4>
  dashboardActions.actionEditHTMLWidgetUpdateContentDashboard(data.nameTBU_HTMLWidget, data.nameUpdatedHTMLWidget, data.goToCodeTab, data.customHtmlP4)
  // 9 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10 Navigate to your dashboard ...Main#/entity/dashboard/edit/80517c21-ef81-4d18-8f10-919a1360d7f2/pageno/0
  commonActions.accessDirectUrl(data.entity_HtmlWidgetURL);
  // 11 Click on your Widget "HTML Update Widget"
  // 12 Check "Show Title"
  // 13 Fill in title with "Auto Test Widget"
  // 14 Click on Save
  // 15 Check "Show on Portal" on Dashboard level
  dashboardActions.actionEditHTMLWidgetUpdateTitleDashboard(data.nameHTMLUpdateWidget, data.titleAutoTestWidget)
  // 16 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 17 Logoff
  await commonActions.logoutFromApp();
  // 18 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 19 Click on your Dashboard "Edit HTML Widget"
  // 20 Check if 2 widgets are displayed
  // 21 Check 1st widget doesn't have title (TBU HTML Wid Title)
  // 22 Check 2nd widget title is: "Auto Test Widget" (shouldn't be HTML Widget Title)
  // 23 Check 1st widget content "Update Content for HTML Widget"
  // 24 Check 2nd widget content "Update Widget Content"
  dashboardVerify.verifyEditHTMLWidgetDashboard(data.nameEditHTMLWidgetDashboard, data.titleAutoTestWidget, data.contentUpdateContentforHTMLWidget, data.content2UpdateWidgetContent, data.titleHTMLTBU_HTMLWidget)
  // 25 Logoff
  await commonActions.logoutFromApp();

});
