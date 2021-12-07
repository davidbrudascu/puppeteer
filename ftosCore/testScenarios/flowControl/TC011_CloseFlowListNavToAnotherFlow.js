// Actions
const commonActions = require('~actions/commonActions');
const flowControlActions = require('~actions/flowControlActions');
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/flowControl/TC011_CloseFlowListNavToAnotherFlow');
// Verify
const commonVerify = require('~actions/commonVerify');
const flowControlVerify = require('~actions/flowControlVerify');
// Pages
const commonPage = require('~pages/commonPage');
const flowControlPage = require('~pages/flowControlPage');


// Author Victor Pana
// AT-381

Feature('Flow Control');

Scenario('User can add a close flow list for navigate to another step ', async () => {
    // Login as Designer
    await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
    commonActions.accessDirectUrl(data.flowControlStep1DesignerPage);
    // Select Close Flow - list
    flowControlActions.addCloseFlowNavigateTo(flowControlPage.list.navigateToListOptionList);
    //  Select Entity View
    await flowControlActions.selectEntityViewCloseFlowList(data.secondEntityCloseFlow);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonActions.logoutFromApp();
    // Navigate to Portal
    await commonActions.loginInApp(data.urlPortal, data.username, data.password);
    commonActions.accessDirectUrl(data.portalFlowControlActionURL);
    // Verify if the Form is redirect to 2nd Entity List instead of step 2
    flowControlVerify.verifyFormRedirectToAnotherStep(data.clickToInsert, data.firstRecord, flowControlPage.labels.entityViewListLabel);
    commonActions.accessDirectUrl(data.portalFlowControlActionURL);
    // Verify that the new record was added to entity
    commonActions.refreshPage();
    flowControlVerify.verifyIfRecordAddedToEntity(data.viewPortalEntityCloseFlowE01, data.firstRecord);
    // Logoff
    await commonActions.logoutFromApp();
});
