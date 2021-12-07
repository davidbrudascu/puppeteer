// Page
const commonPage = require('~pages/commonPage');
const localizationResourcePage = require('~pages/localizationResourcePage');
// Constants
const constants = require('~config/constants');

const I = actor();

module.exports = {
  addLocalizationResource(moduleName, resourceKey, value) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.waitForClickable(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(localizationResourcePage.fields.moduleNameInput, constants.SHORT_WAIT);
    I.fillField(localizationResourcePage.fields.moduleNameInput, moduleName);
    I.waitForVisible(localizationResourcePage.fields.cultureNameDropdown, constants.SHORT_WAIT);
    I.click(localizationResourcePage.fields.cultureNameDropdown);
    I.waitForVisible(localizationResourcePage.selector.englishOption, constants.SHORT_WAIT);
    I.click(localizationResourcePage.selector.englishOption);
    I.waitForVisible(localizationResourcePage.fields.resourceNameInput, constants.SHORT_WAIT);
    I.fillField(localizationResourcePage.fields.resourceNameInput, resourceKey);
    I.waitForVisible(localizationResourcePage.fields.valueInput, constants.SHORT_WAIT);
    I.fillField(localizationResourcePage.fields.valueInput, value);
  },
};
