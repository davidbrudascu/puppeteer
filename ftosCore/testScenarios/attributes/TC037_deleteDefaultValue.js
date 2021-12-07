// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC037_deleteDefaultValue.json');
// Verify
const attributesVerify = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
const commonPage = require('~pages/commonPage');
const constants = require('~config/constants');

// Author Adina Avram
// AT-550

Feature('Attributes');

Scenario('User can delete a default value.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  attributeActions.deleteDefaultValue(
    data.urlText,
    data.urlTextArea,
    data.urlNumeric,
    data.urlWholeNumber,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  attributeActions.insertNewRecord();
  await attributesVerify.verifyIfChangeDefaultValue(
    data.emptyText,
    data.emptyText,
    data.emptyNumeric,
    data.emptyNumeric,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
