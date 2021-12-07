// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions');
// Data
const data = require('~data/flowMap/TC004_CheckStepsMockUp');
// Verify
const flowMapVerify = require('~actions/flowMapVerify');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can verify steps within a mockup', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Open the form driven flow mockup
  commonActions.accessDirectUrl(data.urlMockUp);
  // Navigate to Flow Map tab
  flowMapActions.selectFormDrivenFlowTab(data.tabFlowMap);
  // Verify Steps name and display name
  await flowMapVerify.verifyStepsContentMockup(
    data.firstStepDisplayName,
    data.secondStepDisplayName,
    data.firstStepName,
  );
  await commonActions.logoutFromApp();
});
