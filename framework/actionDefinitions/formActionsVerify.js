// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const businessEntityPage = require('~pages/businessEntityPage');

module.exports = {
  verifyFormInPortal(primaryAttDN, dataForFormField) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.see(primaryAttDN);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.fillField(businessEntityPage.fields.primaryAttributeField, dataForFormField);
    I.click(commonPage.buttons.saveAndCloseButton);
    I.waitForText(dataForFormField, constants.SHORT_WAIT);
    I.see(dataForFormField);
  },

};
