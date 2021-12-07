// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/view/TC003_CreateFetchView');
// Actions
const commonActions = require('~actions/commonActions');
const viewActions = require('~actions/viewActions');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const viewActionVerify = require('~actions/viewActionsVerify');

// Author Victor Pana
// JIRA ID: AT-59

Feature('View');

Scenario('User can create a view - fetch section + update column name and columns order', async () => {
  // 1. Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Access your entity
  commonActions.accessDirectUrl(data.viewAT_CreateFetchURL);
  // Create new Fetch View
  viewActions.createNewFetchView(data.dataViewsTab, data.insertButton, data.newViewName,
    data.newDisplayName, data.showDisplayName, data.dataTab, data.fetchObjectExpressionMonaco,
    data.popupDialogYes, data.crncyCode, data.currencyCode, data.baseValue,
    data.baseName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);

  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewAT_CreateViewFetchPortal);
  // Verify that the fetch view is correctly display in portal
  viewActionVerify.verifyCreateFetchViewInPortal(data.nameAT_CreateViewFetchList, data.columnName, data.columnValue,
      data.crncyCode, data.nameAutoTest1, data.nameAutoTest2, data.codeUSD);
  await commonActions.logoutFromApp();
});
