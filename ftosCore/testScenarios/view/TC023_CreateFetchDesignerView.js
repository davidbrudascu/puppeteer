// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/view/TC023_CreateFetchDesignerView');
// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana
// JIRA ID: AT-55

Feature('View');

Scenario('User can create a view - fetch designer section', async () => {
  // 1  Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.viewAT_CreateFetchURL);
  // Create a specific Fetch Designer
  viewActions.addNewFetchDesigner(data.entityAT_CreateViewFetch, data.aliasName, data.firstEntity, data.secondEntity,
      data.thirdEntity, data.fourthEntity, data.fifthEntity, data.sixthEntity, data.currencyCode,
      data.andCondition, data.baseAT_CreateViewFetchEntity, data.currencyAttribute, data.operand,
      data.codeEuro);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // FIXME Verify Fetch Object Expression
  viewActions.generateNewColumns(data.popupDialogYes, data.currencyCode, data.nameColumn)
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewAT_CreateViewFetchPortal);
  // Verify that the fetch view is correctly display in portal
  viewActionVerify.verifyFetchViewPortal(data.firstRecordFetchView, data.secondRecordFetchView, data.currencyEUR);
  await commonActions.logoutFromApp();
});
