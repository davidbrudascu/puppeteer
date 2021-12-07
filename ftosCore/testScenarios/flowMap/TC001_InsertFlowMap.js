// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions.js');
// Data
const data = require('~data/flowMap/TC001_InsertFlowMap');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can add a step to flow map', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access your flow map
  commonActions.accessDirectUrl(data.urlFlowMap);
  // Add third step to diagram and verify it appears
  flowMapActions.addThirdStepFlowMap(data.flowMapTab, data.step3, data.step1, data.step2);
  // Add custom flow control rule and verify it appears
  flowMapActions.addCustomFCRFlowMap(
    data.flowControlTab,
    data.nameFCR,
    data.valueDRE,
    data.step1,
  );
  await commonActions.logoutFromApp();
});
