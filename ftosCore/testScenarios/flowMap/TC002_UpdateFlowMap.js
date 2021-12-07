// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions');
// Data
const data = require('~data/flowMap/TC002_UpdateFlowMap');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can update name and display name of flow map steps', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access flow map
  commonActions.accessDirectUrl(data.urlFlowMap);
  flowMapActions.selectFormDrivenFlowTab(data.tabFlowMap);
  // Update step name and verify changes
  flowMapActions.updateStepNameFlowMap(
    data.step1,
    data.step2,
    data.step3,
    data.updatedStep1,
    data.firstFCR,
  );
  // Update flow control rule name and verify changes
  flowMapActions.updateFCRNameFlowMap(
    data.firstFCR,
    data.updatedFCR,
    data.homePage,
    data.step2,
    data.step3,
    data.newFCR,
  );
  // Logout
  await commonActions.logoutFromApp();
});
