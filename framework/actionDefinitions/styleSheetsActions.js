// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Page
const styleSheetsPage = require('~pages/styleSheetsPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  selectARowFromTableAfterText(textForClick) {
    I.waitForVisible(locate('td').withText(textForClick).inside(locate('tr')), constants.SHORT_WAIT);
    I.click(locate('td').withText(textForClick).inside(locate('tr')));
  },

  deleteStyleSheet(styleSheetTest) {
    I.waitForVisible(locate('td').withText(styleSheetTest), constants.SHORT_WAIT);
    this.selectARowFromTableAfterText(styleSheetTest);
    I.click(commonPage.buttons.deleteButton);
    I.waitForClickable(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForVisible(styleSheetsPage.fields.searchMenuField, constants.SHORT_WAIT);
    I.click(styleSheetsPage.fields.searchMenuField);
    I.waitForVisible(styleSheetsPage.fields.searchEqual, constants.SHORT_WAIT);
    I.click(styleSheetsPage.fields.searchEqual);
    I.fillField(styleSheetsPage.fields.searchStyleSheet, styleSheetTest);
    I.waitForInvisible(locate('td').withText(styleSheetTest), constants.SHORT_WAIT);
  },

  createStyleSheet(styleSheetName, codeMonaco) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(styleSheetsPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(styleSheetsPage.fields.nameField, styleSheetName);
    commonActions.fillInCustomMonacoEditor(
      styleSheetsPage.fields.codeField,
      0,
      codeMonaco,
    );
  },

  editStyleSheet(monacoCode) {
    I.waitForVisible(styleSheetsPage.fields.nameField, constants.SHORT_WAIT);
    commonActions.fillInCustomMonacoEditor(
      styleSheetsPage.fields.codeField,
      0,
      monacoCode,
    );
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async checkStyleSheet(scriptStyleSheet, colorCode) {
    await I.executeScript(scriptStyleSheet);
    I.waitForVisible(styleSheetsPage.container.titleContainer, constants.SHORT_WAIT);
    I.seeCssPropertiesOnElements(styleSheetsPage.container.titleContainer, { 'background-color': colorCode });
  },
};
