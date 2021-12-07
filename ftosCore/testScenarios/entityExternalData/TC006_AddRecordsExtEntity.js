// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC006_externalEntity_data');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User tries to insert records and add attributes to External Entity', async () => {
  // Login in Portal App and access Business Entities list page
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.externalEntityURL);
  // Try to insert/edit records
  externalEntityActions.insertEditRecords(data.externalEntityURL, data.recordOneName);
  // Login in Studio and try to add an attribute
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessEntityURL);
  externalEntityActions.addAttrToExtEntity(
    data.entityAttributes,
    data.attributeName,
    data.attributeType,
  );
  // Logout from app
  await commonActions.logoutFromApp();
});
