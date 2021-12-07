// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const menuItemsActions = require('~actions/menuItemsActions');
// Data
const data = require('~data/menuItems/TC001_FormAndViewEntityMenu');
// Pages
const commonPage = require('~pages/commonPage');
const menuItemPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');

// Author Victor Pana

Feature('Menu Items');

Scenario('BUG DPA-19410: Form and View Entity Menu', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to Menu Items (Portal) Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c
  commonActions.accessDirectUrl(data.accessMenuItemsURL);
  // 3	Click on "Insert" from MENU ITEMS CHILDREN grid
  menuItemsActions.insertNewMenuItemsChildrenGrid();
  // 4	Select "Entity" from Type
  menuItemsActions.selectTypeOfMenuItem(data.typeOfMenuItemsEntity);
  // 5	Select your entity "AT_EntMenuViewForm"
  menuItemsActions.selectYourEntity(data.selectYourEntityViewForm);
  // 6	Update Name "Entity Menu View Form"
  commonActions.fillInTextValueInInput(menuItemPage.fields.displayNameMenuField, data.updateDisplayName);
  // 7	Select view "menuView"
  menuItemsActions.selectYourEntityView(data.entityView);
  // 8	Select insert form "insertMenu"
  menuItemsActions.insertEntityForm(data.entityForm);
  // 9	Select Edit form "editMenu"
  menuItemsActions.insertEditEntityForm(data.editEntityForm);
  // 10	unCheck "Use Menu Display Name as View Title"
  menuItemsActions.uncheckMenuDisplayNameAsViewTitle();
  // 11	Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12	Logoff
  await commonActions.logoutFromApp();
  // 13	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14	Click on "Main Menu" icon
  commonActions.portalSideMenuOpen();
  // 15	Click on "Entity Menu View Form" -> view page is displayed
  // 16	Check view name: "View Level DN"
  // 17	Check column (Name and Code)
  menuItemsVerify.verifyEntityViewFormDisplayed(data.updateDisplayName, data.viewNameViewLevelDN, data.columnName, data.columnCode);
  // 18	Click on Insert icon
  commonActions.clickSidebarButton(data.menuItemInsert);
  // 19	Verify if "insertMenu" form is displayed (Name and Code attributes are displayed; Value is not displayed)
  menuItemsVerify.verifyInsertMenuDisplayed(data.checkEntityForm, data.columnName, data.columnCode, data.columnValue)
  // 20	Fill in Name and Code with: Auto Test Form View 1/ATFV1
  menuItemsActions.fillNameAndCodeValues(data.nameValue, data.codeValue)
  // 21	Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 22	Verify if editMenu form is displayed (only Name is displayed; Code and value are not displayed)
  menuItemsVerify.verifyEditMenuDisplayed(data.checkEditEntityForm, data.columnName, data.columnCode, data.columnValue)
  // 23	Update Name: Auto Test Form View Updated
  menuItemsActions.fillNameUpdate(data.nameUpdate)
  // 24	Save and Close
  commonActions.saveAndCloseAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 25	Navigate to your entity Main#/entity/AT_EntMenuViewForm/list
  commonActions.accessDirectUrl(data.accessYourEntityMenuItemsURL);
  // 26	Check view name "AT_EntMenuViewForm" and column: Name
  menuItemsVerify.verifyViewNameEntityDisplayed(data.checkViewNameForm, data.columnName, data.nameUpdate, data.columnCode, data.columnValue)
  // 27	Click on "Insert" icon
  commonActions.clickSidebarButton(data.menuItemInsert);
  // 28	Verify if "default" form is displayed (Name, Code and Value attributes are displayed)
  menuItemsVerify.verifyDefaultFormDisplayed(data.checkDefaultForm, data.columnName, data.columnCode, data.columnValue)
  // 29	Fill in Name, Code and Value: Auto Test Insert 1, ATI1, 100
  menuItemsActions.fillNameValueAndCodeValues(data.nameValue2, data.codeValue2, data.valueValue2)
  // 30	Save and Reload.
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 31	Verify if "default" form is still displayed (Name, Code and Value attributes are displayed) with value
  await menuItemsVerify.verifyDefaultFormStillDisplayed(data.editEntityViewForm, data.checkDefaultForm, data.columnName, data.columnCode, data.columnValue, data.nameValue2, data.codeValue2, data.valueValue2);
  // 32	Logoff
  await commonActions.logoutFromApp();
});
