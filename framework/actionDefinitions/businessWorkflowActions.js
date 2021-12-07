/* eslint-disable max-len */
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
  insertNewBusinessWorkflow() {
    I.waitForElement(businessWorkflowPage.fields.searchBusinessWorkflowField, constants.SHORT_WAIT);
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.moveCursorTo(commonPage.buttons.insertButton);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessWorkflowPage.fields.bwNameField, constants.SHORT_WAIT);
  },

  fillAllMandatoryFieldsForBusinessWorkflow(businessWorkflowName) {
    I.fillField(businessWorkflowPage.fields.bwNameField, businessWorkflowName);
    I.moveCursorTo(commonPage.buttons.saveAndRefreshButton);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.waitForElement(businessWorkflowPage.fields.bwNameField, constants.SHORT_WAIT);
  },

  searchAndEditBusinessWorkflow(businessWorkflowBeforeEditName) {
    commonActions.fillInTextValueInInput(businessWorkflowPage.fields.searchBusinessWorkflowField, businessWorkflowBeforeEditName);
    I.waitForElement(businessWorkflowPage.locate.tableLoadingAnimationVisible, constants.SHORT_WAIT);
    I.waitForElement(businessWorkflowPage.locate.tableLoadingAnimationInvisible, constants.LONG_WAIT);
    commonActions.doubleClickValueFromTable(businessWorkflowPage.locate.searchResultsBusinessWorkflowLocate, businessWorkflowBeforeEditName);
    commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
  },

  attachEntityToBusinessWorkflow(entityName, toastSuccessMessage) {
    commonVerify.verifyEmptyTableData(constants.LONG_WAIT);
    I.waitForElement(businessWorkflowPage.buttons.attachToEntityButton, constants.SHORT_WAIT);
    I.click(businessWorkflowPage.buttons.attachToEntityButton);
    I.waitForElement(businessWorkflowPage.locate.attachEntityPopupLocate, constants.SHORT_WAIT);
    commonActions.fillInPopupLookupTableWithValue(
      businessWorkflowPage.fields.searchBwEntity,
      entityName,
    );
    commonActions.doubleClickValueFromTable(businessWorkflowPage.fields.searchBwEntity, entityName);
    I.click(commonPage.buttons.yesAnswerButton);
    commonActions.waitForLoadersToFinish();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH, toastSuccessMessage);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(businessWorkflowPage.buttons.attachToEntityButton, constants.SHORT_WAIT);
  },

  addBusinessWorkflowStatus(businessWorkflowStatusName) {
    I.wait(2);
    commonActions.clickButtonAfterLocator(businessWorkflowPage.buttons.configTab);
    I.waitForElement(businessWorkflowPage.fields.bwStatusList, constants.SHORT_WAIT);
    commonActions.clickButtonAfterLocator(businessWorkflowPage.buttons.bwConfigStatusInsertButton);
    I.waitForVisible(businessWorkflowPage.fields.addBWStatusName, constants.SHORT_WAIT);
    I.fillField(businessWorkflowPage.fields.addBWStatusName, businessWorkflowStatusName);
    I.fillField(businessWorkflowPage.fields.addBWStatusLabel, businessWorkflowStatusName);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addBusinessWorkflowInitialTransitions(bwStatusOne) {
    I.waitForVisible(businessWorkflowPage.buttons.bwConfigTransitionInsertButton,
      constants.SHORT_WAIT);
    I.click(businessWorkflowPage.buttons.bwConfigTransitionInsertButton);
    I.waitForVisible(businessWorkflowPage.fields.addBWStatusTransitionName, constants.SHORT_WAIT);
    I.click(businessWorkflowPage.buttons.addBWStatusTransitionToStatus);
    I.waitForVisible(businessWorkflowPage.fields.searchToStatusField, constants.SHORT_WAIT);
    I.fillField(businessWorkflowPage.fields.searchToStatusField, bwStatusOne);
    I.click(businessWorkflowPage.selector.bwInitialTransitionStatus);
    I.click(businessWorkflowPage.buttons.menuOKBWTransitionToStatusButton);
    I.click(businessWorkflowPage.fields.addBWStatusTransitionName);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addBusinessWorkflowTransitions(bwStatusOne, bwStatusTwo) {
    I.click(businessWorkflowPage.tabs.configurationTab);
    within(businessWorkflowPage.locate.bwRuleWrapLocate, () => {
      I.waitForVisible(businessWorkflowPage.buttons.bwConfigTransitionInsertButton,
        constants.SHORT_WAIT);
      I.click(businessWorkflowPage.buttons.bwConfigTransitionInsertButton);
    });
    I.waitForVisible(businessWorkflowPage.fields.addBWStatusTransitionName, constants.SHORT_WAIT);
    commonActions.clickLookupTableButton(businessWorkflowPage.buttons.addBWStatusTransitionFromStatus);
    commonActions.doubleClickValueFromTable(
      businessWorkflowPage.locate.bwTransitionFromStatusLookup,
      bwStatusOne,
    );
    commonActions.clickLookupTableButton(businessWorkflowPage.buttons.addBWStatusTransitionToStatus);
    commonActions.doubleClickValueFromTable(
      businessWorkflowPage.locate.bwTransitionToStatusLookup,
      bwStatusTwo,
    );
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  searchAndDeleteABusinessWorkflow(businessWorkflowDeleteName) {
    // refreshPage was added in order to avoid I.click on BW to stuck after a second search.
    commonActions.fillInTextValueInInput(
      businessWorkflowPage.fields.searchBusinessWorkflowField,
      businessWorkflowDeleteName,
    );
    I.wait(2);
    I.click(locate('td').inside(businessWorkflowPage.locate.containerContentLocate)
      .withText(businessWorkflowDeleteName));
    I.waitForElement(locate('tr').inside(businessWorkflowPage.locate.containerContentLocate)
      .withAttr({ 'aria-selected': 'true' }), constants.SHORT_WAIT);
    I.moveCursorTo(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  navigateToBWMainTab() {
    I.click(businessWorkflowPage.tabs.mainTab);
  },
};
