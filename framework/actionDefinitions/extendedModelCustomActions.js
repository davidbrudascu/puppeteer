// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Data
const data = require('~data/extendedModelCustomData');
// Pages
const emcPage = require('~pages/extendedModelCustomPage');

module.exports = {
  emcFillInValues() {
    I.waitForElement(emcPage.fields.emcInput1, constants.SHORT_WAIT);
    // Fill in name with "CustomVA"
    I.fillField(emcPage.fields.emcInput1, data.emcAttribData1);
    // Select Extension Type: "Custom"
    I.click(emcPage.fields.emcInput2);
    I.fillField(emcPage.fields.emcInput2, data.emcAttribData2);
    I.click(locate('p').withAttr(emcPage.selector.emcOptionSet1));
  },

  emcVaFillInValues() {
    I.waitForElement(emcPage.fields.emcVaInput1, constants.SHORT_WAIT);
    // Fill in Name with: "AT_Text_VA"
    I.fillField(emcPage.fields.emcVaInput1, data.emcVaAttribData1);
    // Fill in Display Name with: "AT Text Virtual A"
    I.fillField(emcPage.fields.emcVaInput2, data.emcVaAttribData2);
    // Select Attribute Type: "Text"
    I.click(emcPage.fields.emcVaInput3);
    I.fillField(emcPage.fields.emcVaInput3, data.emcVaAttribData3);
    I.click(locate('p').withAttr(emcPage.selector.emcVaOptionSet1));
    // Set length: 10
    I.fillField(emcPage.fields.emcVaInput4, data.emcVaAttribData4);
    // Required level: None
    I.click(emcPage.fields.emcVaInput5);
    I.fillField(emcPage.fields.emcVaInput5, data.emcVaAttribData5);
    I.click(locate('p').withAttr(emcPage.selector.emcVaOptionSet2));
  },

  emcUjClickValue() {
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emcAttribData1)), constants.SHORT_WAIT);
    // Select "CustomVA"
    I.click(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emcAttribData1)));
  },

  goToVirtualAttributesTab() {
    I.waitForVisible(locate('span').withText('Virtual Attributes'), constants.SHORT_WAIT);
    I.forceClick(locate('span').withText('Virtual Attributes'));
  },

  insertBusinessEntityExtensions() {
    I.waitForVisible(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityForm_entityExtension_toolbar_item_1' }), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityForm_entityExtension_toolbar_item_1' }));
  },
};
