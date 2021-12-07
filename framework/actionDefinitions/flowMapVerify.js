const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const flowMapPage = require('~pages/flowMapPage');
// Actions
const flowMapActions = require('~actions/flowMapActions');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  async verifyStepsContentMockup(firstStepDisplayName, secondStepDisplayName, firstStepName) {
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepDisplayName}']]`);
    I.saveScreenshot('VerifyStepsMockup.png');
    I.seeVisualDiff('VerifyStepsMockup.png', { tolerance: 6, prepareBaseImage: false });
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDisplayName}']]`);
    I.click(flowMapPage.buttons.detailsButtons);
    I.waitForVisible(flowMapPage.fields.nameInputField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(flowMapPage.fields.nameInputField, firstStepName);
    await commonVerify.verifyValueExistsInInput(flowMapPage.fields.displayNameInputField, firstStepDisplayName);
  },
};
