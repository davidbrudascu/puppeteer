// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC003_DeleteMenuItems');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Delete menu items', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Access your Menu Section (MS for MenuItem Delete1)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuItemDelete1, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuItemDelete1, data.yourEntityDeleteMI1)
  // 4	Delete your Entity (AT_EntForDeleteMI1)
  commonActions.selectARowFromTableAfterText(data.yourEntityDeleteMI1);
  menuItemsActions.deleteYourMenuSectionAndVerifyEmptyTable();
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 5	Access your Menu Section (MS for MenuItem Delete2)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuItemDelete2, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuItemDelete2, data.yourEntityDeleteMI2)
  // 6	Check if there are 3 entities (1 Entity, 1 CUJ and 1 Report)
  menuItemsVerify.verifyEntitiesForDeleteMenuItems(data.businessEntity, data.yourEntityDeleteMI2, data.yourEntityDeleteMI3, data.entityReport, data.entityATReport, data.customJourney, data.entityATCustomJourney)
  // 7	Delete AT_ReportForDeleteMI
  // 8	Delete AT_CUJForDeleteMI
  // 9	Delete AT_EntForDeleteMI2
  menuItemsActions.unselectSecondTableRow()
  menuItemsActions.deleteYourMenuSection();
  menuItemsVerify.verifyEntitiesAfterDeleteMenuItems(data.entityATReport,data.entityATCustomJourney, data.yourEntityDeleteMI2, data.yourEntityDeleteMI3)
  // 10	Logoff
  await commonActions.logoutFromApp();
  // 11	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 12	Click on "Main Menu" icon
  commonActions.portalSideMenuOpen();
  // 13	Verify if "MS for MenuItem Delete1" is not displayed
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.menuItemDelete1)
  // 14	Verify if "AT_EntForDeleteMI1" is not displayed
  menuItemsVerify.waitForEntityLinkInvisible(data.yourEntityDeleteMI1)
  // 15	Click on "MS for MenuItem Delete2"
  menuItemsVerify.waitForMenuSectionLabelVisible(data.menuItemDelete2)
  // 16	Verify if "AT_EntForDeleteMI2" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.yourEntityDeleteMI2)
  // 17	Verify if "AT_ReportForDeleteMI" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityATReport)
  // 18	Verify if "AT_CUJForDeleteMI" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityATCustomJourney)
  // 19	Verify if "AT_EntForDeleteMI3" is displayed
  menuItemsVerify.searchAfterEntityLinkVisible(data.yourEntityDeleteMI3)
  // 20	Logoff
  await commonActions.logoutFromApp();
});
