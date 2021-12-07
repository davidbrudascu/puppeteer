// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const userJourneyAction = require('~actions/userJourneyActions');
// Data
const data = require('~data/userJourney/TC006_UpdateStepsUserJourney');
// Pages
const commonPage = require('~pages/commonPage');
const userJourneyPage = require('~pages/userJourneyPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

// Author Victor Pana

Feature('User Journey');

Scenario('User can update steps user journey', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to Form Data Journeys "...Main#/customaction/d1afd972-7462-4eec-ad11-3b19f98657b6"
  commonActions.accessDirectUrl(data.userJourneyUrl + data.formDataJourneysId);
  // 3. Search for your UJ  "AT_UJUpdateStepsUJ"
  userJourneyAction.searchAndVerifyForAUserJourneyTable(
    userJourneyPage.fields.searchForUserJourneyField,
    userJourneyPage.fields.tableRowValueUserJourneyField,
    data.userJourneyName,
  );
  // 4. Access it
  commonActions.accessDirectUrl(data.urAT_UJUpdateStepsUJ);
  // 5. Uncheck "Render section tabs as a bullet list"
  commonActions.clickButtonAfterLocator(userJourneyPage.checkbox.renderSectionTabsCheckbox);
  // 6. Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 7. Go to "Steps" Tab
  commonActions.navigateToFormStep(data.goToStepsTab);
  // 8. Access Section 1
  commonActions.accessDirectUrl(data.urlStep1UJ);
  // 9. Update its name and display name (SCT Updated)
  I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
  I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), 'SCT Updated');
  I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })), 'SCT Updated');
  // 10. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 11. Switch SCT Updated with Section3
  I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText('SCT Updated')), constants.SHORT_WAIT);
  I.dragAndDrop(locate('td').withText('SCT Updated'), locate('td').withText('Section3'));
  // FIXME
  I.wait(2);
  I.dragAndDrop(locate('td').withText('Section2'), locate('td').withText('Section3'));
  // 12. Save and Reload
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 13. Logoff
  await commonActions.logoutFromApp();
  // 14. Login using Portal
  // 15. Navigate to your entity: "...Main#/entity/AT_StepsEditF/list"
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlWizardModePortal);
  commonActions.seeInField(userJourneyPage.fields.resultForNoData, data.verifyNoData);
  // 16. Click on "Insert" icon
  // 17. Check if Form title is not displayed
  commonActions.clickSidebarButton('Insert');
  I.waitForVisible(userJourneyPage.tabs.firstSectionParagraph, constants.SHORT_WAIT);
  within(userJourneyPage.container.containerEwContent, () => {
    I.dontSee('ADD AT_UJUPDATESTEPS');
    I.see('Section3');
    I.see('Section2');
    I.see('SCT Updated');
  });
  // 18. Check if your sections are rendered as tabs
  // 19. Check the section order (Section3, Section2 and SCT Updated)
  within(userJourneyPage.container.containerEwContent, () => {
    I.waitForVisible(locate('span').withText('Section3').inside(locate('div').withAttr({ class: 'dx-item dx-tab dx-tab-selected stepNumber-1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText('Section2').inside(locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-2' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText('SCT Updated').inside(locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-3' })), constants.SHORT_WAIT);
  });
  // 20. Fill in all fields from 1st section
  I.waitForVisible(locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_DoB' })), constants.SHORT_WAIT);
  I.fillField(locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_DoB' })), '11/02/2020');
  // 21. Click on 2nd section
  I.click(userJourneyPage.tabs.secondSectionParagraph);
  // 22. Fill in all fields from 2nd section
  I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), constants.SHORT_WAIT);
  I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), '1,234,442');
  I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), 'Code Test');
  // 23. Click on 3rd section
  I.click(userJourneyPage.tabs.thirdSectionParagraph);
  // 24. Fill in all fields from 3rd section
  I.waitForVisible(userJourneyPage.fields.nameInputUserJourneyField2, constants.SHORT_WAIT);
  I.fillField(userJourneyPage.fields.nameInputUserJourneyField2, 'Update Steps Test');
  // 25. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 26. Check if your record is added in list
  I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText('Update Steps Test')), constants.SHORT_WAIT);
  I.seeElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText('Update Steps Test')));
  // 27. Logoff
  await commonActions.logoutFromApp();
});
