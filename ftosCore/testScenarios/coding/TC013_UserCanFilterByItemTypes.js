// Actions
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
// Data
const data = require('~data/coding/TC013_UserCanFilterByItemTypes.json');
// Verify
const codeEditorVerify = require('~actions/codeEditorVerify');

// Author Avram Adina
// AT-1200

Feature('Coding');

Scenario('User can filter an entity linked/unlinked to DA by Item Types', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  codeEditorActions.accessAdvancedCodeEditor(data.advancedCodEditorSearch);
  await codeEditorVerify.verifyFilterByItemContainer();
  codeEditorVerify.verifyIfEntityExistInAdvanceCodEditor(data.nameDA, data.entityLinked, data.entityUnlinked);
  await commonActions.logoutFromApp();
});
