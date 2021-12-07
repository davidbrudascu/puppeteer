// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dashboard/TC006_ListPinToHomeDashboard');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');

// Author Victor Pana

Feature('Dashboard');

Scenario('List Pin to Home  dashboard', async () => {
  // 1 Login using Portal using "List_P2H_User"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access main menu
  commonActions.portalSideMenuOpen();
  // 3 Expand "Pin to Home" section
  commonActions.portalClickSideMenuItem(constants.MENU_SECTION, data.pinToHomeMenuItem);
  // 4 Click on "Pin - List to home" for "Pin2Home - DN"
  // 5 A new widget is displayed on your home
  // 6 Verify widget label: "pin to Home"
  // 7 Verify widget title: "Pin2Home - DN"
  // 8 Verify icon
  // 9 Click on "Pin2Home-DN" widget
  // 10 Verify the view name: "Pin2Home - DN"
  // 11 Verify View Column (Name, Code and Value) Name
  // 12 Click on "Insert" icon
  // 13 A new form is displayed
  // 14 Verify form name (PIN TO HOME INSERT)
  // 15 Verify if only 2 attributes are displayed (Name and Code are displayed; Value is not displayed)
  // 16 Fill in Name with: List Pin 1
  // 17 Fill in Code with: LP1
  // 18 Verify if a new form is displayed
  // 19 Verify form name (PIN TO HOME Edit)
  // 20 Check if only Name attribute is displayed and its value is "List Pin 1"
  await dashboardVerify.verifyListPinToHomeDashboard(data.submeniuPin2HomeDNItem, data.namePinToHomeLabel, data.insertButton, data.formPinToHomeInsert,
      data.nameListPin1, data.codeLP1, data.formPinToHomeEdit, data.columnName, data.columnCode, data.columnValue, data.nameName, data.nameCode, data.nameValue);
  // 21 Logoff
  await commonActions.logoutFromApp();
});
