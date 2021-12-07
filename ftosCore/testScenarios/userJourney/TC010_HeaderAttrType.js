// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/userJourney/userJourneyHeaderAttrType');
// Pages
const commonPage = require('~pages/commonPage');
const ujPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ujVerify = require('~actions/userJourneyVerify');

// Author Sebastian Draghici
// AT-186
Feature('User Journey');

Scenario('User Journey - Header Attribute Type', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Access your entity
  commonActions.accessDirectUrl(data.urlPortalHeaderAttrEntity);
  // 3. Click on insert icon
  commonActions.clickSidebarButton(data.ujInsertButton);
  // 4. Fill in Name with: Auto test
  commonActions.fillInTextValueInInput(ujPage.fields.portalUjInputName,
    data.ujHeaderAttrTypeName);
  // 5. Fill in Value: 10000.225
  commonActions.fillInTextValueInInput(ujPage.fields.ujHeaderAttrTypeValue,
    data.ujHeaderAttrTypeValue);
  // 6. Click on 2nd Section
  commonActions.portalNavigateToSectionStep(data.ujHeaderAttrSection2);
  // 7. Select a Value from HeaderOS
  commonActions.fillInOptionSetValueInInput(ujPage.fields.ujHeaderAttrTypeHeaderOS,
    data.ujHeaderAttrTypeHeaderOS);
  // 8. Select a Date (or fill with a valid value)
  commonActions.fillInTextValueInInput(ujPage.fields.ujHeaderAttrTypeDate,
    data.ujHeaderAttrTypeDate);
  // 9. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10. "Check the Header info:
  // Date: your added time
  // Size: your selected value
  // Value: 10000.25"
  await ujVerify.verifyHeaderAttrType();
  // 11. Logoff
  await commonActions.logoutFromApp();
});
