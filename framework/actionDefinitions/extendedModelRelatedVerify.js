// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/extendedModelRelatedData');
// Pages
const emrPage = require('~pages/extendedModelRelatedPage');

module.exports = {
  emrUjVerifyTableValue() {
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emrAttribData1)), constants.SHORT_WAIT);
    // Check if there is only one result: "RelatedVA"
    I.seeElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emrAttribData1)));
  },

  emrUjVerifyNewAddition() {
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emrAttribData1)), constants.SHORT_WAIT);
    // Check if your extension was added
    I.waitForVisible(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emrAttribData1)), constants.SHORT_WAIT);
  },

  async emrVaVerifyValues() {
    // Check if Display Name is pre-filled with "RelatedVA Code"
    I.waitForElement(emrPage.fields.emrVaInput2, constants.SHORT_WAIT);
    let value = await I.grabValueFrom(emrPage.fields.emrVaInput2);
    I.assert(value, data.emrVaAttribData2);
    // Check if "Updatable" is checked
    I.seeElement(locate(emrPage.fields.emrVaInput3).withChild(locate('input').withAttr({ value: 'true' })));
    // Check if "Attribute Type" is Text and readonly
    value = await I.grabValueFrom(emrPage.fields.emrVaInput4);
    I.assert(value, data.emrVaAttribData3);
    I.seeElement(locate(emrPage.fields.emrVaInput4).withAttr({ 'aria-readonly': 'true' }));
    // Check if length is "3" - readonly
    value = await I.grabValueFrom(emrPage.fields.emrVaInput5);
    I.assert(value, data.emrVaAttribData4);
    I.seeElement(locate(emrPage.fields.emrVaInput5).withAttr({ 'aria-readonly': 'true' }));
  },
};
