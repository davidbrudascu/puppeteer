// Constants
const constants = require('~config/constants');
// Pages
const B2CPage = require('~pages/B2CPage');
// Verify
const B2CVerify = require('~actions/B2CVerify');
// Actions
const commonActions = require('~actions/commonActions');

const I = actor();

module.exports = {
    fillFormBasicFDF (name, email, age ) {
        // Fill fields in Step 1
        I.waitForVisible(B2CPage.fields.nameBasicFDFInputField, constants.SHORT_WAIT);
        I.fillField(B2CPage.fields.nameBasicFDFInputField, name);
        I.fillField(B2CPage.fields.emailBasicFDFInputField, email);
        I.click(B2CPage.buttons.nextButton);
        // Fill fields in Step 2
        I.waitForVisible(B2CPage.fields.ageBasicFDFInputField, constants.SHORT_WAIT);
        I.fillField(B2CPage.fields.ageBasicFDFInputField, age);
        I.click(B2CPage.checkbox.newsletterBasicFDFInputField);
        I.click(B2CPage.buttons.finishButton);
    },

    fillLocalizationFormEN (entityName, nameLabelEN, addressLabelEN, nameEN, addressEN, textEN) {
        B2CVerify.verifyFieldLabel(entityName, nameLabelEN);
        B2CVerify.verifyFieldLabel(addressLabelEN, addressLabelEN);
        I.fillField(B2CPage.fields.nameInputFieldLocalization, nameEN);
        I.fillField(B2CPage.fields.addressInputFieldLocalization, addressEN);
        I.click(B2CPage.buttons.nextButton);
        B2CVerify.verifyText(textEN);
        I.waitForVisible(B2CPage.buttons.finishButton, constants.SHORT_WAIT);
        I.click(B2CPage.buttons.finishButton);
    },

    fillLocalizationFormRO(entityName, nameLabelRO, addressLabelEN, addressLabelRO, nameRO, addressRO, textRO) {
        B2CVerify.verifyFieldLabel(entityName, nameLabelRO);
        B2CVerify.verifyFieldLabel(addressLabelEN, addressLabelRO);
        I.fillField(B2CPage.fields.nameInputFieldLocalization, nameRO);
        I.fillField(B2CPage.fields.addressInputFieldLocalization, addressRO);
        I.click(B2CPage.buttons.nextButtonRO);
        B2CVerify.verifyText(textRO);
        I.waitForVisible(B2CPage.buttons.finishButtonRO, constants.SHORT_WAIT);
        I.click(B2CPage.buttons.finishButtonRO);
    },

    fillFirstFDFCheckForm(record, name) {
        I.fillField(B2CPage.fields.nameInputFieldFirstFDFCheckForm, name);
        I.click(B2CPage.buttons.checkFormLookupButtonFirstFDF);
        commonActions.selectARowFromTableAfterText(record);
        I.waitForVisible(B2CPage.buttons.okButtonLookupFirstFDFCheckForm, constants.SHORT_WAIT);
        I.click(B2CPage.buttons.okButtonLookupFirstFDFCheckForm);
        I.waitForClickable(B2CPage.buttons.finishButton, constants.SHORT_WAIT);
        I.click(B2CPage.buttons.finishButton);
    }
};
