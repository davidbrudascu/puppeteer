// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC002_externalEntity_data');
// Verify
const externalEntityVerify = require('~actions/externalEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User can edit an existing external source data entity', async () => {
  // Login in Studio App and access Business Entities list page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.editExtEntityURL);
  // Verity the attributes, form and view that were created properly.
  externalEntityVerify.verifyEntityDetails(
    data.extEntityType,
    data.extEntityName,
    data.extEntityDisplayName,
    data.extEntityCollectionName,
    data.extEntityDescriptionName,
    data.extEntityPAName,
    data.extEntityPADisplayName,
    data.entityStatus,
  );
  externalEntityActions.editEntity(
    data.extEntityEditDisplayName,
    data.extEntityEditCollectionName,
    data.extEntityEditDescriptionName,
  );
  await externalEntityVerify.verifyEntityAfterEdit(data.businessEntityURL, data.extEntityEditDisplayName, data.columnDisplayName);
  await commonActions.logoutFromApp();
  // Verify the entity in Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  externalEntityVerify.verifyUpdatedEntityPortal(data.columnName);
  await commonActions.logoutFromApp();
});
