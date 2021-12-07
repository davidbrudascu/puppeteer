// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC006_AddEditDeleteOnDemand.json');

// Author: Andrei Fabian

Feature('Server Scripts');

Scenario('User can add/edit/delete/ on demand', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.workFlowUrl);
  // Create on demand script, run the script and verify the error
  await serverScriptsAction.addOnDemandScript(
    data.scriptName,
    data.onDemandScriptType,
    data.code,
    data.niceDescription,
    data.script,
    data.firstError,
  );
  // Update the script, run the script, verify the new error
  await serverScriptsAction.updateOnDemandScript(
    data.updatedCode,
    data.script,
    data.secondError,
  );
  // Navigate to server scripts list
  commonActions.accessDirectUrl(data.workFlowUrl);
  // Delete script
  serverScriptsAction.deleteScript(data.scriptName);
  await commonActions.logoutFromApp();
});
