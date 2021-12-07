// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC016_DeleteStepsDJ');

// Author Andrei Fabian

Feature('User Journey');

Scenario('User can delete steps from user journey map', async () => {
  // Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access your digital journey
  commonActions.accessDirectUrl(data.urlDJ);
  // Delete step and verify it doesn't appear anymore
  ujActions.deleteStepDJ(
    data.firstStepFirstFDF,
    data.secondStepFirstFDF,
    data.firstStepSecondFDF,
    data.secondStepSecondFDF,
    data.secondRow_l,
  );
  await commonActions.logoutFromApp();
});
