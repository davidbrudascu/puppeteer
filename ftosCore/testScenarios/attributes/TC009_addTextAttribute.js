// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/add_Text_Attribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');

Feature('Attributes');

Scenario('User can add a text attribute to an entity.', async () => {
  const dateDiv = ' ';
  const insertValue = '1.23456';
  const verifyValue = '1.234';

  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attributes for each required level
  attributeActions.insertAttributeAction();
  let requiredLevel = ['ReadOnly', 'None', 'Required', 'Recommended'];
  requiredLevel.forEach((level) => {
    attributeActions.addAttributeAction(
      data.textAttributeName,
      data.attributeDisplayName,
      data.columnName,
      data.attributeType,
      level,
    );
    attributeActions.fillTextAttributeAction(data.textLength);
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
  //Logoff
  await commonActions.logoutFromApp();
});
