// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC003_externalEntity_data');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User can delete an existing external source data entity', async () => {
  // Login in Studio App and access Business Entities list page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessEntityURL);
  // Search and delete a simple external entity with no additional attributes
  await externalEntityActions.searchDeleteEntity(data.simpleEntityName, data.columnDisplayName);
  // Verify that the entity was deleted
  commonVerify.verifyEmptyTableData();
  // Search and delete an external entity with additional custom attributes
  commonActions.refreshPage();
  await externalEntityActions.searchDeleteEntity(data.extraEntityName, data.columnDisplayName);
  // Verify that the entity was deleted
  commonVerify.verifyEmptyTableData();
  // Logout from app
  await commonActions.logoutFromApp();
});
