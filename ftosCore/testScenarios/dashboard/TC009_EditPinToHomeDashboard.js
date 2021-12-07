// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/dashboard/TC009_EditPinToHomeDashboard');
// Verify
const dashboardVerify = require('~actions/dashboardVerify');


// Author Victor Pana

Feature('Dashboard');

Scenario('Edit Pin to Home  dashboard', async () => {
  // 1 Login using Portal using "Edit_P2H_User"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Your "Apps" dashboard is loaded
  // 3 Verify if you have 2 widgets "Pin2Home - DN" and "Custom Journey - Pin to Home"
  // 4 Click on "edit" icon for Pin to Home - DN
  // 5 Click on "right arrow"
  // 6 Exit from edit mode
  // 7 Verify if order is "Custom Journey - Pin to Home" and "Pin to Home - DN"
  // 8 Click again on "Edit" icon for "Pin to Home DN"
  // 9 Select "Half" layout
  // 10 Exit from edit mode
  // 11 Verify if your layout is changed
  // 12 Click again on "Edit" icon for "Pin to Home DN"
  // 13 Select "XXL" size
  // 14 Exit from edit mode
  // 15 Verify if your size is larger
  // 16 Click again on "Edit" icon for "Pin to Home DN"
  // 17 Select "Landscape" layout
  // 18 Exit from edit mode
  // 19 Verify if your layout is changed (Icon on left side and title on the right side)
  // 20 Click again on "Edit" icon for "Pin to Home DN"
  // 21 Click on "Delete" icon
  // 22 Verify if only "Custom Journey - Pin to Home" widget is displayed
  // 23 Verify if "Pin to Home DN" widget is not displayed anymore
  dashboardVerify.verifyEditPinToHomeDashboard(
    data.nameCustomJourneyPintoHomeWidget,
    data.namePin2HomeDNWidget,
    data.selectHalfLayout,
    data.selectXXLSize,
    data.selectLandscape,
  );
  // 24 Logoff
  await commonActions.logoutFromApp();
});
