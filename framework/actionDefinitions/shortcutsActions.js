// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Page
const shortcutPage = require('~pages/shortcutsPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  pressKey(key, number) {
    let i;
    for (i = 1; i <= number; i++) {
      I.pressKey(key);
    }
  },

  pressKeys(firstKey, secondKey, number) {
    let i;
    for (i = 1; i <= number; i++) {
      I.pressKey([firstKey, secondKey]);
    }
  },

  closeDropdown() {
    I.pressKey([constants.KEY_ALT, constants.KEY_UP_ARROW]);
    I.waitForInvisible(shortcutPage.selector.dropdown, constants.SHORT_WAIT);
  },

  openDropdown() {
    I.pressKey([constants.KEY_ALT, constants.KEY_DOWN_ARROW]);
    I.waitForVisible(shortcutPage.selector.dropdown, constants.SHORT_WAIT);
  },

  async selectRecord(nameRecord) {
    I.pressKey(constants.KEY_ENTER);
    await commonVerify.verifyValueExistsInInput(shortcutPage.fields.optionSetKeyboardShortcutInputField, nameRecord);
  },

  insertRecordDropdownShortcut() {
    this.addRecord();
    I.waitForVisible(shortcutPage.buttons.optionSetKeyboardShortcutDropdownButton, constants.SHORT_WAIT);
    I.click(shortcutPage.buttons.optionSetKeyboardShortcutDropdownButton);
  },

  addRecord() {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
  },

  selectCalendarField() {
    this.addRecord();
    I.waitForVisible(shortcutPage.fields.dateCalendarShortcutInputField, constants.SHORT_WAIT);
    I.click(shortcutPage.fields.dateCalendarShortcutInputField);
  },

  openCalendar() {
    I.pressKey([constants.KEY_ALT, constants.KEY_DOWN_ARROW]);
    I.waitForVisible(shortcutPage.container.calendarContainer, constants.SHORT_WAIT);
  },

  closeCalendar() {
    I.pressKey([constants.KEY_ALT, constants.KEY_UP_ARROW]);
    I.waitForInvisible(shortcutPage.container.calendarContainer, constants.SHORT_WAIT);
  },

  navigateToPreviousMonth(month, number) {
    let i;
    for (i = 1; i <= number; i++) {
      I.pressKey([constants.KEY_SHIFT, constants.KEY_PAGE_UP]);
    }
    I.waitForVisible(locate('a').withAttr({ 'aria-label': month }), constants.SHORT_WAIT);
  },

  navigateToNextMonth(month, number) {
    let i;
    for (i = 1; i <= number; i++) {
      I.pressKey([constants.KEY_SHIFT, constants.KEY_PAGE_DOWN]);
    }
    I.waitForVisible(locate('a').withAttr({ 'aria-label': month }), constants.SHORT_WAIT);
  },

  async closeCalendarWithoutSelection(empty) {
    I.pressKey(constants.KEY_ESCAPE);
    await commonVerify.verifyValueExistsInInput(shortcutPage.fields.dateCalendarShortcutInputField, empty);
    I.waitForInvisible(shortcutPage.container.calendarContainer, constants.SHORT_WAIT);
  },

  async selectDate(selection) {
    I.pressKey(constants.KEY_ENTER);
    await commonVerify.verifyValueExistsInInput(shortcutPage.fields.dateCalendarShortcutInputField, selection);
  },

  saveKeyShortcut() {
    I.pressKey([constants.KEY_CONTROL, constants.KEY_S]);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  fillBeforeEventsMonacoEditor(code) {
    I.waitForClickable(shortcutPage.buttons.checkoutButton, constants.SHORT_WAIT);
    // Using wait because no other wait methods work
    I.wait(1);
    I.click(shortcutPage.buttons.checkoutButton);
    I.waitForElement(shortcutPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
    I.click(shortcutPage.selector.firstLineCodeMonacoEditor);
    I.pressKey([constants.KEY_CONTROL, constants.KEY_A]);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(shortcutPage.selector.firstLineCodeMonacoEditor, code);
  },

  fillBeforeEventsExpandedMonacoEditor(code) {
    I.waitForVisible(shortcutPage.buttons.beforeEventsCodeEditorFullscreenButton, constants.SHORT_WAIT);
    I.click(shortcutPage.buttons.beforeEventsCodeEditorFullscreenButton);
    within(shortcutPage.selector.popupMonacoEditor, () => {
      I.waitForElement(shortcutPage.selector.overlayFullscreenMonacoEditor, constants.SHORT_WAIT);
      I.waitForElement(shortcutPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
      I.click(shortcutPage.selector.firstLineCodeMonacoEditor);
      I.pressKey([constants.KEY_CONTROL, constants.KEY_A]);
      I.pressKey(constants.KEY_DELETE);
      I.fillField(shortcutPage.selector.firstLineCodeMonacoEditor, code);
    });
  },

  fillMonacoEditor(code) {
    I.waitForClickable(shortcutPage.buttons.codeCheckoutButton, constants.SHORT_WAIT);
    I.click(shortcutPage.buttons.codeCheckoutButton);
    I.waitForElement(shortcutPage.selector.overlayMonacoEditor, constants.SHORT_WAIT);
    I.waitForVisible(shortcutPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
    I.waitForElement(shortcutPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
    I.click(shortcutPage.selector.firstLineCodeMonacoEditorXPATH);
    I.pressKey([constants.KEY_CONTROL, constants.KEY_A]);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(shortcutPage.selector.firstLineCodeMonacoEditor, code);
  },

  fillExpandedMonacoEditor(code) {
    I.waitForVisible(shortcutPage.buttons.codeEditorFullscreenButton, constants.SHORT_WAIT);
    I.click(shortcutPage.buttons.codeEditorFullscreenButton);
    within(shortcutPage.selector.popupMonacoEditor, () => {
      I.waitForElement(shortcutPage.selector.overlayFullscreenMonacoEditorSS, constants.SHORT_WAIT);
      I.waitForElement(shortcutPage.selector.firstLineCodeMonacoEditor, constants.SHORT_WAIT);
      I.click(shortcutPage.selector.firstLineCodeMonacoEditor);
      I.pressKey([constants.KEY_CONTROL, constants.KEY_A]);
      I.pressKey(constants.KEY_DELETE);
      I.fillField(shortcutPage.selector.firstLineCodeMonacoEditor, code);
    });
  },

  async insertRecordKeyboardShortcutPortal(recordName, updatedRecordName) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(shortcutPage.fields.shortcutSavePortalInputField, constants.SHORT_WAIT);
    I.fillField(shortcutPage.fields.shortcutSavePortalInputField, recordName);
    this.saveKeyShortcut();
    await commonVerify.verifyValueExistsInInput(shortcutPage.fields.shortcutSavePortalInputField, recordName);
    I.fillField(shortcutPage.fields.shortcutSavePortalInputField, updatedRecordName);
    this.saveKeyShortcut();
    I.click(commonPage.buttons.goBackButton);
    commonVerify.verifyValueExistsInTable(shortcutPage.container.defaultContainer, updatedRecordName);
  },

  goToPreviousPage() {
    I.click(commonPage.buttons.goBackButton);
  },

  closeMonacoEditorExpanded() {
    I.waitForVisible(shortcutPage.buttons.closeFullscreenCodeEditorButton, constants.SHORT_WAIT);
    I.click(shortcutPage.buttons.closeFullscreenCodeEditorButton);
  },

  clickPageName(name) {
    I.waitForVisible(locate('h5').withText(name), constants.SHORT_WAIT);
    I.click(locate('h5').withText(name));
  },

  clickCheckbox(name) {
    I.waitForVisible(locate(`#ebsContainerContent_${name}`), constants.SHORT_WAIT);
    I.click(locate(`#ebsContainerContent_${name}`));
  },

  clickRadioButton(name) {
    I.waitForVisible(locate('div').withAttr({ role: 'radio' }).withDescendant(locate('div').withText(name)), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ role: 'radio' }).withDescendant(locate('div').withText(name)));
  },

  continueWithoutSaving() {
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  filterNameColumn() {
    I.waitForVisible(shortcutPage.columns.nameColumnHeader, constants.SHORT_WAIT);
    I.click(shortcutPage.columns.nameColumnHeader);
  },
};
