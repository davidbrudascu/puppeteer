// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC007_AddUseScriptOpenAPi.json');

// Author: Andrei Fabian

Feature('Server Scripts');

Scenario('User can add/use OpenApi Scripts', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  const origin = await serverScriptsAction.grabOriginURL();
  const pathname = await serverScriptsAction.grabPathURL();
  commonActions.accessDirectUrl(data.workFlowUrl);
  // Create on demand script, run the script and verify the error
  await serverScriptsAction.addOnDemandScript(
    data.scriptName,
    data.onDemandScriptType,
    data.codeFirstPart + origin + pathname + data.codeLastPart,
    data.niceDescription,
    data.script,
    data.firstError,
  );
  // Update the script, run the script, verify the new error
  await serverScriptsAction.updateOnDemandScript(
    data.updatedCodeFirstPart + origin + pathname + data.updatedCodeLastPart,
    data.script,
    data.secondError,
  );
  commonActions.accessDirectUrl(data.workFlowUrl);
  // Delete script
  serverScriptsAction.deleteScript(data.scriptName);
  await commonActions.logoutFromApp();
});
