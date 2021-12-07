// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC004_externalEntity_data');
// Verify
const externalEntityVerify = require('~actions/externalEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User can create and delete attributes for external source data entity', async () => {
  // Login in Studio App and access Business Entities list page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.externalEntityURL);
  // Add attributes: Uniqueidentifier type as external id.
  externalEntityActions.addExternalIdAttribute(
    data.entityAttributes,
    data.attrOneName,
    data.attrOneType,
    data.attrOneDisplayName,
    data.attrOneName,
  );
  // Verify that the attribute was successfully created
  externalEntityVerify.verifyAttribute();
  // Add attributes: Lookup type.
  await externalEntityActions.addLookupAttribute(
    data.entityAttributes,
    data.attrTwoName,
    data.attrTwoType,
    data.attrTwoDisplayName,
    data.attrLookupToEntity,
    data.attrLookupRelName,
  );
  // Verify that the attribute was successfully created
  externalEntityVerify.verifyLookupAttribute();
  // Check that attributes are displayed in the Data Model list
  externalEntityVerify.verifyAttributeList(
    data.entityAttributes,
    data.attrOneName,
    data.attrTwoName,
  );
  // Delete and verify the attributes created
  await externalEntityActions.deleteAttr(data.attrOneName, data.attrTwoName, data.columnName);
  externalEntityVerify.verifyDeletedAttr(data.attrOneName, data.attrTwoName);
  // Logout from app
  await commonActions.logoutFromApp();
});
