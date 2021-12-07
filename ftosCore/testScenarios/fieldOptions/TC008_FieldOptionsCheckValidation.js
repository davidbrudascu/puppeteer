// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/fieldOptions/TC008_FieldOptionsCheckValidation');
// Verify
const verifyFieldOption = require('~actions/fieldOptionVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Field Options');

Scenario('User check field option validation.', async () => {
  // Login to Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Access the first form 'insert' and check the validation for same attribute on Field option
  await fieldOptionsActions.accessInsertFormAddCodeAttrAgain(
    data.sectionDataForms,
    data.insertForm,
    data.fieldOptionsTab,
    data.attributeCode,
    data.errorMessage,
    data.columnDisplayName,
  );
  commonActions.goBackToPreviousPage();
  // Access the second form 'edit' and Code readonly attribute on Field option
  await fieldOptionsActions.accessEditFormAddCodeAttr(
    data.sectionDataForms,
    data.editForm,
    data.attributeCode,
    data.columnDisplayName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  //  Logoff
  await commonActions.logoutFromApp();
  // Verify in portal that the validations regarding Code attribute was applied correctly
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.portalViewURL);
  await verifyFieldOption.verifyFOValidation(
    data.insertButton,
    data.errorPortalMessage,
    data.attributePortalName,
    data.inputCode,
  );
  await commonActions.logoutFromApp();
});
