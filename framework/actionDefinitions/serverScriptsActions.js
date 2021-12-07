const url = require('url');
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Page
const serverSideScriptsPage = require('~pages/serverScriptsPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  createSSandIP(scriptName, onDemandScriptType, noCode, nameInputParameter, codeUpdated, enterKey) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(serverSideScriptsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameField, scriptName);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowScriptType, onDemandScriptType);
    I.waitForElement(serverSideScriptsPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.selector.firstLineCodeMonacoEditor);
    I.fillField(serverSideScriptsPage.selector.firstLineCodeMonacoEditor, noCode);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(serverSideScriptsPage.tabs.inputParametersTab);
    I.waitForVisible(serverSideScriptsPage.buttons.insertWorkflowInputParam, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.buttons.insertWorkflowInputParam);
    I.waitForVisible(serverSideScriptsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameField, nameInputParameter);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(serverSideScriptsPage.tabs.generalTab);
    I.waitForVisible(serverSideScriptsPage.buttons.checkoutCodeButton, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.buttons.checkoutCodeButton);
    I.waitForElement(serverSideScriptsPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.selector.firstLineCodeMonacoEditor);
    I.pressKey(enterKey);
    I.fillField(serverSideScriptsPage.selector.firstLineCodeMonacoEditor, codeUpdated);
    I.see(nameInputParameter, serverSideScriptsPage.fields.widgetSuggestion);
    I.click(serverSideScriptsPage.tabs.inputParametersTab);
  },

  async editAndVerifyIP(nameInputParameter, niceDescription, stringDataType) {
    commonActions.doubleClickValueFromTable(serverSideScriptsPage.tables.workflowInputTable, nameInputParameter)
    I.waitForClickable(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForVisible(serverSideScriptsPage.fields.descriptionField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.descriptionField, niceDescription);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowDataType, stringDataType);
    I.click(serverSideScriptsPage.checkboxes.allowNullOrEmptyValueCheckbox);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.descriptionField, niceDescription);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.dataTypeInputField, stringDataType);
    I.waitForVisible(locate(serverSideScriptsPage.checkboxes.allowNullOrEmptyValueCheckbox).withAttr({ 'aria-checked': 'true' }), constants.SHORT_WAIT);
    // Save and close 2 times to get to the server scripts list
    for (let i = 0; i < 2; i++) {
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    }
  },

  searchAndDeleteSS(scriptName) {
    I.waitForVisible(serverSideScriptsPage.fields.searchByNameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.searchByNameField, scriptName);
    commonActions.selectARowFromTableAfterText(scriptName);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  },

  async createScriptAndOS(scriptName, onDemandScriptType, noCode, entityOutputStructureType, singleOutputParam, transientOutputScript) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(serverSideScriptsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameField, scriptName);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowScriptType, onDemandScriptType);
    I.waitForElement(serverSideScriptsPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.selector.firstLineCodeMonacoEditor);
    I.fillField(serverSideScriptsPage.selector.firstLineCodeMonacoEditor, noCode);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(serverSideScriptsPage.tabs.outputStructureTab);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowOutputStructureType, entityOutputStructureType);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowOutputParamType, singleOutputParam);
    I.click(serverSideScriptsPage.buttons.dropdownArrowOutputStructureEntity);
    I.waitForVisible(serverSideScriptsPage.fields.nameSearchFieldOutputStructEntity, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameSearchFieldOutputStructEntity, transientOutputScript);
    commonActions.selectARowFromTableAfterText(transientOutputScript);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.outputStructureTypeInputField, entityOutputStructureType);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.outputParameterTypeInputField, singleOutputParam);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.outputStructureEntityInputField, transientOutputScript);
  },

  async editOutputStructure(collectionOutputParameter, customStructureType, noCodeValue, comparingCodeValue) {
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowOutputParamType, collectionOutputParameter);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.outputParameterTypeInputField, collectionOutputParameter);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowOutputStructureType, customStructureType);
    I.waitForVisible(serverSideScriptsPage.selector.firstLineOutputStructureEditor, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.selector.firstLineOutputStructureEditor);
    I.fillField(serverSideScriptsPage.selector.firstLineOutputStructureEditor, noCodeValue);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.outputStructureTypeInputField, customStructureType);
    await commonVerify.verifyValueExistsInInput(serverSideScriptsPage.fields.outputParameterTypeInputField, collectionOutputParameter);
    // Using this method because .verifyValueExistsInInput doesn't work
    await commonVerify.verifyValueExistsInLabel(serverSideScriptsPage.selector.firstLineOutputStructureEditor, comparingCodeValue);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deleteScript(scriptName) {
    I.waitForVisible(serverSideScriptsPage.fields.searchByNameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.searchByNameField, scriptName);
    commonActions.selectARowFromTableAfterText(scriptName);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  },

  addEventTriggerScript(scriptName, eventPopUp, stagePopUp, entityPopUp, codeScriptWorks) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(serverSideScriptsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameField, scriptName);
    I.click(serverSideScriptsPage.buttons.dropdownEvent);
    commonActions.selectARowFromTableAfterText(eventPopUp);
    I.click(serverSideScriptsPage.buttons.okButtonEvent);
    I.waitForClickable(serverSideScriptsPage.buttons.dropdownStage, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.buttons.dropdownStage);
    this.selectValueFromTable(stagePopUp);
    I.click(serverSideScriptsPage.buttons.okButtonStage);
    I.waitForClickable(serverSideScriptsPage.buttons.dropdownEntity, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.buttons.dropdownEntity);
    I.waitForVisible(serverSideScriptsPage.fields.nameFieldEntitySearch, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameFieldEntitySearch, entityPopUp);
    commonActions.selectARowFromTableAfterText(entityPopUp);
    I.click(serverSideScriptsPage.buttons.okButtonEntity);
    commonActions.fillInCustomMonacoEditor(
      serverSideScriptsPage.selector.firstLineCodeMonacoEditor,
      0,
      codeScriptWorks,
    );
    commonActions.saveAndCloseAction();
  },

  verifyEventTriggerScriptPortal(testUpdate) {
    commonActions.doubleClickValueFromTable(serverSideScriptsPage.container.portalEntityRecordContainer, testUpdate);
    commonActions.saveAndRefreshAction();
    // Not onDemand, but same error
    I.waitForVisible(serverSideScriptsPage.errors.onDemandFirstError, constants.SHORT_WAIT);
  },

  updateEventTriggerScript(scriptName, descriptionField, eventPopUpUpdate, stagePopUpUpdate) {
    I.waitForVisible(serverSideScriptsPage.container.portalEntityRecordContainer);
    I.waitForVisible(serverSideScriptsPage.fields.searchByNameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.searchByNameField, scriptName);
    commonActions.doubleClickValueFromTable(serverSideScriptsPage.container.portalEntityRecordContainer, scriptName);
    I.waitForVisible(serverSideScriptsPage.fields.descriptionField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.descriptionField, descriptionField);
    I.waitForClickable(serverSideScriptsPage.buttons.dropdownEvent);
    I.click(serverSideScriptsPage.buttons.dropdownEvent);
    commonActions.selectARowFromTableAfterText(eventPopUpUpdate);
    I.click(serverSideScriptsPage.buttons.okButtonEvent);
    I.waitForClickable(serverSideScriptsPage.buttons.dropdownStage);
    I.click(serverSideScriptsPage.buttons.dropdownStage);
    commonActions.selectARowFromTableAfterText(stagePopUpUpdate);
    I.click(serverSideScriptsPage.buttons.okButtonStage);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyUpdateEventTriggerScriptPortal(urlEntityPortal) {
    commonActions.accessDirectUrl(urlEntityPortal);
    I.waitForVisible(serverSideScriptsPage.errors.onDemandFirstError, constants.SHORT_WAIT);
  },

  async addOnDemandScript(scriptName, onDemandScriptType, code, niceDescription, consoleScript, firstError) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(serverSideScriptsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameField, scriptName);
    commonActions.selectValueFromDropdown(serverSideScriptsPage.buttons.dropdownArrowScriptType, onDemandScriptType);
    commonActions.fillInCustomMonacoEditor(
      serverSideScriptsPage.selector.firstLineCodeMonacoEditor,
      serverSideScriptsPage.selector.codeMonacoEditorID0,
      code,
    );
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(serverSideScriptsPage.buttons.insertEndPointButton);
    I.waitForVisible(serverSideScriptsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(serverSideScriptsPage.fields.nameField, scriptName);
    I.fillField(serverSideScriptsPage.fields.displayNameField, scriptName);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await this.executeScriptVerifyToast(consoleScript, firstError);
    I.fillField(serverSideScriptsPage.fields.descriptionField, niceDescription);
  },

  async updateOnDemandScript(updatedCode, consoleScript, secondError) {
    I.waitForVisible(serverSideScriptsPage.buttons.checkoutCodeButton, constants.SHORT_WAIT);
    I.click(serverSideScriptsPage.buttons.checkoutCodeButton);
    I.click(serverSideScriptsPage.selector.firstLineCodeMonacoEditor);
    I.pressKey(['CTRL', 'A']);
    I.pressKey('Delete');
    commonActions.fillInCustomMonacoEditor(
      serverSideScriptsPage.selector.firstLineCodeMonacoEditor,
      serverSideScriptsPage.selector.codeMonacoEditorID2,
      updatedCode,
    );
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await this.executeScriptVerifyToast(consoleScript, secondError);
  },

  async executeScriptVerifyToast(script, error) {
    await I.executeScript(script);
    I.waitForVisible(locate('div').withText(error).inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })), constants.SHORT_WAIT);
    I.click(commonPage.messagePopup.closeErrorMessage);
  },

  selectValueFromTable(value) {
    I.waitForVisible(locate('td').withText(value).inside(locate('tr')), constants.SHORT_WAIT);
    I.click(locate('td').withText(value).inside(locate('tr')));
  },

  async grabOriginURL() {
    const address = await I.grabCurrentUrl();
    const parse = url.parse(address, true);
    const { protocol } = parse;
    const { host } = parse;
    const origin = `${protocol}//${host}`;
    return origin;
  },

  async grabPathURL() {
    const address = await I.grabCurrentUrl();
    const parse = url.parse(address, true);
    const { pathname } = parse;
    const lastPosition = pathname.lastIndexOf('_');
    const path = pathname.slice(0, lastPosition);
    return path;
  },
};
