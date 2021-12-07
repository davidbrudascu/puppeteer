// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC002_DashboardSecurityRoles');
// Verify
const securityRolesVerify = require('~actions/securityRolesVerify');

// Author Victor Pana

Feature('Security Roles');

Scenario('BUG DPA-19393: User can add a security role for dashboard.', async () => {
  // Login Studio as 'host'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  //  Go to Security Roles from Dashboard and add security role
  securityRolesActions.addSecurityRolesDashboard(data.dashboardSecurityRole1);
  await commonActions.logoutFromApp();
  //  Login Portal with "AT_SecRoleOnDashboard_User_01"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyDashboardEntityExistInPortal(data.verifyDashboardEntity);
  await commonActions.logoutFromApp();
  // Log in Portal with "AT_SecRoleOnDashboard_User_02"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyDashboardDontExist(data.mainDashboard, data.verifyDashboardEntity);
  await commonActions.logoutFromApp();
});
