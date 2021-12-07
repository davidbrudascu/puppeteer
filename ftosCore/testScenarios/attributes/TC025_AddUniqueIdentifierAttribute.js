// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC025_AddUniqueIdentifierAttribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Attributes');

Scenario('User can add an unique identifier attribute to an entity.', async () => {
  const insertValue = '7e36edd3-f8ce-4347-b635-9159d8afabbc';
  const verifyValue = '7e36edd3-f8ce-4347-b635-9159d8afabbc';
  const dateDiv = ' div ';

  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attribute for each required level
  attributeActions.insertAttributeAction();
  let requiredLevel = ['ReadOnly', 'None', 'Required', 'Recommended'];
  requiredLevel.forEach((level) => {
    attributeActions.addAttributeAction(
      data.uniqueIdentifierAttributeName,
      data.attributeDisplayName,
      data.columnName,
      data.attributeType,
      level,
    );
    commonActions.saveAndNewAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  });
  await commonActions.logoutFromApp();
  //Login to Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  // Verify that the attributes added are displayed correctly
  // and that "Required" does what it says on the tin
  verifyViewAction.verifyViewInPortal(data.primaryAttDN);
  verifyAttributeActions.verifyRequiredAttributePortalAction(
    data.primaryAttDN,
    data.attributeDisplayName,
  );
  await verifyAttributeActions.verifyUniqueIdentifierAttrInPortal(
    data.attributeDisplayName,
    insertValue,
    verifyValue,
    dateDiv,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  //Logoff
  await commonActions.logoutFromApp();
});
