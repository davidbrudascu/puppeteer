// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~root/config/constants');

module.exports = {
  async verifyProfileItem(value) {
    I.waitForVisible(locate('div').withAttr({ class: 'dropdown-menu-nav-item' }), constants.SHORT_WAIT);
    const itemText = await I.grabTextFrom(locate('span').withText(value).inside(locate('div').withAttr({ class: 'dropdown-menu-nav-item' })));
    I.assert(itemText, value);
  },

  async checkNameValues(enCulture, enName, roCulture, roName, position) {
    I.waitForVisible(locate('td').withAttr({ role: 'gridcell' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })), constants.SHORT_WAIT);
    // en-GB
    const enValue = await I.grabTextFrom(locate('td').withAttr({ role: 'gridcell' }).after(locate('td').withText(enCulture)).at(position));
    I.assert(enValue, enName);
    // ro-RO
    const roValue = await I.grabTextFrom(locate('td').withAttr({ role: 'gridcell' }).after(locate('td').withText(roCulture)).at(position));
    I.assert(roValue, roName);
  },

  async verifyLocalizationHtmlAttrib(value, resourceKey) {
    I.waitForVisible(locate('div').withAttr({ class: 'row' }).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    const actualValue = await I.grabTextFrom(locate('div').withAttr({ 'data-resource-key': resourceKey }));
    I.assert(actualValue, value);
  },

  async verifyWizardDetails(widgetName, title, content) {
    I.waitForVisible(locate('div').withAttr({ htmlwidgetname: widgetName }), constants.SHORT_WAIT);
    // Title
    const widgetTitle = await I.grabTextFrom(locate('h4').withAttr({ class: 'titleh4' }).inside(locate('div').withAttr({ htmlwidgetname: widgetName })));
    I.assert(widgetTitle, title);
    // Content
    const widgetContent = await I.grabTextFrom(locate('div').inside(locate('div').withAttr({ class: 'row' }).inside(locate('div').withAttr({ htmlwidgetname: widgetName }))));
    I.assert(widgetContent, content);
  },
};
