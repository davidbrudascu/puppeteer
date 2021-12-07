// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC003_AddEditDeleteOutputStruc');

// Author Catalin Diaconu

Feature('Server Scripts');

Scenario('User can add/edit/delete output structure', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to Server Scripts List
  commonActions.accessDirectUrl(data.workflowUrl);
  // Create script and add output structure
  await serverScriptsAction.createScriptAndOS(
    data.scriptName,
    data.onDemandScriptType,
    data.noCode,
    data.entityOutputStructureType,
    data.singleOutputParam,
    data.transientOutputScript,
  );
  // Edit Output Structure Dropdowns and verify them
  await serverScriptsAction.editOutputStructure(
    data.collectionOutputParameter,
    data.customStructureType,
    data.noCodeValue,
    data.comparingCodeValue,
  );
  // Delete the script that was created
  serverScriptsAction.deleteScript(data.scriptName);
  await commonActions.logoutFromApp();
});
