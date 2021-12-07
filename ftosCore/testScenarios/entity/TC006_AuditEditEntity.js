// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/entity/TC006_AuditEditEntity');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/viewPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyAttributeActionsField = require('~actions/attributesVerify');

// Author Victor Pana

Feature('Audit Business Entity');

Scenario('User audit edit business entity', async () => {
  // 1. Login using Portal
  // 2. Access you entity: "...Main#/entity/AT_AuditEdit/list"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewUrl + data.entityName + data.portalViewList);
  // 3.Access you record "Auto Test Edited"
  commonActions.accessDirectUrl(
    data.viewUrl + data.entityName + data.portalEditAttribute + data.AT_AuditEditId,
  );
  // 4.Update Name - "Auto Test Edited"
  // 5.Update Value: 1000
  attributeActions.fillUpdateNameAndValueAttribute(
    data.updatedNameOfAttribute, data.updatedValueOfAttribute,
  );
  // 6.Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7.Click on "History" icon -> you are redirect to Audit list
  commonActions.clickButtonAfterLocator(commonPage.buttons.historyButton);
  // 8.Access "Edit" record
  commonActions.selectARowFromTableAfterText(data.operationName);
  await commonActions.getIdFromSelectedRowAndNavigate(
    data.viewUrl + data.entityAuditedName + data.portalEditAttribute,
    attributePage.container.defaultEntityTableContainer,
  );
  // 9."Check all details:
  // 1. _OriginalName: ""Auto Test Edited"" -readonly
  // 2. _OriginalValue: 1000 - readonly
  // 3. Audited User Id: {yourUserId} - readonly
  // 4. _Generic entity Id: ""AT_AuditEntity"" - readonly
  // 5. _AT_AuditEntityid: {yourRecordId} - readonly
  // 6. _Description: check description details - readonly
  // 7. _Operation name: ""Update"" - readonly
  // 8. _OldName: empty - readonly
  // 9. _OldValue: empty - readonly
  // 10. _ADTedName: ""AT for Edit"""
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.originalNameField, data.updatedNameOfAttribute,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.auditedUserIdField, data.auditedUserId,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.genericEntityIdField, data.genericEntityId,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.field.atAuditEditedIdField, data.AT_AuditEditId,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.oparationNameField, data.operationName,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.field.adTedNameField, data.adTedName,
  );
  // 10.Logoff
  await commonActions.logoutFromApp();
});
