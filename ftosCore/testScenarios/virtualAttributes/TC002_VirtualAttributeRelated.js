// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const vaActions = require('~actions/virtualAttributeActions');
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

Scenario('Virtual Attribute - Related', async () => {
  // 1. Login using "Portal"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Navigate to entity "AT_RelatedVA"
  commonActions.accessDirectUrl(data.vaEntityRelatedVa);
  // 3. Click on "Insert" icon
  commonActions.clickSidebarButton(data.vaButtonInsert);
  // 4. Verify attribute types:
  // Name - text
  // Product - lookup
  // Related Value - readonly
  // Related Code - readonly
  // Related Currency - readonly
  // Related Description - readonly
  vaVerify.verifyVaDefaultRelatedAttributes();
  // 5. Fill in "Name" text with "Auto Test 1"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeName,
    data.vaAttributeRelatedNameVal);
  // 6. Click dropdown on "Product" attribute
  commonActions.clickLookupTableButton(vaPage.fields.vaAttributeProductLookupTable);
  // 7. Select existing "Laptop" option
  commonActions.fillInPopupLookupTableWithValue(
    vaPage.selector.vaProductLookupTable,
    data.vaAttributeRelatedProductVal,
  );
  vaActions.clickOkPopupTableButton(vaPage.buttons.okButtonLookupTableAT_EntForRelatedVA);
  // 8. Verify if Related Value - 2,000
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedValue,
    data.vaAttributeRelatedValue);
  // 9. Verify if Related Code - LPT
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedCode,
    data.vaAttributeRelatedCode);
  // 10. Verify if Related Currency - EUR
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedCurrency,
    data.vaAttributeRelatedCurrency);
  // 11. Verify if Related Description - i7
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedDescription,
    data.vaAttributeRelatedDescription);
  // 12. Click on "edit" icon for "Laptop"
  // 13. Continue without saving
  // 14. Change "Value" from "2000" to "3000"
  vaActions.editProductLookupTableValue();
  // 15. Click on Save and Close
  commonActions.saveAndRefreshAction();
  vaActions.closeCurrentTab();
  vaActions.refreshPage();
  // 16. Click on "Insert" icon
  commonActions.clickSidebarButton(data.vaButtonInsert);
  // 17. Fill in "Name" text with "Auto Test 1"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeName,
    data.vaAttributeRelatedNameVal);
  // 18. Click dropdown on "Product" attribute
  commonActions.clickLookupTableButton(vaPage.fields.vaAttributeProductLookupTable);
  // 19. Select existing "Laptop" option
  commonActions.fillInPopupLookupTableWithValue(
    vaPage.selector.vaProductLookupTable,
    data.vaAttributeRelatedProductVal,
  );
  vaActions.clickOkPopupTableButton(vaPage.buttons.okButtonLookupTableAT_EntForRelatedVA);
  // 20. Verify if the Related Value - 3000
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedValue,
    data.vaAttributeNewRelatedValue);
  // 21. Update Related Code from "LPT" to "LAP" (directly from your original prouct)
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeRelatedCode,
    data.vaAttributeNewRelatedCode);
  // 22. Change Related Currency from "EUR" to "USD"
  commonActions.clickLookupTableButton(vaPage.fields.vaAttributeRelatedCurrencyLookupTable);
  commonActions.fillInPopupLookupTableWithValue(
    vaPage.selector.vaCurrencyLookupTable,
    data.vaAttributeNewRelatedCurrency,
  );
  vaActions.clickOkPopupTableButton(vaPage.buttons.okButtonLookupTableAT_EntForRelCurrency);
  // 23. Click on Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 24. Click on "edit" icon for "Laptop"
  vaActions.clickEditProductFromLookupTable();
  // 25. Verify  if Code - "LAP" and Currency - "USD"
  vaActions.navigateToNextTab();
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeEntCode,
    data.vaAttributeNewRelatedCode);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeEntCurrency,
    data.vaAttributeNewRelatedCurrency);
  // 26. Click "Go back"
  commonActions.goBackToPreviousPage();
  vaActions.navigateToPreviousTab();
  vaActions.closeOtherTabs();
  // 27. Select "Monitor" from drop-down
  commonActions.clickLookupTableButton(vaPage.fields.vaAttributeProductLookupTable);
  commonActions.fillInPopupLookupTableWithValue(
    vaPage.selector.vaProductLookupTable,
    data.vaAttributeModifiedRelatedProductVal,
  );
  vaActions.clickOkPopupTableButton(vaPage.buttons.okButtonLookupTableAT_EntForRelatedVA);
  // 28. Verify if Related Value is: 1200
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedValue,
    data.vaAttributeModifiedRelatedValue);
  // 29. Verify if Related Code is "MON"
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedCode,
    data.vaAttributeModifiedRelatedCode);
  // 30. Verify if Related Currency: empty
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedCurrency,
    '');
  // 31. Verify if Related Description is : 24"
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeRelatedDescription,
    data.vaAttributeModifiedRelatedDescription);
  // 32. Replace "Related Code" text with empty
  commonActions.deleteTextValueFromInput(vaPage.fields.vaAttributeRelatedCode);
  // 33. Click on Save and Reload
  commonActions.saveAndRefreshAction();
  // 34. An error message is displayed -> Related Code is required
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.vaToastValueRequired2);
  // 35. Fill in "Related Code" text with "MON"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeRelatedCode,
    data.vaAttributeModifiedRelatedCode);
  // 36. Replace "Related Description" text with empty
  commonActions.deleteTextValueFromInput(vaPage.fields.vaAttributeRelatedDescription);
  // 37. Click on Save and Reload
  commonActions.saveAndRefreshAction();
  // 38. An error message is displayed -> Unexpected error
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.vaToastUnexpectedError);
  // 39. Fill in "Related Description" text with "24\""
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeRelatedDescription,
    data.vaAttributeModifiedRelatedDescription);
  // 40. Click on Save and Reload
  commonActions.saveAndRefreshAction();
  // 41. A success message is displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.vaToastRecordUpdated);
  // 42. Logoff
  await commonActions.logoutFromApp();
});
