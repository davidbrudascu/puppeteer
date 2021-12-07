const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const businessUnitPage = require('~pages/businessUnitPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  addNewBusinessUnit(insertButton, businessUnitName1, parentRoot) {
    commonActions.clickSidebarButton(insertButton);
    I.waitForVisible(businessUnitPage.fields.inputNameField, constants.SHORT_WAIT);
    I.click(businessUnitPage.fields.inputNameField);
    I.fillField(businessUnitPage.fields.inputNameField, businessUnitName1);
    I.waitForVisible(businessUnitPage.buttons.lkpAsDDParentBusinessButton, constants.SHORT_WAIT);
    I.click(businessUnitPage.buttons.lkpAsDDParentBusinessButton);
    commonActions.fillInDropdownLookupTableWithValue(businessUnitPage.container.lookupAsDDParentContainer, parentRoot);
    I.click(businessUnitPage.buttons.okLkpAsDDParentPopup);
  },

  editAndInsertNewBusinessUnit(editBusinessUnitTab, businessUnitName2, businessUnitName3, parentRoot) {
    I.waitForVisible(locate('span').withText(editBusinessUnitTab), constants.SHORT_WAIT);
    I.waitForVisible(businessUnitPage.fields.inputNameField, constants.SHORT_WAIT);
    I.click(businessUnitPage.fields.inputNameField);
    I.fillField(businessUnitPage.fields.inputNameField, businessUnitName2);
    I.click(businessUnitPage.buttons.lkpAsDDParentBusinessButton);
    I.waitForVisible(businessUnitPage.buttons.insertLkpAsDDParentPopup, constants.SHORT_WAIT);
    I.click(businessUnitPage.buttons.insertLkpAsDDParentPopup);
    I.wait(5);
    I.switchToNextTab();
    I.waitForVisible(businessUnitPage.fields.inputNameField, constants.SHORT_WAIT);
    I.click(businessUnitPage.fields.inputNameField);
    I.fillField(businessUnitPage.fields.inputNameField, businessUnitName3);
    I.waitForVisible(businessUnitPage.buttons.lkpAsDDParentBusinessButton, constants.SHORT_WAIT);
    I.click(businessUnitPage.buttons.lkpAsDDParentBusinessButton);
    commonActions.fillInDropdownLookupTableWithValue(businessUnitPage.container.lookupAsDDParentContainer, parentRoot);
    I.click(businessUnitPage.buttons.okLkpAsDDParentPopup);
    commonActions.saveAndRefreshAction();
    I.closeCurrentTab();
    commonActions.fillInDropdownLookupTableWithValue(businessUnitPage.container.lookupAsDDParentContainer, businessUnitName3);
    I.click(businessUnitPage.buttons.okLkpAsDDParentPopup);
  },

  async deleteBusinessUnit(businessUnitName2, deleteButton, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, businessUnitName2, businessUnitPage.container.defaultContainer)
    commonActions.clickSidebarButton(deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  },
};
