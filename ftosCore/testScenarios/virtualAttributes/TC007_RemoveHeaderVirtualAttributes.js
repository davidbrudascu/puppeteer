// Actions
const commonActions = require('~actions/commonActions');
const vaActions = require('~actions/virtualAttributeActions');
// Verify
const commonVerify = require('~actions/commonVerify');
const vaVerify = require('~actions/virtualAttributeVerify');
// Data
const data = require('~data/virtualAttributes/TC007_RemoveHeaderVirtualAttributes.json');
// Constants
const constants = require('~config/constants');
// Page
const vaPage = require('~pages/virtualAttributePage');
const commonPage = require('~pages/commonPage');

// Author Pana Victor
// AT-482

Feature('Virtual Attributes');

Scenario('Remove Header Items Virtual Attributes', async () => {

  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.fdfUrl);
  await vaActions.removeTwoHeaderItems(data.nameHeaderVADateAttribute, data.nameHeaderVALookupAttribute, data.nameHeaderVANameAttribute);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlPortalEntity);
  vaVerify.verifyRemoveHeaderVA(
      data.firstRecord,
      data.nameHeaderVADateAttribute,
      data.attributeDate,
      data.nameHeaderVALookupAttribute,
      data.nameHeaderVANameAttribute,
      data.name_02VA,
      );
  vaActions.addNewRecordRemoveHeaderItems(data.clickToInsert, data.secondRecord, data.name_04VA, data.name_04VATextAttr, data.thirdRecord, data.attributeDate);
  commonActions.refreshPage();
  commonActions.doubleClickValueFromTable(vaPage.container.defaultContainer, data.secondRecord);
  vaVerify.verifyHeaderItemsAttrNotDisplayed(data.nameHeaderVADateAttribute, data.attributeDate);
  vaVerify.verifyHeaderItemsAttrNotDisplayed(data.nameHeaderVALookupAttribute, data.firstRecord);
  vaVerify.verifyHeaderItemsAttribute(data.nameHeaderVANameAttribute, data.name_04VA);
  await commonActions.logoutFromApp();
});
