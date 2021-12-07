// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/add_Bool_Attribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
//  Pages
const commonPage = require('~pages/commonPage');

Feature('Attributes');

Scenario('User can add a boolean attribute to an entity.', async () => {
  const dateDiv = ' ';

  //Login to Designer.
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attributes for each required level
  attributeActions.insertAttributeAction();
  let requiredLevel = ['ReadOnly', 'None', 'Required', 'Recommended'];
  requiredLevel.forEach((level) => {
    attributeActions.addAttributeAction(
      data.boolAttributeName,
      data.attributeDisplayName,
      data.columnName,
      data.attributeType,
      level,
    );
    commonActions.saveAndNewAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  });
  await commonActions.logoutFromApp();
  // Login to Portal.
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  verifyViewAction.verifyViewInPortal(data.primaryAttDNView);
  // Verify required attribute.
  verifyAttributeActions.verifyRequiredBoolAttributePortalAction(
    data.primaryAttDN,
    data.attributeDisplayName,
    data.errorMessage,
  );
  // Verify rest of attributes.
  verifyAttributeActions.verifyBoolAttributeInPortalAction(data.attributeDisplayName, dateDiv);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Logoff
  await commonActions.logoutFromApp();
});
