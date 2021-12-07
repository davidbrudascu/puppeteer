// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/entity/TC016_RelConstraintRestrictedRelationship');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can check constraint restricted relationship', async () => {
  // 1	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2	Navigate to ...Main#/entity/AT_CreateRelRestricted2/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted2 + data.portalViewList,
  );
  // 3	Access "Parent1" record
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer,
    data.recordParent1);
  // 4	Check if the list contains 2 Childs (Child1 and Child2)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,
    data.child1_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer,
    data.child2_Name);
  // 5	Click on Insert button
  commonActions.clickToolbarButton(data.insertButton);
  // 6	Fill in Name with: Child3
  commonActions.fillField(
    attributePage.fields.nameNewChild_AT_CreateRelCascade1Field, data.child3_Name,
  );
  // 7	Save and Close ->  a success message is displayed
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8	The record was added in list
  commonVerify.verifyValueExistsInTable(attributePage.fields.tableRowValueFrom_AT_CreateRelRestricted1_AT_CreateRelRestricted2Field, data.child3_Name);
  // 9	Go back to ...Main#/entity/AT_CreateRelRestricted2/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted2 + data.portalViewList,
  );
  // 10	Check your record "Parent1"
  commonActions.selectARowFromTableAfterText(data.recordParent1);
  // 11	Click on "delete" icon
  commonActions.clickSidebarButton(data.deleteButton);
  commonActions.clickButtonAfterLocator(attributePage.selector.constrRelshipYesPopupButton);
  // 12	An error message is displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.ToastErrorMessage);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.ToastErrorMessage,
  );
  // 13	Check your record "Parent2"
  commonActions.selectARowFromTableAfterText(data.recordParent2);
  // 14	Click on "delete" icon
  commonActions.clickSidebarButton(data.deleteButton);
  commonActions.clickButtonAfterLocator(attributePage.selector.constrRelshipYesPopupButton);
  // 15	Check if your record was deleted (Check if Parent2 is not displayed, but Parent1 is displayed)
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer, data.recordParent2);
  // 16	Access again your record "Parent1"
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer,
    data.recordParent1);
  // 17	Update its name to "Parent1 Updated"
  commonActions.fillInTextValueInInput(attributePage.fields.constrRelshipRestrictedUpdateParent, data.recordParent1Updated);
  // 18	Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19	Check if its Childs are still displayed: "Child1", "Child2" and "Child3"
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child1_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child2_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child3_Name);
  // 20	Go to ...Main#/entity/AT_CreateRelRestricted1/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CreateRelRestricted1 + data.portalViewList,
  );
  // 21	Check if there are 3 Childs (Child1, Child2 and Child3)
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child1_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child2_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child3_Name);
  // 22	Check Child1 and Child2 and click on "delete" icon
  // commonActions.selectARowFromTableAfterTextttt(data.child3_Name)
  // commonActions.selectARowFromTableAfterTextttt(data.child2_Name)
  commonActions.clickButtonAfterLocator(attributePage.checkboxes.selectAllRecordsFromTableCheckbox);
  commonActions.selectARowFromTableAfterText(data.child3_Name);
  commonActions.clickSidebarButton(data.deleteButton);
  commonActions.clickButtonAfterLocator(attributePage.selector.constrRelshipYesPopupButton);
  // 23	Check if your record was deleted (Check if only Child3 is available; Child 1 and 2 are not available)
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer, data.child1_Name);
  commonVerify.verifyValueDontExistsInTable(attributePage.container.defaultEntityTableContainer, data.child2_Name);
  commonVerify.verifyValueExistsInTable(attributePage.container.defaultEntityTableContainer, data.child3_Name);
  // 24	Access Child3
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer,
    data.child3_Name);
  // 25	Check if Parent is "Parent1 Updated"
  await commonVerify.verifyValueExistsInInput(attributePage.fields.parentUpdatedInputField, data.recordParent1Updated);
  // 26	logoff
  await commonActions.logoutFromApp();
});
