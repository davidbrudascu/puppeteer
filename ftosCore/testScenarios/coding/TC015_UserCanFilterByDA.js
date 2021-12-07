// Actions
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
// Data
const data = require('~data/coding/TC015_UserCanFilterByDA.json');
// Verify
const codeEditorVerify = require('~actions/codeEditorVerify');

// Author Avram Adina
// AT-1204

Feature('Coding');

Scenario('User can filter existing DA by Digital Assets', async () => {
    await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
    codeEditorActions.accessAdvancedCodeEditor(data.advancedCodEditorSearch);
    await codeEditorVerify.verifyFilterByDAContainer(data.nameDA1, data.nameDA2);
    codeEditorVerify.verifyFilterByDAAction(data.nameDA1, data.nameDA2);
     await commonActions.logoutFromApp();
});
