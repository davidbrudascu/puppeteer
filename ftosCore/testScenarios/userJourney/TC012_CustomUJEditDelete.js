// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC012_CustomUJEditDelete');
// Verify
const ujVerify = require('~actions/userJourneyVerify');

// Author Catalin Diaconu

Feature('User Journey');

Scenario('Automate Edit+Delete Functionality UJ', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(
    data.urlDesigner,
    data.username,
    data.password,
  );
  // 2 Navigate directly to "Custom Journeys"
  commonActions.accessDirectUrl(data.urlCustomUJ);
  // 3 Delete Custom User Journey
  await ujActions.deleteCustomUJ(
    data.menuUJ,
    data.firstRow,
  );
  // 4 Access Custom User Journey and update display name and html code
  await ujActions.accessCustomUJEditDlt(
    data.customUJTBU,
    data.updateDisplayName,
    data.updateCode,
  );
  // 5 Verify Custom User Journey is deleted from menu items
  await ujVerify.verifyCUJDltFromMenuItems(
    data.urlMenuItem,
    data.menuUJ,
    data.columnCustomJourney,
  );
  // 6 Logoff
  await commonActions.logoutFromApp();
  // 5 Login to Portal
  await commonActions.loginInApp(
    data.urlPortal,
    data.username,
    data.password,
  );
  // 7 Access your Custom User Journey and verify updated display name and html code
  ujVerify.verifyUpdatedEntriesEditDlt(data.urlCustomPortal);
  // 8 Logoff
  await commonActions.logoutFromApp();
});
