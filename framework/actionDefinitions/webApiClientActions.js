const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const webApiClientLibraryPage = require('~pages/webApiClientLibraryPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  copyOpenApiDefinitionData() {
    I.click(webApiClientLibraryPage.locate.openApiSwagger);
    I.pressKey(['CTRL', 'A']);
    I.pressKey(['CTRL', 'C']);
  },

  copyWsdlApiDefinitionData(removeHeaderScript) {
    I.executeScript(removeHeaderScript);
    I.pressKey(['CTRL', 'A']);
    I.pressKey(['CTRL', 'C']);
  },

  insertWebApiClientLibrary(libraryName, libraryDescription, libraryType, libraryVersion) {
    // Using LONG_WAIT because is the first loading of the page
    I.waitForElement(
      webApiClientLibraryPage.fields.webApiClientLibraryResultsTable,
      constants.LONG_WAIT,
    );
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(
      webApiClientLibraryPage.fields.webApiClientLibraryApiDefinitionField,
      constants.LONG_WAIT,
    );
    I.fillField(webApiClientLibraryPage.fields.webApiClientLibraryNameField, libraryName);
    I.fillField(webApiClientLibraryPage.fields.webApiClientLibraryDescriptionField,
      libraryDescription);
    I.click(webApiClientLibraryPage.buttons.webApiClientLibraryApiTypeButton);
    I.click(locate('p').withAttr({ title: libraryType }));
    I.fillField(webApiClientLibraryPage.fields.webApiClientLibraryVersionField, libraryVersion);
    I.click(webApiClientLibraryPage.fields.webApiClientLibraryApiDefinitionField);
    I.pressKey(['CTRL', 'V']);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  updateWebApiClientLibrary(libraryDescription, libraryVersion) {
    // Using LONG_WAIT because is the first loading of the page
    I.waitForElement(
      webApiClientLibraryPage.fields.webApiClientLibraryApiDefinitionField,
      constants.LONG_WAIT,
    );
    I.fillField(webApiClientLibraryPage.fields.webApiClientLibraryDescriptionField,
      libraryDescription);
    I.fillField(webApiClientLibraryPage.fields.webApiClientLibraryVersionField, libraryVersion);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  importVerifyWebApiClientLibrary(importCode, intellisensSuggestion) {
    // Using LONG_WAIT because is the first loading of the page
    I.waitForElement(
      webApiClientLibraryPage.fields.workflowResultsTable,
      constants.LONG_WAIT,
    );
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(
      webApiClientLibraryPage.fields.serverScriptCodeMonacoField,
      constants.SHORT_WAIT,
    );
    I.click(webApiClientLibraryPage.fields.serverScriptCodeMonacoField);
    I.fillField(webApiClientLibraryPage.fields.serverScriptCodeMonacoField, importCode);
    I.waitForElement(webApiClientLibraryPage.fields.widgetSuggestion, constants.SHORT_WAIT);
    I.see(intellisensSuggestion, webApiClientLibraryPage.fields.widgetSuggestion);
    I.click(commonPage.buttons.goBackButton);
    I.waitForElement(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  deleteWebApiClientLibrary(openApiName) {
    // Using LONG_WAIT because is the first loading of the page
    I.waitForElement(
      webApiClientLibraryPage.fields.webApiClientLibrarySearchField,
      constants.LONG_WAIT,
    );
    I.click(webApiClientLibraryPage.fields.webApiClientLibrarySearchField);
    I.fillField(webApiClientLibraryPage.fields.webApiClientLibrarySearchField, openApiName);
    I.click(webApiClientLibraryPage.selector.webApiClientLibraryResultsRow);
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },
};
