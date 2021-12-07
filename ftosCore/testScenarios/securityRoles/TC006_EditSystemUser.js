// Actions
const commonActions = require('~actions/commonActions');
const securityRolesActions = require('~actions/securityRolesActions');
// Data
const data = require('~data/securityRoles/TC006_EditSystemUser');

// Author Catalin Diaconu

Feature('Security Roles');

Scenario('User can edit sys user', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Access System User list
  commonActions.accessDirectUrl(data.urlSystemUserList);
  // Edit Security Role fields and verify them after save
  await securityRolesActions.editSRFieldsDesigner(
    data.securityRoleEntity,
    data.businessUnitRecord,
    data.updatedEmail,
    data.updatedPhoneNumber,
    data.updatedDisplayName,
  );
  await commonActions.logoutFromApp();
  // Log in Portal with the modified user
  await commonActions.loginInApp(data.urlPortal, data.securityRoleEntity, data.password);
  // Edit and Verify Security Role fields
  await securityRolesActions.editSRFieldsPortal(
    data.updatedDisplayName,
    data.updatedDisplayNamePortal,
    data.updatedPhoneNumberPortal,
    data.updatedEmailPortal,
  );
  await commonActions.logoutFromApp();
});
