// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions');
// Data
const data = require('~data/flowMap/TC007_DeleteStepMockUp');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can delete steps within the mockup', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Open the form driven flow mockup
  commonActions.accessDirectUrl(data.urlMockup);
  flowMapActions.selectFormDrivenFlowTab(data.tabFlowMap);
  // Delete step from mockup and verify it doesn't exist
  flowMapActions.deleteStepMockup(
    data.firstStepDisplayName,
    data.secondStepDisplayName,
  );
  // Logoff
  await commonActions.logoutFromApp();
});
