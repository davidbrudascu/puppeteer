// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
const codePage = require('~pages/codePage');

const I = actor();

module.exports = {
  // Click the dropdown button of a given popup lookup table column and select value
  fillInPopupLookupTableColumnWithValue(tableAnchor, searchColumn, string) {
    // Search for string
    const search = locate('input').withAttr({ role: 'textbox' })
      .inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': searchColumn }))
      .inside(tableAnchor);
    I.waitForVisible(search, constants.SHORT_WAIT);
    I.fillField(search, string);
    // Click row in table
    const selector = locate('td').withText(string).withAttr({ role: 'gridcell' })
      .inside(locate('tr').withAttr({ role: 'row' }))
      .inside(tableAnchor);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  checkOutCodeEditor(checkoutCodeButton) {
    I.waitForVisible(checkoutCodeButton, constants.SHORT_WAIT);
    I.click(checkoutCodeButton);
  },
};
