// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC001_externalEntity_data');
// Verify
const externalEntityVerify = require('~actions/externalEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User can create a new external source data entity', async () => {
  // Login in Studio App and access Business Entities list page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.businessEntityURL);
  // Insert a new External Source Data type entity
  externalEntityActions.insertEntity(
    data.extEntityName,
    data.extEntityDisplayName,
    data.extEntityCollectionName,
    data.extEntityPAName,
    data.extEntityPADisplayName,
    data.entityStatus,
  );
  // Verity the attributes, form and view that were created properly.
  externalEntityVerify.verifyEntityAttributes(
    data.entityAttributes,
    data.entityAttrId,
    data.entityAttrName,
    data.entityAttrUserId,
    data.entityAttrCreatedBy,
    data.entityAttrModifiedBy,
    data.entityAttrBusinessUnit,
    data.entityAttrCreatedOn,
    data.entityAttrModifiedOn,
    data.entityAttrStatus,
  );
  externalEntityVerify.verifyEntityForm(data.entityForm, data.entityFormName);
  externalEntityVerify.verifyEntityView(data.entityView, data.entityViewName);
  await commonActions.logoutFromApp();
  // Verify the entity in Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.newEntityUrl);
  externalEntityVerify.verifyEntityPortal(data.entityColumnName);
  await commonActions.logoutFromApp();
});
