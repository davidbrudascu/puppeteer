// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC012_FormSecurityRoles');
// Verify
const commonVerify = require('~actions/commonVerify');
const securityRolesVerify = require('~actions/securityRolesVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Security Roles');

Scenario('BUG DPA-19411: User can add a security role on form.', async () => {
  // Login Studio as 'host'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  //  Go to Security Roles from form and add security role
  securityRolesActions.addSecurityRolesForm(data.formSecurityRole1);
  await commonActions.logoutFromApp();
  //  Login Portal with AT_SecRoleForm_User_01
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFormUser1InPortal(data.clickToInsert, data.errorMessage);
  await commonActions.logoutFromApp();
  // Log in Portal with "AT_SecRoleForm_User_02"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFormUser2InPortal(data.clickToInsert, data.addNameField1);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
