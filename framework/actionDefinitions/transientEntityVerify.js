const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const transientEntityPage = require('~pages/transientEntityPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  verifyEntityCreation(transEntityName, transEntityDisplayName) {
    I.seeElement(transientEntityPage.fields.entityLoadScriptField);
    I.seeElement(transientEntityPage.fields.entitySaveScriptField);
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.entityDisplayNameField,
      transEntityDisplayName,
    );
  },

  verifyTransientScripts(loadScriptName, saveScriptName, transientDescription) {
    I.waitForElement(transientEntityPage.fields.entityLoadScriptField, constants.SHORT_WAIT);
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.loadScriptValueField,
      loadScriptName,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.saveScriptValueField,
      saveScriptName,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.entityDescriptionField,
      transientDescription,
    );
  },

  verifyEntityDeleteError() {
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY);
  },

  verifyVirtualAttr() {
    I.waitForElement(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForElement(transientEntityPage.fields.vaRelAttReadOnlyField, constants.SHORT_WAIT);
    I.waitForElement(transientEntityPage.fields.vaNameReadOnlyField, constants.SHORT_WAIT);
    I.waitForElement(transientEntityPage.fields.vaAttrTypeReadOnlyField, constants.SHORT_WAIT);
    I.waitForElement(transientEntityPage.fields.vaLengthReadOnlyField, constants.SHORT_WAIT);
  },

  verifyVirtAttr(vaName) {
    I.waitForElement(commonPage.buttons.insertButton, constants.LONG_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(locate('div').withText(vaName), constants.SHORT_WAIT);
  },

  verifyTransRecord(recordProduct, recordSourceEmail, recordOrderId, recordOrderStatus) {
    I.waitForElement(locate('td').withText(recordProduct), constants.LONG_WAIT);
    I.doubleClick(locate('td').withText(recordProduct));
    I.click(locate('td').withText(recordProduct));
    I.waitForElement(transientEntityPage.fields.recordEmailField, constants.SHORT_WAIT);
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordEmailField,
      recordSourceEmail,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordOrderStatusField,
      recordOrderStatus,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordProductField,
      recordProduct,
    );
  },
};
