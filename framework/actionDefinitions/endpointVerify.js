const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const endpointPage = require('~pages/endpointPage.js');

module.exports = {
  verifyEndpointFields(endpointName, endpointDisplayName, scriptName) {
    I.waitForClickable(endpointPage.fields.nameField, constants.SHORT_WAIT);
    I.seeInField(endpointPage.fields.nameField, endpointName);
    I.seeInField(endpointPage.fields.displayNameField, endpointDisplayName);
    I.seeInField(endpointPage.fields.scriptName, scriptName);
  }
};
