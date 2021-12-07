// Actions
const commonActions = require('~actions/commonActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/entity/TC005_AuditInsertEntity');
// Pages
const auditPages = require('~pages/auditPage');
const attributePage = require('~pages/viewPage');
const commonPage = require('~pages/commonPage');
// Verify
const verifyAttributeActionsField = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
const auditVerify = require('~actions/auditVerify');

// Author Victor Pana

Feature('Audit Business Entity');

Scenario('User audit insert business entity', async () => {
  // 1.Login using Portal
  // 2.Access you entity: "...Main#/entity/AT_AuditInsert/list"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewUrl + data.entityName + data.portalViewList);
  commonVerify.verifyEmptyTableData();
  // 3.Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 4.Fill in Name - "Auto Test Insert"
  commonActions.fillInTextValueInInput(auditPages.fields.auditNameLocateField, data.dataForFormField);
  // 5.Leave Value empty
  // 6.Save and Reload
  commonActions.saveAndRefreshAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7.Click on "History" icon -> you are redirect to Audit list
  commonActions.clickSidebarButton(data.historyButton);
  // 8.Check if there is one entry with "Insert" operation name and with the current timestamp
  auditVerify.verifyHistoryPageInsertOperation();
  // 9.Access "Insert" record
  commonActions.doubleClickValueFromTable(auditPages.container.containerContent, data.insertStatus);
  // 10."Check all details:
  // 1. _OriginalName: ""Auto Test Insert"" -readonly
  // 2. _OriginalValue: empty - readonly
  // 3. Audited User Id: {yourUserId} - readonly
  // 4. _Generic entity Id: ""AT_AuditEntity"" - readonly
  // 5. _AT_AuditEntityid: {yourRecordId} - readonly
  // 6. _Description: check description details - readonly
  // 7. _Operation name: ""Insert"" - readonly
  // 8. _OldName: empty - readonly
  // 9. _OldValue: empty - readonly
  // 10. _ADTedName: ""Auto Test Insert"""
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.originalNameField, data.originalName,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.auditedUserIdField, data.auditedUserId,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.genericEntityIdField, data.genericEntityId,
  );
  //FIXME _AT_AuditInsertid se schimba la fiecare rulare
  // await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
  //   attributePage.field.atAuditInsertIdField, data.atAuditEntityId,
  // );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.oparationNameField, data.operationName,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.field.adTedNameField, data.adTedName,
  );
  // 11.Logoff
  await commonActions.logoutFromApp();
});
