// Constants
const constants = require('~config/constants');

// Pages
const commonPage = require('~pages/commonPage');

// Actions
const commonActions = require('~actions/commonActions');
const codeBlocksCategoryActions = require('~actions/codeBlocksCategoryActions');

// Data
const data = require('~data/coding/TC011_codeBlocksAddEditDeleteCategory_data.json');

// Verify
const commonVerify = require('~actions/commonVerify');
const codeBlocksCategoryVerify = require('~actions/codeBlocksCategoryVerify');

// Author: David Gavriluț
// AT-503: Automate "Code Blocks": Add/Edit/Delete Category

Feature('Coding');

Scenario('User can add/edit/delete a code block category', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlCodeBlocksCategories);
  await codeBlocksCategoryActions.addCodeBlocksCategory(data.codeBlocksCategories, data.codeBlocksCategoryName, data.codeBlocksCategoryDisplayName, data.columnName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  codeBlocksCategoryVerify.verifyCodeBlocksCategoryFields(data.codeBlocksCategoryName, data.codeBlocksCategoryDisplayName, data.inactiveCodeBlock);
  codeBlocksCategoryActions.editCodeBlocksCategory(data.codeBlocksCategoryDisplayNameEdit, data.activeCodeBlock);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  codeBlocksCategoryVerify.verifyCodeBlocksCategoryFields(data.codeBlocksCategoryName, data.codeBlocksCategoryDisplayNameEdit, data.activeCodeBlock);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await codeBlocksCategoryActions.deleteCodeBlocksCategory(data.codeBlocksCategoryName, data.columnName);
  await commonActions.logoutFromApp();
});
