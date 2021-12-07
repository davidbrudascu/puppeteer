// Actions
const commonActions = require('~actions/commonActions');
const shortcutsActions = require('~actions/shortcutsActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/shortcuts/TC003_SaveShortcuts');
// Verify
const businessEntityVerify = require('~actions/businessEntityVerify');

// Author Catalin Diaconu
// AT-538

Feature('Shortcuts');

Scenario('User can use shortcuts to save', async () => {
    await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
    commonActions.accessDirectUrl(data.entityList);
    // Insert new business entity
    actionsBusinessEntity.insertBusinessEntity(
      data.entityName,
      data.entityDisplayName,
      data.collectionName,
      data.description,
      data.primaryAttName,
      data.primaryAttDN,
      data.tableName,
      data.primaryAttTableColumn,
    );
    // Save and Refresh
    shortcutsActions.saveKeyShortcut();
    actionsBusinessEntity.updateDisplayName(data.updatedDisplayName);
    shortcutsActions.saveKeyShortcut();
    // Go back to business entity list
    shortcutsActions.goToPreviousPage();
    businessEntityVerify.verifyEntityExistsInSearch(data.entityName, data.updatedDisplayName);
    commonActions.accessDirectUrl(data.urlFDF);
    // Edit existing code
    shortcutsActions.fillBeforeEventsMonacoEditor(data.updatedCode);
    shortcutsActions.saveKeyShortcut();
    // Edit code in the expanded editor
    shortcutsActions.fillBeforeEventsExpandedMonacoEditor(data.updatedCodeExpanded);
    shortcutsActions.saveKeyShortcut();
    shortcutsActions.closeMonacoEditorExpanded();
    commonActions.accessDirectUrl(data.urlServerScript);
    // Edit existing code
    shortcutsActions.fillMonacoEditor(data.codeUpdatedServerScripts);
    shortcutsActions.saveKeyShortcut();
    // Edit code in the expanded editor
    shortcutsActions.fillExpandedMonacoEditor(data.codeUpdatedExpandedServerScripts);
    shortcutsActions.saveKeyShortcut();
    shortcutsActions.closeMonacoEditorExpanded();
    await commonActions.logoutFromApp();
    await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
    commonActions.accessDirectUrl(data.urlEntityPortal);
    // Insert a new record then edit it
    await shortcutsActions.insertRecordKeyboardShortcutPortal(data.recordName, data.updatedRecordName);
    // Log out
    await commonActions.logoutFromApp();
});
