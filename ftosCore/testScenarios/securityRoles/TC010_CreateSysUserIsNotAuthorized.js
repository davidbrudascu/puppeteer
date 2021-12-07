// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC010_CreateSysUserIsNotAuthorized');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');


// Author Andrei Fabian

Feature('Security Roles');

Scenario('User can create a system user that is not authorized.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlSysUsers);
  securityRolesActions.createSysUserIsNotAuthorized(
    data.urlDesigner,
    data.urlPortal,
    data.password,
    data.sysUserName,
    data.urlSysUsers,
    data.rootBusinessUnit,
    data.email,
    data.phoneNumber,
    data.displayName,
    data.backOfficeSystemUser,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  securityRolesActions.logInAccessDenied(data.urlPortal, data.sysUserName, data.password);
  securityRolesActions.logInAccessDenied(data.urlDesigner, data.sysUserName, data.password);
});
