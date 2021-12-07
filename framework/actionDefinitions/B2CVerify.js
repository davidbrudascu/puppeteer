// Constants
const constants = require('~config/constants');
// Pages
const B2CPage = require('~pages/B2CPage');

const I = actor();

module.exports = {
    verifyRecordColumnsBasicFDF (age, name, email) {
        I.waitForVisible(B2CPage.selector.ageColumnHeader.withAttr({ 'aria-colindex': '2'}), constants.SHORT_WAIT);
        I.waitForVisible(B2CPage.selector.nameColumnHeader.withAttr({ 'aria-colindex': '3'}), constants.SHORT_WAIT);
        I.waitForVisible(B2CPage.selector.emailColumnHeader.withAttr({ 'aria-colindex': '4'}), constants.SHORT_WAIT);
        I.waitForVisible(B2CPage.selector.newsletterColumnHeader.withAttr({ 'aria-colindex': '5'}), constants.SHORT_WAIT);
        I.waitForVisible(locate('td').withText(age).withAttr({ 'aria-colindex': '2'}), constants.SHORT_WAIT);
        I.waitForVisible(locate('td').withText(name).withAttr({ 'aria-colindex': '3'}), constants.SHORT_WAIT);
        I.waitForVisible(locate('td').withText(email).withAttr({ 'aria-colindex': '4'}), constants.SHORT_WAIT);
        I.waitForVisible(locate('td').withAttr({ 'aria-colindex': '5'}).withDescendant(B2CPage.checkbox.checkedCheckbox), constants.SHORT_WAIT);
    },

    verifyFieldLabel(entityName, fieldName) {
        I.waitForVisible(locate('div').withAttr({ 'data-label-for': `ebsContainerContent_${entityName}`}).withText(fieldName), constants.SHORT_WAIT);
    },

    verifyText(text) {
        I.waitForVisible(locate('div').withText(text), constants.SHORT_WAIT);
    },

    verifyLabelsCheckFormFirstFDF() {
        I.waitForVisible(B2CPage.labels.checkFormNameLabelFirstFDF, constants.SHORT_WAIT);
        I.waitForVisible(B2CPage.labels.checkFormLookupLabelFirstFDF, constants.SHORT_WAIT);
    },

    verifyElementsCheckFormSecondFDF() {
        I.waitForVisible(B2CPage.labels.checkFormNameLabelSecondFDF, constants.SHORT_WAIT);
        I.waitForVisible(B2CPage.labels.checkFormLookupLabelSecondFDF, constants.SHORT_WAIT);
        I.waitForVisible(B2CPage.buttons.checkFormLookupButtonSecondFDF, constants.SHORT_WAIT);
    },
};
