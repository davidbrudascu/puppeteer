// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC001_CustomFlowSecurityRoles');
// Verify
const commonVerify = require('~actions/commonVerify');
const securityRolesVerify = require('~actions/securityRolesVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Security Roles');

Scenario('User can add a security role for custom flow.', async () => {
  // Login Studio as 'host'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  //  Go to Security Roles from Custom flow and add security role
  securityRolesActions.addSecurityRolesCustomFlow(data.customFlowSecurityRole1);
  await commonActions.logoutFromApp();
  // Login Portal with AT_SecRoleCustomFlow_User_01
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyCustomFlowEntityDontExist(data.securityRoleCustomFlow);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that toast error message appears: 'This action is not allowed'
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.errorMessage);
  commonActions.accessDirectUrl(data.portal);
  await commonActions.logoutFromApp();
  // Login Portal with AT_SecRoleCustomFlow_User_02
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyCustomFlowEntityExistInPortal(data.securityRoleCustomFlow, data.verifyTextCustomFlow);
  await commonActions.logoutFromApp();
});
