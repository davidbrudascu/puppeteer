// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const endpointPage = require('~pages/endpointPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  // Select row from pop-up lookup table (first, if there are more rows with similar names)
  selectItemFromPopUpFirst(scriptName) {
    I.waitForVisible(locate('td').withText(scriptName).inside(locate('tr')).first(), constants.SHORT_WAIT);
    I.click(locate('td').withText(scriptName).inside(locate('tr')).first());
  },

  // Same as the method above, only last
  selectItemFromPopUpLast(scriptName) {
    I.waitForVisible(locate('td').withText(scriptName).inside(locate('tr')).last(), constants.SHORT_WAIT);
    I.click(locate('td').withText(scriptName).inside(locate('tr')).last());
  },

  // Adding an Endpoint (name, display name, script)
  addEndpoint(insertButton, endpointName, endpointDisplayName, scriptName) {
    commonActions.clickSidebarButton(insertButton);
    I.waitForVisible(endpointPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(endpointPage.fields.nameField, endpointName);
    I.fillField(endpointPage.fields.displayNameField, endpointDisplayName);
    I.waitForClickable(endpointPage.buttons.scriptDropdownArrow);
    I.click(endpointPage.buttons.scriptDropdownArrow);
    this.selectItemFromPopUpFirst(scriptName);
    I.waitForClickable(endpointPage.buttons.okButtonScriptWindow, constants.SHORT_WAIT);
    I.click(endpointPage.buttons.okButtonScriptWindow);
    I.waitForInvisible(endpointPage.buttons.okButtonScriptWindow, constants.SHORT_WAIT);
    I.waitForVisible(endpointPage.fields.nameField, constants.SHORT_WAIT);
  },

  // Editing the previously added Endpoint (name edit, display name edit, script edit)
  editEndpoint(endpointNameEdit, endpointDisplayNameEdit, scriptNameEdit) {
    I.waitForClickable(endpointPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(endpointPage.fields.nameField, endpointNameEdit);
    I.fillField(endpointPage.fields.displayNameField, endpointDisplayNameEdit);
    I.click(endpointPage.buttons.scriptDropdownArrow);
    this.selectItemFromPopUpLast(scriptNameEdit);
    I.waitForClickable(endpointPage.buttons.okButtonScriptWindow, constants.SHORT_WAIT);
    I.click(endpointPage.buttons.okButtonScriptWindow);
    I.waitForInvisible(endpointPage.buttons.okButtonScriptWindow, constants.SHORT_WAIT);
    I.waitForVisible(endpointPage.fields.nameField, constants.SHORT_WAIT);
  },

  // Deleting the endpoint
  deleteEndpoint(endpointNameEdit) {
    I.waitForClickable(endpointPage.fields.searchByNameField, constants.SHORT_WAIT);
    I.fillField(endpointPage.fields.searchByNameField, endpointNameEdit);
    commonActions.selectARowFromTableAfterText(endpointNameEdit);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  }
};
