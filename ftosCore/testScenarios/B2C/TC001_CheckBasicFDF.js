// Actions
const commonActions = require('~actions/commonActions');
const B2CActions = require('~actions/B2CActions');
// Data
const data = require('~data/B2C/TC001_CheckBasicFDF');
// Verify
const B2CVerify = require('~actions/B2CVerify');

// Author Catalin Diaconu
// AT-162

Feature('B2C');

Scenario('User can access a basic FDF through a B2C', async () => {
  commonActions.accessDirectUrl(data.urlB2C);
  B2CActions.fillFormBasicFDF(
    data.name,
    data.email,
    data.age,
  );
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlEntityPortal);
  B2CVerify.verifyRecordColumnsBasicFDF(
    data.age,
    data.name,
    data.email,
  );
  await commonActions.logoutFromApp();
});
