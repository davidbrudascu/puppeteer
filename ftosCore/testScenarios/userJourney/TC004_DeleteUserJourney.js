// Actions
const commonActions = require('~actions/commonActions');
const userJourneyAction = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC004_DeleteUserJourney');
// Pages
const userJourneyPage = require('~pages/userJourneyPage');

// Author Victor Pana

Feature('User Journey');

Scenario('User can verify restriction and delete an user journey', async () => {
  //FIXME  Updateaza
  // unique UJ name,  default constraint , delete UJ

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to Form Data Jouneys"...Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.userJourneyUrl + data.formDataJourneysId);
  // 3 Search for your UJ
  userJourneyAction.searchAndVerifyForAUserJourneyTable(
    userJourneyPage.fields.searchForUserJourneyField,
    userJourneyPage.fields.tableRowValueUserJourneyField,
    data.userJourneyName,
  );
  userJourneyAction.deleteSelectionYesAndErrorMessage(data.defaultFormError);
  commonActions.accessDirectUrl(data.entityForm_AT_UJDelete)
  userJourneyAction.goToBasicFormAndSelectIsDefault(data.entityForm_AT_UJDelete);
  // 4 Check it
  // 5 Click on "Delete"
  // 6 Click "Yes"
  userJourneyAction.deleteSelectionYesAndNoError(data.userJourneyName, data.resultForNoData);
  // 7 Logoff
  await commonActions.logoutFromApp();
});
