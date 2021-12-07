// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const codeBlocksEditDeletePage = require('~pages/codeBlocksPage.js');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  // Edit existing Code Block (modify details and containing code)
  editCodeBlock(nameEdit, displayNameEdit, clientSide, categoryName, code) {
    I.waitForVisible(codeBlocksEditDeletePage.fields.codeBlockName, constants.SHORT_WAIT);
    I.fillField(codeBlocksEditDeletePage.fields.codeBlockName, nameEdit);
    I.fillField(codeBlocksEditDeletePage.fields.codeBlockDisplayName, displayNameEdit);
    commonActions.selectValueFromDropdown(codeBlocksEditDeletePage.dropdown.dropdownButtonUsage, clientSide);
    I.click(codeBlocksEditDeletePage.buttons.removeCategoryButton);
    I.waitForInvisible(codeBlocksEditDeletePage.buttons.removeCategoryButton, constants.SHORT_WAIT);
    I.click(codeBlocksEditDeletePage.selectors.categoryMultiselectDiv);
    I.waitForClickable(locate('div').withText(categoryName).inside(codeBlocksEditDeletePage.dropdown.categoryToSelect), constants.SHORT_WAIT);
    I.click(locate('div').withText(categoryName).inside(codeBlocksEditDeletePage.dropdown.categoryToSelect));
    I.waitForVisible(locate('span').withText(categoryName).inside(codeBlocksEditDeletePage.selectors.categoryMultiselectDiv), constants.SHORT_WAIT);
    I.click(locate('span').withText(categoryName).inside(codeBlocksEditDeletePage.selectors.categoryMultiselectDiv));
    commonActions.fillInCustomMonacoEditor(codeBlocksEditDeletePage.selectors.monacoEditor, codeBlocksEditDeletePage.selectors.monacoEditorId0, code);
  },

  // Use Code Block on a Form Driven Flow in Advanced > After Events
  useCodeBlockOnFlow(categoryName, nameEdit, codeBlockMessage, codePreview) {
    I.waitForElement(codeBlocksEditDeletePage.buttons.afterEvents, constants.SHORT_WAIT);
    I.click(codeBlocksEditDeletePage.buttons.afterEvents);
    I.click(codeBlocksEditDeletePage.buttons.checkoutButton);
    I.waitForVisible(codeBlocksEditDeletePage.selectors.afterEventsEditor, constants.SHORT_WAIT);
    I.rightClick(codeBlocksEditDeletePage.selectors.afterEventsEditor);
    I.waitForVisible(codeBlocksEditDeletePage.selectors.rightClickCodeBlocksOption, constants.SHORT_WAIT);
    I.click(codeBlocksEditDeletePage.selectors.rightClickCodeBlocksOption);
    I.waitForVisible(locate('button').withText(categoryName), constants.SHORT_WAIT);
    I.click(locate('button').withText(categoryName));
    I.waitForVisible(locate('div').withText(nameEdit).inside(codeBlocksEditDeletePage.buttons.codeBlockInsertDiv), constants.SHORT_WAIT);
    I.click(locate('div').withText(nameEdit).inside(codeBlocksEditDeletePage.buttons.codeBlockInsertDiv));
    I.waitForVisible(locate('span').withText(codeBlockMessage).inside(locate('code').withText(codePreview)), constants.SHORT_WAIT);
    I.click(codeBlocksEditDeletePage.buttons.insertCodeButton);
  },

  // Check if Code Block works and message is displayed on the Portal Flow
  checkCodeBlockMessagePortal(codeBlockMessage) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    commonVerify.verifyToastMessage(locate('div').withText(codeBlockMessage), constants.TOAST_VANISH);
  },

  // Deleting the code block
  async deleteCodeBlock(nameEdit, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameEdit, codeBlocksEditDeletePage.containers.defaultContainer);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  }
}
