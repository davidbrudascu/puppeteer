// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const shortcutsActions = require('~actions/shortcutsActions');
// Data
const data = require('~data/shortcuts/TC001_KeyboardShortcuts');
// Page
const shortcutPage = require('~pages/shortcutsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const shortcutsVerify = require('~actions/shortcutsVerify')

// Author Catalin Diaconu
// AT-535

Feature('Shortcuts');

Scenario('User can use shortcuts to navigate a dropdown', async() => {
    await commonActions.loginInApp(data.urlPortal, data.username, data.password);
    commonActions.accessDirectUrl(data.urlEntity);
    shortcutsActions.insertRecordDropdownShortcut();
    shortcutsActions.pressKey(constants.KEY_DOWN_ARROW, data.two)
    shortcutsVerify.verifyOptionIsHighlighted(data.firstRecord);
    shortcutsActions.pressKey(constants.KEY_UP_ARROW, data.one)
    shortcutsVerify.verifyOptionIsHighlighted(data.noneOption);
    shortcutsActions.closeDropdown();
    shortcutsActions.pressKey(constants.KEY_DOWN_ARROW, data.two)
    await commonVerify.verifyValueExistsInInput(shortcutPage.fields.optionSetKeyboardShortcutInputField, data.firstRecord)
    shortcutsActions.pressKey(constants.KEY_UP_ARROW, data.one)
    await commonVerify.verifyValueExistsInInput(shortcutPage.fields.optionSetKeyboardShortcutInputField, data.noneOption)
    shortcutsActions.openDropdown();
    shortcutsActions.pressKey(constants.KEY_DOWN_ARROW, data.one)
    shortcutsVerify.verifyOptionIsHighlighted(data.firstRecord);
    await shortcutsActions.selectRecord(data.firstRecord);
    await commonActions.logoutFromApp();
});

