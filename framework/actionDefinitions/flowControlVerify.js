// Constants
const constants = require('~config/constants');
// Pages
const flowControlPage = require('~pages/flowControlPage');
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  verifyFormStepPortal(formName, step) {
    I.waitForVisible(locate('span').withText(formName), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(step), constants.SHORT_WAIT);
  },

  verifyFlowControlPKInPortal(clickToInsert, nameRecordTest1, addFormTitleBCIsFulfilledPk, flowControlStep1, nextButton, editFormTitleBCIsFulfilledPk, flowControlStep3) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlNamePortalField, nameRecordTest1);
    I.waitForVisible(locate('span').withText(addFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep3).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
  },

  verifyFlowControlLKInPortal(clickToInsert, nameRecordTestB, addFormTitleBCIsFulfilledLk_01, flowControlStep1, nameRecordTestA, nextButton, editFormTitleBCIsFulfilledLk_01, flowControlStep3) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlNamePortalField, nameRecordTestB);
    I.waitForVisible(locate('span').withText(addFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.addLookupAttributeButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.addLookupAttributeButton);
    I.waitForVisible(locate('td').withText(nameRecordTestA).inside(flowControlPage.table.lookupPopupGridTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(nameRecordTestA).inside(flowControlPage.table.lookupPopupGridTable));
    I.waitForVisible(flowControlPage.buttons.okPopupButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupButton);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.flowControlNamePortalField);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(flowControlPage.buttons.previousButton, constants.SHORT_WAIT);
    // Verify Form title
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep3).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    // Verify Form title
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
  },

  verifyFlowControlPKUpdateInPortal(clickToInsert, nameRecordTest1, addFormTitleBCIsFulfilledPk, flowControlStep1, nextButton, flowControlStep2, editFormTitleBCIsFulfilledPk, flowControlStep3) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlNamePortalField, nameRecordTest1);
    I.waitForVisible(locate('span').withText(addFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep3).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledPk).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
  },

  verifyFlowControlLKUpdateInPortal(clickToInsert, nameRecordTestB, addFormTitleBCIsFulfilledLk_01, flowControlStep1, nameRecordTestA, nextButton, editFormTitleBCIsFulfilledLk_01, flowControlStep3, flowControlStep2) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlNamePortalField, nameRecordTestB);
    I.waitForVisible(locate('span').withText(addFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.addLookupAttributeButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.addLookupAttributeButton);
    I.waitForVisible(locate('td').withText(nameRecordTestA).inside(flowControlPage.table.lookupPopupGridTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(nameRecordTestA).inside(flowControlPage.table.lookupPopupGridTable));
    I.waitForVisible(flowControlPage.buttons.okPopupButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupButton);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.click(flowControlPage.fields.flowControlNamePortalField);
    commonActions.portalClickCustomButton(nextButton);
    // Verify Form title
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(flowControlPage.buttons.previousButton, constants.SHORT_WAIT);
    // Verify that Form title is: EDIT AT_FControlBCIsFulfilledLk01_FDF - STEP3
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep3).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    // Verify Form title
    I.waitForVisible(locate('span').withText(editFormTitleBCIsFulfilledLk_01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
  },

  verifyActionsForBW(clickToInsert, flowControlStep1, flowControlStep2, nextButton, statusNew, statusInProgress, statusApproved) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    commonActions.portalClickCustomButton(nextButton);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.labels.currentStatusApprovedLabel, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.labels.nextStatusClosedLabel, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.businessTransactionButton, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.businessTransactionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.businessTransactionButton);
    I.waitForVisible(locate('td').withText(statusNew).inside(flowControlPage.table.secondRowTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(statusInProgress).inside(flowControlPage.table.secondRowTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(statusInProgress).inside(flowControlPage.table.firstRowTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(statusApproved).inside(flowControlPage.table.firstRowTable), constants.SHORT_WAIT);
  },

  verifyActionsForReport(clickToInsert, flowControlStep1, flowControlStep2, reportDisplayNameField, reportGenerated) {
    commonActions.clickSidebarButton(clickToInsert);
    // Press Next
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.click(commonPage.buttons.nextButton);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    // The report is generated
    I.waitForClickable(flowControlPage.buttons.actionBtn, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.actionBtn);
    I.waitForVisible(locate('span').withText(reportDisplayNameField).inside(flowControlPage.labels.reportLink), constants.SHORT_WAIT);
    I.click(locate('span').withText(reportDisplayNameField).inside(flowControlPage.labels.reportLink));
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH, reportGenerated);
  },

  verifyActionsForEndpoint(clickToInsert, flowControlStep1, infoMessageScript) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.click(commonPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY, infoMessageScript);
  },

  verifyEditActionsBW(clickToInsert, flowControlStep1, flowControlStep2, statusNew, statusApproved) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.click(commonPage.buttons.nextButton);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.labels.currentStatusApprovedLabel, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.labels.nextStatusClosedLabel, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.businessTransactionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.businessTransactionButton);
    I.waitForVisible(locate('td').withText(statusNew).inside(flowControlPage.table.firstRowTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(statusApproved).inside(flowControlPage.table.firstRowTable), constants.SHORT_WAIT);
  },

  verifyNoDataInActionsPerformedStep1() {
    I.waitForVisible(flowControlPage.selector.actionsToBePerformedDD, constants.SHORT_WAIT);
    I.click(flowControlPage.selector.actionsToBePerformedDD);
    I.waitForVisible(flowControlPage.fields.actionsToBePerformedField, constants.SHORT_WAIT);
  },

  verifyDeleteActionsBW(clickToInsert, flowControlStep1, flowControlStep2, status) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(locate('span').withText(flowControlStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.click(commonPage.buttons.nextButton);
    I.waitForVisible(locate('span').withText(flowControlStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.labels.currentStatusNewLabel, constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.businessTransactionButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.businessTransactionButton);
    I.waitForVisible(locate('td').withText(status).inside(flowControlPage.table.firstRowTable), constants.SHORT_WAIT);
    I.waitForInvisible(flowControlPage.table.secondRowTable, constants.SHORT_WAIT);
  },

  async verifyFlowControl3EntityLoopInPortal(firstRecord, secondRecord, thirdRecord, editViewEntityLoopE01, editViewEntityLoopE02, editViewEntityLoopE03) {
    I.waitForVisible(locate('span').withText(editViewEntityLoopE01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.dropdownLookup_E01ToE02Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownLookup_E01ToE02Button);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookup_E01ToE02Container, secondRecord);
    I.waitForVisible(flowControlPage.buttons.okPopupLookup_E01ToE02Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupLookup_E01ToE02Button);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewEntityLoopE02).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.dropdownLookup_E02ToE03Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownLookup_E02ToE03Button);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookup_E02ToE03Container, thirdRecord);
    I.waitForVisible(flowControlPage.buttons.okPopupLookup_E02ToE03Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupLookup_E02ToE03Button);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewEntityLoopE03).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.dropdownLookup_E03ToE01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownLookup_E03ToE01Button);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookup_E03ToE01Container, firstRecord);
    I.waitForVisible(flowControlPage.buttons.okPopupLookup_E03ToE01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupLookup_E03ToE01Button);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewEntityLoopE01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(flowControlPage.fields.inputNameField, firstRecord);
    await commonVerify.verifyValueExistsInInput(flowControlPage.fields.lookupE01_InputField, secondRecord);
  },

  verifyRedirectStep2FirstEntity(editViewEntityNotUsedE01, secondRecord, Step2) {
    I.waitForVisible(locate('span').withText(editViewEntityNotUsedE01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.dropdownLookup_E01ToE02Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownLookup_E01ToE02Button);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookup_E01ToE02Container, secondRecord);
    I.waitForVisible(flowControlPage.buttons.okPopupLookup_E01ToE02Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupLookup_E01ToE02Button);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewEntityNotUsedE01).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(Step2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyRedirectStep2SecondEntity(editViewEntityNotUsedE02, firstRecord, Step2) {
    I.waitForVisible(locate('span').withText(editViewEntityNotUsedE02).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.buttons.dropdownLookup_E02ToE01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownLookup_E02ToE01Button);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookup_E02ToE01Container, firstRecord);
    I.waitForVisible(flowControlPage.buttons.okPopupLookup_E02ToE01Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupLookup_E02ToE01Button);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewEntityNotUsedE02).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(Step2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyIfRecordAddedToEntity(viewPortalEntityCloseFlowE01, firstRecord) {
    I.waitForVisible(locate('h5').withText(viewPortalEntityCloseFlowE01), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(firstRecord), constants.SHORT_WAIT);
  },

  verifyFormRedirectToAnotherStep(clickToInsert, firstRecord, nextStep) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlNamePortalField, firstRecord);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    I.waitForVisible(nextStep, constants.SHORT_WAIT);
  },

  verifyNavigateToAnotherStepAction(clickToInsert, firstRecord, editViewEntityStep3, editViewEntityStep2) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.fields.flowControlNamePortalField, constants.SHORT_WAIT);
    I.fillField(flowControlPage.fields.flowControlNamePortalField, firstRecord);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewEntityStep3).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.checkbox.boolAttributeCheckbox, constants.SHORT_WAIT);
    I.click(flowControlPage.checkbox.boolAttributeCheckbox);
    I.waitForClickable(flowControlPage.buttons.recordFinishButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.recordFinishButton);
    I.waitForVisible(locate('span').withText(editViewEntityStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(flowControlPage.labels.currentStatusInProgressLabel, constants.SHORT_WAIT);
  },

  verifyNavigateToAnotherFlowAction(secondRecord, editViewNavToAnotherFlow, editViewEntityStep1, editViewEntityStep2) {
    I.waitForVisible(flowControlPage.buttons.dropdownLookup_E01ToE02Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.dropdownLookup_E01ToE02Button);
    commonActions.fillInDropdownLookupTableWithValue(flowControlPage.container.lookup_E01ToE02Container, secondRecord);
    I.waitForVisible(flowControlPage.buttons.okPopupLookup_E01ToE02Button, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.okPopupLookup_E01ToE02Button);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editViewNavToAnotherFlow).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(editViewEntityStep1).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForClickable(flowControlPage.buttons.nextButton, constants.SHORT_WAIT);
    I.click(flowControlPage.buttons.nextButton);
    I.waitForVisible(locate('span').withText(editViewNavToAnotherFlow).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(editViewEntityStep2).inside(flowControlPage.labels.modelTypeLabel), constants.SHORT_WAIT);
    I.waitForVisible(flowControlPage.labels.currentStatusInProgressLabel, constants.SHORT_WAIT);
  },
};
