// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC001_AddUseScriptWSDL');

// Author Catalin Diaconu

Feature('Server Scripts');

Scenario('User can add WSDL script', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  const origin = await serverScriptsAction.grabOriginURL();
  const pathname = await serverScriptsAction.grabPathURL();
  commonActions.accessDirectUrl(data.workflowUrl);
  // Create WSDL script, run it and verify error
  await serverScriptsAction.addOnDemandScript(
    data.scriptName,
    data.onDemandScriptType,
    data.codeFirstPart + origin + pathname + data.codeLastPart,
    data.niceDescription,
    data.consoleScript,
    data.firstError,
  );
  // Update Script, run it and verify new error
  await serverScriptsAction.updateOnDemandScript(
    data.updatedCodeFirstPart + origin + pathname + data.updatedCodeLastPart,
    data.consoleScript,
    data.secondError,
  );
  // Navigate to server scripts list
  commonActions.accessDirectUrl(data.workflowUrl);
  // Delete WSDL script
  serverScriptsAction.deleteScript(data.scriptName);
  await commonActions.logoutFromApp();
});
