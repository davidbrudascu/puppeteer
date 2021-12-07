// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
const codeBlocksEditDeleteActions = require('~actions/codeBlocksEditDeleteActions.js');
// Data
const data = require('~data/coding/TC012_codeBlocksEditDelete_data.json');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author: David Gavriluț
// AT-504: Automate "Code Blocks" Edit/Delete

Feature('Coding');

Scenario('User can edit, use code blocks inside the code editor and delete them', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlCodeBlock);
  codeBlocksEditDeleteActions.editCodeBlock(
    data.nameEdit,
    data.displayNameEdit,
    data.clientSide,
    data.categoryName,
    data.code,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.urlFlowDesigner);
  codeBlocksEditDeleteActions.useCodeBlockOnFlow(
    data.categoryName,
    data.nameEdit,
    data.codeBlockMessage,
    data.codePreview,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFlowPortal);
  codeBlocksEditDeleteActions.checkCodeBlockMessagePortal(data.codeBlockMessage);
  await commonActions.logoutFromApp();
  commonActions.accessDirectUrl(data.urlCodeBlocksList);
  await codeBlocksEditDeleteActions.deleteCodeBlock(data.nameEdit, data.columnName);
  await commonActions.logoutFromApp();
});
