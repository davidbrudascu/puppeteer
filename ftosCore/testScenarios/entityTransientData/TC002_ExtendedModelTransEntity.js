// Actions
const commonActions = require('~actions/commonActions');
const transientEntityActions = require('~actions/transientEntityActions');
// Data
const data = require('~data/transientEntity/TC002_transientEntity_data');
// Verify
const transientEntityVerify = require('~actions/transientEntityVerify');

// Author Ionut Daniel Mindrescu

Feature('Transient Data Entity');

Scenario('User can create an extended model for transient data entity', async () => {
  // Login in Studio App and access the Platform Data Entity page
  await commonActions.loginInApp(data.urlDesigner, data.usernameStudio, data.password);
  commonActions.accessDirectUrl(data.transPlatExtEntityURL);
  // Add a new Transient type Extended Model:
  // first verify that error message is returned for Transient entities with no script/attributes
  // second, add the correct Transient entity
  transientEntityActions.insertTransExtModel(
    data.extModelSection,
    data.transExtModelName,
    data.invalidTransEntity,
    data.validTransEntity,
  );
  // Add Virtual Attribute for Extended Model.
  transientEntityActions.addVirtualAttr();
  // Verify that the Virtual Attribute was created properly.
  transientEntityVerify.verifyVirtualAttr();
  // Add the extended model to Form Driven Flow
  commonActions.accessDirectUrl(data.fdfBusinessExtURL);
  transientEntityActions.addExtModelToFDF(data.transExtModelName);
  // Add the virtual attribute to Form Driven Flow
  commonActions.accessDirectUrl(data.fdfStepURL);
  transientEntityActions.addVirtAttrToFDF(data.selectAttributeExtModelName);
  // Logout from app
  await commonActions.logoutFromApp();
  // Login in Portal App to verify the Virtual Attribute in Form Driven Flow
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  commonActions.accessDirectUrl(data.platformEntityURL);
  transientEntityVerify.verifyVirtAttr(data.vaName);
  // Logout from app
  await commonActions.logoutFromApp();
});
