// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/add_Lookup_Attribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');

Feature('Attributes');

Scenario('User can add a lookup attribute to an entity for all required level.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attributes for each required level
  attributeActions.insertAttributeAction();
  new Map([['ReadOnly', 'AT_EntForAddLkpAttr'], ['None', 'AT_EntForAddLkpAttr'], ['Required', 'AT_EntForAddLkpAttr'], ['Recommended', 'AT_EntForAddLkpAttr']]).forEach(addLookupAttributes)

  function addLookupAttributes(value, key) {
    attributeActions.addAttributeAction(data.attributeName, data.attributeDisplayName, data.columnName, data.attributeType, key)
    attributeActions.fillLookupAttributeAction(value);
    commonActions.saveAndNewAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  }
  //Login to Portal
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  //Verify that the attributes added are displayed correctly and that "Required" does what it says on the tin
  verifyViewAction.verifyViewInPortal(data.primaryAttDN);
  verifyAttributeActions.verifyRequiredLookupPortalAction(data.primaryAttDN, data.attributeDisplayName);
  verifyAttributeActions.verifyErrorMessage(data.toastAttributeRequired);
  verifyAttributeActions.verifyLookupReadOnly();
  let requiredLevel = ["None", "Required", "Recommended"]
  requiredLevel.forEach(function (level) {
    verifyAttributeActions.setLookupAttributeInPortalAction(data.attributeDisplayName, level)
  });
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  //Logoff
  await commonActions.logoutFromApp();
});
