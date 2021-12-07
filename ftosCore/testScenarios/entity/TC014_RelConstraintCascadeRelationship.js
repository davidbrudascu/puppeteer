// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/entity/TC014_RelConstraintCascadeRelationship');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can check constraint cascade relationship', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Access your entity ...Main#/entity/AT_CreateRelCascade2/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelCascade2 + data.portalViewList,
  );
  // 3. Access your record "Parent1"
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer,
      data.recordParent1);
  // 4. Check if the list contains 2 Childs (Child1 and Child2)
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelCascade1_AT_CreateRelCascade2IdwField, data.child1_Name);
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelCascade1_AT_CreateRelCascade2IdwField, data.child2_Name);
  // 5. Click on "Insert" button
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.insertNewChild_AT_CreateRelCascade1_AT_CreateRelCascade2Button,
  );
  // 6. Fill in Name with: Child3
  commonActions.fillField(
    attributePage.fields.nameNewChild_AT_CreateRelCascade1Field, data.child3_Name,
  );
  // 7. Click on Save and Close -> a success message is displayed
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8. The record was added in list
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelCascade1_AT_CreateRelCascade2IdwField,data.child3_Name);
  // 9. Go back to ...Main#/entity/AT_CreateRelCascade2/list/
  commonActions.accessDirectUrl(
      data.viewUrl + data.entity_AT_CreateRelCascade2 + data.portalViewList,
  );
  // 10. Check Parent and click on "delete" icon
  // 11. Your record was deleted
  commonActions.selectARowFromTableAfterText(data.recordParent1)
  commonActions.clickSidebarButton(data.deleteButton);
  commonActions.clickButtonAfterLocator(attributePage.selector.constrRelshipYesPopupButton)
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer,
      data.recordParent1);
  // 12. Navigate to ...Main#/entity/AT_CreateRelCascade1/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelCascade1 + data.portalViewList,
  );
  // 13. Check if your list contains "Child4" and "Child5"; Child1, 2 and 3 are not displayed
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer,
      data.child1_Name);
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer,
      data.child2_Name);
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer,
      data.child3_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,
      data.child4_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,
      data.child5_Name);
  // 14. Navigate to ...Main#/entity/AT_CreateRelRestricted2/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted2 + data.portalViewList,
  );
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted2 + data.portalEditAttribute
    + data.AT_CreateRelRestricted2PARENT_Id,
  );
  // 15. Check if the list contains 2 Childs (Child1 and Child2)
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelRestricted1_AT_CreateRelRestricted2Field,data.child1_Name);
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelRestricted1_AT_CreateRelRestricted2Field,data.child2_Name);
  // 16. Click on Insert button
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.insertNewChild_AT_CreateRelRestricted1_AT_CreateRelRestricted2Button,
  );
  // 17. Fill in Name with: Child3
  commonActions.fillField(
    attributePage.fields.nameNewChild_AT_CreateRelCascade1Field, data.child3_Name,
  );
  // 18. Save and Close ->  a success message is displayed
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19. The record was added in list
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelRestricted1_AT_CreateRelRestricted2Field,data.child3_Name);
  // 20. Go back to ...Main#/entity/AT_CreateRelRestricted2/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted2 + data.portalViewList,
  );
  // 21. Check your record "Parent"
  commonActions.clickButtonAfterLocator(attributePage.selector.constrRelshipRecordParentFromTable)
  commonActions.clickSidebarButton(data.deleteButton);
  // 22. Click on "delete" icon
  commonActions.clickButtonAfterLocator(attributePage.selector.constrRelshipYesPopupButton)
  // 23. An error message is displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      data.ToastErrorMessage);
  // 24. Go to ...Main#/entity/AT_CreateRelRestricted1/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted1 + data.portalViewList,
  );
  // 25. Check if there are 3 Childs (Child1, Child2 and Child3)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,data.child1_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,data.child2_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,data.child3_Name);
  // 26. Check Child3 and click on "delete" icon
  commonActions.selectARowFromTableAfterText(data.child3_Name)
  commonActions.clickSidebarButton(data.deleteButton);
  // 22. Click on "delete" icon
  commonActions.clickPopupDialog(data.popupDialogYes);
  // 27. Check if your record was deleted
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer,data.child3_Name)
  // 28. logoff
  await commonActions.logoutFromApp();
});
