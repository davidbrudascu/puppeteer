const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const webApiClientLibraryPage = require('~pages/webApiClientLibraryPage');

module.exports = {
  verifyWebApiClient(libraryName, libraryDescription, libraryVersion, apiDefinition) {
    I.seeInField(webApiClientLibraryPage.fields.webApiClientLibraryNameField, libraryName);
    I.seeInField(webApiClientLibraryPage.fields.webApiClientLibraryDescriptionField, libraryDescription);
    I.seeInField(webApiClientLibraryPage.fields.webApiClientLibraryVersionField, libraryVersion);
    // Go to Typescript Tab
    I.click(webApiClientLibraryPage.tabs.typescriptDefinitionTab);
    I.waitForVisible(webApiClientLibraryPage.fields.webApiClientLibraryTypeScriptField, constants.SHORT_WAIT);
    I.see(apiDefinition, webApiClientLibraryPage.fields.webApiClientLibraryTypeScriptField);
    // Go back to General Tab
    I.click(webApiClientLibraryPage.tabs.generalTab);
  },

  verifyWebApiClientUpdate(libraryDescription, libraryVersion) {
    I.seeInField(webApiClientLibraryPage.fields.webApiClientLibraryDescriptionField, libraryDescription);
    I.seeInField(webApiClientLibraryPage.fields.webApiClientLibraryVersionField, libraryVersion);
  },

  verifyDeleteWebApiClientLibrary(libraryName) {
    I.dontSee(libraryName, webApiClientLibraryPage.fields.webApiClientLibraryResultsTable);
  },
};
