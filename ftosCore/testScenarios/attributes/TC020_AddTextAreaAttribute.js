// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC020_AddTextAreaAttribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Attributes');

Scenario('User can add a Text Area attribute to an entity.', async () => {

  //Login to Designer.
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attributes for each required level
  attributeActions.insertAttributeAction();
  attributeActions.addAttributeAction(
      data.textAreaAttributeName,
      data.attributeDisplayName,
      data.columnName,
      data.attributeType,
      data.requiredLevel,
  );
  attributeActions.fillTextAttributeAction(data.textLength);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Login to Portal.
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  verifyViewAction.verifyViewInPortal(data.primaryAttDNView);
  // Verify rest of attributes.
  verifyAttributeActions.verifyAttributeNoneInPortal(data.primaryAttDN, data.attributeDisplayName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Logoff
  await commonActions.logoutFromApp();
});
