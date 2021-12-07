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

Scenario('Virtual Attribute - Custom', async () => {
  // 1. Login using "Portal"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Navigate to entity "AT_Custom_VA"
  commonActions.accessDirectUrl(data.vaEntityCustomVa);
  // 3. Click on "Insert" icon
  commonActions.clickSidebarButton(data.vaButtonInsert);
  // 4. Verify if VAs are displayed (Check the display name)
  // 5. Verify attribute prop OptionSet - default value is "Y"
  commonVerify.verifyValuesExistInOptionSet(vaPage.fields.vaAttributeOptionSet,
    [data.vaAttributeOptionSetValue]);
  // 6. Verify attribute prop Text - Required
  vaVerify.verifyVaDefaultCustomAttributes();
  // 7. Click on "Save and Reload"
  commonActions.saveAndRefreshAction();
  // 8. Verify if an error message is displayed "Text attribute is required"
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
    constants.TOAST_STAY,
    data.vaToastAttributeRequired);
  // 9. Fill in "Name" text with "Name Auto Test"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeName, data.vaAttributeNameVal);
  // 10. Fill in "Text" text with "VA Auto Test"
  commonActions.fillInTextValueInInput(vaPage.fields.vaAttributeText, data.vaAttributeTextVal);
  // 11. Click again on Save and Reload
  commonActions.saveAndRefreshAction();
  // 12. Verify field "Text" is empty
  // 13. A success message is displayed
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage,
    constants.TOAST_VANISH,
    data.vaToastRecordInserted);
  await commonVerify.verifyValueExistsInInput(vaPage.fields.vaAttributeText, '');
  // 14. Logoff
  await commonActions.logoutFromApp();
});
