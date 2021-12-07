// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/coding/fieldOptionsUj');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-229
Feature('Coding');

Scenario('Coding - Field Options User Journey', async () => {
  // Toast message order
  const toastOrder1 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    },
  ];
  const toastOrder2 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
  ];
  const toastOrder3 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage3,
    },
  ];

  // 1 Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey
  commonActions.accessDirectUrl(data.urlUserJourney);
  // 3 Navigate to "Field Options"
  commonActions.navigateToFormStep(data.sectionFieldOptions);
  // 4 Click on "Insert" icon
  commonActions.clickToolbarButton(data.toolbarButtonInsert);
  // 5 Check "Virtual Attribute"
  await commonActions.tickCheckbox(codePage.fields.codeUseVirtualAttribute,
    constants.CHECKMARK_TICKED);
  // 6 Select your Virtual Attribute
  commonActions.clickLookupTableButton(codePage.buttons.codeVirtualAttributeLookupPopupBtn);
  commonActions.fillInPopupLookupTableWithValue(codePage.selector.codeVirtualAttributeLookupTable,
    data.virtualAttributeName);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 7 Fill in Attribute Change Event
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAttributeChangeEditor,
    codePage.selector.codeMonacoEditor1,
    data.codeAttrChange,
  );
  // 8 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 9 Logoff
  await commonActions.logoutFromApp();
  // 10 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 11 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 12 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 13 Check if "S1 After Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  // 14 Close error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  // 15 Change Bool value
  await commonActions.tickCheckbox(codePage.buttons.codeBoolBtns,
    constants.CHECKMARK_TICKED);
  // 16 Check if "VA Change Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder2);
  // 17 Close Error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 18 Click on Lookup
  commonActions.clickLookupTableButton(codePage.buttons.codeLookupLookupPopupBtn);
  // 19 Select a value from table
  commonActions.fillInDropdownLookupTableWithValue(codePage.selector.codeLookupAsDropdownTable, data.codeLookupName);
  // 21 Check if "Lookup Change Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder3);
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage3,
  );
  // 22 Logoff
  await commonActions.logoutFromApp();
});
