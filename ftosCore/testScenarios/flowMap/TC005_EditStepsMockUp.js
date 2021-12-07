// Actions
const commonActions = require('~actions/commonActions');
const flowMapActions = require('~actions/flowMapActions');
// Data
const data = require('~data/flowMap/TC005_EditStepsMockUp');

// Author Catalin Diaconu

Feature('Flow Map');

Scenario('User can edit steps within a mockup', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Open the form driven flow mockup
  commonActions.accessDirectUrl(data.urlMockUp);
  // Navigate to Flow Map tab
  flowMapActions.selectFormDrivenFlowTab(data.tabFlowMap);
  // Access first step and edit name and display name
  await flowMapActions.editFirstStepMockup(
    data.firstStepDisplayName,
    data.secondStepDisplayName,
    data.firstStepName,
    data.updatedFirstStepName,
    data.updatedFirstStepDisplayName,
  );
  await commonActions.logoutFromApp();
});
