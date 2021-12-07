// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC036_editDefaultValue.json');
// Verify
const attributesVerify = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
const commonPage = require('~pages/commonPage');
const constants = require('~config/constants');

// Author Adina Avram
// AT-550

Feature('Attributes');

Scenario('User can edit a default value.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  attributeActions.editDefaultValue(
    data.attText,
    data.urlText,
    data.attTextArea,
    data.urlTextArea,
    data.attNumeric,
    data.urlNumeric,
    data.attWholeNumber,
    data.urlWholeNumber,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  attributeActions.insertNewRecord();
  await attributesVerify.verifyIfChangeDefaultValue(
    data.attText,
    data.attTextArea,
    data.attNumeric,
    data.attWholeNumber,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
