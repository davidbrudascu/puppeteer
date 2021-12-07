// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const ffPage = require('~pages/filteredFieldsPage');

module.exports = {
  fillInProperCityInDropdown(validCities) {
    // 21 Select any city from the list (for example Paris)
    const random = validCities[Math.floor(Math.random() * validCities.length)];
    const selector = locate('td').withText(random).withAttr({ role: 'gridcell' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' }));
    I.waitForElement(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  fillInProperCityInPopup(validCities) {
    // 21 Select any city from the list (for example Paris)
    const random = validCities[Math.floor(Math.random() * validCities.length)];
    const selector = locate('td').withText(random).withAttr({ role: 'gridcell' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' }));
    I.waitForElement(selector, constants.SHORT_WAIT);
    I.click(selector);
    this.clickOkPopupTableButton(ffPage.buttons.okPopupCityButton)
  },

  clickOkPopupTableButton(okPopupButton){
    I.waitForVisible(okPopupButton);
    I.waitForClickable(okPopupButton);
    I.click(okPopupButton);
    I.waitForInvisible(okPopupButton);
  },
};
