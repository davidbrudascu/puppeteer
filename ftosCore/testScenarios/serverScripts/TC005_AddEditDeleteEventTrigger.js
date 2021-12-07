// Actions
const serverScriptsAction = require('~actions/serverScriptsActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/serverScripts/TC005_AddEditDeleteEventTrigger.json');

// Author: Andrei Fabian

Feature('Server Scripts');

Scenario('User can add/edit/delete/ an event trigger', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlServerAutomationScripts);
  serverScriptsAction.addEventTriggerScript(
    data.scriptName,
    data.eventPopUp,
    data.stagePopUp,
    data.entityPopUp,
    data.codeScriptWorks,
  );
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlEntityPortal);
  serverScriptsAction.verifyEventTriggerScriptPortal(data.testUpdate);
  commonActions.accessDirectUrl(data.urlServerAutomationScripts);
  serverScriptsAction.updateEventTriggerScript(
    data.scriptName,
    data.descriptionField,
    data.eventPopUpUpdate,
    data.stagePopUpUpdate,
  );
  serverScriptsAction.verifyUpdateEventTriggerScriptPortal(data.urlEntityPortal);
  await commonActions.logoutFromApp();
  commonActions.accessDirectUrl(data.urlServerAutomationScripts);
  // Delete Script
  serverScriptsAction.deleteScript(data.scriptName);
  await commonActions.logoutFromApp();
});
