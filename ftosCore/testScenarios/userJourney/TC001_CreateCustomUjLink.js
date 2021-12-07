// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/userJourneyData');
// Pages
const ujPage = require('~pages/userJourneyPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ujVerify = require('~actions/userJourneyVerify');

// Author Sebastian Draghici
// AT-171
Feature('User Journey');

Scenario('BUG DPA-19359: Create Custom User Journey - Link', async () => {
  // 1. Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.usernameDesigner, data.password);
  // 2. Navigate directly to "Custom Journeys"
  commonActions.accessDirectUrl(data.urlCustomJourneys);
  // 3. Click on "Create" button
  commonActions.clickSidebarButton(data.ujCreateCustomUjButton);
  // 4. Fill in "Name" text with "AT_EntForCustomUJ_CUJ"
  // 5. Fill in "Display Name" text with "Auto Custom UJ Link"
  // 6. Fill in "External link" text with "Main#/entity/AT_EntForCustomUJ/list"
  ujActions.ujFillInNewCustomUjLink();
  // 7. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8. Check if "AT_EntForCustomUJ_CUJ" is displayed in list
  commonActions.fillInTextValueInInput(ujPage.fields.inputSearchInCUJTableField, data.ujAttribData1);
  commonVerify.verifyValueExistsInTable(ujPage.selector.ujCustomUjTable, data.ujAttribData1);
  // 9 Navigate to Menu item: "...Main#/entity/menuitem/list"
  commonActions.accessDirectUrl(data.urlDepMenuItems);
  // 10. Click on icon "Insert"
  commonActions.clickSidebarButton(data.ujInsertButton);
  // 11. Fill in "Type" optionset with "Custom Journey"
  // 12. Fill in "CJ" lookouptable with "AT_EntForCustomUJ_CUJ"
  // 13. Fill in "Display Name" text with "AT CUJ Link"
  ujActions.ujFillInNewMenuItemLink();
  // 14. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15. Verify if "AT CUJ Html" is displayed in list
  commonVerify.verifyValueExistsInTable(ujPage.selector.ujMenuItemsTable, data.ujAttribData5);
  // 16. Logoff
  await commonActions.logoutFromApp();
  // 17. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  // 18. Open Menu
  commonActions.portalSideMenuOpen();
  // 19. Click on "AT CUJ Link"
  commonActions.portalClickSideMenuItem(constants.MENU_ITEM, data.ujAttribData5);
  // 20. Verify if the default view "Name" is displayed
  // 21. Verify if one record "Auto Test" is displayed
  ujVerify.portalUjVerifyEntity();
  // 22. Click on Insert
  commonActions.clickSidebarButton(data.ujInsertButton);
  // 23. Verify if default form "Name" is displayed
  ujVerify.portalUjVerifyNewValue();
  // 24. Fill in "Name" text with "AT Custom UJ Link Test"
  ujActions.portalUjFillInNewValue();
  // 25. Click "Save and Close"
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 26. Verify if result page is displayed
  // 27. Verify if your record "AT Custom UJ Link Test" was added in list
  ujVerify.portalUjVerifyNewSavedValueLink();
  // 28. Logoff
  await commonActions.logoutFromApp();
});
