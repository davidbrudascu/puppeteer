const fs = require('fs');
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions');
// Page
const projectPage = require('~pages/projectPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  insertProject(nameProject, codeProject, descriptionProject) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(projectPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(projectPage.fields.nameInputField, nameProject);
    I.fillField(projectPage.fields.codeInputField, codeProject);
    I.fillField(projectPage.fields.descriptionInputField, descriptionProject);
  },

  addDAToProject(nameDA) {
    I.waitForVisible(projectPage.buttons.insertProjectDigitalAssetButton, constants.SHORT_WAIT);
    I.click(projectPage.buttons.insertProjectDigitalAssetButton);
    I.waitForVisible(projectPage.buttons.arrowDownAddDAButtonProjectButton, constants.SHORT_WAIT);
    I.click(projectPage.buttons.arrowDownAddDAButtonProjectButton);
    this.selectDAForProject(nameDA);
  },

  insertDAFromProject(name, code, description) {
    I.click(projectPage.buttons.arrowDownAddDAButtonProjectButton);
    I.waitForVisible(projectPage.buttons.insertButtonSelectDAApplication, constants.SHORT_WAIT);
    I.click(projectPage.buttons.insertButtonSelectDAApplication);
    I.waitForNavigation();
    I.switchToNextTab();
    digitalAssetActions.createDigitalAsset(
      name,
      code,
      description,
    );
    commonActions.saveAndRefreshAction();
    I.closeCurrentTab();
  },

  selectDAForProject(name) {
    I.waitForVisible(projectPage.fields.searchByNameDAInputApplicationField, constants.SHORT_WAIT);
    I.fillField(projectPage.fields.searchByNameDAInputApplicationField, name);
    this.selectARowFromTableAfterText(name);
    I.click(projectPage.buttons.okButtonSelectDAApplication);
  },

  insertDPProject(nameProjectDP, nameProject) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(projectPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(projectPage.fields.nameInputField, nameProjectDP);
    I.click(projectPage.buttons.arrowDownAddProjectDPButton);
    I.waitForVisible(projectPage.fields.searchByNameInputField, constants.SHORT_WAIT);
    I.fillField(projectPage.fields.searchByNameInputField, nameProject);
    commonActions.selectARowFromTableAfterText(nameProject);
    I.click(projectPage.buttons.okButtonAddProjectDP);
  },

  exportDPProject(nameProject) {
    I.handleDownloads();
    I.waitForVisible(projectPage.buttons.exportProjectDPButton, constants.SHORT_WAIT);
    I.click(projectPage.buttons.exportProjectDPButton);
    I.amInPath('output/downloads');
    I.waitForFile(`${nameProject}.zip`, constants.SHORT_WAIT);
  },

  excludeDAFromDPProject() {
    I.waitForVisible(projectPage.checkbox.checkedCheckbox.inside(projectPage.table.seventhPositionLine), constants.SHORT_WAIT);
    I.click(projectPage.checkbox.checkedCheckbox.inside(projectPage.table.seventhPositionLine));
  },

  deleteDAFromProject(name) {
    this.selectARowFromTableAfterText(name);
    I.waitForVisible(projectPage.buttons.deleteDAProjectButton, constants.SHORT_WAIT);
    I.click(projectPage.buttons.deleteDAProjectButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyValueDontExistsInTable(projectPage.container.projectDigitalAssetContainer, name);
  },

  selectARowFromTableAfterText(textforclick) {
    I.waitForVisible(locate('td').withText(textforclick).inside(locate('tr')), constants.SHORT_WAIT);
    I.click(locate('td').withText(textforclick).inside(locate('tr')));
  },

};
