// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/userJourneyData');
// Pages
const commonPage = require('~pages/commonPage');
const ujPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ujVerify = require('~actions/userJourneyVerify');

// Author Sebastian Draghici
// AT-171
Feature('User Journey');

Scenario('BUG DPA-19359: Create Custom User Journey - HTML', async () => {
  // 1. Login as Designer
  await commonActions.loginInApp(data.urlDesigner, data.usernameDesigner, data.password);
  // 2. Navigate directly to "Custom Journeys"
  commonActions.accessDirectUrl(data.urlCustomJourneys);
  // 3. Click on "Create" button
  commonActions.clickSidebarButton(data.ujCreateCustomUjButton);
  // 4. Fill in "Name" text with "AT_CustomUJ_HTML"
  // 5. Fill in "Display Name" text with "Auto Custom UJ HTML"
  ujActions.ujFillInNewCustomUjHtml();
  // 6. Go to Code section
  commonActions.navigateToFormStep(data.ujFormStep2);
  // 7. Paste your HTML code (a simple text)
  commonActions.fillInCustomTinyMceEditor(
    ujPage.selector.ujCodeTemplateLoc,
    ujPage.selector.ujCodeTemplateTinyMceId,
    data.ujCustomHtmlSample,
  );
  // 8. Go to After Generate JS
  commonActions.clickTabMenuItem(data.ujTabAfterGenerateJs);
  // 9. Paste ebs.showMessage("abc", "success");
  commonActions.fillInCustomMonacoEditor(
    ujPage.selector.ujAfterGenerateJsLoc,
    ujPage.selector.ujAfterGenerateJsMonacoId,
    data.ujCustomAfterGenerateJs,
  );
  // 10. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11. Navigate to Menu item: "...Main#/entity/menuitem/list"
  commonActions.accessDirectUrl(data.urlDepMenuItems);
  // 12. Click on icon "Insert"
  commonActions.clickSidebarButton(data.ujInsertButton);
  // 13. Fill in "Type" optionset with "Custom Journey"
  // 14. Fill in "CJ" lookouptable with "AT_CustomUJ_HTML"
  // 15. Fill in "Display Name" text with "AT CUJ Html"
  ujActions.ujFillInNewMenuItemHtml();
  // 16. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 17. Verify if "AT CUJ Html" is displayed in list
  commonVerify.verifyValueExistsInTable(ujPage.selector.ujMenuItemsTable, data.ujAttribData7);
  // 18. Logoff
  await commonActions.logoutFromApp();
  // 19. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  // 20. Open Menu
  commonActions.portalSideMenuOpen();
  // 21. Click on "AT CUJ Html"
  commonActions.portalClickSideMenuItem(constants.MENU_ITEM, data.ujAttribData7);
  // 22. Verify if your text is displayed
  await ujVerify.compareCustomUjHtmlText();
  // 23. Verify if "abc" success message is displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    data.ujToastSuccessfulCustomUjHtml);
  // 24. Logoff
  await commonActions.logoutFromApp();
});
