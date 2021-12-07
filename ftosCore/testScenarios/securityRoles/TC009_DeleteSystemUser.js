// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC009_DeleteSystemUser');
// Verify
const commonVerify = require('~actions/commonVerify');


// Author Andrei Fabian

Feature('Security Roles');

Scenario('User can delete system user.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  securityRolesActions.deleteSysUser(data.sysUser);
  // Verify that search results are not displayed anymore
  commonVerify.verifyEmptyTableData();
  await commonActions.logoutFromApp();
  // Open Portal and try to login with the deleted user
  securityRolesActions.logInIncorrect(data.urlPortal, data.sysUser, data.password);
});
