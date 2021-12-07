// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/entity/TC007_AuditDeleteEntity');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/viewPage');
// Verify
const verifyAttributeActionsField = require('~actions/attributesVerify');

// Author Victor Pana

Feature('Audit Business Entity');

Scenario('User audit delete business entity', async () => {
  // 1. Login using Portal
  // 2. Access you entity: "...Main#/entity/AT_AuditDelete/list"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewUrl + data.entityName + data.portalViewList);
  // 3. Check your record
  commonActions.verifyAValueInTableAfterText(data.dataForFormField);
  commonActions.selectARowFromTableAfterText(data.dataForFormField);
  const atAuditDeleteId = await commonActions.getIdFromSelectedRow(
    attributePage.container.defaultEntityTableContainer,
  );
  commonActions.clickButtonAfterLocator(commonPage.checkbox.selectSingleResultCheckbox);
  // 4. Click on "Delete" icon
  commonActions.deleteSelectionYes(data.entityNoDisplay);
  // 5. Click on "History" icon -> you are redirect to Audit list
  commonActions.clickButtonAfterLocator(commonPage.buttons.historyButton);
  // 6. Access "Delete" record
  commonActions.selectARowFromTableAfterText(data.operationName);
  await commonActions.getIdFromSelectedRowAndNavigate(
    data.viewUrl + data.entityAuditedName + data.portalEditAttribute,
    attributePage.container.defaultEntityTableContainer,
  );
  // 7. Check all details:
  // 1. _OriginalName: ""Auto Test Edited"" -readonly
  // 2. _OriginalValue: 1000 - readonly
  // 3. Audited User Id: {yourUserId} - readonly
  // 4. _Generic entity Id: ""AT_AuditDelete"" - readonly
  // 5. _AT_AuditDeleteid: {yourRecordId} - readonly
  // 6. _Description: check description details - readonly
  // 7. _Operation name: "Delete" - readonly
  // 8. _OldName: empty - readonly ?????Actual "AT for Delete"
  // 9. _OldValue: empty - readonly
  // 10. _ADTedName: ""AT for Edit"" ????Actual NIMIC
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.originalNameField, data.originalName,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.auditedUserIdField, data.auditedUserId,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.genericEntityIdField, data.genericEntityId,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.field.atAuditDeleteIdField, atAuditDeleteId,
  );
  await verifyAttributeActionsField.verifyInputAndReadonlyDetailFromAuditPage(
    attributePage.field.oparationNameField, data.operationName,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.field.adTedNameField, data.adTedName,
  );
  // 8. Logoff
  await commonActions.logoutFromApp();
});
