// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const ujActions = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/userJourneyEditHeader');
// Pages
const commonPage = require('~pages/commonPage');
const ujPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const ujVerify = require('~actions/userJourneyVerify');

// Author Sebastian Draghici
// AT-186
Feature('User Journey');

Scenario('User Journey - Edit Header', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to Form Data Jouneys"...Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.urlFormDrivenJourneys);
  // 3. Search for your UJ
  commonActions.searchByColumnValueInTable(ujPage.selector.ujFormUjTable,
    data.ujTableColumnId, data.ujEntityName);
  // 4. Access it
  commonActions.doubleClickValueFromTable(ujPage.selector.ujMenuItemsTable,
    data.ujEntityName);
  // 5. Go to Header section
  commonActions.navigateToFormStep(data.ujFormStepHeader);
  // 6. Unchek "Sticky Header"
  ujActions.tickCheckbox(ujPage.checkbox.ujStickyHeaderItems, constants.CHECKMARK_FALSE);
  // Save and Reload pending changes
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7. Access 1st header (Code)
  commonActions.doubleClickValueFromTable(ujPage.selector.ujHeaderItemsTable,
    data.ujFormTableItemCode);
  // 8. Update label with: "Codul UP"
  commonActions.fillInTextValueInInput(ujPage.fields.ujFieldLabelInput, data.ujEntityUpdatedCode);
  // 9. Click "Save and Close"
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 10. Access 2nd header (Name)
  commonActions.doubleClickValueFromTable(ujPage.selector.ujHeaderItemsTable,
    data.ujFormTableItemName);
  // 11. Fill in label with: "Dob AT"
  commonActions.fillInTextValueInInput(ujPage.fields.ujFieldLabelInput, data.ujEntityUpdatedName);
  // 12. Select Attribute: DoB
  commonActions.clickLookupTableButton(ujPage.selector.ujFieldAttributeLookupTableButton);
  commonActions.fillInPopupLookupTableWithValue(
    ujPage.selector.ujAttributeLookupTable,
    data.ujLookupTableAttribute,
  );
  commonActions.clickToolbarButton('Ok');
  // 13. Click on "Save and Close"
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 14. Change headers order (Value, DoB and Code)
  ujActions.reorderTableItems();
  // 15. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16. Logoff
  await commonActions.logoutFromApp();
  // 17. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 18. Access your entity
  commonActions.accessDirectUrl(data.urlPortalEditEntity);
  // 19. Access your record
  commonActions.doubleClickValueFromTable(ujPage.selector.ujMenuItemsTable,
    data.ujEditFormItemValue);
  // 20. Check Headers order
  // 21. Check Header names
  // 22. Scroll down -> check if headers are not visible
  await ujVerify.verifyEditedHeaders();
  // 23. Logoff
  await commonActions.logoutFromApp();
});
