// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/add_Related_VA_Field_Options');
// Verify
const verifyFieldOption = require('~actions/fieldOptionVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana
// Changes made on scenario by Ionut Mindrescu, check AT-429 for more details

Feature('Field Options');

Scenario('User can add a field option related Virtual Attribute.', async () => {
  // Login to Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add first Attribute related Code
  fieldOptionsActions.addFieldOption();
  fieldOptionsActions.markVirtualAttributeCheckbox();
  await fieldOptionsActions.makeRequiredVAFieldOptions(
    data.attributeRelatedCode,
    data.columnDisplayName,
    data.level,
  );
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Add second Attribute related Country
  fieldOptionsActions.markVirtualAttributeCheckbox();
  await fieldOptionsActions.selectLookupVAFieldOptions(
    data.attributeRelatedCountry,
    data.columnDisplayName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  //  Login using Portal and  access your entity
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  // Verify that field options are applied in Portal
  await verifyFieldOption.verifyVirtualAttributeRelatedRequired(
    data.attributePortalName,
    data.selectCityFromDD,
    data.relatedCode,
    data.relatedCountry,
    data.errorMessage,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Logoff
  await commonActions.logoutFromApp();
});
