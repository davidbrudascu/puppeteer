// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC032_addTextAttributeDefaultValue.json');
// Verify
const commonVerify = require('~actions/commonVerify');
//  Pages
const commonPage = require('~pages/commonPage');
// Verify
const attributesVerify = require('~actions/attributesVerify');

// Author Adina Avram
// AT-550

Feature('Attributes');

Scenario('User can add a text attribute with a default value.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  attributeActions.insertAttributeAction();
  attributeActions.addAttrDefaultValue(
    data.nameAttribute,
    data.displayNameAttribute,
    data.typeAttribute,
    data.length,
    data.defaultValue,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  attributeActions.insertNewRecord();
  await attributeActions.updateDefaultValueForText(
    data.defaultValue,
    data.name,
    data.newValue,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await attributesVerify.verifyDefaultValueTextAttr(
    data.name,
    data.newValue,
  );
  await commonActions.logoutFromApp();
});
