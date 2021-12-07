// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const styleSheetsActions = require('~actions/styleSheetsActions');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Data
const data = require('~data/styleSheets/TC001_CreateDeleteStyleSheet.json');

// Author: Andrei Fabian
// AT-368

Feature('Style Sheet');

Scenario('User can create and delete a stylesheet', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlStyleSheet);
  styleSheetsActions.createStyleSheet(data.styleSheetName, data.codeMonaco);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  styleSheetsActions.deleteStyleSheet(data.styleSheetTest);
  await commonActions.logoutFromApp();
});
