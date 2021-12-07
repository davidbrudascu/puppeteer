// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Page
const customThemePage = require('~pages/customThemePage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
    // Entity is pinned on Home so we need to specify the position
    verifyIconEntityPortal(iconName, position) {
        I.waitForVisible(locate('i').withAttr({ class: iconName}).inside(locate('div').withAttr({ index: position})), constants.SHORT_WAIT);
    }
}
