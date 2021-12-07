// Actions
const commonActions = require('~actions/commonActions');
const webApiClientActions = require('~actions/webApiClientActions');
// Data
const data = require('~data/webApiClientLibrary/TC001_openApi_data');
// Verify
const webApiClientVerify = require('~actions/webApiClientVerify');

// Author Ionut Daniel Mindrescu
// AT-329

Feature('Web Api Client Library');

Scenario('BUG DPA-20482: User can create, edit, delete a Web Api Client Library, OpenApi type', async () => {
  // Login in Studio App.
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to OpenApi Definition page and copy the data.
  commonActions.accessDirectUrl(data.openApiDefinitionURL);
  webApiClientActions.copyOpenApiDefinitionData();
  // Access the Web Api Client Library page, insert a new library and verify it.
  commonActions.accessDirectUrl(data.webApiClientLibraryURL);
  webApiClientActions.insertWebApiClientLibrary(data.openApiName, data.openApiDescription, data.libraryType, data.openApiVersion);
  webApiClientVerify.verifyWebApiClient(data.openApiName, data.openApiDescription, data.openApiVersion, data.apiDefinition);
  // Update the Web Api Client Library and verify it.
  webApiClientActions.updateWebApiClientLibrary(data.openAPiDescriptionUpdate, data.openApiVersionUpdate);
  webApiClientVerify.verifyWebApiClientUpdate(data.openAPiDescriptionUpdate, data.openApiVersionUpdate);
  // Verify that the created Web Api Client Library can be imported in a Server Automation Script
  commonActions.accessDirectUrl(data.serverScriptURL);
  webApiClientActions.importVerifyWebApiClientLibrary(data.importCode, data.intellisensSuggestion);
  // Delete the created Web Api Client Library and verify it.
  commonActions.accessDirectUrl(data.webApiClientLibraryURL);
  webApiClientActions.deleteWebApiClientLibrary(data.openApiName);
  webApiClientVerify.verifyDeleteWebApiClientLibrary(data.openApiName);
  // Logout from app.
  await commonActions.logoutFromApp();
});
