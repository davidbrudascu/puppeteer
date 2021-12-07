// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/userJourneyCreateHeader');
// Pages
const commonPage = require('~pages/commonPage');
const ujPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ujVerify = require('~actions/userJourneyVerify');

// Author Sebastian Draghici
// AT-186
Feature('User Journey');

Scenario('User Journey - Create Header', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to Form Data Jouneys"Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.urlFormDrivenJourneys);
  // 3. Search for your UJ by Name
  commonActions.searchByColumnValueInTable(ujPage.selector.ujFormUjTable,
    data.ujTableColumnId, data.ujEntityName);
  // 4. Access it
  commonActions.doubleClickValueFromTable(ujPage.selector.ujFormUjTable,
    data.ujEntityName);
  // 5. Go to Header section
  commonActions.navigateToFormStep(data.ujFormStepHeader);
  // 6. Click on "Insert" button
  commonActions.clickToolbarButton(data.ujInsertButton);
  // 7. Fill in label with: "Codul AT"
  commonActions.fillInTextValueInInput(ujPage.fields.ujFieldLabelInput, data.ujInputLabelValue);
  // 8. Select Attribute: Code
  commonActions.clickLookupTableButton(ujPage.selector.ujFieldAttributeLookupTableButton);
  commonActions.fillInPopupLookupTableWithValue(
    ujPage.selector.ujAttributeLookupTable,
    data.ujInputAttributeValue,
  );
  commonActions.clickToolbarButton('Ok');
  // 9. Click on "Save and New"
  commonActions.saveAndNewAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10. Fill in label with: "Numele AT"
  commonActions.fillInTextValueInInput(ujPage.fields.ujFieldLabelInput, data.ujInputLabelValue2);
  // 11. Select Attribute: Name
  commonActions.clickLookupTableButton(ujPage.selector.ujFieldAttributeLookupTableButton);
  commonActions.fillInPopupLookupTableWithValue(
    ujPage.selector.ujAttributeLookupTable,
    data.ujInputAttributeValue2,
  );
  commonActions.clickToolbarButton('Ok');
  // 12. Check "Is Primary Attribute"
  ujActions.tickCheckbox(ujPage.checkbox.ujIsPrimaryAttribute, constants.CHECKMARK_TRUE);
  // 13. Click on "Save and Close"
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 14. Check if your added headers are displayed in list
  commonVerify.verifyValueExistsInTable(ujPage.selector.ujHeaderItemsTable,
    data.ujInputLabelValue);
  commonVerify.verifyValueExistsInTable(ujPage.selector.ujHeaderItemsTable,
    data.ujInputLabelValue2);
  // 15. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16. Logoff
  await commonActions.logoutFromApp();
  // 17.Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 18. Access your entity
  commonActions.accessDirectUrl(data.urlPortalHeaderEntity);
  // 19. Click on "insert" icon
  commonActions.clickSidebarButton(data.ujInsertButton);
  // 20. Fill in Name with: Auto Test 1
  commonActions.fillInTextValueInInput(ujPage.fields.portalUjInputName, data.ujHeaderFormNameValue);
  // 21. Scroll down -> Check if header is still displayed
  ujVerify.scrollToBottomAndVerifyNewHeader();
  // 22. Click on "next"
  commonActions.portalClickCustomButton(data.ujButtonNext);
  // 23. "Check the Header info
  // Codul AT: empty
  // Numele AT: Auto Test 1"
  ujVerify.verifyNewHeaderStep2();
  // 24. Fill in Code with: AT1
  commonActions.fillInTextValueInInput(ujPage.fields.ujHeaderFormStepTwo,
    data.ujHeaderFormCodeValue);
  // 25. Click on "Finish"
  commonActions.portalClickCustomButton(data.ujButtonFinish);
  // 26. "Check the Header info:
  // Codul AT: AT1
  // Numele AT: Auto Test 1"
  ujVerify.verifyNewHeaderStep3();
  // 27. Logoff
  await commonActions.logoutFromApp();
});
