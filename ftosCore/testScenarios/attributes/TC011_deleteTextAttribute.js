// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/delete_Text_Attribute');
// Verify
const verifyAttributeActions = require('~actions/attributesVerify');


Feature('Attributes');

Scenario('User can delete a text attribute of an entity.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Find Attribute
  attributeActions.searchForAttributeByNameAction(data.deleteAttributeName);
  // Delete Attribute
  attributeActions.selectAndDeleteAttribute(data.deleteAttributeName)
  // Login to Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  // Verify attribute was deleted
  verifyAttributeActions.verifyDeletedAttribute(data.primaryAttDN, data.deleteAttributeName);
  //Logoff
  await commonActions.logoutFromApp();
});
