// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dashboard/TC008_CUJPinToHomeDashboard');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('CUJ Pin to Home  dashboard', async () => {
  // 1 Login using Portal using "CUJ_P2H_User"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access main menu
  commonActions.portalSideMenuOpen();
  // 3 Expand "Pin to Home" section
  commonActions.portalClickSideMenuItem(constants.MENU_SECTION, data.pinToHomeMenuItem);
  // 4 Click on "Pin to home" for "Custom Journey - Pin to Home"
  // 5 A new widget is displayed on your home
  // 6 Verify widget label: "pin to Home"
  // 7 Verify widget title: "Custom Journey - Pin to Home"
  // 8 Verify icon
  // 9 Click on "Custom Journey - Pin to Home" widget
  // 10 A new Custom User Journey is displayed
  // 11 Verify title: "PIN TO HOME - CUJ"
  // 12 Verify content: "Cuj - Pin to Home"
  dashboardVerify.verifyCustomUserJourneyPinToHomeDashboard(data.subMenuCustomJourneyPinToHome, data.widgetLabelPinToHome, data.widgetTitleCustomJourneyPinToHome, data.h4WidgetCustomJourneyPinToHome, data.titlePinToHomeCUJ, data.contentCujPinToHome)
  // 13 Logoff
  await commonActions.logoutFromApp();
});
