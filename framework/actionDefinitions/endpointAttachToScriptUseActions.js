// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const endpointAttachToScriptUsePage = require('~pages/endpointAttachToScriptUsePage.js');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  attachEndpointToScript(endpointName, endpointDisplayName) {
    I.waitForVisible(endpointAttachToScriptUsePage.buttons.insertEndpointButton, constants.SHORT_WAIT);
    I.click(endpointAttachToScriptUsePage.buttons.insertEndpointButton);
    I.waitForVisible(endpointAttachToScriptUsePage.fields.endpointName, constants.SHORT_WAIT);
    I.fillField(endpointAttachToScriptUsePage.fields.endpointName, endpointName);
    I.fillField(endpointAttachToScriptUsePage.fields.endpointDisplayName, endpointDisplayName);
  },

  callEndpointOnFlow(code) {
    I.waitForElement(endpointAttachToScriptUsePage.buttons.afterEvents, constants.SHORT_WAIT);
    I.click(endpointAttachToScriptUsePage.buttons.afterEvents);
    commonActions.fillInCustomMonacoEditor(
      endpointAttachToScriptUsePage.selector.afterEventsEditor,
      endpointAttachToScriptUsePage.selector.afterEventsEditorId2,
      code);
  },

  checkEndpointOnPortal(endpointMessage) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    commonVerify.verifyToastMessage(locate('div').withText(endpointMessage), constants.TOAST_VANISH);
  }
};
