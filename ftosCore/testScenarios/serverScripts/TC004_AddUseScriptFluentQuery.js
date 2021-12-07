// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC004_AddUseScriptFluentQuery');

// Author Catalin Diaconu

Feature('Server Scripts');

Scenario('User can add/use fluent query script', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.workflowUrl);
  // Create script and verify error
  await serverScriptsAction.addOnDemandScript(
    data.scriptName,
    data.onDemandScriptType,
    data.code,
    data.niceDescription,
    data.script,
    data.firstError,
  );
  // Update code and verify new error
  await serverScriptsAction.updateOnDemandScript(
    data.updatedCode,
    data.script,
    data.secondError,
  );
  commonActions.accessDirectUrl(data.workflowUrl);
  // Search and delete Script
  serverScriptsAction.deleteScript(data.scriptName);
  await commonActions.logoutFromApp();
});
