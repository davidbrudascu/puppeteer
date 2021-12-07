// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/userJourney/userJourneyData');
const editHeaderData = require('~data/userJourney/userJourneyEditHeader');
const headerLookupData = require('~data/userJourney/userJourneyHeaderLookup');
// Pages
const ujPage = require('~pages/userJourneyPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  ujFillInNewCustomUjLink() {
    I.waitForElement(ujPage.fields.ujInput1, constants.SHORT_WAIT);
    // Fill in "Name" text with "AT_EntForCustomUJ_CUJ"
    I.fillField(ujPage.fields.ujInput1, data.ujAttribData1);
    // Fill in "Display Name" text with "Auto Custom UJ Link"
    I.fillField(ujPage.fields.ujInput2, data.ujAttribData2);
    // Fill in "External link" text with "Main#/entity/AT_EntForCustomUJ/list"
    I.fillField(ujPage.fields.ujInput3, data.ujAttribData3);
  },

  ujFillInNewMenuItemLink() {
    I.waitForElement(ujPage.fields.ujInput4, constants.SHORT_WAIT);
    // Fill in "Type" optionset with "Custom Journey"
    I.click(ujPage.fields.ujInput4);
    I.fillField(ujPage.fields.ujInput4, data.ujAttribData4);
    I.click(locate('p').withAttr(ujPage.selector.ujOptionSet1));
    // Fill in "CJ" lookouptable with "AT_EntForCustomUJ_CUJ"
    I.click(ujPage.fields.ujInput5);
    I.fillField(locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '1' })), data.ujAttribData1);
    I.waitForElement(locate('td').withText(data.ujAttribData1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.click(locate('td').withText(data.ujAttribData1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    // Fill in "Display Name" text with "AT CUJ Link"
    I.fillField(ujPage.fields.ujInput6, data.ujAttribData5);
  },

  portalUjFillInNewValue() {
    I.waitForElement(ujPage.fields.portalUjInputName, constants.SHORT_WAIT);
    // Fill in "Name" text with "AT Custom UJ Link Test"
    I.fillField(ujPage.fields.portalUjInputName, data.ujEntityLinkName);
  },

  ujFillInNewCustomUjHtml() {
    I.waitForElement(ujPage.fields.ujInput1, constants.LONG_WAIT);
    // Fill in "Name" text with "AT_CustomUJ_HTML"
    I.fillField(ujPage.fields.ujInput1, data.ujAttribData6);
    // Fill in "Display Name" text with "Auto Custom UJ HTML"
    I.fillField(ujPage.fields.ujInput2, data.ujAttribData7);
  },

  ujFillInNewMenuItemHtml() {
    I.waitForElement(ujPage.fields.ujInput4, constants.SHORT_WAIT);
    // Fill in "Type" optionset with "Custom Journey"
    I.click(ujPage.fields.ujInput4);
    I.fillField(ujPage.fields.ujInput4, data.ujAttribData4);
    I.click(locate('p').withAttr(ujPage.selector.ujOptionSet1));
    // Fill in "CJ" lookouptable with "AT_CustomUJ_HTML"
    I.click(ujPage.fields.ujInput5);
    I.fillField(locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '1' })), data.ujAttribData6);
    I.waitForElement(locate('td').withText(data.ujAttribData6).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.click(locate('td').withText(data.ujAttribData6).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    // Fill in "Display Name" text with "AT CUJ Html"
    I.fillField(ujPage.fields.ujInput6, data.ujAttribData7);
  },

  searchAndVerifyForAUserJourneyTable(searchForUserJourneyField,
    tableRowValueFromUserJourney, valueForSearchName) {
    I.waitForVisible(searchForUserJourneyField, constants.SHORT_WAIT);
    I.fillField(searchForUserJourneyField, valueForSearchName);
    // FIXME
    I.wait(3);
    I.waitForVisible(tableRowValueFromUserJourney, constants.SHORT_WAIT);
    I.see(valueForSearchName, tableRowValueFromUserJourney);
  },

  deleteSelectionYesAndNoError(valueForSearchName, noData) {
    I.click(ujPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.fillField(ujPage.fields.searchForUserJourneyField, valueForSearchName);
    // FIXME
    I.wait(3);
    I.waitForVisible(ujPage.fields.resultForNoData, constants.SHORT_WAIT);
    I.see(noData, ujPage.fields.resultForNoData);
  },

  deleteSelectionYesAndErrorMessage(defaultFormError) {
    I.click(commonPage.checkbox.selectSingleResultCheckbox);
    I.click(ujPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        defaultFormError);
  },

  goToBasicFormAndSelectIsDefault(entityForm_AT_UJDelete) {
    commonActions.accessDirectUrl(entityForm_AT_UJDelete);
    I.waitForVisible(locate('div').withText('Auto Generate Template Type'), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefault'})), constants.SHORT_WAIT);
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefault'})));
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  selectBusinessEntityExtensions(valueForSearchName) {
    I.waitForVisible(ujPage.buttons.entityExtentionArrowDown, constants.SHORT_WAIT);
    I.waitForClickable(ujPage.buttons.entityExtentionArrowDown, constants.SHORT_WAIT);
    I.click(ujPage.buttons.entityExtentionArrowDown);
    I.waitForVisible(ujPage.fields.searchForBusinessEntityExtentionField, constants.SHORT_WAIT);
    I.fillField(ujPage.fields.searchForBusinessEntityExtentionField, valueForSearchName);
    // FIXME
    I.wait(5);
    I.click(ujPage.fields.selectFirstRecordFromTableEntityExtentionPopup);
    I.click(ujPage.buttons.okUserJourneyButton);
  },

  createNewUserJourney(newUserJourneyName, entityExtentionName) {
    I.waitForVisible(ujPage.buttons.createButton, constants.SHORT_WAIT);
    I.click(ujPage.buttons.createButton);
    I.waitForVisible(ujPage.fields.nameInputUserJourneyField, constants.LONG_WAIT);
    I.fillField(ujPage.fields.nameInputUserJourneyField, newUserJourneyName);
    I.click(ujPage.fields.dataModelUserJourneyTab);
    this.selectBusinessEntityExtensions(entityExtentionName);
    commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  reorderTableItems() {
    // 14. Change headers order (Value, DoB and Code)
    const ujValue = locate('td').withText(editHeaderData.ujFormTableItemValue).inside(locate('tr').withAttr({ role: 'row' }));
    const ujCode = locate('td').withText(editHeaderData.ujEntityUpdatedCode).inside(locate('tr').withAttr({ role: 'row' }));
    const ujName = locate('td').withText(editHeaderData.ujEntityUpdatedName).inside(locate('tr').withAttr({ role: 'row' }));
    I.waitForVisible(ujName, constants.SHORT_WAIT);
    I.dragAndDrop(ujValue, ujCode);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.dragAndDrop(ujName, ujCode);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  fillInMandatoryLookupHeader() {
    // FIXME Codecept bug...
    I.wait(2);
    I.switchToNextTab();
    // 8. Fill in all mandatory field
    commonActions.fillInTextValueInInput(ujPage.fields.portalUjInputName,
      headerLookupData.ujHeaderLookupTableName);
    // 9. Click Save and Close
    // 10. Click Ok
    // FIXME https://github.com/Codeception/CodeceptJS/issues/2153
    // Session lost after saving because of window.close
    // commonActions.saveAndCloseAction();
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.closeCurrentTab();
    I.waitForVisible(locate('td').withText(headerLookupData.ujHeaderLookupTableName).inside(locate('tr').withAttr({ role: 'row' })), constants.SHORT_WAIT)
    I.click(locate('td').withText(headerLookupData.ujHeaderLookupTableName).inside(locate('tr').withAttr({ role: 'row' })));
    commonActions.clickToolbarButton(headerLookupData.ujOkButton);
  },

  async deleteCustomUJ(name) {
    // 3 Select Custom UJ
    I.waitForVisible(ujPage.fields.searchFieldUserJourney, constants.SHORT_WAIT);
    I.fillField(ujPage.fields.searchFieldUserJourney, name);
    await commonActions.selectCheckboxOfaRow(name);
    // 4 Click on "Delete" button
    I.click(ujPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // 5 Your Custom UJ is deleted
    commonVerify.verifyEmptyTableData();
  },

  async accessCustomUJEditDlt(customUJ, updateDisplayName, updateCode) {
    // 6 Access "AT_CustomUJ_TBU"
    I.waitForVisible(ujPage.fields.searchFieldUserJourney, constants.SHORT_WAIT);
    I.fillField(ujPage.fields.searchFieldUserJourney, customUJ);
    commonActions.doubleClickValueFromTable(ujPage.selector.ujCustomUjTable, customUJ);
    // 7 Update the Display name
    I.waitForVisible(ujPage.fields.displayNameInputUserJourneyField, constants.SHORT_WAIT);
    I.fillField(ujPage.fields.displayNameInputUserJourneyField, updateDisplayName);
    // 8 Go to "Code" tab
    I.click(ujPage.tabs.secondSectionParagraph);
    // 9 Update the HTML code
    I.wait(5);
    I.waitForVisible(ujPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(ujPage.buttons.checkoutButton);
    commonActions.fillInCustomTinyMceEditor(ujPage.selector.codeTemplateLoc, ujPage.selector.ujCodeTemplateTinyMceId, updateCode);
    //await this.editHTMLCode(updateCode);
    // 10 Save and Close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async editHTMLCode(input) {
    I.waitForElement(ujPage.selector.ujCodeTemplateLoc, constants.SHORT_WAIT);
    await within({ frame: ujPage.selector.ujHtmlCodeIFrame }, () => {
      I.waitForElement(ujPage.selector.ujHtmlBody, constants.SHORT_WAIT);
      I.click(ujPage.selector.ujHtmlBody);
      I.pressKey(['CTRL', 'A']);
      I.pressKey('Delete');
      I.fillField(ujPage.selector.ujHtmlBody, input);
    });
  },

  addNewFDFDJ(firstStepFirstFDF, secondStepFirstFDF, firstStepSecondFDF, secondStepSecondFDF, newFDFName, newFDF, firstStepThirdFDF, secondStepThirdFDF, l) {
    I.waitForVisible(ujPage.tabs.digitalJourneyMap, constants.SHORT_WAIT);
    I.click(ujPage.tabs.digitalJourneyMap);
    // Verify diagram is the steps appear
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepFirstFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepSecondFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepSecondFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.saveScreenshot('BeforeAddStepDJ.png');
    I.seeVisualDiff('BeforeAddStepDJ.png', { tolerance: 6, prepareBaseImage: false });
    I.click(ujPage.buttons.addFlowDJ);
    I.waitForVisible(ujPage.fields.ujInput1, constants.SHORT_WAIT);
    I.fillField(ujPage.fields.ujInput1, newFDFName);
    I.click(ujPage.fields.selectFDFField);
    I.waitForVisible(ujPage.fields.searchFDFNameFlowDJ, constants.SHORT_WAIT);
    // Insert FDF name in name search field
    I.fillField(ujPage.fields.searchFDFNameFlowDJ, newFDF);
    commonActions.selectARowFromTableAfterText(newFDF);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Verify new FDF steps appear in diagram
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepThirdFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepThirdFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.saveScreenshot('AfterAddStepDJ.png');
    I.seeVisualDiff('AfterAddStepDJ.png', { tolerance: 6, prepareBaseImage: false });
  },

  editStepDJ(nameFirstStepEdit, nameFirstStepLabelEdit, firstStepDiagram, edit, secondPicture) {
    I.fillField(ujPage.fields.nameInputUserJourneyField, nameFirstStepEdit);
    I.fillField(ujPage.fields.displayNameInputUserJourneyField, nameFirstStepLabelEdit);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Verify edit in diagram
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDiagram}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${edit}']]`);
    I.saveScreenshot(secondPicture);
    I.seeVisualDiff(secondPicture, { tolerance: 6, prepareBaseImage: false });
  },

  deleteStepDJ(firstStepFirstFDF, secondStepFirstFDF, firstStepSecondFDF, secondStepSecondFDF, l) {
    I.waitForVisible(ujPage.tabs.digitalJourneyMap, constants.SHORT_WAIT);
    I.click(ujPage.tabs.digitalJourneyMap);
    // Verify Diagram
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepFirstFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepSecondFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepSecondFDF}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.saveScreenshot('BeforeDeleteStepDJ.png');
    I.seeVisualDiff('BeforeDeleteStepDJ.png', { tolerance: 6, prepareBaseImage: false });
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`);
    I.click(ujPage.buttons.deleteDJButon);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // Verify the step was deleted
    I.waitForInvisible(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`, constants.SHORT_WAIT);
    I.dontSeeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepFirstFDF}']]`);
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepSecondFDF}']]`, constants.SHORT_WAIT);
    I.saveScreenshot('AfterDeleteStepDJ.png');
    I.seeVisualDiff('AfterDeleteStepDJ.png', { tolerance: 6, prepareBaseImage: false });
  },

  goToWizardOptionsTab() {
    I.waitForVisible(ujPage.tabs.wizardOptionsTab, constants.SHORT_WAIT);
    I.waitForClickable(ujPage.tabs.wizardOptionsTab, constants.SHORT_WAIT);
    I.click(ujPage.tabs.wizardOptionsTab);
  },

  tickCheckbox(selector, state) {
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.click(selector);
    I.waitForVisible(locate(selector).withAttr({ 'aria-checked': state }), constants.SHORT_WAIT);
  },
};
