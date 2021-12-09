// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const portalProfileActions = require('~actions/portalProfileActions');
// eslint-disable-next-line import/no-unresolved
// const webConfigActions = require('~actions/webConfigActions');
// Pages
const commonPage = require('~pages/commonPage');
// Data
const data = require('~data/portalProfile/TC001_AddPortalProfile.json');
// Verify
const commonVerify = require('~actions/commonVerify');
const portalProfileVerify = require('~actions/portalProfileVerify');

// Author Catalin Diaconu
// AT-366

Feature('Portal Profile');

Scenario('User can add a portal profile', async () => {
  // For this test have this line added in Portal web.config: '<add key="core-setting-portal-profile" value="AT_AddPortalProfile"/>'
  // For this test have the UploadEbs Portal Folder linked to the UploadEbs Designer
  // Test will run on a new Portal instance('_PortalProfile')
  //webConfigActions.editWebConfigPortalProfileKey([data.keysWebConfig]);
  // Add images
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
  commonActions.accessDirectUrl(data.portalProfileListURL);
  // Create a portal profile
  portalProfileActions.addPortalProfile(
    data.namePortalProfile,
    data.descriptionPortalProfile,
  );
  portalProfileActions.addImages(
    companyLogo,
    data.companyLogoName,
    backgroundImage,
    data.backgroundImageName,
    loginBackgroundImage,
    data.loginBackgroundImageName,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await portalProfileActions.addSystemParameterValue(
    data.systemParameterID,
    data.parameterValue,
    data.columnName,
  );
  await portalProfileActions.addMenuItem(data.menuItemDisplayName, data.columnDisplayName);
  portalProfileActions.addDashboard(data.dashboardName);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await portalProfileVerify.verifyPortalProfileRecords(
    data.namePortalProfile,
    data.descriptionPortalProfile,
    data.systemParameterID,
    data.menuItemDisplayName,
    data.dashboardName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  portalProfileVerify.verifyBackgroundImage(box);
  portalProfileVerify.verifyAddedRecords(data.menuItemDisplayName);
  await commonActions.logoutFromApp();
  portalProfileVerify.verifyLoginBackgroundImage(box);
  portalProfileVerify.verifyCompanyLogo();
  commonActions.accessDirectUrl(data.portalProfileListURL);
  // Delete the portal profile created in this test
  portalProfileActions.deletePortalProfile(data.namePortalProfile);
  await commonActions.logoutFromApp();
});
