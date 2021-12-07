// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions');
// Data
const data = require('~data/flowMap/TC006_AddNewStepMockup');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can add steps within the mockup', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access the form driven flow mockup
  commonActions.accessDirectUrl(data.urlMockup);
  flowMapActions.selectFormDrivenFlowTab(data.tabFlowMap);
  // Add new step and verify it appears
  flowMapActions.addNewStepMockup(
    data.firstStepDisplayName,
    data.secondStepDisplayName,
    data.newStepName,
    data.newStepDisplayName,
  );
  await commonActions.logoutFromApp();
});
