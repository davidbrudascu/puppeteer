// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/extendedModelCustomData');
// Actions
const commonActions = require('~actions/commonActions');

module.exports = {
  emcUjVerifyTableValue() {
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emcAttribData1)), constants.SHORT_WAIT);
    // Check if there is only one result: "CustomVA"
    I.seeElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emcAttribData1)));
  },

  emcUjVerifyNewAddition() {
    commonActions.waitForLoadersToFinish();
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emcAttribData1)), constants.SHORT_WAIT);
    // Check if your extension was added
    I.waitForVisible(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emcAttribData1)), constants.SHORT_WAIT);
  },
};
