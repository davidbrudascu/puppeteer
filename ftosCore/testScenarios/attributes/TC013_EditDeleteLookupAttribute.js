// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC013_EditDeleteLookupAttribute.json');
// Verify
const attributesVerify = require('~actions/attributesVerify');

// Author Catalin Diaconu

Feature('Attributes');

Scenario('Automate Edit/Delete lookup functionality', async () => {
  // 1 Login as Studio
  await commonActions.loginInApp(
    data.urlDesigner,
    data.username,
    data.password,
  );
  // 2 Navigate to your entity
  commonActions.accessDirectUrl(data.urlEntity);
  // 3 Delete entity
  await attributeActions.deleteEntityDltLookup(
    data.deleteLkpID,
    data.entForDeleteLkpIdRow,
  );
  // 4 Access Entity, update Display name and check Readonly checkbox
  attributeActions.changeEntityValuesDltLookup(
    data.editEntity,
    data.updatedDisplayName,
  );
  // 5 Logoff
  await commonActions.logoutFromApp();
  // 6 Login using Portal
  await commonActions.loginInApp(
    data.urlPortal,
    data.username,
    data.password,
  );
  // 7 Access your record
  commonActions.accessDirectUrl(data.urlEntityPortal);
  // 8 Verify labels and update name
  await attributesVerify.verifyEntriesDltLookup(
    data.updatedDisplayName,
    data.nameLabel,
    data.lookupUpdatedInput,
    data.nameUpdated,
  );
  // 9 Logoff
  await commonActions.logoutFromApp();
});
