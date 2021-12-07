// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dashboard/TC007_AddPinToHomeDashboard');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('Add Pin to Home  dashboard', async () => {
  // 1 Login using Portal using "Add_P2H_User"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access main menu
  commonActions.portalSideMenuOpen();
  // 3 Expand "Pin to Home" section
  commonActions.portalClickSideMenuItem(constants.MENU_SECTION, data.pinToHomeMenuItem);
  // 4 Click on "Pin - List to home" for "Pin2Home - DN"
  // 3 Expand "Pin to Home" section
  // 4 Click on "Pin 'Add' to Home" for "Pin2Home - DN"
  // 5 A new widget is displayed on your home
  // 6 Verify widget label: "pin to Home"
  // 7 Verify widget title: "Insert Pin2Home - DN"
  // 8 Verify icon
  // 9 Click on "Insert Pin2Home-DN" widget
  // 10 A new form is displayed
  // 11 Verify form name (PIN TO HOME INSERT)
  // 12 Verify if only 2 attributes are displayed (Name and Code are displayed; Value is not displayed)
  // 13 Fill in Name with: Insert Pin 1
  // 14 Fill in Code with: IP1
  // 15 Verify if a new form is displayed
  // 16 Verify form name (PIN TO HOME Edit)
  // 17 Check if only Name attribute is displayed and its value is "Insert Pin 1"
  await dashboardVerify.verifyAddPinToHomeDashboard(
    data.Pin2HomeDNMenuItem,
    data.widgetLabelPinToHome,
    data.widgetTitleInsertPin2HomeDN,
    data.h4widgetInsertPin2HomeDN,
    data.formNamePinToHomeInsert,
    data.nameInsertPin1,
    data.codeLP1,
    data.formNamePinToHomeEdit,
    data.nameName,
    data.nameCode,
    data.nameValue,
  );
  // 18 Logoff
  await commonActions.logoutFromApp();
});
