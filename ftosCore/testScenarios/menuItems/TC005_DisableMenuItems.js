// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC005_DisableMenuItems');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Disable menu Items', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Access your Menu Section (MS for MenuItem Disable1)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuItemDisable1, menuItemPage.container.childrenMenuItemsContainer);
  //commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.menuItemDisable1)
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuItemDisable1, data.entityAT_ForDisableMI1)
  // 4	Access your Entity (AT_EntForDisableMI1)
  menuItemsActions.accessYourEntityMenuItem(data.entityAT_ForDisableMI1)
  // 5	Check "Disable" option
  menuItemsActions.checkDisableOptionMenuItem()
  // 6	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7	Access your Menu Section (MS for MenuItem Disable2)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.menuItemDisable2, menuItemPage.container.childrenMenuItemsContainer);
  //commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.menuItemDisable2);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.menuItemDisable2, data.yourEntityDisableMI2);
  // 8	Check if there are 3 entities (1 Entity 1 CUJ and 1 Report)
  menuItemsVerify.verifyEntitiesForDisableMenuItems(data.businessEntity, data.yourEntityDisableMI2, data.yourEntityDisableMI3, data.entityReport, data.entityATReport, data.customJourney, data.entityATCustomJourney)
  // 9	Access AT_ReportForDisableMI
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.entityATReport, menuItemPage.container.childrenMenuItemsContainer);
  //commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.entityATReport);
  menuItemsActions.accessYourEntityMenuItem(data.entityATReport)
  // 10	Check "Disable" option
  menuItemsActions.checkDisableOptionMenuItem()
  // 11	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12	Access AT_CUJForDisableMI
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.entityATCustomJourney, menuItemPage.container.childrenMenuItemsContainer);
  //commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.entityATCustomJourney);
  menuItemsActions.accessYourCustomEntityMenuItem(data.entityATCustomJourney);
  // 13	Check "Disable" option
  menuItemsActions.checkDisableOptionMenuItem()
  // 14	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15	Access AT_EntForDisableMI2
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourEntityDisableMI2, menuItemPage.container.childrenMenuItemsContainer);
  //commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.yourEntityDisableMI2);
  menuItemsActions.accessYourEntityMenuItem(data.yourEntityDisableMI2)
  // 16	Check "Disable" option
  menuItemsActions.checkDisableOptionMenuItem()
  // 17	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 18	Logoff
  await commonActions.logoutFromApp();
  // 19	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 20	Click on "Main Menu" icon
  commonActions.portalSideMenuOpen();
  // 21	Verify if "MS for MenuItem Disable1" is not displayed
  menuItemsVerify.waitForMenuSectionLabelInvisible(data.menuItemDisable1)
  // 22	Verify if "AT_EntForDisableMI1" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityAT_ForDisableMI1)
  // 23	Click on "MS for MenuItem Disable2"
  // 24	Verify if "AT_EntForDisableMI2" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.yourEntityDisableMI2)
  // 25	Verify if "AT_ReportForDisableMI" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityATReport)
  // 26	Verify if "AT_CUJForDisableMI" is not displayed
  menuItemsVerify.searchAfterEntityLinkInvisible(data.entityATCustomJourney)
  // 27	Verify if "AT_EntForDisableMI3" is displayed
  menuItemsVerify.searchAfterEntityLinkVisible(data.yourEntityDisableMI3)
  // 28	Logoff
  await commonActions.logoutFromApp();
});
