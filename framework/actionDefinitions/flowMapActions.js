// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const flowMapPage = require('~pages/flowMapPage');

const I = actor();

module.exports = {
  selectFormDrivenFlowTab(tabName) {
    I.waitForVisible(locate('span').withText(tabName).inside(flowMapPage.selector.tabList), constants.SHORT_WAIT);
    I.click(locate('span').withText(tabName).inside(flowMapPage.selector.tabList));
  },

  addNewStep(name, displayName) {
    I.waitForVisible(flowMapPage.buttons.addStepbutton, constants.SHORT_WAIT);
    I.click(flowMapPage.buttons.addStepbutton);
    I.waitForVisible(flowMapPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowMapPage.fields.nameInputField, name);
    I.fillField(flowMapPage.fields.displayNameInputField, displayName);
  },

  addThirdStepFlowMap(flowMapTab, step3, step1, step2) {
    this.selectFormDrivenFlowTab(flowMapTab);
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    this.addNewStep(step3, step3);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
  },

  addCustomFCRFlowMap(flowControlTab, nameFCR, valueDRE, step1) {
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.click(flowMapPage.buttons.detailsButtons);
    this.selectFormDrivenFlowTab(flowControlTab);
    I.waitForVisible(flowMapPage.buttons.insertFlowControlRuleButton, constants.SHORT_WAIT);
    I.click(flowMapPage.buttons.insertFlowControlRuleButton);
    I.waitForVisible(flowMapPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowMapPage.fields.nameInputField, nameFCR);
    I.waitForClickable(flowMapPage.buttons.addNewRuleExpressionButton, constants.SHORT_WAIT);
    I.click(flowMapPage.buttons.addNewRuleExpressionButton);
    I.click(flowMapPage.selector.addConditionDRE);
    I.click(flowMapPage.buttons.enterAValueButton);
    I.fillField(flowMapPage.fields.addValueDREInputField, valueDRE);
    I.click(flowMapPage.checkboxes.cancelNavigationCheckbox);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${nameFCR}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${nameFCR}']]`);
    I.saveScreenshot('InsertFlowMap.png');
    I.seeVisualDiff('InsertFlowMap.png', { tolerance: 6, prepareBaseImage: false });
  },

  async editFirstStepMockup(firstStepDisplayName, secondStepDisplayName, firstStepName, updatedFirstStepName, updatedFirstStepDisplayName) {
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepDisplayName}']]`);
    I.saveScreenshot('BeforeEditFirstStepMockup.png');
    I.seeVisualDiff('BeforeEditFirstStepMockup.png', { tolerance: 6, prepareBaseImage: false });
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.click(flowMapPage.buttons.detailsButtons);
    I.waitForVisible(flowMapPage.fields.nameInputField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(flowMapPage.fields.nameInputField, firstStepName);
    await commonVerify.verifyValueExistsInInput(flowMapPage.fields.displayNameInputField, firstStepDisplayName);
    I.fillField(flowMapPage.fields.nameInputField, updatedFirstStepName);
    I.fillField(flowMapPage.fields.displayNameInputField, updatedFirstStepDisplayName);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.seeElementInDOM('//*[local-name()=\'text\'][*[local-name()=\'tspan\' and text()=\'Step1_M_01_label_\']]');
    I.seeElementInDOM('//*[local-name()=\'text\'][*[local-name()=\'tspan\' and text()=\'EDIT\']]');
    I.saveScreenshot('AfterEditFirstStepMockup.png');
    I.seeVisualDiff('AfterEditFirstStepMockup.png', { tolerance: 6, prepareBaseImage: false });
  },

  addNewStepMockup(firstStepDisplayName, secondStepDisplayName, newStepName, newStepDisplayName) {
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepDisplayName}']]`);
    I.saveScreenshot('BeforeNewStepMockup.png');
    I.seeVisualDiff('BeforeNewStepMockup.png', { tolerance: 6, prepareBaseImage: false });
    this.addNewStep(newStepName, newStepDisplayName);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${newStepDisplayName}']]`);
    I.saveScreenshot('AfterNewStepMockup.png');
    I.seeVisualDiff('AfterNewStepMockup.png', { tolerance: 6, prepareBaseImage: false });
  },

  deleteStepMockup(firstStepDisplayName, secondStepDisplayName) {
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepDisplayName}']]`);
    I.saveScreenshot('DeleteStepMockup.png');
    I.seeVisualDiff('DeleteStepMockup.png', { tolerance: 6, prepareBaseImage: false });
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.click(flowMapPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForInvisible(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`, constants.SHORT_WAIT);
    I.dontSeeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
  },

  updateStepNameFlowMap(step1, step2, step3, updatedStep1, firstFCR) {
    // Verify diagram before change
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFCR}']]`);
    I.doubleClick(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.waitForVisible(flowMapPage.fields.displayNameInputField, constants.SHORT_WAIT);
    I.fillField(flowMapPage.fields.displayNameInputField, updatedStep1);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Verify diagram after change
    I.seeElementInDOM(locate('//*[local-name()=\'text\'][*[local-name()=\'tspan\' and contains(text(),\'New\')]]').first());
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFCR}']]`);
    I.saveScreenshot('UpdateStepNameFM.png');
    I.seeVisualDiff('UpdateStepNameFM.png', { tolerance: 6, prepareBaseImage: false });
  },

  updateFCRNameFlowMap(firstFCR, updatedFCR, homePage, step2, step3, newFCR) {
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFCR}']]`);
    I.click(flowMapPage.buttons.detailsButtons);
    I.waitForVisible(flowMapPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(flowMapPage.fields.nameInputField, updatedFCR);
    I.click(flowMapPage.checkboxes.closeFlowCheckbox);
    I.click(flowMapPage.fields.navigateToField);
    I.waitForVisible(locate('p').withText(homePage).inside(locate('div').withAttr({ class: 'dx-scrollable-content' })), constants.SHORT_WAIT);
    I.click(locate('p').withText(homePage).inside(locate('div').withAttr({ class: 'dx-scrollable-content' })));
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Verify diagram after change
    I.seeElementInDOM(locate('//*[local-name()=\'text\'][*[local-name()=\'tspan\' and contains(text(),\'New\')]]').first());
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${updatedFCR}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${newFCR}']]`);
    I.saveScreenshot('UpdateFCRFM.png');
    I.seeVisualDiff('UpdateFCRFM.png', { tolerance: 6, prepareBaseImage: false });
  },

  async deleteFCRFlowMap(step1, step2, step3, step4, firstFlowControl, secondFlowControl, tabFlowControl) {
    // Verify diagram before change
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step4}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFlowControl}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondFlowControl}']]`);
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFlowControl}']]`);
    I.click(flowMapPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // Verify if flow control rule is deleted
    I.waitForInvisible(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFlowControl}']]`, constants.SHORT_WAIT);
    I.dontSeeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstFlowControl}']]`);
    // Verify diagram again
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step4}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondFlowControl}']]`);
    I.doubleClick(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    this.selectFormDrivenFlowTab(tabFlowControl);
    await commonActions.selectCheckboxOfaRow(secondFlowControl);
    I.click(flowMapPage.buttons.deleteFlowControlRuleButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Verify if flow control rule is deleted
    I.dontSeeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondFlowControl}']]`);
    // Verify diagram again
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step4}']]`);
    I.saveScreenshot('DeleteFCRFlowMap.png');
    I.seeVisualDiff('DeleteFCRFlowMap.png', { tolerance: 6, prepareBaseImage: false });
  },

  async deleteStepsFlowMap(step1, step2, step3, step4, tabSteps, tabFlowMap) {
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    I.click(flowMapPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // Verify step is deleted
    I.dontSeeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step3}']]`);
    // Verify diagram
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step4}']]`);
    this.selectFormDrivenFlowTab(tabSteps);
    await commonActions.selectCheckboxOfaRow(step4);
    I.click(flowMapPage.buttons.deleteStepsButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    this.selectFormDrivenFlowTab(tabFlowMap);
    // Verify step is deleted
    I.dontSeeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step4}']]`);
    // Verify diagram again
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step1}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${step2}']]`);
    I.saveScreenshot('DeleteStepsFlowMap.png');
    I.seeVisualDiff('DeleteStepsFlowMap.png', { tolerance: 6, prepareBaseImage: false });
  },
};
