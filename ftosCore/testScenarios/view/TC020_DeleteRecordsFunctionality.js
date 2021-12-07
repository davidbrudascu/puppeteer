// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Data
const data = require('~data/view/TC020_DeleteRecords.json');
// Verify
const viewActionsVerify = require('~actions/viewActionsVerify');

// Author Catalin Diaconu

Feature('View');

Scenario('Automate "Delete record" functionality', async () => {
  // 1 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2 Access your entity "...Main#/entity/AT_DeleteRecords/list/"
  commonActions.accessDirectUrl(data.entityUrl);
  // 3 Navigate to 3rd page, check records and try to delete them
  await viewActions.tryToDelete2Records(
    data.record121,
    data.record122,
    data.row21,
    data.row22,
    data.deleteBtn,
  );
  // 4 Verify if 2nd page is displayed and selected
  viewActionsVerify.verifySelectedPage(data.page2);
  // 5 Delete a record and verify if the next one is displayed correctly
  await viewActions.delete1Record(data.record111, data.row11, data.record112, data.deleteBtn);
  // 6 Delete all records and verify if the table is empty
  viewActions.deleteAllRecordsFromATableDltRecords(data.deleteBtn);
  // 7 Logoff
  await commonActions.logoutFromApp();
});
