// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC008_CreateSysUserAdmin');
// Verify
const securityRolesVerify = require('~actions/securityRolesVerify');

// Author Catalin Diaconu

Feature('Security Roles');

Scenario('User can create a system user with admin privileges', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access Sys Users Role
  commonActions.accessDirectUrl(data.urlSysUsers);
  // Create admin user and log in to verify privileges
  await securityRolesActions.createAdminSysUser(
    data.usernameSysUser,
    data.rootBusinessUnit,
    data.email,
    data.phoneNumber,
    data.displayName,
    data.backOfficeSystemUser,
    data.password,
    data.urlDesigner,
  );
  await commonActions.logoutFromApp();
  // Login in Portal as Sys Admin
  await commonActions.loginInApp(data.urlPortal, data.usernameSysUser, data.password);
  // Access list and verify privileges
  securityRolesVerify.verifySysAdminPrivilegesPortal(data.urlPortalAccount);
  await commonActions.logoutFromApp();
});
