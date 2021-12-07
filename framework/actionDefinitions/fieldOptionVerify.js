// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const fieldOptionPage = require('~pages/fieldOptionPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Actions
const commonActions = require('~actions/commonActions');
const attributePage = require('~pages/attributePage');
const businessEntityPage = require('~pages/businessEntityPage');

module.exports = {

  verifyVirtualAttributeRequired(entityName, attributeCodeNum, selectFromDD, errorMessage) {
    commonActions.clickSidebarButton("Insert");
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
    I.click(fieldOptionPage.buttons.lookupAsDropdownButton);
    commonActions.fillInDropdownLookupTableWithValue(fieldOptionPage.container.lookupAsDropdownContainer,selectFromDD);
    I.fillField(fieldOptionPage.fields.inputCodeFieldOptionField, attributeCodeNum);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, entityName);
  },

  async verifyVirtualAttributeRelatedRequired(attributePortalName, selectCityFromDD, relatedCode, relatedCountry, errorMessage) {
    commonActions.clickSidebarButton('Insert');
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, attributePortalName);
    I.click(fieldOptionPage.buttons.lookupAsDropdownCityButton);
    commonActions.fillInDropdownLookupTableWithValue(fieldOptionPage.container.lookupAsDDCityContainer, selectCityFromDD);
    commonActions.doubleClickValueFromTable(fieldOptionPage.container.lookupAsDDCityContainer, selectCityFromDD);
    await commonVerify.verifyValueExistsInInput(fieldOptionPage.fields.inputFOVARCity_CodeField, relatedCode);
    await commonVerify.verifyValueExistsInInput(fieldOptionPage.fields.inputFOVARCountry_CodeField, relatedCountry);
    // Changed clearField() with manual actions because it doesn't work as expected in this scenario
    I.click(fieldOptionPage.fields.inputFOVARCity_CodeField);
    I.pressKey(['CTRL', 'A']);
    I.pressKey('Backspace');
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      errorMessage,
    );
    I.click(fieldOptionPage.buttons.lookupAsDropdownCityButton);
    commonActions.fillInDropdownLookupTableWithValue(fieldOptionPage.container.lookupAsDDCityContainer, selectCityFromDD);
    commonActions.doubleClickValueFromTable(fieldOptionPage.container.lookupAsDDCityContainer, selectCityFromDD);
  },

  verifyFOinWizardUJ(textInsertValue, numericAttributeDName, numericInsertValue, errorMessage) {
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, textInsertValue);
    I.waitForVisible(fieldOptionPage.fields.inputCodeReadOnlyField, constants.SHORT_WAIT)
    I.click(commonPage.buttons.nextButton);
    I.waitForInvisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(commonPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
    I.fillField(fieldOptionPage.fields.inputValueFieldOptionField, numericInsertValue);
    I.click(commonPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.goBackToPreviousPage()
    commonVerify.verifyValueExistsInTable(fieldOptionPage.container.defaultContainerContent, textInsertValue);
  },

  verifyFOinUJ(textInsertValue, errorMessage, numericInsertValue) {
    commonActions.clickSidebarButton("Insert");
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, textInsertValue);
    I.waitForVisible(fieldOptionPage.fields.inputCodeReadOnlyField, constants.SHORT_WAIT)
    commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(fieldOptionPage.buttons.secondStep);
    I.waitForInvisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.waitForVisible(fieldOptionPage.fields.inputValueFieldOptionField, constants.SHORT_WAIT)
    commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
    I.fillField(fieldOptionPage.fields.inputValueFieldOptionField, numericInsertValue);
    commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.goBackToPreviousPage()
    commonVerify.verifyValueExistsInTable(fieldOptionPage.container.defaultContainerContent, textInsertValue);
  },

  // verify in portal that the validations regarding Code attribute was applied correctly
  async verifyFOValidation(insertButton, errorMessage, attributePortalName, inputCode){
    commonActions.clickSidebarButton(insertButton);
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT)
    commonActions.saveAndCloseAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, attributePortalName);
    I.fillField(fieldOptionPage.fields.inputCodeFieldOptionField, inputCode)
    commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInputReadOnly(fieldOptionPage.fields.inputCodeReadOnlyField, inputCode)
  },

  verifyFoNameValidation(insertButton, errorMessage){
    commonActions.clickSidebarButton(insertButton);
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.waitForVisible(fieldOptionPage.fields.inputCodeReadOnlyField, constants.SHORT_WAIT);
    commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
  },

  verifyNewEntryInPortal(attributePortalName){
    I.waitForVisible(locate('td').withText(attributePortalName).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForVisible(fieldOptionPage.table.fourthElementRowOfTableIsCheck, constants.SHORT_WAIT);
    I.waitForVisible(fieldOptionPage.table.thirdElementRowOfTableIsEmpty, constants.SHORT_WAIT)
  },

  verifyCityLookupInPortal(insertButton, attributePortalName, attributeName, attributeCode, attributePopulation, attributeCityName){
    commonActions.clickSidebarButton(insertButton);
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, attributePortalName);
    I.waitForVisible(fieldOptionPage.buttons.dropdownViewCityButton, constants.SHORT_WAIT);
    I.click(fieldOptionPage.buttons.dropdownViewCityButton);
    I.waitForVisible(locate('div').withText(attributeName).inside('#ebsContainerContent_AT_ForFieldOptCityId_dataGrid'), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeCode).inside('#ebsContainerContent_AT_ForFieldOptCityId_dataGrid'), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributePopulation).inside('#ebsContainerContent_AT_ForFieldOptCityId_dataGrid'), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(attributeCityName).inside('#ebsContainerContent_AT_ForFieldOptCityId_dataGrid'), constants.SHORT_WAIT);
    I.click(locate('td').withText(attributeCityName).inside('#ebsContainerContent_AT_ForFieldOptCityId_dataGrid'));
    I.waitForInvisible(fieldOptionPage.buttons.editCityButton, constants.SHORT_WAIT);
  },

  verifyCountryLookupInPortal(attributeCountryName){
    I.waitForVisible(fieldOptionPage.buttons.lookupCountryFOButton, constants.SHORT_WAIT);
    I.click(fieldOptionPage.buttons.lookupCountryFOButton);
    I.waitForVisible(fieldOptionPage.container.lookupAsDDCountryContainer, constants.SHORT_WAIT);
    I.waitForInvisible(fieldOptionPage.buttons.insertPopupButton, constants.SHORT_WAIT);
    commonActions.fillInDropdownLookupTableWithValue(fieldOptionPage.container.lookupAsDDCountryContainer, attributeCountryName);
    commonActions.doubleClickValueFromTable(fieldOptionPage.container.lookupAsDDCountryContainer ,attributeCountryName);
  },

  async verifyCountryUpdatedLookupInPortal(attributeCountryUpdatedName){
    I.waitForVisible(fieldOptionPage.buttons.editCountryButton, constants.SHORT_WAIT);
    I.click(fieldOptionPage.buttons.editCountryButton);
    I.switchToNextTab();
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.waitForClickable(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, attributeCountryUpdatedName);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInput(fieldOptionPage.fields.inputNameFieldOptionField, attributeCountryUpdatedName);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.switchToPreviousTab();
    I.refreshPage();
    await commonVerify.verifyValueExistsInInput(fieldOptionPage.fields.inputCountryNameField, attributeCountryUpdatedName);
  },

  verifyDeletedFO(primaryAttributeDName, textInsertValue) {
    commonActions.clickSidebarButton('Insert');
    I.waitForVisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.fillField(fieldOptionPage.fields.inputNameFieldOptionField, textInsertValue);
    commonActions.saveAndCloseAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForInvisible(fieldOptionPage.fields.inputNameFieldOptionField, constants.SHORT_WAIT);
    I.see(textInsertValue);
  },

  async verifyIfExistDefaultValue(text, textArea, numeric, wholeNumber) {
    I.waitForVisible(businessEntityPage.buttons.insertNewAttributeButton, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertNewAttributeButton);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAtt, text);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAreaAtt, textArea);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultNumericAtt, numeric);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultWholeNumberAtt, wholeNumber);
  },
};
