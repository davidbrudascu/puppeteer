// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC007_CreateSysUser');
// Verify
const commonVerify = require('~actions/commonVerify');
const securityRolesVerify = require('~actions/securityRolesVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Catalin Diaconu

Feature('Security Roles');

Scenario('User can create a system user', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access System User list
  commonActions.accessDirectUrl(data.urlSysUsers);
  // Create a System User
  securityRolesActions.createSysUser(
    data.usernameSysUser,
    data.rootBusinessUnit,
    data.email,
    data.phoneNumber,
    data.displayName,
    data.backOfficeSystemUser,
    data.password,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.usernameSysUser, data.password);
  // Verify display name in the top right corner
  securityRolesVerify.verifyDisplayNameNavBar(data.displayName);
  await commonActions.logoutFromApp();
});
