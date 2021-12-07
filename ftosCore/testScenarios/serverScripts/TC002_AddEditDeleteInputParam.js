// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC002_AddEditDeleteInputParam');

// Author Catalin Diaconu

Feature('Server Scripts');

Scenario('Use can add/edit/delete input parameters', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to server scripts list
  commonActions.accessDirectUrl(data.workflowUrl);
  // Create script and input parameter
  serverScriptsAction.createSSandIP(
    data.nameScript,
    data.onDemandScriptType,
    data.noCode,
    data.nameInputParameter,
    data.codeUpdated,
    data.enterKey,
  );
  // Update and verify input parameter
  await serverScriptsAction.editAndVerifyIP(
    data.nameInputParameter,
    data.niceDescription,
    data.stringDataType,
  );
  // Delete server script and verify it was successfully deleted
  serverScriptsAction.searchAndDeleteSS(data.nameScript);
  await commonActions.logoutFromApp();
});
