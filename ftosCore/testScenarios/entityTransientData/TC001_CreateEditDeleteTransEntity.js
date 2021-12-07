// Actions
const commonActions = require('~actions/commonActions');
const transientEntityActions = require('~actions/transientEntityActions');
// Data
const data = require('~data/transientEntity/TC001_transientEntity_data.json');
// Verify
const transientEntityVerify = require('~actions/transientEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('Transient Data Entity');

Scenario('User can create a new transient data entity', async () => {
  // Login in Studio App and access Business Entities list page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessEntityURL);
  // Insert a new Transient Data type entity
  transientEntityActions.insertEntity(data.transEntityName, data.transEntityDisplayName);
  // Verify that the entity was created properly
  transientEntityVerify.verifyEntityCreation(data.transEntityName, data.transEntityDisplayName);
  // Create the Automation Script for Load and Save
  commonActions.accessDirectUrl(data.serverScriptURL);
  transientEntityActions.createLoadScript(
    data.loadScriptName,
    data.scriptCode,
    data.transEntityName,
  );
  transientEntityActions.createSaveScript(
    data.saveScriptName,
    data.scriptCode,
    data.saveScriptName,
  );
  // Insert the Automation Script for Load and Save
  commonActions.accessDirectUrl(data.businessEntityURL);
  transientEntityActions.editTransientEntity(data.transEntityName);
  transientEntityActions.insertLoadScript(data.loadScriptName);
  transientEntityActions.insertSaveScript(data.saveScriptName);
  // Add Transient Entity Description
  transientEntityActions.addEntityDescription(data.transientDescription);
  // Verify that the scripts where added properly to the entity
  transientEntityVerify.verifyTransientScripts(
    data.loadScriptName,
    data.saveScriptName,
    data.transientDescription,
  );
  // Try to delete the created Transient Entity and verify that an error message is returned.
  transientEntityActions.searchDeleteEntity(data.businessEntityURL, data.transEntityName);
  transientEntityVerify.verifyEntityDeleteError();
  // Delete the server scripts created and delete the transient entity.
  commonActions.accessDirectUrl(data.serverScriptURL);
  transientEntityActions.searchDeleteScripts(data.scriptName);
  transientEntityActions.searchDeleteEntity(data.businessEntityURL, data.transEntityName);
  // Logout from app
  await commonActions.logoutFromApp();
});
