const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const codeBlocksCategoryPage = require('~pages/codeBlocksCategoryPage');

module.exports = {
  verifyCodeBlocksCategoryFields(codeBlocksCategoryName, codeBlocksCategoryDisplayName, inactiveCodeBlock) {
    I.waitForVisible(codeBlocksCategoryPage.fields.nameField, constants.SHORT_WAIT);
    I.seeInField(codeBlocksCategoryPage.fields.nameField, codeBlocksCategoryName);
    I.seeInField(codeBlocksCategoryPage.fields.displayNameField, codeBlocksCategoryDisplayName);
    I.seeInField(codeBlocksCategoryPage.fields.statusIdDropdownSelectedOption, inactiveCodeBlock);
  }
};
