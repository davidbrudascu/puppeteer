// Actions
const commonActions = require('~actions/commonActions');
const transientEntityActions = require('~actions/transientEntityActions');
// Data
const data = require('~data/transientEntity/TC003_transientEntity_data');
// Verify
const transientEntityVerify = require('~actions/transientEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('Transient Data Entity');

Scenario('User can use a Transient Entity to get info in a Form Driven Flow', async () => {
  // Login in Portal App and access the Source Entity
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.sourceEntityURL);
  // Insert new record:
  // on Step 1, fill the Email parameter so that in Step 2 get all values from Source Entity
  transientEntityActions.insertTransRecord(
    data.recordSourceEmail,
    data.recordSourceName,
    data.recordSourceCity,
    data.recordSourcePhone,
    data.recordProduct,
  );
  // Verify that the record data were successfully saved
  transientEntityVerify.verifyTransRecord(
    data.recordProduct,
    data.recordSourceEmail,
    data.recordOrderId,
    data.recordOrderStatus,
    data.recordProduct,
  );
  // Logout from app
  await commonActions.logoutFromApp();
});
