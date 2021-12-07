// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC004_EntityExtensionSecurityRoles');
// Verify
const commonVerify = require('~actions/commonVerify');
const securityRolesVerify = require('~actions/securityRolesVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Security Roles');

Scenario('User can add a security role on entity extension.', async () => {

  // Log in Portal with AT_SRoEEUser_01
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  commonActions.accessDirectUrl(data.portalEntityExtensionAURL);
  // Insert new type entry for entity extension
  securityRolesActions.addNewTypeSecurityRole(data.clickToInsert, data.addTypeField1)
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Log in Portal with AT_SRoEEUser_02
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  commonActions.accessDirectUrl(data.portalEntityExtensionBURL);
  // Insert new entry for entity extension
  await securityRolesActions.addNewEntryEntityExtension(data.clickToInsert, data.addNameField1, data.addTypeField1);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Log in Portal with AT_SRoEEUser_01
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  commonActions.accessDirectUrl(data.portalEntityExtensionAURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyEntityExtension(data.addTypeField1, data.viewEntityExtensionB, data.addNameField1, data.editViewEntityExtensionB);
  await commonActions.logoutFromApp();
});
