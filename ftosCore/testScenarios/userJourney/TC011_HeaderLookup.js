// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/userJourneyHeaderLookup');
// Pages
const commonPage = require('~pages/commonPage');
const ujPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ujVerify = require('~actions/userJourneyVerify');

// Author Sebastian Draghici
// AT-186
Feature('User Journey');

Scenario('User Journey - Header Lookup', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Access your entity
  commonActions.accessDirectUrl(data.urlPortalLookupEntity);
  // 3. Click on insert icon
  commonActions.clickSidebarButton(data.ujInsertButton);
  // 4. Select a Value from drop-down
  commonActions.clickLookupTableButton(ujPage.fields.ujHeaderLookupTableButton);
  commonActions.fillInPopupLookupTableWithValue(
    ujPage.selector.ujLookupLookupTable,
    data.ujHeaderLookupTableValue,
  );
  commonActions.clickToolbarButton('Ok');
  // 5. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6. Check header info (your selected value from lookup is added as header)
  await ujVerify.verifyLookupHeader();
  // 7. Insert a new value in drop-down
  commonActions.clickLookupTableButton(ujPage.fields.ujHeaderLookupTableButton);
  commonActions.clickToolbarButton(data.ujInsertButton);
  // 8. Fill in all mandatory field
  // 9. Click Save and Close
  // 10. Click Ok
  ujActions.fillInMandatoryLookupHeader();
  // 11. Click "Save and Reload"
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12. Check header info (your inserted value from lookup is added as header)
  await ujVerify.verifyNewLookupHeader();
  // 13. Logoff
  await commonActions.logoutFromApp();
});
