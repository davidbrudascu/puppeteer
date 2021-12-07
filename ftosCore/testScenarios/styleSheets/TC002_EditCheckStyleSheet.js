// Actions
const commonActions = require('~actions/commonActions');
const styleSheetsActions = require('~actions/styleSheetsActions');
// Data
const data = require('~data/styleSheets/TC002_EditCheckStyleSheet.json');

// Author: Andrei Fabian
// AT-368

Feature('Style Sheet');

Scenario('User can edit an existing stylesheet', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlStyleSheet);
  styleSheetsActions.editStyleSheet(data.monacoCode);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlCheckCSS);
  await styleSheetsActions.checkStyleSheet(data.scriptStyleSheet, data.colorCode);
  await commonActions.logoutFromApp();
});
