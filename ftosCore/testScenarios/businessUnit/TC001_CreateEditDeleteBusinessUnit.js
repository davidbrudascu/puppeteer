// Actions
const commonActions = require('~actions/commonActions');
const businessUnitActions = require('~actions/businessUnitActions');
// Data
const data = require('~data/businessUnit/TC001_CreateEditDeleteBusinessUnit');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Business Unit');

Scenario('User can create, edit and delete business unit.', async () => {
  // Login to Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add a new business unit
  businessUnitActions.addNewBusinessUnit(data.insertButton, data.businessUnitName1, data.parentRoot);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Edit and insert business unit
  businessUnitActions.editAndInsertNewBusinessUnit(data.editBusinessUnitTab, data.businessUnitName2, data.businessUnitName3, data.parentRoot);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Delete existing business unit
  await businessUnitActions.deleteBusinessUnit(data.businessUnitName2, data.deleteButton, data.columnName);
  await commonActions.logoutFromApp();
});
