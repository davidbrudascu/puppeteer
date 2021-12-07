// Actions
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
// Data
const data = require('~data/coding/TC014_UserCanFilterByProject.json');
// Verify
const codeEditorVerify = require('~actions/codeEditorVerify');

// Author Avram Adina
// AT-1203

Feature('Coding');

Scenario('User can filter project deployment with 2 DA by Project in Code Editor', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  codeEditorActions.accessAdvancedCodeEditor(data.advancedCodEditorSearch);
  await codeEditorVerify.verifyFilterByProjectContainer(data.projectDeployment, data.nbDA, data.independentDA);
  await codeEditorVerify.verifyFilterByProjectAction(data.projectDeployment, data.nameDA1, data.nameDA2);
  await commonActions.logoutFromApp();
});
