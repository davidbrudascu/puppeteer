// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC003_FormStepSecurityRoles');
// Verify
const commonVerify = require('~actions/commonVerify');
const securityRolesVerify = require('~actions/securityRolesVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Victor Pana

Feature('Security Roles');

Scenario('User can add a security role on form step.', async () => {
  // Login Studio as 'host'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  //  Go to Security Roles from form step and add security role
  securityRolesActions.addSecurityRolesFormStep(data.formStepSecurityRole1)
  await commonActions.logoutFromApp();
  //  Login Portal with AT_SecRoleFormStep_User_02
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole2, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFormStepUser2InPortal(data.clickToInsert, data.verifyStep2Name, data.addNameField1);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Log in Portal with "AT_SecRoleFormStep_User_01"
  await commonActions.loginInApp(data.urlPortal, data.usernameSecurityRole1, data.password);
  commonActions.accessDirectUrl(data.portalCustomActionURL);
  // Verify that  security role restrictions apply correctly
  securityRolesVerify.verifyFormStepUser1InPortal(data.clickToInsert, data.verifyStep2Name, data.addNameField2);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
