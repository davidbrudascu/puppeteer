// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const codeActions = require('~actions/codeActions');
// Data
const data = require('~data/coding/fieldOptionsForm');
// Pages
const commonPage = require('~pages/commonPage');
const codePage = require('~pages/codePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const codeVerify = require('~actions/codeVerify');

// Author Sebastian Draghici
// AT-229
Feature('Coding');

Scenario('Coding - Field Options Form DE gandit si spart in 2 parti', async () => {
  // Toast message order
  const toastOrder1 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage1,
    },
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage2,
    },
  ];
  const toastOrder2 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage3,
    },
  ];
  const toastOrder3 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage4,
    },
  ];
  const toastOrder4 = [
    {
      type: commonPage.messagePopup.errorMessage,
      state: constants.TOAST_STAY,
      string: data.toastMessage5,
    },
  ];

  // 1 Login using Studio
  // FIXME de spart in 2
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey
  commonActions.accessDirectUrl(data.urlUserJourney);
  // 3 Navigate to "Field Options" tab
  commonActions.navigateToFormStep(data.sectionFieldOptions);
  // 4 Click "Insert" button
  commonActions.clickToolbarButton(data.toolbarButtonInsert);
  // 5 Select "Name" Attribute
  commonActions.clickLookupTableButton(codePage.buttons.codeAttributeLookupPopupBtn);
  commonActions.fillInPopupLookupTableWithValue(codePage.selector.codeAttributeLookupTable,
    data.attributeName);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 6 Fill in Attribute Change Event
  commonActions.fillInCustomMonacoEditor(
    codePage.selector.codeAttributeChangeEditor,
    codePage.selector.codeMonacoEditor1,
    data.codeAttrChange,
  );
  // 7 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 8 Logoff
  await commonActions.logoutFromApp();
  // 9 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 10 Access your entity
  commonActions.accessDirectUrl(data.urlPortalEntity);
  // 11 Click on "Insert" icon
  commonActions.clickSidebarButton(data.toolbarButtonInsert);
  // 12 Check if "Before Event" error message is displayed
  // 13 Check if "After Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  // 14 Close Errors
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage1,
  );
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage2,
  );
  // 15 Fill in Name with: Auto Test
  commonActions.fillInTextValueInInput(codePage.fields.codeEntityName, data.codeEntityName);
  // 16 Check if "Text Change Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder2);
  // 17 Close Error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage3,
  );
  // 18 Change Bool value
  commonActions.fillInBoolValue(codePage.buttons.codeBoolBtns, 'Yes');
  // 19 Check if "Bool change Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder3);
  // 20 Close Error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage4,
  );
  // 21 Select a value from Lookup (Auto 1/AT1)
  commonActions.clickLookupTableButton(codePage.buttons.codeLookupLookupPopupBtn);
  codeActions.fillInPopupLookupTableColumnWithValue(codePage.selector.codeLookupLookupTable,
      data.searchColumn,
      data.codeLookupName);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 22 Check if "Lookup change Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder4);
  // 23 Close Error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage5,
  );
  // 24 Select again a value from Lookup (Auto 1 /AUT1)
  commonActions.clickLookupTableButton(codePage.buttons.codeLookupLookupPopupBtn);
  codeActions.fillInPopupLookupTableColumnWithValue(codePage.selector.codeLookupLookupTable,
      data.searchColumn,
      data.codeLookupName2);
  // Click Ok button
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 25 Check if "Lookup change Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder4);
  // 26 Close Error
  commonActions.closeToastMessage(
    commonPage.messagePopup.errorMessage,
    data.toastMessage5,
  );
  // 27 Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Check if "Before Event" error message is displayed
  // Check if "After Event" error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder1);
  // Close Errors
  commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      data.toastMessage1,
  );
  commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      data.toastMessage2,
  );
  // 28 Select again a value from Lookup (Auto 1 /AUT1)
  commonActions.clickLookupTableButton(codePage.buttons.codeLookupLookupPopupBtn);
  codeActions.fillInPopupLookupTableColumnWithValue(codePage.selector.codeLookupLookupTable,
      data.searchColumn,
      data.codeLookupName2);
  // Click Ok button
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 29 Check if error message is not displayed
  commonVerify.verifyDontSeeToastMessage(commonPage.messagePopup.errorMessage, data.toastMessage5);
  // 30 Select again a value from Lookup (Auto 1 /AT1)
  commonActions.clickLookupTableButton(codePage.buttons.codeLookupLookupPopupBtn);
  codeActions.fillInPopupLookupTableColumnWithValue(codePage.selector.codeLookupLookupTable,
      data.searchColumn,
      data.codeLookupName);
  commonActions.clickToolbarButton(data.lookupToolbarOk);
  // 31 Check if error message is displayed
  await codeVerify.verifyToastMessageOrder(toastOrder4);
  commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      data.toastMessage5,
  );
  // 32 Logoff
  await commonActions.logoutFromApp();
});
