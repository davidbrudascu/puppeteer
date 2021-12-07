// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC028_AddOrderIndexROAttribute');
// Verify
const commonVerify = require('~actions/commonVerify');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Attributes');

Scenario('User can add an Order Index Readonly attribute to an entity.', async () => {

  //Login to Designer.
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add attributes for each required level
  attributeActions.insertAttributeAction();
  attributeActions.addAttributeAction(
      data.orderIndexROAttributeName,
      data.attributeDisplayName,
      data.columnName,
      data.attributeType,
      data.requiredLevel,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Logoff
  await commonActions.logoutFromApp();
});
