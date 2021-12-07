// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/userJourney/TC013_CheckStepsDJ');
// Verify
const ujVerify = require('~actions/userJourneyVerify');


// Author Andrei Fabian

Feature('User Journey');

Scenario('User can check steps in a DJ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access digital journey
  commonActions.accessDirectUrl(data.urlDJ);
  // Verify steps in the diagram
  await ujVerify.verifyStepsDJ(
    data.firstStepDN01,
    data.secondStepDN01,
    data.firstStepDN02,
    data.secondStepDN02,
    data.nameFirstStep,
    data.secondRow_l,
    data.picture,
  );
  await commonActions.logoutFromApp();
});
