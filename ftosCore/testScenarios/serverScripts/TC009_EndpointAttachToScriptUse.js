// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
const endpointAttachToScriptUseActions = require('~actions/endpointAttachToScriptUseActions.js');
// Data
const data = require('~data/serverScripts/TC009_EndpointAttachToScriptUse_data.json');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author: David Gavriluț
// AT-517: Automate "Endpoint": Attach to script/Use

Feature('Server Scripts');

Scenario('User can attach endpoints to server side scripts and use them', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlScriptPage);
  endpointAttachToScriptUseActions.attachEndpointToScript(data.endpointName, data.endpointDisplayName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.urlFlowPage);
  endpointAttachToScriptUseActions.callEndpointOnFlow(data.code);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlPortalFlow);
  endpointAttachToScriptUseActions.checkEndpointOnPortal(data.endpointMessage);
  await commonActions.logoutFromApp();
})
