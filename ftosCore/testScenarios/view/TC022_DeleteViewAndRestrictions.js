// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/view/TC022_DeleteViewAndRestrictions.json');

// Author Catalin Diaconu

Feature('View');

Scenario('Delete Default Restriction', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.entityUrl);
  // 3 Expand Data Views and try to delete default record
  await viewActions.deleteDataViewRecordDDRV(
    data.noDeleteRecord,
    data.deleteRecord,
    data.firstRow,
    data.secondRow,
    data.defaultViewError,
  );
  // 4 Try to save an entity with the same name as the default one
  viewActions.insertDataViewRecordDDR(
    data.noDeleteRecord,
    data.newName,
    data.isDefaultCheckbox,
    data.sameNameViewError,
  );
  // 5 Logoff
  await commonActions.logoutFromApp();
});
