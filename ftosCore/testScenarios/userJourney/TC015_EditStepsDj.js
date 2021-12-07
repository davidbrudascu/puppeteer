// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC015_EditStepsDJ');
// Verify
const ujVerify = require('~actions/userJourneyVerify');

// Author Andrei Fabian

Feature('User Journey');

Scenario('User can edit the steps in a DJ', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access your digital journey
  commonActions.accessDirectUrl(data.urlDJ);
  // Verify diagram steps
  await ujVerify.verifyStepsDJ(
    data.firstStepDN01,
    data.secondStepDN01,
    data.firstStepDN02,
    data.secondStepDN02,
    data.nameFirstStep,
    data.secondRow_l,
    data.picture,
  );
  // Edit first step and verify the change in the diagram
  ujActions.editStepDJ(
    data.nameFirstStepEdit,
    data.nameFirstStepLabelEdit,
    data.firstStepDiagram,
    data.secondRow_edit,
    data.secondPicture,
  );
  await commonActions.logoutFromApp();
});
