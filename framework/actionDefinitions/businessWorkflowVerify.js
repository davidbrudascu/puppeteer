// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const businessWorkflowPage = require('~pages/businessWorkflowPage');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  verifyBusinessWorkflowInSearch(businessWorkflowName) {
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForElement(businessWorkflowPage.fields.searchBusinessWorkflowField, constants.SHORT_WAIT);
    commonActions.fillInTextValueInInput(
      businessWorkflowPage.fields.searchBusinessWorkflowField,
      businessWorkflowName,
    );
    commonActions.waitForLoadersToFinish(constants.SHORT_WAIT);
    commonVerify.verifyValueExistsInTable(
      businessWorkflowPage.locate.containerContentLocate,
      businessWorkflowName,
    );
  },

  verifyBusinessWorkflowNewlyAddedStatusTransition(bwStatusOne, bwInitialStatusTransition) {
    I.waitForVisible(businessWorkflowPage.fields.bwTransitionListField, constants.SHORT_WAIT);
    I.see(bwStatusOne, businessWorkflowPage.fields.bwStatusListField);
    I.see(bwInitialStatusTransition, businessWorkflowPage.fields.bwTransitionListField);
  },

  verifyBusinessWorkflowEditStatusTransition(bwStatusTwo, bwStatusTransition) {
    commonVerify.verifyValueExistsInTable(
      businessWorkflowPage.tables.bwStatusListTable,
      bwStatusTwo,
    );
    commonVerify.verifyValueExistsInTable(
      businessWorkflowPage.tables.bwTransitionListTable,
      bwStatusTransition,
    );
  },

  verifyBusinessWorkflowEditEntity(entityName) {
    commonVerify.verifyValueExistsInTable(
      businessWorkflowPage.tables.bwAttachedEntityTable,
      entityName,
    );
  },

  verifyBusinessWorkflowEntityDelete(deleteBWError) {
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY, deleteBWError);
  },

  verifyBusinessWorkflowDelete(businessWorkflowDeleteName) {
    I.wait(2);
    I.fillField(businessWorkflowPage.fields.searchBusinessWorkflowField,
      businessWorkflowDeleteName);
    I.dontSee(businessWorkflowDeleteName, businessWorkflowPage.fields.searchBWResultsField);
  },
};
