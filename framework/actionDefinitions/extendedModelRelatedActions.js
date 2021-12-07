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
  emrFillInValues() {
    I.waitForElement(emrPage.fields.emrInput1, constants.SHORT_WAIT);
    // Fill in name with "RelatedVA"
    I.fillField(emrPage.fields.emrInput1, data.emrAttribData1);
    // Select Extension Type: "Related"
    I.click(emrPage.fields.emrInput2);
    I.fillField(emrPage.fields.emrInput2, data.emrAttribData2);
    I.click(locate('p').withAttr(emrPage.selector.emrOptionSet1));
    // Select Relation Attribute: "AT_ForREMEntity1Id"
    I.click(emrPage.fields.emrInput3);
    I.fillField(locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '1' })), data.emrAttribData3);
    I.click(locate('td').withAttr({ 'aria-colindex': '1' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last());
    // Check "Is owner for relation"
    I.checkOption(emrPage.selector.emrIsOwnerForRelation);
  },

  emrVaFillInValues1() {
    I.waitForElement(emrPage.fields.emrVaInput1, constants.SHORT_WAIT);
    // Select "Related Attribute": "Code"
    I.click(emrPage.fields.emrVaInput1);
    I.click(locate('div').withAttr({ role: 'option' }).withChild(locate('div').withText(emrPage.selector.emrVaOptionSet1)));
  },

  emrVaFillInValues2() {
    I.waitForElement(emrPage.fields.emrVaInput6, constants.SHORT_WAIT);
    // Select "Required level" - "Required"
    I.click(emrPage.fields.emrVaInput6);
    I.click(locate('div').withAttr({ role: 'option' }).withChild(locate('div').withText(emrPage.selector.emrVaOptionSet2)));
  },

  emrUjClickValue() {
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emrAttribData1)), constants.SHORT_WAIT);
    // Select "RelatedVA"
    I.click(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(data.emrAttribData1)));
  },

  goToVirtualAttributesTab() {
    I.waitForVisible(locate('span').withText('Virtual Attributes'), constants.SHORT_WAIT);
    I.forceClick(locate('span').withText('Virtual Attributes'));
  },

  insertBusinessEntityExtensions(){
    I.waitForVisible(emrPage.buttons.insertBusinessEntityExtensions, constants.SHORT_WAIT);
    I.click(emrPage.buttons.insertBusinessEntityExtensions);
  }
};
