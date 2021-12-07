// Constants
const constants = require('~config/constants');
// Pages
const portalProfilePage = require('~pages/portalProfilePage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {

  verifyAddedRecords(menuItemDisplayName) {
    // Verify if the language has been moved to the user profile popup
    I.waitForVisible(portalProfilePage.selector.accountDropdown, constants.SHORT_WAIT);
    I.waitForClickable(portalProfilePage.selector.accountDropdown, constants.SHORT_WAIT);
    I.click(portalProfilePage.selector.accountDropdown);
    I.waitForVisible(portalProfilePage.selector.languageSelectorDropdown, constants.SHORT_WAIT);
    // Verify if the dashboard is present
    I.waitForVisible(portalProfilePage.dashboard.mainDashboard, constants.SHORT_WAIT);
    // Verify if the menu item is present
    I.click(portalProfilePage.buttons.openMenuButton);
    I.waitForVisible(locate('a').withText(menuItemDisplayName).inside(portalProfilePage.container.menuContainer), constants.SHORT_WAIT);
  },

  async verifyPortalProfileRecords(namePortalProfile, descriptionPortalProfile, systemParameterID, menuItemDisplayName, dashboardName) {
    await commonVerify.verifyValueExistsInInput(portalProfilePage.fields.nameInputField, namePortalProfile);
    await commonVerify.verifyValueExistsInInput(portalProfilePage.fields.descriptionInputField, descriptionPortalProfile);
    I.waitForVisible(locate('td').withText(systemParameterID).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(menuItemDisplayName).inside(locate('tr')), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(dashboardName).inside(locate('tr')), constants.SHORT_WAIT);
  },

  verifyLoginBackgroundImage(box) {
    I.saveScreenshot('loginBackgroundImage.jpg');
    I.seeVisualDiff('loginBackgroundImage.jpg', { prepareBaseImage: true, tolerance: 6, boundingBox: box });
  },

  verifyCompanyLogo() {
    I.waitForVisible(portalProfilePage.selector.logoImgContainer, constants.SHORT_WAIT);
    I.saveElementScreenshot(portalProfilePage.selector.logoImgContainer, 'companyLogo.png');
    I.seeVisualDiffForElement(portalProfilePage.selector.logoImgContainer, 'companyLogo.png', { prepareBaseImage: true, tolerance: 6 });
  },

  verifyBackgroundImage(box) {
    I.waitForVisible(portalProfilePage.selector.accountDropdown, constants.SHORT_WAIT);
    I.saveScreenshot('backgroundImage.jpg');
    I.seeVisualDiff('backgroundImage.jpg', { prepareBaseImage: true, tolerance: 6, boundingBox: box });
  },

  async verifyNewAndDeletedRecords(updatedName, updatedDescription, systemParameterValue, menuItem, dashboard) {
    // Verify the new records
    await commonVerify.verifyValueExistsInInput(portalProfilePage.fields.nameInputField, updatedName);
    await commonVerify.verifyValueExistsInInput(portalProfilePage.fields.descriptionInputField, updatedDescription);
    // Verify if the records have been deleted
    commonVerify.verifyValueDontExistsInTable(portalProfilePage.container.systemParameterValueContainer, systemParameterValue);
    commonVerify.verifyValueDontExistsInTable(portalProfilePage.container.showMenuItemsContainer, menuItem);
    commonVerify.verifyValueDontExistsInTable(portalProfilePage.container.showDashboardContainer, dashboard);
  },

  verifyUpdatedRecords(secondMenuItem) {
    // Verify if there is no language select option in the User Profile Dropdown
    I.waitForVisible(portalProfilePage.selector.accountDropdown, constants.SHORT_WAIT);
    I.waitForClickable(portalProfilePage.selector.accountDropdown, constants.SHORT_WAIT);
    I.click(portalProfilePage.selector.accountDropdown);
    I.waitForInvisible(portalProfilePage.selector.languageSelectorDropdown, constants.SHORT_WAIT);
    // Verify if there are no items in the menu section
    I.click(portalProfilePage.buttons.openMenuButton);
    I.waitForVisible(locate('a').withText(secondMenuItem).inside(portalProfilePage.container.menuContainer), constants.SHORT_WAIT);
    // Verify new dashboard
    I.waitForVisible(portalProfilePage.dashboard.localizeENDashboard, constants.SHORT_WAIT);
  },
};
