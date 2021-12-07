// Constants
const constants = require('~config/constants');
// Page
const shortcutPage = require('~pages/shortcutsPage');

const I = actor();

module.exports= {
    verifyOptionIsHighlighted(nameOption) {
        I.waitForVisible(locate('p').withText(nameOption).inside(shortcutPage.selector.highlightedDropdownOption), constants.SHORT_WAIT);
    },

    verifyOptionIsHighlightedTable(name) {
        I.waitForVisible(shortcutPage.selector.highlightedOptionTable.withText(name), constants.SHORT_WAIT);
    },

    verifyRadioButtonIsSelected(name) {
        I.waitForVisible(shortcutPage.selector.checkedRadioButton.withDescendant(locate('div').withText(name)), constants.SHORT_WAIT);
    }
};
