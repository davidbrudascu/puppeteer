// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC014_AddFDFForDJ');

// Author Andrei Fabian

Feature('User Journey');

Scenario('User can add a form driven flow to DJ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access your digital journey
  commonActions.accessDirectUrl(data.urlDJ);
  // Add new FDF to DJ diagram and verify it appears
  ujActions.addNewFDFDJ(
    data.firstStepFirstFDF,
    data.secondStepFirstFDF,
    data.firstStepSecondFDF,
    data.secondStepSecondFDF,
    data.newFDFName,
    data.newFDF,
    data.firstStepThirdFDF,
    data.secondStepThirdFDF,
    data.secondRow_l,
  );
  await commonActions.logoutFromApp();
});
