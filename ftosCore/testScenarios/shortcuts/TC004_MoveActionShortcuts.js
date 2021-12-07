// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const shortcutsActions = require('~actions/shortcutsActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/shortcuts/TC004_MoveActionShortcuts');
// Verify
const shortcutVerify = require('~actions/shortcutsVerify');

// Author Catalin Diaconu
// AT-537

Feature('Shortcuts');

Scenario('User can use shortcuts to move in project', async () => {
    await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
    commonActions.accessDirectUrl(data.urlEntityStudio);
    actionsBusinessEntity.selectDataModelSubMenu();
    shortcutsActions.filterNameColumn();
    shortcutsActions.pressKey(constants.KEY_TAB, data.twentyNine);
    shortcutVerify.verifyOptionIsHighlightedTable(data.entityName);
    shortcutsActions.pressKeys(constants.KEY_SHIFT, constants.KEY_TAB, data.three);
    shortcutVerify.verifyOptionIsHighlightedTable(data.entityNameId);
    await commonActions.logoutFromApp();
    await commonActions.loginInApp(data.urlPortal, data.username, data.password);
    commonActions.accessDirectUrl(data.urlEntityPortal);
    // Page needs to be selected in order for the keyboard shortcut to work
    shortcutsActions.clickPageName(data.namePagePortal);
    shortcutsActions.pressKey(constants.KEY_TAB, data.eight);
    shortcutVerify.verifyOptionIsHighlightedTable(data.secondRecord);
    shortcutsActions.pressKeys(constants.KEY_SHIFT, constants.KEY_TAB, data.two);
    shortcutVerify.verifyOptionIsHighlightedTable(data.firstRecord);
    await commonActions.logoutFromApp();
});
