// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/entity/TC004_AuditBusinessEntity');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const actionsBusinessEntityVerify = require('~actions/businessEntityVerify');

// Author Victor Pana

Feature('Audit Business Entity');

Scenario('User audit a business entity', async () => {
  // 1. Login using Studio
  // 2. Navigate to your entity "...Main#/entity/entity/edit/{yourEntityId}"
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityUrl + data.entityId);
  // 3. Check "Is Audited"
  actionsBusinessEntity.selectIsAuditedcheckbox();
  // 4. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 5. Search for "AT_AuditEntity_ADT" - Check if the entity is present in results list
  commonActions.accessDirectUrl(data.urlToBusinessEntityList);
  actionsBusinessEntityVerify.verifyIfBusinessEntityExistsInSearch(data.entityAuditedName);
  // 6. Logoff
  await commonActions.logoutFromApp();
});
