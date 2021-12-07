// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const userJourneyAction = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC007_WizardOptionUserJourney');
// Pages
const commonPage = require('~pages/commonPage');
const userJourneyPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const userJourneyVerify = require('~actions/userJourneyVerify');

const I = actor();

// Author Victor Pana

Feature('User Journey');

Scenario('Wizard Option User Journey', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to Form Data Journeys "...Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.userJourneyUrl + data.formDataJourneysId);
  // 3. Search for your UJ  "AT_WizardOptionsUJ"
  userJourneyAction.searchAndVerifyForAUserJourneyTable(
    userJourneyPage.fields.searchForUserJourneyField,
    userJourneyPage.fields.tableRowValueUserJourneyField,
    data.userJourneyName,
  );
  // 4. Access it
  // 5. Go to Advanced tab
  commonActions.accessDirectUrl(data.urlAT_WizardOptionsUJ);
  // 6. Go to "Wizard Options" tab
  userJourneyAction.goToWizardOptionsTab();

  // 7. "Fill in with following details:
  //  ebs.createWizardObject({
  //   lastLbl: new EbsResource({key : ""lastLbl1"",""en-GB"" : ""End"",""ro-RO"" : ""Gata""})
  //     .getString(),
  //    prevLbl: ""Go fw"",
  //    nextLbl: ""Go back"",
  //    hideDefaultFormTitle: true,
  //    navAlign: ""center"",
  //    navPosition: ""bottom"",
  //    prevColor: ""pink"",
  //    nextColor: ""blue"",
  //    lastColor: ""green"",
  //    });"
  commonActions.fillInCustomMonacoEditor(userJourneyPage.fields.wizardOptionTabMonacoField, '0', data.wizardOptionMonacoEditor);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8. Logoff
  await commonActions.logoutFromApp();
  // 9. Login using Portal
  // 10. Access your entity's list
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlWizardModePortal);
  commonActions.seeInField(userJourneyPage.fields.resultForNoData, data.verifyNoData);
  // 11. Click on "Insert" icon
  // 12. Check if Form title is not displayed
  // 13. Check the button name/color
  // 14. Check if Form title is not displayed
  // 15. Fill in all fields
  // 16. Click on "Go fw" -> you are redirect to 2nd section
  // 17. Check button name/color
  // 18. Fill in all fields
  // 19. Click on "Go fw" -> you are redirect to 3rd section
  // 20   Check button name/color
  // 21. Fill in all fields
  // 22. Click "End"
  // 23. Click "Go back"
  // 24. Check if your records was added
  userJourneyVerify.wizardOptionsUserJourneyVerifyFields(
    data.nameTest,
    data.codeTest,
    data.valueTest,
    data.doBDateValue,
  );
  // 25. Logoff
  await commonActions.logoutFromApp();
});
