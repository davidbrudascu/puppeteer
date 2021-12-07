// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const portalProfilePage = require('~pages/portalProfilePage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  attachFileToInput(locator, pathToFile, fileName) {
    I.waitForElement(locator, constants.SHORT_WAIT);
    I.attachFile(locator, pathToFile);
    // Wait until it is attached
    I.waitForElement(locate('a').withText(fileName), constants.SHORT_WAIT);
  },

  addPortalProfile(namePortalProfile, descriptionPortalProfile, companyLogo, backgroundImage, loginBackgroundImage, companyLogoName, backgroundImageName, loginBackgroundImageName) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    this.fillMandatoryFields(namePortalProfile, descriptionPortalProfile);
  },

  // Search and delete portal profile
  deletePortalProfile(namePortalProfile) {
    commonActions.selectARowFromTableAfterText(namePortalProfile);
    I.click(commonPage.buttons.deleteButton);
    I.waitForClickable(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyValueDontExistsInTable(portalProfilePage.container.container, namePortalProfile);
  },

  async addMenuItem(menuItemDisplayName, columnDisplayName) {
    I.waitForVisible(portalProfilePage.buttons.attachMenuItemButton, constants.SHORT_WAIT);
    I.click(portalProfilePage.buttons.attachMenuItemButton);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, menuItemDisplayName, portalProfilePage.container.attachToMenuItemContainer);
    I.click(portalProfilePage.buttons.showMenuItemsPopupOKButton);
    // Using this method because the other 'wait' methods are not working
    I.wait(3);
    I.click(portalProfilePage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addDashboard(dashboardName) {
    I.click(portalProfilePage.buttons.showDashboardInsertButton);
    I.waitForVisible(portalProfilePage.buttons.addDashboardIDButton, constants.SHORT_WAIT);
    I.click(portalProfilePage.buttons.addDashboardIDButton);
    commonActions.selectARowFromTableAfterText(dashboardName);
    I.click(portalProfilePage.buttons.selectDashboardPopupOKButton);
  },

  async addSystemParameterValue(systemParameterID, parameterValue, columnName) {
    I.click(portalProfilePage.buttons.systemParameterValueInsertButton);
    I.waitForVisible(portalProfilePage.buttons.systemParameterIDButton, constants.SHORT_WAIT);
    I.click(portalProfilePage.buttons.systemParameterIDButton);
    await commonActions.searchInTableAfterASpecificColumn(columnName, systemParameterID, portalProfilePage.container.systemParameterContainer);
    I.click(portalProfilePage.buttons.systemParameterIDPopupOKButton);
    I.waitForVisible(portalProfilePage.fields.parameterValueInputField, constants.SHORT_WAIT);
    I.fillField(portalProfilePage.fields.parameterValueInputField, parameterValue);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deleteSystemParameterValue(systemParameterValue) {
    commonActions.selectARowFromTableAfterText(systemParameterValue);
    I.click(portalProfilePage.buttons.systemParameterValueDeleteButton);
    I.waitForClickable(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  deleteMenuItem(menuItem) {
    commonActions.selectARowFromTableAfterText(menuItem);
    I.click(portalProfilePage.buttons.showMenuItemDeleteButton);
    I.waitForClickable(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  deleteDashboard(dashboard) {
    commonActions.selectARowFromTableAfterText(dashboard);
    I.click(portalProfilePage.buttons.showDashboardDeleteButton);
    I.waitForClickable(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  deleteAllImages() {
    I.click(portalProfilePage.buttons.deleteCompanyLogoButton);
    I.click(portalProfilePage.buttons.deleteBackgroundImageButton);
    I.click(portalProfilePage.buttons.deleteLoginBackgroundImageButton);
  },

  replaceAllImages(companyLogo, companyLogoName, backgroundImage, backgroundImageName, loginBackgroundImage, loginBackgroundImageName) {
    this.deleteAllImages();
    this.addImages(
      companyLogo,
      companyLogoName,
      backgroundImage,
      backgroundImageName,
      loginBackgroundImage,
      loginBackgroundImageName,
    );
  },

  fillMandatoryFields(updatedName, updatedDescription) {
    I.waitForVisible(portalProfilePage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(portalProfilePage.fields.nameInputField, updatedName);
    I.fillField(portalProfilePage.fields.descriptionInputField, updatedDescription);
  },

  addImages(companyLogo, companyLogoName, backgroundImage, backgroundImageName, loginBackgroundImage, loginBackgroundImageName) {
    this.attachFileToInput(portalProfilePage.selector.addCompanyLogoFileInput, companyLogo, companyLogoName);
    this.attachFileToInput(portalProfilePage.selector.addBackgroundImageFileInput, backgroundImage, backgroundImageName);
    this.attachFileToInput(portalProfilePage.selector.addLoginBackgroundImageFileInput, loginBackgroundImage, loginBackgroundImageName);
  },
};
