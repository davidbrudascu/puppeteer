// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const businessWorkflowConfigurationPage = require('~pages/businessWorkflowConfigurationsPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Actions
const commonActions = require('~actions/commonActions');

module.exports = {
  navigateToBWCGeneralTab() {
    I.click(businessWorkflowConfigurationPage.tabs.generalTab);
  },

  navigateToBWCBusinessConditionTab() {
    I.waitForElement(businessWorkflowConfigurationPage.tabs.businessConditionsTab,
      constants.SHORT_WAIT);
    I.click(businessWorkflowConfigurationPage.tabs.businessConditionsTab);
    I.waitForElement(
      businessWorkflowConfigurationPage.fields.bwConditionTable,
      constants.SHORT_WAIT,
    );
  },

  findAndEditBusinessWorkflowConfiguration(businessWorkflowConfigurationName) {
    I.waitForElement(
      businessWorkflowConfigurationPage.fields.businessConditionsSearchField,
      constants.SHORT_WAIT,
    );
    commonActions.fillInTextValueInInput(
      businessWorkflowConfigurationPage.locate.bwTableInputFieldLocate,
      businessWorkflowConfigurationName,
    );
    commonActions.waitForLoadersToFinish(constants.SHORT_WAIT);
    // FIXME: added wait() because there is 50% chance to not find the element after the filter
    //  loaders doesn't finish in time
    I.wait(2);
    commonActions.doubleClickValueFromTable(
      businessWorkflowConfigurationPage.locate.searchResultsBusinessWorkflowLocate,
      businessWorkflowConfigurationName,
    );
  },

  activateBusinessWorkflow() {
    I.waitForElement(businessWorkflowConfigurationPage.buttons.activeBusinessWorkflowButton,
      constants.LONG_WAIT);
    I.click(businessWorkflowConfigurationPage.buttons.activeBusinessWorkflowButton);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deactivateBusinessWorkflow() {
    I.waitForElement(businessWorkflowConfigurationPage.buttons.activeBusinessWorkflowButton,
      constants.LONG_WAIT);
    I.click(businessWorkflowConfigurationPage.buttons.activeBusinessWorkflowButton);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addOneBusinessCondition(
    businessConditionNameOne,
    businessConditionNameRule,
    businessConditionNameTwo,
    ruleValueInvariantDate,
    ruleAddCondition,
    ruleAddName,
    ruleAddInvDate,
  ) {
    I.click(businessWorkflowConfigurationPage.buttons.insertBusinessConditionButton);
    commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
    I.waitForVisible(businessWorkflowConfigurationPage.fields.businessConditionNameField,
      constants.SHORT_WAIT);
    I.fillField(businessWorkflowConfigurationPage.fields.businessConditionNameField,
      businessConditionNameOne);
    // Adding rule for Name attributes
    I.click(businessWorkflowConfigurationPage.buttons.parentAddRuleButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleAddCondition })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionTypeButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'data-item-id': ruleAddName })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionValueButton);
    I.fillField(businessWorkflowConfigurationPage.fields.conditionValueTextField,
      businessConditionNameRule);
    I.pressKey('Enter');
    I.click(commonPage.buttons.saveAndNewButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.SHORT_WAIT)
    I.waitForVisible(businessWorkflowConfigurationPage.fields.businessConditionNameField,
      constants.SHORT_WAIT);
    I.fillField(businessWorkflowConfigurationPage.fields.businessConditionNameField,
      businessConditionNameTwo);
    // Adding rules for Invariant Date and Name attributes
    I.click(businessWorkflowConfigurationPage.buttons.parentAddRuleButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleAddCondition })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionTypeButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'data-item-id': ruleAddInvDate })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionValueButton);
    I.fillField(businessWorkflowConfigurationPage.fields.secondConditionValueTextField,
      ruleValueInvariantDate);
    I.click(businessWorkflowConfigurationPage.buttons.parentAddRuleButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleAddCondition })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionTypeButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'data-item-id': ruleAddName })));
    I.click(businessWorkflowConfigurationPage.buttons.secondConditionValueButton);
    I.fillField(businessWorkflowConfigurationPage.fields.conditionValueTextField,
      businessConditionNameRule);
    I.pressKey('Enter');
    I.click(commonPage.buttons.saveAndCloseButton);
  },

  addEntityEntry(bwEntityAddName) {
    commonVerify.verifyEmptyTableData();
    I.waitForElement(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.moveCursorTo(commonPage.buttons.insertButton);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessWorkflowConfigurationPage.fields.bwEntityAddName,
      constants.SHORT_WAIT);
    I.fillField(businessWorkflowConfigurationPage.fields.bwEntityAddName, bwEntityAddName);
    I.click(commonPage.buttons.nextButton);
  },

  bwChangeStatus() {
    I.waitForVisible(businessWorkflowConfigurationPage.fields.bwChangeStatusField,
      constants.SHORT_WAIT);
    I.click(businessWorkflowConfigurationPage.buttons.bwChangeNextStatusButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton,
      constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  bwCheckBusinessTransactionsPage() {
    I.click(businessWorkflowConfigurationPage.buttons.bwBusinessTransactionButton);
  },

  editBusinessConditionsDetails(businessConditionEditName, businessConditionCode,
    businessConditionDescription) {
    I.fillField(businessWorkflowConfigurationPage.fields.businessConditionNameField,
      businessConditionEditName);
    I.fillField(businessWorkflowConfigurationPage.fields.businessConditionCodeField,
      businessConditionCode);
    I.fillField(businessWorkflowConfigurationPage.fields.businessConditionDescriptionField,
      businessConditionDescription);
  },

  addBusinessConditionRules(
    ruleValueInvariantDate,
    ruleValueName,
    ruleValueCreatedOn,
    ruleCreatedOn,
    ruleIsLessThan,
    ruleAddCondition,
    ruleAddName,
    ruleAddInvDate,
  ) {
    // Add parent rule for Invariant Date attributes.
    I.click(businessWorkflowConfigurationPage.buttons.parentAddRuleButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleAddCondition })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionTypeButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'data-item-id': ruleAddInvDate })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionOperatorButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleIsLessThan })));
    I.click(businessWorkflowConfigurationPage.buttons.parentConditionValueButton);
    I.fillField(businessWorkflowConfigurationPage.fields.parentConditionValueTextField,
      ruleValueInvariantDate);
    I.pressKey('Enter');
    // Add group 'OR" rule
    I.click(businessWorkflowConfigurationPage.buttons.parentAddRuleButton);
    I.click(businessWorkflowConfigurationPage.selector.parentAddGroupDropDownList);
    I.click(businessWorkflowConfigurationPage.buttons.childRuleOperatorButton);
    I.click(businessWorkflowConfigurationPage.selector.childRuleOperatorDropDownList);
    // Add child first rule for Name attribute.
    I.click(businessWorkflowConfigurationPage.buttons.childAddRuleButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleAddCondition })));
    I.click(businessWorkflowConfigurationPage.buttons.childFirstConditionTypeButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'data-item-id': ruleAddName })));
    I.click(businessWorkflowConfigurationPage.buttons.childFirstConditionValueButton);
    I.fillField(businessWorkflowConfigurationPage.fields.childFirstConditionValueTextField2,
      ruleValueName);
    I.pressKey('Enter');
    // Add child second rule for Created On attribute.
    I.click(businessWorkflowConfigurationPage.buttons.childAddRuleButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleAddCondition })));
    I.click(businessWorkflowConfigurationPage.buttons.childSecondConditionTypeButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleCreatedOn })));
    I.click(businessWorkflowConfigurationPage.buttons.childSecondConditionOperatorButton);
    I.click(locate('.dx-item').inside(locate('li').withAttr({ 'aria-label': ruleIsLessThan })));
    I.click(businessWorkflowConfigurationPage.buttons.childSecondConditionValueButton);
    I.fillField(businessWorkflowConfigurationPage.fields.childSecondConditionValueTextField,
      ruleValueCreatedOn);
    I.pressKey('Enter');
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deleteRuleBusinessCondition() {
    I.waitForElement(locate('.dx-icon-remove'), constants.SHORT_WAIT);
    I.click(locate('.dx-icon-remove'));
  },
};
