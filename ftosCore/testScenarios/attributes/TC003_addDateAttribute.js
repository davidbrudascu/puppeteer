// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/add_Date_Attribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');


Feature('Attributes');

Scenario('User can add a date attribute to an entity.', async () => {
  const insertValue = '12/12/2020';
  const verifyValue = '12/12/2020';
  const dateDiv = ' div '; // EXTRA DIV NEEDED FOR DATE TYPE ATTRIBUTE IN PORTAL. DO NOT TOUCH. YOU BREAK YOU BUY.

  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attribute for each required level
  attributeActions.insertAttributeAction();
  let requiredLevel = ['ReadOnly', 'None', 'Required', 'Recommended'];
  requiredLevel.forEach((level) => {
    attributeActions.addAttributeAction(
      data.dateAttributeName,
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
  await commonActions.loginInApp(data.urlPortal, data.username, data.password)
  commonActions.accessDirectUrl(data.viewURL)
  // Verify that the attributes added are displayed correctly
  // and that "Required" does what it says on the tin
  verifyViewAction.verifyViewInPortal(data.primaryAttDN);
  verifyAttributeActions.verifyRequiredAttributePortalAction(
    data.primaryAttDN,
    data.attributeDisplayName,
  );
  await verifyAttributeActions.verifyAttributeInPortalAction(
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
