// Actions
const commonActions = require('~actions/commonActions');
const vaActions = require('~actions/virtualAttributeActions');
// Verify
const commonVerify = require('~actions/commonVerify');
const vaVerify = require('~actions/virtualAttributeVerify');
// Data
const data = require('~data/virtualAttributes/TC006_EditHeaderVirtualAttributes.json');
// Constants
const constants = require('~config/constants');
// Page
const vaPage = require('~pages/virtualAttributePage');
const commonPage = require('~pages/commonPage');

// Author Pana Victor
// AT-482

Feature('Virtual Attributes');

Scenario('Edit Header Items Virtual Attributes', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.fdfUrl);
  vaActions.addVirtualAttributeHeaderItems(data.nameHeaderVATextAttribute, data.virtualAttrText)
  vaActions.addVirtualAttributeHeaderItems(data.nameHeaderVADateAttribute, data.virtualAttrDate);
  vaActions.addVirtualAttributeHeaderItems(data.nameHeaderVALookupAttribute, data.virtualAttrLookup);
  vaActions.addVirtualAttributeHeaderItems(data.nameHeaderVANameAttribute, data.virtualAttrName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlPortalEntity);
  vaActions.addNewRecordEditHeaderVa(data.clickToInsert, data.firstRecord, data.name_02VATextAttr, data.name_02VA, data.attributeDate);
  commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, data.firstRecord);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVATextAttribute, data.name_02VATextAttr);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVANameAttribute, data.name_02VA);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVALookupAttribute, data.firstRecord);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVADateAttribute, data.attributeDate);
  vaActions.editRecordHeaderVirtualAttribute(data.name_02VAUpdate, data.name_02VATextAttrUpdate, data.attributeDateUpdate);
  commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, data.firstRecord);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVATextAttribute, data.name_02VATextAttrUpdate);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVANameAttribute, data.name_02VAUpdate);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVADateAttribute, data.attributeDateUpdate);
  await commonActions.logoutFromApp();
});
