// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const codeBlocksCategoryPage = require('~pages/codeBlocksCategoryPage');

// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  // Double click on an element from a list by text (first)
  selectARowFromTableAfterText(textForClick) {
    I.waitForVisible(locate('td').withText(textForClick).inside(locate('tr')).first(), constants.SHORT_WAIT);
    I.click(locate('td').withText(textForClick).inside(locate('tr')).first());
  },

  // Adding a code blocks category
  async addCodeBlocksCategory(codeBlocksCategories, codeBlocksCategoryName, codeBlocksCategoryDisplayName, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, codeBlocksCategories, codeBlocksCategoryPage.container.optionSetListContainer);
    commonActions.doubleClickValueFromTable(codeBlocksCategoryPage.container.optionSetListContainer, codeBlocksCategories);
    I.waitForVisible(codeBlocksCategoryPage.buttons.insertButtonCategory, constants.SHORT_WAIT);
    I.click(codeBlocksCategoryPage.buttons.insertButtonCategory);
    I.waitForVisible(codeBlocksCategoryPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(codeBlocksCategoryPage.fields.nameField, codeBlocksCategoryName);
    I.fillField(codeBlocksCategoryPage.fields.displayNameField, codeBlocksCategoryDisplayName);
    I.click(codeBlocksCategoryPage.buttons.statusIdDropdownButton);
    I.waitForVisible(codeBlocksCategoryPage.fields.statusIdDropdownInactiveOption);
    I.click(codeBlocksCategoryPage.fields.statusIdDropdownInactiveOption);
  },

  // Editing the added code blocks category (change display name and status id - name became read-only after save)
  editCodeBlocksCategory(codeBlocksCategoryDisplayNameEdit) {
    I.waitForVisible(codeBlocksCategoryPage.fields.displayNameField, constants.SHORT_WAIT);
    I.fillField(codeBlocksCategoryPage.fields.displayNameField, codeBlocksCategoryDisplayNameEdit);
    I.click(codeBlocksCategoryPage.buttons.statusIdDropdownButton);
    I.waitForVisible(codeBlocksCategoryPage.fields.statusIdDropdownActiveOption);
    I.click(codeBlocksCategoryPage.fields.statusIdDropdownActiveOption);
  },

  // Deleting the code blocks category
  async deleteCodeBlocksCategory(codeBlocksCategoryName, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, codeBlocksCategoryName, codeBlocksCategoryPage.container.optionSetListContainer);
    I.waitForVisible(codeBlocksCategoryPage.buttons.deleteButtonCategory, constants.SHORT_WAIT);
    I.click(codeBlocksCategoryPage.buttons.deleteButtonCategory);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  },
};
