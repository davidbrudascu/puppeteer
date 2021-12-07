// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
const { minify } = require('html-minifier');
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');

module.exports = {
  // Verify that a table on the page is empty
  // TODO refactor with anchor
  verifyEmptyTableData() {
    commonActions.waitForLoadersToFinish();
    const selector = locate('.dx-datagrid-content').before(locate('span').withText('No data').inside(locate('div').withAttr({ 'aria-rowcount': '0' })));
    I.waitForElement(selector, constants.SHORT_WAIT);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.seeElement(selector);
  },

  // Verify that a value exists in a table defined by an anchor on the page
  verifyValueExistsInTable(anchor, value) {
    commonActions.waitForLoadersToFinish();
    const selector = locate('td').withText(value).inside(locate(anchor));
    I.waitForVisible(selector, constants.SHORT_WAIT);
  },

  // Verify that a value exists in a table defined by an anchor on the page
  verifyValueDontExistsInTable(anchor, value) {
    commonActions.waitForLoadersToFinish();
    I.waitForElement(anchor, constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withAttr({ class: 'dx-datagrid-content' }), constants.SHORT_WAIT);
    const selector = locate('td').withText(value).inside(locate(anchor));
    I.dontSeeElement(selector);
  },

  // Verify the type and message of a toast. State is vanish || stay. Message is optional.
  verifyToastMessage(type, state, string) {
    const selector = locate(type).inside(locate(commonPage.messagePopup.toast));
    I.waitForVisible(selector, constants.LONG_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    // Optionally, Verify if message has text
    if (string !== undefined) {
      I.seeElement(locate(type).withText(string).inside(locate(commonPage.messagePopup.toast)));
    }
    // Verify if messages vanishes after a few sec
    if (state.toString().trim() === constants.TOAST_VANISH) {
      I.waitForInvisible(selector, constants.SHORT_WAIT);
    }
  },

  // FIXME De ce sunt doua tipuri de functii la fel? dontSeeToastMessage > verifyDontSee?
  // Verify the type and message of a toast. State is vanish || stay. Message is optional.
  verifyDontSeeToastMessage(type, string) {
    const selector = locate(type).inside(locate(commonPage.messagePopup.toast));
    // Optionally, Verify if message has text
    if (string !== undefined) {
      I.dontSeeElement(locate(type).withText(string).inside(locate(commonPage.messagePopup.toast)));
    }
    I.dontSeeElement(selector);
  },

  // Compares two minified HTML strings if they are the same
  compareTwoHtmlStringsIfSame(string1, string2) {
    // Minify html
    const html1 = minify(string1, {
      collapseWhitespace: true,
    });
    const html2 = minify(string2, {
      collapseWhitespace: true,
    });
    // Assert if same or error
    I.assert(html1, html2);
  },

  // Verify that a value exists in an input
  async verifyValueExistsInInput(anchor, expectedValue) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.scrollTo(anchor);
    I.waitForClickable(anchor, constants.SHORT_WAIT);
    const actualValue = await I.grabValueFrom(anchor);
    I.assert(actualValue, expectedValue);
  },

  // Verify that a value exists in an input
  // Check that the anchor is  readonly
  async verifyValueExistsInInputReadOnly(anchor, expectedValue) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    const actualValue = await I.grabValueFrom(anchor);
    I.assert(actualValue, expectedValue);
  },

  async verifyValueExistsInLabel(anchor, expectedValue) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.waitForClickable(anchor, constants.SHORT_WAIT);
    const actualValue = await I.grabTextFrom(anchor);
    I.assert(actualValue, expectedValue);
  },

  // Verify the type and message of a toast. State is vanish || stay. Message is optional.
  dontSeeToastMessage(type, string) {
    I.seeNumberOfVisibleElements(type, 0);
    // Optionally, Verify if message has text
    if (string !== undefined) {
      I.dontSee(locate(type).withText(string).inside(locate(commonPage.messagePopup.toast)));
    }
  },

  // Opens and verifies if values exist in an OptionSet List
  verifyValuesExistInOptionSet(anchor, values) {
    // Open Option Set List
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.click(anchor);
    // Check for values inside of it
    values.forEach((item) => {
      I.seeElement(locate('p').withAttr({ title: item }).withText(item)
        .inside(locate('div').withAttr({ class: 'dx-popup-content' })));
    });
    I.click(anchor);
  },

  // Opens and verifies if values don't exist in an OptionSet List
  verifyValuesDontExistInOptionSet(anchor, values) {
    // Open Option Set List
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.click(anchor);
    // Check for values inside of it
    values.forEach((item) => {
      I.dontSeeElement(locate('p').withAttr({ title: item }).withText(item)
        .inside(locate('div').withAttr({ class: 'dx-popup-content' })));
    });
    I.click(anchor);
  },

  // Verify that an input is present on a field, then verifies its text
  async verifyTooltipTextOnField(selector, text) {
    // Hover
    I.moveCursorTo(selector);
    // See tooltip on field
    const tooltipElement = locate('div').withAttr({ 'data-original-title': text });
    I.waitForElement(tooltipElement, constants.SHORT_WAIT);
    I.seeElement(tooltipElement);
    // Verify tooltip text
    I.waitForElement(locate('div').withAttr({ role: 'tooltip' }), constants.SHORT_WAIT);
    const tooltipText = await I.grabTextFrom(locate('div').withAttr({ class: 'tooltip-inner' }).inside(locate('div').withAttr({ role: 'tooltip' })));
    I.assert(tooltipText, text);
  },

  // Verify if entry is the first record in the table page
  async verifyFirstRecordOfATableAfterText(container, name) {
    I.waitForVisible(locate('td').withText(name).inside(container), constants.SHORT_WAIT);
    const entityName = await I.grabTextFrom(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': '2' }).inside(locate(container)).at('2'));
    I.assert(entityName, name);
  },

  // Verify if entry is the last record in the table page
  async verifyLastRecordOfATableAfterText(container, name) {
    I.waitForVisible(locate('td').withText(name).inside(container), constants.SHORT_WAIT);
    const entityName = await I.grabTextFrom(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': '2' }).inside(locate(container)).last());
    I.assert(entityName, name);
  },

  // Verify if the checkbox of a row in a table is selected
  verifyIfCheckboxRowIsSelected(row) {
    I.waitForVisible(locate('div').withAttr({ 'aria-checked': 'true' }).inside(locate('tr').withAttr({ 'aria-rowindex': row })));
  },

  // Verify a checkbox is read only
  verifyCheckboxIsReadOnly(name) {
    I.waitForVisible(locate('div').withAttr({ id: `ebsContainerContent_${name}` }).withAttr({ 'aria-disabled': 'true' }), constants.SHORT_WAIT);
  },

  // Verify a checkbox is checked/unchecked
  verifyIfCheckboxIsSelected(name, bool) {
    I.waitForVisible(locate('div').withAttr({ 'aria-checked': bool }).withAttr({ id: `ebsContainerContent_${name}` }), constants.SHORT_WAIT);
  },

  verifyIfHomePageVisible() {
    I.waitForVisible(commonPage.container.homePageContainer, constants.SHORT_WAIT);
  },
};
