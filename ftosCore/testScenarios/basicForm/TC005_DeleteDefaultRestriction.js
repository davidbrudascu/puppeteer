// Actions
const commonActions = require('~actions/commonActions');
const basicFormActions = require('~actions/basicFormActions');
// Data
const data = require('~data/basicForm/TC005_DeleteDefaultRestriction');

// Author Catalin Diaconu

Feature('Basic Form');

Scenario('Delete Default Restriction', async () => {
  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Navigate to your entity: "...Main#/entity/entity/edit/{yourEntityId}"
  commonActions.accessDirectUrl(data.entityUrl);
  // 3 Fill in name, try to save and verify error
  basicFormActions.createDataFormDDR(
    data.sectionDataForms,
    data.randomName,
    data.error2StandardFormsDefined,
  );
  // 4 Try to delete a record then verify error message
  await basicFormActions.tryToDeleteDataFormEntryDDR(
    data.defaultForm,
    data.errorDefaultFormDelete,
  );
  // 5 Access form and verify checkboxes
  basicFormActions.accessDataFormRecordDDR(
    data.deleteForm,
    data.isDefaultCheckbox,
    data.infoMessage,
  );
  // 6 Delete record from table
  await basicFormActions.deleteDataFormRecordDDR(
    data.defaultForm,
  );
  // 7 Try to insert new record and verify error
  basicFormActions.insertNewDataFormRecordDDR(
    data.newName,
    data.errorMessage,
  );
  // 8 Logoff
  await commonActions.logoutFromApp();
});
