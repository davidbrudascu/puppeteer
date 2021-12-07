// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  async verifyToastMessageOrder(toastOrder) {
    I.waitForElement(locate(commonPage.messagePopup.toast), constants.SHORT_WAIT);
    for (let index = 0; index < toastOrder.length; index += 1) {
      const item = toastOrder[index];
      commonVerify.verifyToastMessage(item.type, item.state, item.string);
      // eslint-disable-next-line no-await-in-loop
      const actualMessage = await I.grabTextFrom(locate('div').inside(locate(commonPage.messagePopup.toast)).at(index + 1));
      // Replace x\n at start, it is also grabbed
      I.assert(actualMessage.replace('×\n', ''), item.string);
    }
  },
};
