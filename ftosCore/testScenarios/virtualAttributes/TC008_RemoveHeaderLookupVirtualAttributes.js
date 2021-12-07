// Actions
const commonActions = require('~actions/commonActions');
const vaActions = require('~actions/virtualAttributeActions');
// Verify
const commonVerify = require('~actions/commonVerify');
const vaVerify = require('~actions/virtualAttributeVerify');
// Data
const data = require('~data/virtualAttributes/TC008_RemoveHeaderLookupVirtualAttributes.json');
// Page
const vaPage = require('~pages/virtualAttributePage');

// Author Pana Victor
// AT-482

Feature('Virtual Attributes');

Scenario('Remove Header Lookup Items Virtual Attributes', async () => {

  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlPortalEntity);
  commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, data.firstRecord);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVANameAttribute, data.name_02VA);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVALookupAttribute, data.firstRecord);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVADateAttribute, data.attributeDate);
  vaActions.removeLookupAttributeFromForm();
  commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, data.firstRecord);
  vaVerify.verifyHeaderItemsAttrNotDisplayed(data.nameHeaderVANameAttribute, data.name_02VA);
  vaVerify.verifyHeaderItemsAttrNotDisplayed(data.nameHeaderVALookupAttribute, data.firstRecord);
  vaVerify.verifyHeaderItemsAttrNotDisplayed(data.nameHeaderVADateAttribute, data.attributeDate);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.inputNameVAField, data.emptyValue);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.inputNameAtt_textVAField, data.emptyValue);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.inputNameAtt_DateVAField, data.emptyValue);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.inputNameAtt_LookupVAField, data.emptyValue);
  await commonActions.logoutFromApp();
});
