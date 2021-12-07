// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/entity/TC012_CheckConfigRelationship');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyBusinessEntityAction = require('~actions/businessEntityVerify');

const I = actor();

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can check config entity relationship', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Access your entity ...Main#/entity/AT_CheckRelConfig1/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CheckRelConfig1_Name + data.portalViewList,
  );
  // 3. Access a record (Auto T 1)
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CheckRelConfig1_Name + data.portalEditAttribute
    + data.autoTest_AutoT_1_Id,
  );
  commonVerify.verifyEmptyTableData()
  // 6. Check the view -> contains Code, City and Address columns
  verifyBusinessEntityAction.verifyDetailsOnField(
    attributePage.container.tableAT_CheckRelConfig2_AT_CheckRelConfig1_ViewContainer,
    data.view_AT_CHECKRELCONFIG2_Code,
  );
  verifyBusinessEntityAction.verifyDetailsOnField(
    attributePage.container.tableAT_CheckRelConfig2_AT_CheckRelConfig1_ViewContainer,
    data.view_AT_CHECKRELCONFIG2_City,
  );
  verifyBusinessEntityAction.verifyDetailsOnField(
    attributePage.container.tableAT_CheckRelConfig2_AT_CheckRelConfig1_ViewContainer,
    data.view_AT_CHECKRELCONFIG2_Address,
  );
  // 7. Click on "Insert existing" button
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.insertExistingButton_AT_CheckRelConfig2_AT_CheckRelConfig1_Button,
  );
  // 8. Check the View -> contains Name and Code columns
  I.waitForVisible(locate('td').withText('Product 1').inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_CheckRelConfig2_AT_CheckRelConfig1_insert_manyPopup_lookupgrid' })), constants.SHORT_WAIT);
  verifyBusinessEntityAction.verifyDetailsOnField(
    attributePage.container.tableAT_CheckRelConfig2_AT_CheckRelConfig1_ViewPopup_Container,
    data.view_AT_CHECKRELCONFIG2_Code,
  );
  verifyBusinessEntityAction.verifyDetailsOnField(
    attributePage.container.tableAT_CheckRelConfig2_AT_CheckRelConfig1_ViewPopup_Container,
    data.view_AT_CHECKRELCONFIG2_Name,
  );
  // 9. Select a record (Product 1)
  commonActions.selectARowFromTableAfterText(data.selectARecordProduct);
  // 10. Click Ok
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.okInsert_AT_CheckRelConfig2_AT_CheckRelConfig1_ViewPopup_Button,
  );
  // 11. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12. Navigate to ...Main#/entity/AT_CheckRelConfig2/list/
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CheckRelConfig2_Name + data.portalViewList,
  );
  // 13. Access a record (Product 1)
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_CheckRelConfig2_Name + data.portalEditAttribute
    + data.autoTest_Product1_Id,
  );
  // 14. Expand "Auto Test Section" section
  commonActions.clickButtonAfterLocator(
    attributePage.link.autoTestSection_AT_CheckRelConfig2_AT_CheckRelConfig1_link,
  );
  // 15. Check if table contains "Auto T 1"
  I.waitForVisible(locate('td').withText(data.autoTest_AutoT_1_name).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_CheckRelConfig2_AT_CheckRelConfig1' })), constants.SHORT_WAIT);
  // 16. Check if only "Insert existing" button is available
  // (or check if remove existing button is not available)
  // 17. Click on "Insert" existing
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.insertExisting_AT_CheckRelConfig2_AT_CheckRelConfig1_Button,
  );
  // 18. Check if "Insert" button is not available
  I.waitForInvisible(locate('div').withText('Insert').inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_CheckRelConfig2_AT_CheckRelConfig1_manyPopup_lookupgrid_toolbar' })), constants.SHORT_WAIT);
  // 19. Select a record: "Auto T 1"
  I.waitForVisible(locate('td').withText(data.autoTest_AutoT_1_name).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_CheckRelConfig2_AT_CheckRelConfig1_manyPopup_lookupgrid' })), constants.SHORT_WAIT);
  I.click(locate('td').withText(data.autoTest_AutoT_1_name).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_CheckRelConfig2_AT_CheckRelConfig1_manyPopup_lookupgrid' })));
  // 20. Click Ok
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.okPopupAT_CheckRelConfig2_AT_CheckRelConfig1Button,
  );
  // 21. Check if an error message is displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      data.dataAlreadyExist);
  commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      data.dataAlreadyExist,
  );
  // 22. Logoff
  await commonActions.logoutFromApp();
});
