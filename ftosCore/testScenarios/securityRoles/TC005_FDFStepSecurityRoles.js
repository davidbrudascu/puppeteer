// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC005_FDFStepSecurityRoles');
// Verify
const securityRolesVerify = require('~actions/securityRolesVerify');

// Author Victor Pana

Feature('Security Roles');

Scenario('User can add a security role on form driven flow step.', async () => {

  // Login Studio as 'host'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  //  Go to Security Roles from form driven flow step and add security role
  securityRolesActions.addSecurityRolesFDFStep(data.fDFStepSecurityRole1)
  await commonActions.logoutFromApp();
  // Login Portal with "AT_SecRoleFDFStep_User_02"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFDFStepUser2InPortal(data.clickToInsert, data.addNameField1);
  await commonActions.logoutFromApp();
  // Log in Portal as "AT_SecRoleFDFStep_User_01"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFDFStepUser1InPortal(data.clickToInsert, data.addNameField2);
  await commonActions.logoutFromApp();
});
