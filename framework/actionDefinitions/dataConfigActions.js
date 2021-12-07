// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const dataConfigPage = require('~pages/dataConfigPage');

const I = actor();

module.exports = {
  async insertDataDefinition(nameDataDefinition, displayNameDataDefinition, nameMasterEntity, columnName) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(dataConfigPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(dataConfigPage.fields.nameInputField, nameDataDefinition);
    I.fillField(dataConfigPage.fields.displayNameInputField, displayNameDataDefinition);
    // Select Master Entity
    I.click(dataConfigPage.buttons.lookupArrowDownMasterEntity);
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameMasterEntity, dataConfigPage.container.masterEntityContainer);
    I.click(dataConfigPage.buttons.okButtonMasterEntityLookup);
  },

  selectTab(tab) {
    I.waitForVisible(locate('span').withText(tab).inside(dataConfigPage.selector.tabList), constants.SHORT_WAIT);
    I.forceClick(locate('span').withText(tab).inside(dataConfigPage.selector.tabList));
  },

  async deleteDataDefinition(nameDataDefinition, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameDataDefinition, dataConfigPage.container.defaultContainer)
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyValueDontExistsInTable(dataConfigPage.container.defaultContainer, nameDataDefinition);
  },

  async accessDataDef(nameDataDefinition, columnName) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameDataDefinition, dataConfigPage.container.defaultContainer);
    commonActions.doubleClickValueFromTable(dataConfigPage.container.defaultContainer, nameDataDefinition);
  },

  editFieldsDataDef(editNameDataDefinition, editDisplayNameDataDefinition, editDescriptionDataDefinition) {
    I.waitForVisible(dataConfigPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(dataConfigPage.fields.nameInputField, editNameDataDefinition);
    I.fillField(dataConfigPage.fields.displayNameInputField, editDisplayNameDataDefinition);
    I.fillField(dataConfigPage.fields.descriptionInputField, editDescriptionDataDefinition);
  },

  selectUniqueConstraint(position, uniqueConstraintName) {
    I.waitForVisible(dataConfigPage.buttons.regenerateButton, constants.SHORT_WAIT);
    I.click(dataConfigPage.buttons.regenerateButton);
    I.scrollTo(dataConfigPage.buttons.editButtonDefinitionTable);
    I.waitForVisible(dataConfigPage.buttons.editButtonDefinitionTable.at(position), constants.SHORT_WAIT);
    I.click(dataConfigPage.buttons.editButtonDefinitionTable.at(position));
    I.waitForVisible(dataConfigPage.buttons.dropdownButtonIdentificationConstraintName, constants.SHORT_WAIT);
    I.click(dataConfigPage.buttons.dropdownButtonIdentificationConstraintName);
    I.waitForVisible(locate('div').withText(uniqueConstraintName).inside(locate('div').withAttr({ role: 'listbox' })), constants.SHORT_WAIT);
    I.click(locate('div').withText(uniqueConstraintName).inside(locate('div').withAttr({ role: 'listbox' })));
    I.waitForClickable(dataConfigPage.buttons.saveButton, constants.SHORT_WAIT);
    I.click(dataConfigPage.buttons.saveButton);
  },

  clickRegenerateButton() {
    I.waitForVisible(dataConfigPage.buttons.regenerateButton, constants.SHORT_WAIT);
    I.click(dataConfigPage.buttons.regenerateButton);
  },
};
