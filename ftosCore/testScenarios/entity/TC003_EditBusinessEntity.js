// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/entity/TC003_EditBusinessEntity');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const actionsBusinessEntityVerify = require('~actions/businessEntityVerify');

const I = actor();

// Author Victor Pana

Feature('Business Entity');

Scenario('User can edit a business entity', async () => {
  // 1. Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entityUrl + data.entityId);
  // 3. "Check the following details:
  //   1) Name: AT_EditEntity - readonly
  //   2) Display Name: AT_EditEntity
  //   3) Display Collection Name: AT_EditEntity
  //   4) Description:
  //   5) PrimaryAttributeName: Name - readonly
  //   6) PrimaryAttributeDisplayName: Name - readonly
  //   7) Select Default Entity Status: Active
  //   8) Is Audited: unchecked
  //   9) Business Workflow: nothing - readonly
  //   10) Optimization Search Data - unchecked"
  actionsBusinessEntityVerify.verifyEditingBusinessEntity(
    data.entityName,
    data.entityDisplayName,
    data.entityDisplayCollectionName,
    data.entityPrimaryAttributeName,
    data.entityPrimaryAttributeDisplayName,
    data.entityDefaultEntityStatus,
  );
  // 4. Update it using the following schema:
  //   1) Name: AT_TBUEntity - readonly
  //   2) Display Name: Auto Test Updated Entity
  //   3) Display Collection Name: Auto Test Updated DCN
  //   4) Description: Auto Test DB Description Updated
  //   5) PrimaryAttributeName: Name - readonly
  //   6) PrimaryAttributeDisplayName: Name - readonly
  //   7) Select Default Entity Status: Active
  //   8) Is Audited: check
  //   9) Business Workflow: nothing - readonly
  //   10) Optimization Search Data - check"
  actionsBusinessEntity.fillAllMandatoryFieldsForBusinessEditingEntity(
    data.entityUpdatedDisplayName,
    data.entityUpdatedDisplayCollectionName,
    data.entityUpdatedDescription,
  );
  // 5. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 6. Go Back
  commonActions.goBackToPreviousPage();
  // 7. Search for your entity using the new display name (Check if entity is present in the list)
  commonActions.accessDirectUrl(data.urlToBusinessEntityList);
  actionsBusinessEntityVerify.verifyIfBusinessEntityExistsInSearch(data.entityName);
  // 8. Logoff
  await commonActions.logoutFromApp();
  // 9. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 10. Navigate to your entity: "...Main#/entity/AT_TBUEntity/list"
  commonActions.accessDirectUrl(data.viewUrl + data.entityName + data.portalViewList);
  // 11. Check if List name is displayed properly: (Auto Test TBU DCN list)
  // 12. Click on "Insert" icon
  // 13. Check if "Add Auto Test TBU Entity" is displayed
  actionsBusinessEntityVerify.verifyEditBusinessEntityInPortal(data.listNameAutoTest, data.attributeAddAutoTest)
  // 14.  Logout
  await commonActions.logoutFromApp();
});
