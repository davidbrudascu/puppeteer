// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC011_FDFSecurityRoles');
// Verify
const securityRolesVerify = require('~actions/securityRolesVerify');

// Author Victor Pana

Feature('Security Roles');

Scenario('BUG DPA-19412: User can add a security role on form driven flow.', async () => {

  // Login Studio as 'host'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  //  Go to Security Roles tab from form driven flow and add security role
  securityRolesActions.addSecurityRolesFDF(data.fDFSecurityRole1)
  await commonActions.logoutFromApp();
  // Login Portal with "AT_SecRoleFDF_User_01"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFDFUser1InPortal(data.clickToInsert, data.errorMessage);
  await commonActions.logoutFromApp();
  // Log in Portal as "AT_SecRoleFDF_User_02"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFDFStepUser1InPortal(data.clickToInsert, data.addNameField1);
  await commonActions.logoutFromApp();
});
