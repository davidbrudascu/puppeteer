// Actions
const commonActions = require('~actions/commonActions');
const externalEntityActions = require('~actions/externalEntityActions');
// Data
const data = require('~data/externalEntity/TC005_externalEntity_data');
// Verify
const externalEntityVerify = require('~actions/externalEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('External Source Data Entity');

Scenario('User can edit/delete a Lookup Attribute for External Entity', async () => {
  // Login in Studio App and access Business Entities list page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.externalLookupAttrURL);
  // Edit lookup attribute
  externalEntityActions.editLookupAttribute(data.lookupAttrDescription, data.lookupAttrTooltip);
  // Verify the changes made on lookup
  externalEntityVerify.verifyLookupAttr(data.lookupAttrDescription, data.lookupAttrTooltip);
  // Add item in Lookup Correlation Attributes table
  externalEntityActions.addLookupCorrelation(data.baseAttrName, data.refAttrName);
  // Verify that the Lookup Correlation attribute was successfully created
  externalEntityVerify.verifyLookupCorrelation(data.baseAttrName, data.refAttrName);
  // Login in Portal and check the changes made
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.businessEntityURL);
  externalEntityVerify.verifyChangesInPortal(data.lookupAttrTooltip);
  // Go to Designer and delete the lookup attribute (also check delete restriction)
  commonActions.accessDirectUrl(data.externalEntityURL);
  await externalEntityActions.deleteLookupAttr(
    data.entityAttributes,
    data.lookupAttrName,
    data.externalLookupAttrURL,
    data.baseAttrName,
    data.refAttrName,
  );
  // Logout from app
  await commonActions.logoutFromApp();
});
