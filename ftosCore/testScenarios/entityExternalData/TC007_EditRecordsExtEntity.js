// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC007_externalEntity_data');
// Verify
const externalEntityVerify = require('~actions/externalEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User can update UserId and BusinessUnit by scripts', async () => {
  // Login in Portal App and access Business Entities list page
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.externalEntityURL);
  // Verify current BusinessUnit and UserId
  externalEntityVerify.verifyUserIdBU(data.currentUserId, data.currentBusinessUnit);
  // Change the BusinessUnit and UserId by calling Endpoint
  externalEntityActions.callActionByName(data.script);
  // Verify BusinessUnit and UserId after change
  externalEntityVerify.verifyUserIdBU(data.updatedUserId, data.updatedBusinessUnit);
  // Logout from app
  await commonActions.logoutFromApp();
});
