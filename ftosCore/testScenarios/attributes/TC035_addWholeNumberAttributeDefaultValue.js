// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC035_addWholeNumberAttributeDefaultValue.json');
// Verify
const commonVerify = require('~actions/commonVerify');
const attributesVerify = require('~actions/attributesVerify');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Adina Avram
// AT-550

Feature('Attributes');

Scenario('User can add a whole number attribute with a default value.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  attributeActions.insertAttributeAction();
  attributeActions.addWholeNumberAttrDefaultValue(
    data.nameAttribute,
    data.displayNameAttribute,
    data.typeAttribute,
    data.defaultValue,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  attributeActions.insertNewRecord();
  await attributeActions.updateDefaultValueForWholeNumber(
    data.defaultValue,
    data.name,
    data.newValue,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await attributesVerify.verifyDefaultValueWholeNumberAttr(
    data.name,
    data.newValue,
  );
  await commonActions.logoutFromApp();
});
