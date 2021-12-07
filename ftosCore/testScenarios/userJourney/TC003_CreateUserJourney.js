// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const userJourneyAction = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC003_CreateUserJourney');
// Pages
const commonPage = require('~pages/commonPage');
const userJourneyPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyAttributeActionsField = require('~actions/attributesVerify');
const userJourneyVerify = require('~actions/userJourneyVerify');

const I = actor();

// Author Victor Pana

Feature('User Journey');

Scenario('User can create an user journey', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.usernameDesigner, data.password);
  // 2. Navigate to Form Data Journeys "...Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.userJourneyDesignerUrl + data.formDataJourneysId);
  // 3. Click on "Create" button
  // 4. Fill in Name with "NewUJ"
  // 5. Go to 2nd section "Data Model"
  // 6. Select your entity: "AT_CreateWizMode"
  userJourneyAction.createNewUserJourney(data.newUserJourneyName, data.entityExtentionName);
  commonActions.navigateToFormStep(data.goToGeneralTab);
  commonActions.clickButtonAfterLocator(userJourneyPage.checkbox.isDefault);
  commonActions.clickButtonAfterLocator(userJourneyPage.checkbox.isDefaultForEdit);
  //    Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7. Go to 3rd section "Steps"
  commonActions.navigateToFormStep(data.goToStepsTab);
  // 8. Check if there is one step (Step1)
  commonActions.verifyAValueInTableAfterText(data.entityFormStep1);
  commonActions.selectARowFromTableAfterText(data.entityFormStep1);
  // 9. Access it
  await commonActions.getIdFromSelectedRowAndNavigate(
    data.step1UserJourneyUrl,
    userJourneyPage.container.formJourneyCustomactionTableContainer,
  );
  // 10. Go to UI tab
  commonActions.navigateToFormStep(data.goToUITab);
  // 11. Open "Source code"
  // 12. Paste your HTML code there
  // 13. Click "Ok"
  commonActions.fillInCustomTinyMceEditor(
    userJourneyPage.selector.ujCodeTemplateLoc,
    userJourneyPage.selector.ujCodeTemplateTinyMceId,
    data.customHtmlSample1,
  );
  // 14. Click "Save and Close"
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15. Click on "Insert" button
  commonActions.clickToolbarButton(data.clickToInsert);
  // 16. Fill in Name with: SecondStep
  commonActions.fillField(userJourneyPage.fields.nameInputUserJourneyField, data.secondStepName);
  // 17. Fill in DisplayName with: 2nd Step AT
  commonActions.fillField(
    userJourneyPage.fields.displayNameInputUserJourneyField,
    data.secondStepDisplayName,
  );
  // 18. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19. Go to UI tab
  commonActions.navigateToFormStep(data.goToUITab);
  // 20. Click on Tools -> Source Code
  // 21. Paste the HTML Code
  // 22. Click Ok
  commonActions.fillInCustomTinyMceEditor(
    userJourneyPage.selector.ujCodeTemplateLoc,
    userJourneyPage.selector.ujCodeTemplateTinyMceId,
    data.customHtmlSample2,
  );
  // 23. Click "Save and Close" icon
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // FIXME
  I.wait(3);
  // 24. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 25. Logoff
  await commonActions.logoutFromApp();
  // 26. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.usernamePortal, data.password);
  // 27. Access your entity
  commonActions.accessDirectUrl(
    data.userJourneyPortalUrl + data.entityExtentionName + data.portalViewList,
  );
  commonVerify.verifyEmptyTableData();
  // 28. Click on "Insert" button
  commonActions.clickSidebarButton(data.clickToInsert);
  // 29. Check if the form is ok (Form Title, Section type, Section name and Attributes order)
  userJourneyVerify.createUserJourneyVerifyFields(data.addAT_CreateWizMode, data.verifyAttributeCodeName, data.verifyAttributeDoBName, data.verifyStep1Name, data.verifyStep2Name,
      data.firstCodeStep1AttributeValue, data.secondDobStep1AttributeValue, data.verifyAttributeNameName, data.verifyAttributeValueName, data.firstNameStep2AttributeValue, data.secondValueStep2AttributeValue);
  // 30. Fill in all fields and click save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 31. Check if your form is still displayed
  commonActions.clickButtonAfterLocator(userJourneyPage.fields.firstParagraphField);
  commonActions.seeInFieldAfterContainer(
    userJourneyPage.container.containerContent, data.verifyAttributeDoBName,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(userJourneyPage.fields.firstAttributeCodeField, data.firstCodeStep1AttributeValue);
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(userJourneyPage.fields.secondAttributeDateDobField, data.secondDobStep1AttributeValue);
  // 32. Logoff
  await commonActions.logoutFromApp();
});
