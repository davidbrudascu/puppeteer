// Actions
const commonActions = require('~actions/commonActions');
const vaActions = require('~actions/virtualAttributeActions');
// Data
const data = require('~data/virtualAttributes/TC004_LocalizeVirtualAttributes.json');

// Author Catalin Diaconu

Feature('Virtual Attributes');

Scenario('Localize Virtual Attributes', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to custom Virtual Attribute
  commonActions.accessDirectUrl(data.urlEntity);
  // 3 Verify display name before and after the language was changed
  await vaActions.verifyDnLocalizeVA(
    data.customENDisplayName,
    data.customRODisplayName,
    data.romanian,
  );
  // 4 Navigate to related custom Virtual Attribute
  commonActions.accessDirectUrl(data.relatedVirtualAttributeUrl);
  // 5 Verify display name before and after the language was changed
  await vaActions.changeDisplayNameChangeLanguageLocalizeVA(
    data.relatedCodeENDisplayName,
    data.relatedCodeRODisplayName,
    data.engleza,
  );
  // 6 Logoff
  await commonActions.logoutFromApp();
  // 7 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 8 Access your entity "...Main#/entity/AT_LocalizeVA/list"
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 9 Create a new attribute and verify labels
  await vaActions.addVirtualAttributeEnLocalizeVA(
    data.insertBtn,
    data.nameLabel,
    data.lookupLabel,
    data.customENDisplayName,
    data.relatedCodeENDisplayName,
    data.name1Lookup,
    data.relatedCodeEN,
  );
  // 10 Change language, create a new attribute and verify labels
  await vaActions.addVirtualAttributeRoLocalizeVA(
    data.romanian,
    data.nameLabel,
    data.lookupLabel,
    data.customRODisplayName,
    data.relatedCodeRODisplayName,
    data.name1Lookup,
    data.relatedCodeRO,
  );
  // 11 Logoff
  await commonActions.logoutFromApp();
});
