// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const userJourneyAction = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC005_WizardUserJourney');
// Pages
const commonPage = require('~pages/commonPage');
const userJourneyPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const userJourneyVerify = require('~actions/userJourneyVerify');

// Author Victor Pana

Feature('User Journey');

Scenario('User can access  a wizard  user journey', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to Form Data Journeys "...Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.userJourneyUrl + data.formDataJourneysId);
  // 3. Search for your UJ  "AT_WizModeUJ"
  userJourneyAction.searchAndVerifyForAUserJourneyTable(
    userJourneyPage.fields.searchForUserJourneyField,
    userJourneyPage.fields.tableRowValueUserJourneyField,
    data.userJourneyName,
  );
  // 4. Access it entity/entityform/edit/2f5a80af-7ad4-4329-b3ce-74cd44fbb496
  commonActions.accessDirectUrl(data.urlAT_WizModeUJ);
  // 5. Check "Wizard mode"
  commonActions.clickButtonAfterLocator(userJourneyPage.checkbox.wizardModeCheckbox);
  // 6. Click on "Save and Reload"
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7. Logoff
  await commonActions.logoutFromApp();
  // 8. Login using Portal
  // 9. Access your entity's list
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlWizardModePortal);
  commonActions.seeInField(userJourneyPage.fields.resultForNoData, data.verifyNoData);
  // 10. Click on "Insert" icon
  // 11. Check if Form title is displayed
  // 12. Fill in all fields
  // 13. Click on "Next" -> you are redirect to 2nd section
  // 14. Fill in all fields
  // 15  Verify if Previous and Next Buttons are displayed
  // 16. Click on "Next" -> you are redirect to 3rd section
  // 17. Fill in all fields
  // 18  Click Previous
  // 19  Click on Yes button
  // 20  Verify if all fields are saved from previous page
  // 21  Click on "Next" -> you are redirect to 3rd section
  // 22  Verify if all fields are saved from 3rd section
  // 23. Click "Finish"
  // 24. Click "Go back"
  // 25. Check if your records was added
  userJourneyVerify.wizardModeUserJourneyVerifyFields();
  // 26. Logoff
  await commonActions.logoutFromApp();
});
