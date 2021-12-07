// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const ffPage = require('~pages/filteredFieldsPage');

module.exports = {
  verifyOnlyProperEntriesInTable(validEntries, invalidEntries) {
    // Iterate through list of correct cities
    validEntries.forEach((item) => {
      I.waitForElement(locate('td').withText(item).withAttr({ role: 'gridcell' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })), constants.SHORT_WAIT);
      I.seeElement(locate('td').withText(item).withAttr({ role: 'gridcell' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })));
    });
    // And incorrect cities, if present
    if (invalidEntries !== undefined) {
      invalidEntries.forEach((item) => I.dontSeeElement(locate('td').withText(item).withAttr({ role: 'gridcell' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' }))));
    }
  },

  async verifyLookupDropdown(entityName, entityCountry, validCities) {
    // 22 Check your record in form (check if the lookup values are ok)
    I.waitForElement(ffPage.fields.ffInputPortalEntityName, constants.SHORT_WAIT);
    let value = await I.grabValueFrom(ffPage.fields.ffInputPortalEntityName);
    I.assert(value, entityName);
    value = await I.grabValueFrom(ffPage.fields.ffInputPortalEntityCountryDropdown);
    I.assert(value, entityCountry);
    value = await I.grabValueFrom(ffPage.fields.ffInputPortalEntityCityDropdown);
    // I see that my city is one of the valid ones
    I.assertExists(validCities, (el) => el === value);
  },

  async verifyLookupPopup(entityName, entityCountry, validCities) {
    // 22 Check your record in form (check if the lookup values are ok)
    I.waitForElement(ffPage.fields.ffInputPortalEntityName, constants.SHORT_WAIT);
    let value = await I.grabValueFrom(ffPage.fields.ffInputPortalEntityName);
    I.assert(value, entityName);
    value = await I.grabValueFrom(ffPage.fields.ffInputPortalEntityCountryPopup);
    I.assert(value, entityCountry);
    value = await I.grabValueFrom(ffPage.fields.ffInputPortalEntityCityPopup);
    // I see that my city is one of the valid ones
    I.assertExists(validCities, (el) => el === value);
  },

  verifyCancelButton(){
    I.waitForVisible(ffPage.buttons.cancelPopupButton, constants.SHORT_WAIT);
    I.click(ffPage.buttons.cancelPopupButton);
    I.wait(3);
  }
};
