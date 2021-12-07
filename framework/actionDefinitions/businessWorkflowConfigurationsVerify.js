const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const businessWorkflowConfigurationPage = require('~pages/businessWorkflowConfigurationsPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {

  verifyBusinessConditionCreation(businessConditionName) {
    I.waitForVisible(businessWorkflowConfigurationPage.fields.businessConditionsSearchNameField,
      constants.SHORT_WAIT);
    I.fillField(businessWorkflowConfigurationPage.fields.businessConditionsSearchNameField,
      businessConditionName);
    I.see(businessConditionName,
      businessWorkflowConfigurationPage.fields.businessConditionResultsNameField);
  },

  verifyEntryCreationForChangeBWStatus(bwEntityEntrySuccessful) {
    commonVerify.verifyToastMessage(
      commonPage.messagePopup.successMessage,
      constants.TOAST_STAY,
      bwEntityEntrySuccessful,
    );
  },

  verifySuccessfulChangeStatus(bwCurrentStatusVerification) {
    I.waitForVisible(businessWorkflowConfigurationPage.fields.bwCurrentStatusField,
      constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(bwCurrentStatusVerification).inside(businessWorkflowConfigurationPage.fields.bwCurrentStatusField),
      constants.SHORT_WAIT);
  },

  verifyStatusInBusinessTransitions(bwFromStatus, bwToStatus) {
    I.waitForVisible(businessWorkflowConfigurationPage.fields.bwTransitionFromStatusField,
      constants.SHORT_WAIT);
    I.see(bwFromStatus, businessWorkflowConfigurationPage.fields.bwTransitionFromStatusField);
    I.see(bwToStatus, businessWorkflowConfigurationPage.fields.bwTransitionToStatusField);
  },

  verifyBusinessConditionAfterEdit(editBWBusinessConditionName, businessConditionCode,
    businessConditionDescription) {
    I.waitForVisible(businessWorkflowConfigurationPage.fields.businessConditionResultsNameField,
      constants.SHORT_WAIT);
    I.see(editBWBusinessConditionName,
      businessWorkflowConfigurationPage.fields.businessConditionResultsNameField);
    I.see(businessConditionCode,
      businessWorkflowConfigurationPage.fields.businessConditionResultsCodeField);
    I.see(businessConditionDescription,
      businessWorkflowConfigurationPage.fields.businessConditionResultsDescriptionField);
  },
};
