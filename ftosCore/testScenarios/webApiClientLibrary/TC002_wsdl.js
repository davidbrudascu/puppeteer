// Actions
const commonActions = require('~actions/commonActions');
const webApiClientActions = require('~actions/webApiClientActions');
// Data
const data = require('~data/webApiClientLibrary/TC002_wsdl_data.json');
// Verify
const webApiClientVerify = require('~actions/webApiClientVerify');

// Author Ionut Daniel Mindrescu
// AT-329

Feature('Web Api Client Library');

Scenario('User can create, edit, delete a Web Api Client Library, WSDL type', async () => {
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to WSDL Definition page and copy the api definition.
  commonActions.accessDirectUrl(data.wsdlDefinitionURL);
  webApiClientActions.copyWsdlApiDefinitionData(data.removeHeaderScript);
  // Access the Web Api Client Library page, insert a new library and verify it.
  commonActions.accessDirectUrl(data.webApiClientLibraryURL);
  webApiClientActions.insertWebApiClientLibrary(data.wsdlName, data.wsdlDescription, data.libraryType, data.wsdlVersion);
  webApiClientVerify.verifyWebApiClient(data.wsdlName, data.wsdlDescription, data.wsdlVersion, data.apiDefinition);
  // Update the Web Api Client Library and verify it.
  webApiClientActions.updateWebApiClientLibrary(data.wsdlDescriptionUpdate, data.wsdlVersionUpdate);
  webApiClientVerify.verifyWebApiClientUpdate(data.wsdlDescriptionUpdate, data.wsdlVersionUpdate);
  // Verify that the created Web Api Client Library can be imported in a Server Automation Script
  commonActions.accessDirectUrl(data.serverScriptURL);
  webApiClientActions.importVerifyWebApiClientLibrary(data.importCode, data.intellisensSuggestion);
  // Delete the created Web Api Client Library and verify that it was successfully deleted.
  commonActions.accessDirectUrl(data.webApiClientLibraryURL);
  webApiClientActions.deleteWebApiClientLibrary(data.wsdlName);
  webApiClientVerify.verifyDeleteWebApiClientLibrary(data.wsdlName);
  // Logout from app
  await commonActions.logoutFromApp();
});
