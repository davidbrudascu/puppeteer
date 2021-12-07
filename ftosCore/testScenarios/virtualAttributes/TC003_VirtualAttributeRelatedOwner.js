// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/virtualAttributeData');
// Pages
const commonPage = require('~pages/commonPage');
const vaPage = require('~pages/virtualAttributePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const vaVerify = require('~actions/virtualAttributeVerify');

// Author Sebastian Draghici
// AT-185
Feature('Virtual Attributes');

Scenario('Virtual Attribute - Related Owner', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Navigate to your entity - AT_RelatedVAOwned
  commonActions.accessDirectUrl(data.vaEntityOwnerVa);
  // 3. Click on Insert icon
  commonActions.clickSidebarButton(data.vaButtonInsert);
  // 4. Verify your attributes:
  // Name - text
  // Product: readonly
  // Related Name: text
  // Related Value: text
  // Related Code: text
  // Related Currency: lookup
  vaVerify.verifyVaDefaultOwnerAttributes();
  // 5. Fill only in Name with: New
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeName, data.vaAttributeOwnerNameVal);
  // 6. Click on "Save and Reload"
  commonActions.saveAndRefreshAction();
  // 7. An error message is displayed -> Related Name is required
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.vaToastValueRequired);
  // 8. Fill in "Name" text with "New Auto test"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeName, data.vaAttributeOwnerNameVal);
  // 9. Fill in "Related Name" text with "keyboard"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeRelatedName,
    data.vaAttributeOwnerRelatedName);
  // 10. Fill in "Related Code" text with "KEY"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeOwnerCode,
    data.vaAttributeOwnerRelatedCode);
  // 11. Fill in "Related Value" text with "1,200.25
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeOwnerValue,
    data.vaAttributeOwnerRelatedValue);
  // 12. Click on Related Currency -> a new window is displayed
  commonActions.clickLookupTableButton(vaPage.fields.vaAttributeOwnerCurrencyLookupTable);
  // 13. Select USD
  // 14. Click Ok
  commonActions.fillInPopupLookupTableWithValue(
    vaPage.selector.vaOwnedCurrencyLookupTable,
    data.vaAttributeNewRelatedCurrency,
  );
  commonActions.clickToolbarButton('Ok');
  // 15. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16. Verify again all details (Related Name is keyboard)
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeName,
    data.vaAttributeOwnerNameVal);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerProduct,
    data.vaAttributeOwnerRelatedName);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedName,
    data.vaAttributeOwnerRelatedName);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerCode,
    data.vaAttributeOwnerRelatedCode);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerValue,
    data.vaAttributeOwnerRelatedValue);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerCurrency,
    data.vaAttributeNewRelatedCurrency);
  // 17. Navigate to "AT_EntForRelatedVAOwned" entity
  commonActions.accessDirectUrl(data.vaEntityOwnedFor);
  // 18. Verify if "Keyboard" is displayed in list
  // 19. Access it
  vaVerify.verifyAndOpenRelatedOwnerEntityFromTable();
  // 20. Check details (Name: keyboard, Code: KEY, Value: 1,200.25 and Currency: USD)
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeName,
    data.vaAttributeOwnerRelatedName);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeEntValue,
    data.vaAttributeOwnerRelatedValue);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeEntCode,
    data.vaAttributeOwnerRelatedCode);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerEntCurrency,
    data.vaAttributeNewRelatedCurrency);
  // 21. Update Name: KBRD
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeName,
    data.vaAttributeOwnerNewRelatedName);
  // 22. Update Value: 2,000
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeEntValue,
    data.vaAttributeOwnerNewRelatedValue);
  // 23. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 24. Navigate back to your original entity
  commonActions.accessDirectUrl(data.vaEntityOwnerVa);
  // 25. Access "New Auto Test"
  commonActions.doubleClickValueFromTable(vaPage.selector.vaMenuItemsTable,
    data.vaAttributeOwnerNameVal);
  // 26. Check the details
  // Name: New Auto Test
  // Product: KBRD - readonly
  // Related Code: Key
  // Related Value: 2,000
  // Related Currency: USD
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeName,
    data.vaAttributeOwnerNameVal);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedName,
    data.vaAttributeOwnerNewRelatedName);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerCode,
    data.vaAttributeOwnerRelatedCode);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerValue,
    data.vaAttributeOwnerNewRelatedValue);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeOwnerCurrency,
    data.vaAttributeNewRelatedCurrency);
  // 27. Logoff
  await commonActions.logoutFromApp();
});
