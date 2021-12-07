// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const portalProfileActions = require('~actions/portalProfileActions');
// eslint-disable-next-line import/no-unresolved
const webConfigActions = require('~actions/webConfigActions');
// Data
const data = require('~data/portalProfile/TC002_EditPortalProfile.json');
// Verify
const portalProfileVerify = require('~actions/portalProfileVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-366

Feature('Portal Profile');

Scenario('User can edit a portal profile', async () => {
  // For this test have this line added in Portal web.config: '<add key="core-setting-portal-profile" value="AT_EditPortalProfileUpdated"/>'
  // For this test have the UploadEbs Portal Folder linked to the UploadEbs Designer
  // Test will run on a new Portal instance('_PortalProfile')
  //webConfigActions.editWebConfigPortalProfileKey([data.keysWebConfig]);
  // Images path
  const companyLogo = 'screenshots\\portalProfileUpload\\companyLogo.png';
  const loginBackgroundImage = 'screenshots\\portalProfileUpload\\loginBackgroundImage.jpg';
  const backgroundImage = 'screenshots\\portalProfileUpload\\backgroundImage.jpg';
  // Bounding box
  const box = {
    left: 30,
    top: 500,
    right: 390,
    bottom: 570,
  };
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.portalProfileURL);
  // Edit Portal Profile
  portalProfileActions.fillMandatoryFields(
    data.updatedName,
    data.updatedDescription,
  );
  portalProfileActions.replaceAllImages(
    companyLogo,
    data.companyLogoName,
    backgroundImage,
    data.backgroundImageName,
    loginBackgroundImage,
    data.loginBackgroundImageName,
  );
  portalProfileActions.deleteSystemParameterValue(data.systemParameterValue);
  portalProfileActions.deleteMenuItem(data.menuItem);
  await portalProfileActions.addMenuItem(data.secondMenuItem, data.columnDisplayName);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  portalProfileActions.deleteDashboard(data.dashboard);
  portalProfileActions.addDashboard(data.newDashboard);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await portalProfileVerify.verifyNewAndDeletedRecords(
    data.updatedName,
    data.updatedDescription,
    data.systemParameterValue,
    data.menuItem,
    data.dashboard,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  portalProfileVerify.verifyBackgroundImage(box);
  portalProfileVerify.verifyUpdatedRecords(data.secondMenuItem);
  await commonActions.logoutFromApp();
  portalProfileVerify.verifyCompanyLogo();
  portalProfileVerify.verifyLoginBackgroundImage(box);
});
