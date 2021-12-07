// Actions
const commonActions = require('~actions/commonActions');
const verifyBusinessEntityAction = require('~actions/businessEntityVerify');
// Data
const data = require('~data/entity/TC002_DeleteBusinessEntity');

// Author Victor Pana

Feature('Business Entity');

Scenario('User can delete a business entity', async () => {
  // 1. Login with Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to "...Main#/entity/entity/list"
  commonActions.accessDirectUrl(data.urlToBusinessEntityList);
  // 3. Search for your Entity ("AT_DeleteEntity")
  verifyBusinessEntityAction.verifyIfBusinessEntityExistsInSearch(data.entityName);
  // 4. Check it
  // 5. Click on "delete" icon
  // 6. Click "Cancel" - check if your entity wasn't deleted
  commonActions.deleteSelectionNo(data.entityName);
  // 7. Verify if Entity exist
  // 8. refresh the page
  commonActions.refreshPage();
  verifyBusinessEntityAction.verifyIfBusinessEntityExistsInSearch(data.entityName);
  // 9. Click "Delete" icon again
  // 10.Click "Yes"
  // 11. Search again for your entity - The entity isn't displayed anymore in the list results
  commonActions.deleteSelectionYes(data.entityNoDisplay);
  // 12. Logout
  await commonActions.logoutFromApp();
});
