// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const flowControlPage = require('~pages/flowControlPage');
// Verify
const flowControlVerify = require('~actions/flowControlVerify');
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  // Add new flow control Rules when business condition is fulfilled for Step 1
  addNewFlowControlRulePkForStep1(
    flowControlName1,
    flowControlStep3,
  ) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
    I.waitForVisible(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlRuleNameField, flowControlName1);
    I.waitForVisible(flowControlPage.buttons.plusAddNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.plusAddNewRuleBtn);
    I.click(flowControlPage.buttons.addNewRuleConditionBtn);
    I.click(flowControlPage.buttons.parentConditionTypeButton);
    I.click(flowControlPage.buttons.ruleAddNamePkidBtn);
    I.click(flowControlPage.buttons.childSecondConditionOperatorButton);
    I.click(flowControlPage.buttons.ruleBCIsFulfilledBtn);
    I.waitForVisible(flowControlPage.fields.enterValueField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.enterValueField);
    I.click(flowControlPage.buttons.businessConditionButton);
    I.waitForVisible(flowControlPage.selector.selectBusinessCondition, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.selectFirstBusinessCondition);
    I.scrollTo(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(flowControlPage.buttons.goToSectionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(locate('td').withText(flowControlStep3).inside(flowControlPage.table.goToSectionStepTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(flowControlStep3).inside(flowControlPage.table.goToSectionStepTable));
  },

  addNewFlowControlRulePkForStep3(
    flowControlName2,
    flowControlStep1,
  ) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
    I.waitForVisible(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlRuleNameField, flowControlName2);
    I.waitForVisible(flowControlPage.buttons.plusAddNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.plusAddNewRuleBtn);
    I.click(flowControlPage.buttons.addNewRuleConditionBtn);
    I.click(flowControlPage.buttons.parentConditionTypeButton);
    I.click(flowControlPage.buttons.ruleAddNamePkidBtn);
    I.click(flowControlPage.buttons.childSecondConditionOperatorButton);
    I.click(flowControlPage.buttons.ruleBCIsNotFulfilledBtn);
    I.waitForVisible(flowControlPage.fields.enterValueField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.enterValueField);
    I.click(flowControlPage.buttons.businessConditionButton);
    I.waitForVisible(flowControlPage.selector.selectBusinessCondition, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.selectSecondBusinessCondition);
    I.scrollTo(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(flowControlPage.buttons.goToSectionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(locate('td').withText(flowControlStep1).inside(flowControlPage.table.goToSectionStepTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(flowControlStep1).inside(flowControlPage.table.goToSectionStepTable));
  },

  addNewFlowControlRuleLkForStep1(
    flowControlName1,
    businessCondition2,
    businessCondition3,
    businessCondition1,
    flowControlStep3,
  ) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
    I.waitForVisible(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlRuleNameField, flowControlName1);
    I.waitForVisible(flowControlPage.buttons.plusAddNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.plusAddNewRuleBtn);
    I.click(flowControlPage.buttons.addNewRuleConditionBtn);
    I.click(flowControlPage.buttons.parentConditionTypeButton);
    I.click(flowControlPage.buttons.ruleAddNameLkidBtn);
    I.click(flowControlPage.buttons.childSecondConditionOperatorButton);
    I.click(flowControlPage.buttons.ruleBCIsFulfilledBtn);
    I.waitForVisible(flowControlPage.fields.enterValueField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.enterValueField);
    I.click(flowControlPage.buttons.businessConditionButton);
    I.waitForVisible(flowControlPage.selector.selectBusinessCondition, constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(businessCondition2), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(businessCondition3), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(businessCondition1), constants.SHORT_WAIT);
    I.click(flowControlPage.selector.selectFirstBusinessCondition);
    I.scrollTo(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(flowControlPage.buttons.goToSectionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(locate('td').withText(flowControlStep3).inside(flowControlPage.table.goToSectionStepTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(flowControlStep3).inside(flowControlPage.table.goToSectionStepTable));
  },

  addNewFlowControlRuleLkForStep3(
    flowControlName2,
    flowControlStep1,
  ) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    commonActions.waitForLoadersToFinish(constants.LONG_WAIT);
    I.waitForVisible(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlRuleNameField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlRuleNameField, flowControlName2);
    I.waitForVisible(flowControlPage.buttons.plusAddNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.plusAddNewRuleBtn);
    I.click(flowControlPage.buttons.addNewRuleConditionBtn);
    I.click(flowControlPage.buttons.parentConditionTypeButton);
    I.click(flowControlPage.buttons.ruleAddNameLkidBtn);
    I.click(flowControlPage.buttons.childSecondConditionOperatorButton);
    I.click(flowControlPage.buttons.ruleBCIsNotFulfilledBtn);
    I.waitForVisible(flowControlPage.fields.enterValueField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.enterValueField);
    I.click(flowControlPage.buttons.businessConditionButton);
    I.waitForVisible(flowControlPage.selector.selectBusinessCondition, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.selectSecondBusinessCondition);
    I.scrollTo(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(flowControlPage.buttons.goToSectionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(locate('td').withText(flowControlStep1).inside(flowControlPage.table.goToSectionStepTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(flowControlStep1).inside(flowControlPage.table.goToSectionStepTable));
  },

  selectTab(tabName) {
    I.waitForVisible(locate('span').withText(tabName).inside(flowControlPage.selector.tabList), constants.SHORT_WAIT);
    I.click(locate('span').withText(tabName).inside(flowControlPage.selector.tabList));
  },

  addCloseFlowRule(nameFlowControl, descriptionFlowControl, caseLabel, nameAttribute, operation, navigateTo, valueRuleExpression) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameFlowControl);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionFlowControl);
    this.addDefineRuleExpression(caseLabel, nameAttribute, operation, valueRuleExpression);
    I.click(flowControlPage.checkbox.closeFlowCheckbox);
    commonActions.selectValueFromDropdown(flowControlPage.selector.navigateToDropdown, navigateTo);
  },

  insertFormCloseFlowHomepage(valueExpressionRule) {
    I.waitForVisible(flowControlPage.fields.closeFlowHomepageInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.closeFlowHomepageInputField, valueExpressionRule);
    // Press Next
    I.click(flowControlPage.buttons.nextButton);
    // Check if the user is redirected to homepage, not to Step2
    I.waitForVisible(flowControlPage.selector.appsDashboard, constants.SHORT_WAIT);
  },

  insertFormPreviousContext(valueExpressionRule, entityList) {
    I.waitForVisible(flowControlPage.fields.closeFlowPreviousContextInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.closeFlowPreviousContextInputField, valueExpressionRule);
    // Press Next
    I.click(flowControlPage.buttons.nextButton);
    // Check if the user is redirected to homepage, not to Step2
    I.waitForVisible(locate('h5').withText(entityList), constants.SHORT_WAIT);
  },

  async addCloseFlowRuleList(nameFlowControl, descriptionFlowControl, caseLabel, nameAttribute, operation, list, entity, valueRuleExpression, searchColumn) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameFlowControl);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionFlowControl);
    this.addDefineRuleExpression(caseLabel, nameAttribute, operation, valueRuleExpression);
    I.click(flowControlPage.checkbox.closeFlowCheckbox);
    commonActions.selectValueFromDropdown(flowControlPage.selector.navigateToDropdown, list);
    I.waitForVisible(flowControlPage.fields.entityViewField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.entityViewField);
    await commonActions.searchInTableAfterASpecificColumn(searchColumn, entity, flowControlPage.containers.entityViewContainer);
  },

  insertFormList(valueExpressionRule, entityList) {
    I.waitForVisible(flowControlPage.fields.closeFlowListInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.closeFlowListInputField, valueExpressionRule);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(locate('h5').withText(entityList), constants.SHORT_WAIT);
  },

  addCloseFlowRuleDashboard(nameFlowControl, descriptionFlowControl, caseLabel, nameAttribute, operation, navigateTo, dashboard, valueRuleExpression) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameFlowControl);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionFlowControl);
    this.addDefineRuleExpression(caseLabel, nameAttribute, operation, valueRuleExpression);
    I.click(flowControlPage.checkbox.closeFlowCheckbox);
    // Select Dashboard/Main Dashboard
    commonActions.selectValueFromDropdown(flowControlPage.selector.navigateToDropdown, navigateTo);
    I.waitForVisible(flowControlPage.buttons.addDashboardCloseFlowButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.addDashboardCloseFlowButton);
    I.waitForVisible(locate('td').withText(dashboard).inside(flowControlPage.containers.dashboardCloseFlowContainer), constants.SHORT_WAIT);
    I.click(locate('td').withText(dashboard).inside(flowControlPage.containers.dashboardCloseFlowContainer));
    I.click(flowControlPage.buttons.okButtonDashboardCloseFlow);
  },

  insertFormDashboard(valueExpressionRule, dashboard) {
    I.waitForVisible(flowControlPage.fields.closeFlowDashboardInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.closeFlowDashboardInputField, valueExpressionRule);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(locate('a').withAttr({ 'data-dashboard-name': dashboard }).withAttr({ 'aria-selected': 'true' }).inside(flowControlPage.selector.dashboardList), constants.SHORT_WAIT);
  },

  async navigateToAnotherDJFCR(addFCR, nameFirstFCR, descriptionFirstFCR, caseLabel, nameAttribute, operation, navigateToAnotherFlowCb, secondFlowControl, lookupAttribute, valueRuleExpression, searchColumn) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    // Needed more verification because the insert button was not visible
    commonVerify.verifyEmptyTableData();
    I.waitForClickable(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    // Check new page is opened: ADD FLOW CONTROL RULE
    I.waitForVisible(locate('span').withText(addFCR), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameFirstFCR);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionFirstFCR);
    this.addDefineRuleExpression(caseLabel, nameAttribute, operation, valueRuleExpression);
    // Tick 'Navigate to another Flow' checkbox
    I.click(locate('div').withText(navigateToAnotherFlowCb).inside(locate('div').withAttr({ role: 'radio' })).inside(flowControlPage.containers.goToAnotherFormContainer));
    // Select Digital Journey
    I.waitForVisible(flowControlPage.fields.selectDigitalJourneyFlowInputField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.selectDigitalJourneyFlowInputField);
    I.waitForVisible(locate('td').withText(secondFlowControl), constants.SHORT_WAIT);
    I.click(locate('td').withText(secondFlowControl));
    // Select Primary Key Attribute
    I.click(flowControlPage.fields.primaryKeyAttributeInputField);
    await commonActions.searchInTableAfterASpecificColumn(searchColumn, lookupAttribute, flowControlPage.containers.primaryKeyAttributeContainer);
  },

  addNameAT_FlowControl_RuleNok_E01(nameRecordE1) {
    I.waitForVisible(flowControlPage.fields.textAT_FlowControl_RuleNok_E01InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.textAT_FlowControl_RuleNok_E01InputField, nameRecordE1);
    I.click(flowControlPage.buttons.nextButton);
  },

  addNameAT_FlowControl_RuleNok_E02(nameRecordE2) {
    I.waitForVisible(flowControlPage.fields.textAT_FlowControl_RuleNok_E02InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.textAT_FlowControl_RuleNok_E02InputField, nameRecordE2);
    I.click(flowControlPage.buttons.nextButton);
  },

  addLookupAT_FlowControl_RuleNok_E01(nameRecordE1, nameRecordE2) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameRecordE1);
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_Flow_control_ruleNok_E01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_Flow_control_ruleNok_E01Button);
    commonActions.selectARowFromTableAfterText(nameRecordE2);
    I.click(flowControlPage.buttons.okButtonLookupAT_Flow_control_ruleNok_E01);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
  },

  updateNameAT_FlowControl_RuleNok_E01(nameRecordE1, updatedNameRecordE1) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameRecordE1);
    I.waitForVisible(flowControlPage.fields.textAT_FlowControl_RuleNok_E01InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.textAT_FlowControl_RuleNok_E01InputField, updatedNameRecordE1);
    I.click(flowControlPage.buttons.nextButton);
  },

  updateNameAT_FlowControl_RuleNok_E02(nameRecordE2, updatedNameRecordE2) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameRecordE2);
    I.waitForVisible(flowControlPage.fields.textAT_FlowControl_RuleNok_E02InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.textAT_FlowControl_RuleNok_E02InputField, updatedNameRecordE2);
    I.click(flowControlPage.buttons.nextButton);
  },

  addNameAT_Flow_control_E01(nameFirstRecord) {
    I.waitForVisible(flowControlPage.fields.textAT_FlowControl_E01InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.textAT_FlowControl_E01InputField, nameFirstRecord);
    I.click(flowControlPage.buttons.nextButton);
  },

  addNameAT_Flow_control_E02(nameSecondRecord) {
    I.waitForVisible(flowControlPage.fields.textAT_FlowControl_E02InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.textAT_FlowControl_E02InputField, nameSecondRecord);
    I.click(flowControlPage.buttons.nextButton);
  },

  addLookupAT_Flow_control_E01(nameFirstRecord, nameSecondRecord) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameFirstRecord);
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_Flow_control_E01, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_Flow_control_E01);
    commonActions.selectARowFromTableAfterText(nameSecondRecord);
    I.click(flowControlPage.buttons.okButtonLookupAT_Flow_control_E01);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
  },

  addLookupAT_Flow_control_E02(nameSecondRecord, nameFirstRecord) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameSecondRecord);
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_Flow_control_E02, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_Flow_control_E02);
    commonActions.selectARowFromTableAfterText(nameFirstRecord);
    I.click(flowControlPage.buttons.okButtonLookupAT_Flow_control_E02);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
  },

  updateNameAT_Flow_control_E01(nameFirstRecord, updatedName) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameFirstRecord);
    this.addNameAT_Flow_control_E01(updatedName);
  },

  accessSecondStepAT_Flow_control_ruleNok_E02(nameRecordE2) {
    commonActions.doubleClickValueFromTable(flowControlPage.containers.defaultContainer, nameRecordE2);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
  },

  addCancelNavigationRule(nameFlowControlRule, descriptionFlowControlRule, caseLabel, nameAttribute, operation, cancelNavigationMessage, valueRuleExpression) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameFlowControlRule);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionFlowControlRule);
    this.addDefineRuleExpression(
      caseLabel,
      nameAttribute,
      operation,
      valueRuleExpression,
    );
    I.click(flowControlPage.checkbox.cancelNavigationCheckbox);
    // Add a text to Cancel Navigation Message field
    I.waitForVisible(flowControlPage.fields.cancelNavigationInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.cancelNavigationInputField, cancelNavigationMessage);
  },

  insertCancelNavigationForm(firstDRE) {
    I.waitForVisible(flowControlPage.fields.cancelNavigationPortalInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.cancelNavigationPortalInputField, firstDRE);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.toast.stopCancelNavigationToast, constants.SHORT_WAIT);
  },

  deleteFlowControlRules(flowControlName2) {
    I.waitForVisible(locate('td').withText(flowControlName2).inside(flowControlPage.table.flowControlSectionTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(flowControlName2).inside(flowControlPage.table.flowControlSectionTable));
    // Click Delete button
    I.waitForVisible(flowControlPage.buttons.deleteRuleBtn, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.deleteRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.deleteRuleBtn);
    I.waitForVisible(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
    // Verify that the row was deleted
    I.waitForInvisible(locate('td').withText(flowControlName2).inside(flowControlPage.table.flowControlSectionTable), constants.SHORT_WAIT);
  },

  changeFlowControlStep(flowControlStep2) {
    I.waitForVisible(flowControlPage.buttons.goToSectionButton, constants.SHORT_WAIT);
    I.scrollTo(flowControlPage.buttons.goToSectionButton);
    I.click(flowControlPage.buttons.goToSectionButton);
    I.waitForVisible(locate('td').withText(flowControlStep2).inside(flowControlPage.table.goToSectionStepTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(flowControlStep2).inside(flowControlPage.table.goToSectionStepTable));
  },

  insertActionChangeStatusFromStatusBW(firstNameAction, statusNew, statusInProgress) {
    I.waitForVisible(flowControlPage.buttons.insertFormActionsBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertFormActionsBtn);
    I.waitForVisible(flowControlPage.fields.inputActionNamePopupField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.inputActionNamePopupField);
    I.fillField(flowControlPage.fields.inputActionNamePopupField, firstNameAction);
    I.waitForVisible(flowControlPage.buttons.filterExecuteBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.iconPlusPopupBtn);
    I.waitForVisible(flowControlPage.list.listOfActions, constants.SHORT_WAIT);
    I.click(flowControlPage.list.listOfActions);
    I.waitForVisible(flowControlPage.list.changeBusinessList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.generateDigitalDocumentList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.callCustomProcessorList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.callBusinessMatrixList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.callFormulaList, constants.SHORT_WAIT);
    I.click(flowControlPage.list.changeBusinessList);
    I.waitForVisible(flowControlPage.fields.itemValueTextField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.itemValueTextField);
    I.waitForVisible(flowControlPage.selector.firstDDStatusList, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.firstDDStatusList);
    I.waitForVisible(locate('div').withText(statusNew).inside(flowControlPage.status.firstDDStatusList), constants.SHORT_WAIT);
    I.click(locate('div').withText(statusNew).inside(flowControlPage.status.firstDDStatusList));
    I.click(flowControlPage.selector.secondDDStatusList);
    I.waitForVisible(locate('div').withText(statusInProgress).inside(flowControlPage.status.secondDDStatusList).last(), constants.SHORT_WAIT);
    I.click(locate('div').withText(statusInProgress).inside(flowControlPage.status.secondDDStatusList).last());
    I.waitForVisible(flowControlPage.buttons.savePopupActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.savePopupActionBtn);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Add the Actions to be Performed for Step1 BW
  addActionsToBePerformedForStep1BW(firstNameAction, secondNameAction) {
    I.waitForVisible(flowControlPage.selector.actionsToBePerformedDD, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.actionsToBePerformedDD);
    I.waitForVisible(locate('div').withText(firstNameAction), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(secondNameAction), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.checkbox.selectAllActionsCheckbox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.selectAllActionsCheckbox);
    I.waitForVisible(locate('span').withText(firstNameAction).inside(flowControlPage.selector.actionsToBePerformedDD), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(secondNameAction).inside(flowControlPage.selector.actionsToBePerformedDD), constants.SHORT_WAIT);
  },

  // Add new Action Report (Generate Digital Document)
  insertActionReport(firstNameAction) {
    I.waitForVisible(flowControlPage.buttons.insertFormActionsBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertFormActionsBtn);
    I.waitForVisible(flowControlPage.fields.inputActionNamePopupField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.inputActionNamePopupField);
    I.fillField(flowControlPage.fields.inputActionNamePopupField, firstNameAction);
    I.waitForVisible(flowControlPage.buttons.filterExecuteBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.iconPlusPopupBtn);
    I.waitForVisible(flowControlPage.list.listOfActions, constants.SHORT_WAIT);
    I.click(flowControlPage.list.listOfActions);
    I.waitForVisible(flowControlPage.list.generateDigitalDocumentList, constants.SHORT_WAIT);
    I.click(flowControlPage.list.generateDigitalDocumentList);
    // Select the report from the list of reports
    I.click(flowControlPage.fields.itemValueTextField);
    I.waitForVisible(flowControlPage.selector.firstDDStatusList, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.firstDDStatusList);
    I.waitForVisible(flowControlPage.status.actionReportDDList, constants.SHORT_WAIT);
    I.click(flowControlPage.status.actionReportDDList);
    //	Click Save on the popup action
    I.waitForVisible(flowControlPage.buttons.savePopupActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.savePopupActionBtn);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Add the Actions to be Performed for Step1 Report
  addActionsToBePerformedForStep1(firstNameAction) {
    // 	Check if the new action is visible in the "Actions to be Performed" field, as an option
    I.waitForVisible(flowControlPage.selector.actionsToBePerformedDD, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.actionsToBePerformedDD);
    I.waitForVisible(locate('div').withText(firstNameAction), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.checkbox.selectAllActionsCheckbox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.selectAllActionsCheckbox);
    I.waitForVisible(locate('span').withText(firstNameAction).inside(flowControlPage.selector.actionsToBePerformedDD), constants.SHORT_WAIT);
  },

  // Add new Action Endpoint (Call Custom Processor)
  insertActionEndpoint(firstNameAction) {
    I.waitForVisible(flowControlPage.buttons.insertFormActionsBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertFormActionsBtn);
    I.waitForVisible(flowControlPage.fields.inputActionNamePopupField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.inputActionNamePopupField);
    I.fillField(flowControlPage.fields.inputActionNamePopupField, firstNameAction);
    I.waitForVisible(flowControlPage.buttons.filterExecuteBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.iconPlusPopupBtn);
    I.waitForVisible(flowControlPage.list.listOfActions, constants.SHORT_WAIT);
    I.click(flowControlPage.list.listOfActions);
    I.waitForVisible(flowControlPage.list.callCustomProcessorList, constants.SHORT_WAIT);
    I.click(flowControlPage.list.callCustomProcessorList);
    I.waitForVisible(flowControlPage.fields.itemValueTextField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.itemValueTextField);
    I.waitForVisible(flowControlPage.selector.firstDDStatusList, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.firstDDStatusList);
    I.waitForVisible(flowControlPage.status.actionScriptEndpointDDList, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.status.actionScriptEndpointDDList, constants.SHORT_WAIT);
    I.click(flowControlPage.status.actionScriptEndpointDDList);
    I.waitForVisible(flowControlPage.buttons.applyActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.applyActionBtn);
    I.waitForVisible(flowControlPage.buttons.savePopupActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.savePopupActionBtn);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Edit Action BW
  editActionBW(firstNameAction) {
    I.waitForVisible(locate('td').withText(firstNameAction).inside(flowControlPage.table.actionIDTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(firstNameAction).inside(flowControlPage.table.actionIDTable));
    I.waitForVisible(flowControlPage.buttons.editActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.editActionBtn);
    I.waitForVisible(flowControlPage.fields.statusNewToInProgressField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.statusToStatusField);
    I.waitForVisible(flowControlPage.selector.firstDDStatusList, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.firstDDStatusList);
    I.waitForVisible(flowControlPage.status.newStatusFirstDDList, constants.SHORT_WAIT);
    I.click(flowControlPage.status.newStatusFirstDDList);
    I.click(flowControlPage.selector.secondDDStatusList);
    I.waitForVisible(flowControlPage.status.approvedStatusLastList, constants.SHORT_WAIT);
    I.click(flowControlPage.status.approvedStatusLastList);
    I.waitForVisible(flowControlPage.buttons.savePopupActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.savePopupActionBtn);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(flowControlPage.buttons.editActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.editActionBtn);
    I.waitForVisible(flowControlPage.fields.statusNewToApprovedField, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.savePopupActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.savePopupActionBtn);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // Delete Action BW
  deleteActionBW(firstNameAction) {
    I.waitForVisible(locate('td').withText(firstNameAction).inside(flowControlPage.table.actionIDTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(firstNameAction).inside(flowControlPage.table.actionIDTable));
    I.waitForVisible(flowControlPage.buttons.removeActionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.removeActionBtn);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addNavigateToAnotherStepFCR(nameRule, descriptionRule, caseLabel, nameAttribute, operation, step, valueRuleExpression) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameRule);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionRule);
    this.addDefineRuleExpression(
      caseLabel,
      nameAttribute,
      operation,
      valueRuleExpression,
    );
    I.click(flowControlPage.selector.selectStepDropdown);
    commonActions.selectARowFromTableAfterText(step);
  },

  addIsBetweenNavigateToAnotherStepFCR(nameRule, descriptionRule, caseLabel, nameAttribute, operation, step, firstDateValue, secondDateValue) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameRule);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionRule);
    this.addDefineRuleExpressionIsBetweenDate(caseLabel, nameAttribute, operation, firstDateValue, secondDateValue);
    I.click(flowControlPage.selector.selectStepDropdown);
    commonActions.selectARowFromTableAfterText(step);
  },

  // For numeric values use this method
  addNavigateToAnotherStepFCRNumbers(nameRule, descriptionRule, caseLabel, nameAttribute, operation, step, valueRuleExpression) {
    I.waitForVisible(flowControlPage.buttons.insertNewRuleBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.insertNewRuleBtn);
    I.waitForVisible(flowControlPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.nameInputField, nameRule);
    I.fillField(flowControlPage.fields.descriptionInputField, descriptionRule);
    this.addDefineRuleExpressionNumbers(
      caseLabel,
      nameAttribute,
      operation,
      valueRuleExpression,
    );
    I.click(flowControlPage.selector.selectStepDropdown);
    commonActions.selectARowFromTableAfterText(step);
  },

  fillInvariantDateEqualFormPortal(valueRuleExpression, editFormNamePortal, thirdStep, updatedDate, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.fields.invarDate1InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.invarDate1InputField, valueRuleExpression);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Step3 is displayed
    flowControlVerify.verifyFormStepPortal(editFormNamePortal, thirdStep);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.fields.invarDate1InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.invarDate1InputField, updatedDate);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Step2 is displayed
    flowControlVerify.verifyFormStepPortal(editFormNamePortal, secondStep);
  },

  selectOperationDefineRuleExpression(operation) {
    I.waitForVisible(flowControlPage.selector.operationDefineRuleExpressionDropdown, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.operationDefineRuleExpressionDropdown);
    I.waitForVisible(locate('li').withAttr({ 'aria-label': operation }), constants.SHORT_WAIT);
    I.click(locate('li').withAttr({ 'aria-label': operation }));
  },

  // Select between 'Add Condition' or 'Add Group'
  addCaseDefineRuleExpression(caseLabel) {
    I.waitForVisible(flowControlPage.buttons.addDefineRuleExpressionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.addDefineRuleExpressionButton);
    I.waitForVisible(locate('li').withAttr({ 'aria-label': caseLabel }), constants.SHORT_WAIT);
    I.click(locate('li').withAttr({ 'aria-label': caseLabel }));
  },

  addAttributeDefineRuleExpression(attribute) {
    I.waitForVisible(flowControlPage.fields.defineRuleExpressionItemField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.defineRuleExpressionItemField);
    I.waitForVisible(locate('li').withAttr({ 'data-item-id': attribute }), constants.SHORT_WAIT);
    I.click(locate('li').withAttr({ 'data-item-id': attribute }));
  },

  addValueDefineRuleExpression(defineRuleExpressionValue) {
    I.waitForVisible(flowControlPage.fields.enterValueField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.enterValueField);
    I.fillField(flowControlPage.fields.enterAValueInputField, defineRuleExpressionValue);
    // Using wait so this method can still be used in all tests
    I.wait(1);
    I.pressKey('Enter');
  },

  addValueDefineRuleExpressionDateInBetween(firstDateValue, secondDateValue) {
    I.waitForVisible(flowControlPage.fields.enterValueField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.enterValueField);
    I.fillField(flowControlPage.fields.isBetweenDateFirstField, firstDateValue);
    I.fillField(flowControlPage.fields.isBetweenDateSecondField, secondDateValue);
  },

  addDefineRuleExpressionIsBetweenDate(caseLabel, nameAttribute, operation, firstDateValue, secondDateValue) {
    this.addCaseDefineRuleExpression(caseLabel);
    this.addAttributeDefineRuleExpression(nameAttribute);
    this.selectOperationDefineRuleExpression(operation);
    this.addValueDefineRuleExpressionDateInBetween(firstDateValue, secondDateValue);
  },

  addDefineRuleExpression(caseLabel, nameAttribute, operation, valueRuleExpression) {
    this.addCaseDefineRuleExpression(caseLabel);
    this.addAttributeDefineRuleExpression(nameAttribute);
    this.selectOperationDefineRuleExpression(operation);
    if (typeof valueRuleExpression === 'string') {
      this.addValueDefineRuleExpression(valueRuleExpression);
    }
  },

  addDefineRuleExpressionNumbers(caseLabel, nameAttribute, operation, valueRuleExpression) {
    this.addCaseDefineRuleExpression(caseLabel);
    this.addAttributeDefineRuleExpression(nameAttribute);
    this.selectOperationDefineRuleExpression(operation);
    if (typeof valueRuleExpression === 'number') {
      this.addValueDefineRuleExpression(valueRuleExpression);
    }
  },

  fillInvariantDateIsBlankFormPortal(editFormNamePortal, thirdStep, date, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Step3 is displayed
    flowControlVerify.verifyFormStepPortal(editFormNamePortal, thirdStep);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.fields.invarDate2InputField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.invarDate2InputField, date);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Step2 is displayed
    flowControlVerify.verifyFormStepPortal(editFormNamePortal, secondStep);
  },

  openRecordFromEntityViewList(record) {
    I.waitForElement(locate('td').withText(record), constants.SHORT_WAIT);
    I.waitForClickable(locate('td').withText(record), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(record));
    I.click(locate('td').withText(record));
  },

  navigateToAnotherStepRadioCheckboxChecked() {
    I.waitForVisible(flowControlPage.checkbox.navigateToAnotherStepCheckedCheckbox, constants.SHORT_WAIT);
  },

  addCloseFlowNavigateTo(navigateTo) {
    // Close Flow checkbox
    I.waitForVisible(flowControlPage.checkbox.optionCloseFlowCheckbox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.optionCloseFlowCheckbox);
    // Open list of 'navigate to' and verify the list
    I.waitForVisible(flowControlPage.buttons.navigateToDropdownListButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.navigateToDropdownListButton);
    I.waitForVisible(flowControlPage.list.navigateToListOptionList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.navigateToDashboardOptionList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.navigateToHomepageOptionList, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.list.navigateToPreviousContextOptionList, constants.SHORT_WAIT);
    // Select an option from the list
    I.click(navigateTo);
  },

  async selectEntityViewCloseFlowList(secondEntityCloseFlow) {
    I.waitForVisible(flowControlPage.labels.entityViewFlowControlLabel, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.dropdownCloseFlowEntityViewButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownCloseFlowEntityViewButton);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookupCloseFlowEntityViewContainer, secondEntityCloseFlow);
    await commonVerify.verifyValueExistsInInputReadOnly(flowControlPage.fields.closeFlowEntityField, secondEntityCloseFlow);
  },

  addCloseFlowDashboard() {
    I.waitForVisible(flowControlPage.buttons.dropdownDashboardButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownDashboardButton);
    I.waitForVisible(flowControlPage.table.rowMainDashboardTable, constants.SHORT_WAIT);
    I.click(flowControlPage.table.rowMainDashboardTable);
    I.click(flowControlPage.buttons.okPopupLookupDashboardButton);
  },

  navigateToAnotherStep(selectStep) {
    I.waitForVisible(flowControlPage.checkbox.navigateToAnotherStepCheckedCheckbox, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.defaultNextStepButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.defaultNextStepButton);
    I.waitForVisible(selectStep, constants.SHORT_WAIT);
    I.click(selectStep);
  },

  navigateToAnotherFlowDigitalJourney(formDrivenFlowSecond, textAttribute) {
    I.waitForVisible(flowControlPage.checkbox.navigateToAnotherFlowCheckbox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.navigateToAnotherFlowCheckbox);
    I.waitForVisible(flowControlPage.buttons.digitalJourneyFlowDropdownButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.digitalJourneyFlowDropdownButton);
    I.waitForVisible(locate('td').withText(formDrivenFlowSecond).inside(flowControlPage.container.digitalJourneyContainer), constants.SHORT_WAIT);
    I.click(locate('td').withText(formDrivenFlowSecond).inside(flowControlPage.container.digitalJourneyContainer));
    // Select Step1 on the list of steps
    I.waitForVisible(flowControlPage.buttons.nextSectionDropdownButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextSectionDropdownButton);
    I.waitForVisible(flowControlPage.table.rowStep1SectionTable, constants.SHORT_WAIT);
    I.click(flowControlPage.table.rowStep1SectionTable);
    I.waitForVisible(flowControlPage.buttons.attributeDropdownButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.attributeDropdownButton);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.primaryKeyAttributeContainer, textAttribute);
  },

  insertFormLookupEquals(firstRecord, nameFormPortal, thirdStep, secondRecord, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    // Fill lookup value
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E01Button);
    commonActions.selectARowFromTableAfterText(firstRecord);
    I.click(flowControlPage.buttons.okButtonLookupAT_FlowControl_lookup_att_E01);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.click(flowControlPage.buttons.previousButton);
    I.wait(2);
    // Change lookup value
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E01Button, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E01Button);
    commonActions.selectARowFromTableAfterText(secondRecord);
    I.click(flowControlPage.buttons.okButtonLookupAT_FlowControl_lookup_att_E01);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },

  insertFormLookupIsBlank(nameFormPortal, thirdStep, secondRecord, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Step3 is displayed
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.click(flowControlPage.buttons.previousButton);
    I.wait(2);
    // Fill lookup value
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E03Button, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E03Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E03Button);
    commonActions.selectARowFromTableAfterText(secondRecord);
    I.click(flowControlPage.buttons.okButtonLookupAT_FlowControl_lookup_att_E03);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Step2 is displayed
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },

  insertFormLookupIsNotBlank(firstRecord, nameFormPortal, thirdStep, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E05Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E05Button);
    commonActions.selectARowFromTableAfterText(firstRecord);
    I.click(flowControlPage.buttons.okButtonLookupAT_FlowControl_lookup_att_E05);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.click(flowControlPage.buttons.previousButton);
    I.wait(3);
    I.waitForVisible(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E05Button, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E05Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.lookupArrowDownAT_FlowControl_lookup_att_E05Button);
    commonActions.selectARowFromTableAfterText(firstRecord);
    I.click(flowControlPage.buttons.removeButtonLookupAT_FlowControl_lookup_att_E05);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },

  // Checks step3 first, then step2
  insertNewRecordSkipStep2(textPortal, textPortal2, fieldPortal) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), textPortal);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep3Label, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), textPortal2);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep2Label, constants.SHORT_WAIT);
  },

  // Checks step2 first, then step3
  insertNewRecordSkipStep2Reverse(textPortal, textPortal2, fieldPortal) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), textPortal);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep2Label, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextField.inside(fieldPortal), textPortal2);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep3Label, constants.SHORT_WAIT);
  },

  insertNewRecordSkipStep2TextArea(textPortal, textPortal2, fieldPortal) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), textPortal);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep3Label, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), textPortal2);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep2Label, constants.SHORT_WAIT);
  },

  insertNewRecordSkipStep2TextAreaReverse(textPortal, textPortal2, fieldPortal) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), textPortal);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep2Label, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.portalEntityTextArea.inside(fieldPortal), textPortal2);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.portalStep3Label, constants.SHORT_WAIT);
  },

  insertFormBoolIsTrue(nameFormPortal, secondStep, thirdStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
    I.waitForVisible(flowControlPage.buttons.previousButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForClickable(flowControlPage.checkbox.bool1CheckBox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.bool1CheckBox);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.waitForVisible(flowControlPage.buttons.previousButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForClickable(flowControlPage.checkbox.bool1CheckBox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.bool1CheckBox);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },

  insertFormBoolIsFalse(nameFormPortal, secondStep, thirdStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    // Make sure the checkbox is not ticked
    I.waitForVisible(flowControlPage.checkbox.bool2CheckBox, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.checkbox.bool2CheckBox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.bool2CheckBox);
    I.click(flowControlPage.checkbox.bool2CheckBox);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.waitForVisible(flowControlPage.buttons.previousButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.previousButton);
    I.waitForVisible(flowControlPage.checkbox.bool2CheckBox, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.checkbox.bool2CheckBox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.bool2CheckBox);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },

  insertFormOptionSetIsBlank(nameFormPortal, thirdStep, secondRecord, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.click(flowControlPage.buttons.previousButton);
    commonActions.selectValueFromDropdown(flowControlPage.selector.opSet1Dropdown, secondRecord);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },

  insertFormOptionSetIsNotBlank(firstRecord, nameFormPortal, thirdStep, noneOption, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
    I.click(flowControlPage.buttons.previousButton);
    commonActions.selectValueFromDropdown(flowControlPage.selector.opSet2Dropdown, firstRecord);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
  },

  insertFormOptionSetEquals(firstRecord, nameFormPortal, thirdStep, secondRecord, secondStep) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    commonActions.selectValueFromDropdown(flowControlPage.selector.opSet3Dropdown, firstRecord);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      thirdStep,
    );
    I.click(flowControlPage.buttons.previousButton);
    commonActions.selectValueFromDropdown(flowControlPage.selector.opSet3Dropdown, secondRecord);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    flowControlVerify.verifyFormStepPortal(
      nameFormPortal,
      secondStep,
    );
  },
};
