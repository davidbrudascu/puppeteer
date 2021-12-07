// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC009_CreateReportMenuItem');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('Create Report menu item', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (General Menu) Main#/entity/menuitem/edit/91dd9785-25dd-4a99-b4f7-fb28d9fd83f2
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 4	Select Type = Report
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeReport);
  // 5	Select your report (AT_ReportForMI)
  menuItemsActions.selectYourReportEntity(data.yourEntityReportForMI);
  // 6	Add Display Name: AT_ReportMenuPortal
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourReportMenuPortal);
  // 7	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessPortalMenuItemsURL);
  // 9	Access Section (Report Menu Section)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourReportMenuSection, menuItemPage.container.childrenMenuItemsContainer);
  menuItemsActions.accessYourMenuSectionAndWaitAnEntity(data.yourReportMenuSection, data.yourReportMenuSubSection);
  // 10	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 11	Select type = Report
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeReport);
  // 12	Select your report (AT_ReportForMI)
  menuItemsActions.selectYourReportEntity(data.yourEntityReportForMI);
  // 13	Add Display Name: AT_ReportMenuSection
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourATReportMenuSection);
  // 14	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15	Access your section (Report Menu subSection)
  await commonActions.searchInTableAfterASpecificColumn(data.columnDisplayName, data.yourReportMenuSubSection, menuItemPage.container.childrenMenuItemsContainer);
  //commonActions.fillInTextValueInInput(menuItemPage.fields.searchAfterDisplayName, data.yourReportMenuSubSection);
  menuItemsActions.accessYourReportEntityMenuItem(data.yourReportMenuSubSection);
  // 16	Click on "Insert" button from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 17	Select type = Report
  menuItemsActions.selectTypeOfMenuItem(data.selectTypeReport);
  // 18	Select your report (AT_ReportForMI)
  menuItemsActions.selectYourReportEntity(data.yourEntityReportForMI);
  // 19	Add Display Name: AT_ReportMenuSubSection
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.yourATReportMenuSubSection);
  // 20	Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 21	Logoff
  await commonActions.logoutFromApp();
  // 22	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.passwordPortal);
  // 23	Click on "main menu" icon
  commonActions.portalSideMenuOpen();
  // 24	Check if your Report is displayed (AT_ReportMenuPortal)
  menuItemsVerify.searchAfterEntityLinkVisible(data.yourReportMenuPortal);
  // 25	Click on "Report Menu Section"
  commonActions.fillInTextValueInInput(menuItemPage.fields.searchInMenuPortalField, ' ');
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourReportMenuSection);
  // 26	Check if your Report is displayed (AT_ReportMenuSection)
  menuItemsVerify.waitForEntityLinkVisible(data.yourATReportMenuSection);
  // 27	Click on "Report Menu subSection"
  menuItemsVerify.waitForMenuSectionLabelVisibleAndClick(data.yourReportMenuSubSection);
  // 28	Check if your Report is displayed (AT_ReportMenuSubSection)
  menuItemsVerify.waitForEntityLinkVisible(data.yourATReportMenuSubSection);
  // 29	Logoff
  await commonActions.logoutFromApp();
});
