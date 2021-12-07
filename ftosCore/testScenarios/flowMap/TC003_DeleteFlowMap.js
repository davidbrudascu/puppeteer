// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions');
// Data
const data = require('~data/flowMap/TC003_DeleteFlowMap');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can delete steps from flow map', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access flow map
  commonActions.accessDirectUrl(data.urlFlowMap);
  flowMapActions.selectFormDrivenFlowTab(data.tabFlowMap);
  // Delete flow control rules and verify diagram
  await flowMapActions.deleteFCRFlowMap(
    data.step1,
    data.step2,
    data.step3,
    data.step4,
    data.firstFlowControl,
    data.secondFlowControl,
    data.tabFlowControl,
  );
  // Delete steps and verify diagram
  await flowMapActions.deleteStepsFlowMap(
    data.step1,
    data.step2,
    data.step3,
    data.step4,
    data.tabSteps,
    data.tabFlowMap,
  );
  await commonActions.logoutFromApp();
});
