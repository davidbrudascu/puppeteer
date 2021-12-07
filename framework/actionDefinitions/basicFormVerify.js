// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/basicForm/TC001_CreateHTMLSourceCodeBasicForm');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  async verifyCreateHTMLSourceCodeBasicForm(Name, Code, Value, Age, nameAuto1, codeAT1, value100, age30, nameUpdated, insertButton) {
    // 16 Click on "Insert" icon
    commonActions.clickSidebarButton(insertButton);
    // 17 Check if your form is the default one (Name, Code, Age and Value)
    I.waitForVisible(locate('div').withText(Name), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Code), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Value), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Age), constants.SHORT_WAIT);
    // 18 Fill in all fields (Name: Auto1, Code: AT1, Age: 30, Value: 100)
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name'})), nameAuto1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code'})), codeAT1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value'})), value100);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Age'})), age30);
    // 19 Click on "Save and Reload" icon
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 20 Check if your new created form is displayed (Code, Value and Name)
    I.waitForVisible(locate('div').withText(Name), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Code), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Value), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(Age), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name'})), nameAuto1);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code'})), codeAT1);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value'})), value100);
    // 21 Update Name (from Auto 1 to Updated)
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameUpdated);
    // 22 Click on "Save and Close" icon
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 23 Check If the list view is displayed
    I.waitForVisible(locate('h5').withText("AT_CreateHTMLF list"), constants.SHORT_WAIT);
    // 24 Check if the Name was updated
    I.waitForVisible(locate('td').withText( nameUpdated).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  verifyFormStepsBasicForm(insertButton, addAT_StepsCreateFview, displayName1stStepAT, name, Age, nameAuto1, valueAge, displayName2ndStepAT, Code,
  Value, codeAT1, value100, editAT_StepsCreateFview) {
    // 32 Click on "Insert" icon
    commonActions.clickSidebarButton(insertButton);
    // 33 The form is displayed and you're redirected to the 1st section -> Check the section name
    I.waitForVisible(locate('span').withText(addAT_StepsCreateFview), constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withText(displayName1stStepAT).inside(locate('li').withAttr({ class: 'active' })), constants.SHORT_WAIT);
    // 34 Fill in Name and Age (Check if Code and Value are not displayed)
    I.waitForVisible(locate('div').withText(name), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Age), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameAuto1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Age' })), valueAge);
    // 35 Click on 2nd Section -> check the section name
    I.click(locate('p').withText('2'));
    I.waitForVisible(locate('h5').withText(displayName2ndStepAT).inside(locate('li').withAttr({ class: 'active' })), constants.SHORT_WAIT);
    // 36 Fill in Code and Value (Check if Name and Age are not displayed)
    I.waitForVisible(locate('div').withText(Code), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Value), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), codeAT1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), value100);
    // 37 Save and close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 38 Check your inserted record
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })))
    // 39 Open your record -> check if your form is displayed (Check if 1st section is displayed)
    commonActions.doubleClickValueFromTable(locate('div').withAttr({ id: 'ebsContainerContent' }), nameAuto1);
    I.waitForVisible(locate('span').withText(editAT_StepsCreateFview), constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withText(displayName1stStepAT).inside(locate('li').withAttr({ class: 'active' })), constants.SHORT_WAIT);
  },

  verifyEditBasicForm(insertButton, nameSectionUpdated, nameSection2, nameSection3, codeAT1, value100, valueAge, nameAuto1) {
    // 15 Click on "Insert" icon
    commonActions.clickSidebarButton(insertButton);
    // 16 Check if your sections are rendered as tabs
    // 17 Check the section order (Section3, Section2 and SCT Updated)
    I.waitForVisible(locate('span').withText(nameSection3).inside(locate('div').withAttr({ class: 'dx-item dx-tab dx-tab-selected stepNumber-1' }).withAttr({ role: 'tab' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameSection2).inside(locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-2' }).withAttr({ role: 'tab' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameSectionUpdated).inside(locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-3' }).withAttr({ role: 'tab' })), constants.SHORT_WAIT);
    // 18 Fill in all fields from 1st section (Code and Value)
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), codeAT1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), value100);
    // 19 Click on 2nd section
    I.click(locate('span').withText(nameSection2).inside(locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-2' })));
    // 20 Fill in all fields from 2nd section (Age)
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Age' })), valueAge);
    // 21 Click on 3rd section
    I.click(locate('span').withText(nameSectionUpdated).inside(locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-3' }).withAttr({ role: 'tab' })));
    // 22 Fill in all fields from 3rd section (Name)
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameAuto1);
    // 23 Save and Close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 24 Check if your record is added in list
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
  },

  verifyGenerateTemplateBasicForm(AT_GenTempFPortalUrl, insertButton, name, Value, Code, Age, nameAuto1, codeAT1, value100, valueAge, editAT_GenTempF) {
    // 13 Access your entity
    commonActions.accessDirectUrl(AT_GenTempFPortalUrl);
    // 14 Click on "Insert" button
    commonActions.clickSidebarButton(insertButton);
    // 15 Check if the form is ok (2 columns/2 rows and contains all fields - Name, Code, Value and Age)
    I.waitForVisible(locate('div').withText(name), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Value), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Code), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Age), constants.SHORT_WAIT);
    // 16 Fill in all fields and click save and Reload
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name'})), nameAuto1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code'})), codeAT1);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value'})), value100);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Age'})), valueAge);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 17 Check if your form is still displayed
    I.waitForVisible(locate('span').withText(editAT_GenTempF), constants.SHORT_WAIT);
  },
};
