// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
const endpointActions = require ('~actions/endpointActions')
// Data
const data = require('~data/serverScripts/TC008_AddEditDeleteEndpoint_data.json');
// Verify
const commonVerify = require('~actions/commonVerify');
const endpointVerify = require('~actions/endpointVerify');

// Author: David Gavriluț
// AT-516: Automate "Endpoint": Add/Edit/Delete

Feature('Server Scripts');

Scenario('User can add/edit/delete/ an endpoint', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlEndpoints);
  endpointActions.addEndpoint(data.insertButton, data.endpointName, data.endpointDisplayName, data.scriptName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  endpointVerify.verifyEndpointFields(data.endpointName, data.endpointDisplayName, data.scriptName);
  endpointActions.editEndpoint(data.endpointNameEdit, data.endpointDisplayNameEdit, data.scriptNameEdit);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  endpointVerify.verifyEndpointFields(data.endpointNameEdit, data.endpointDisplayNameEdit, data.scriptNameEdit);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  endpointActions.deleteEndpoint(data.endpointNameEdit);
  await commonActions.logoutFromApp();
});
