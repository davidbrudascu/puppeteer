// Constants
const constants = require('~config/constants');
// Actions
const projectActions = require('~actions/projectActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/project/TC003_ManageProjectAddApplication.json');
// Page
const commonPage = require('~pages/commonPage');
const projectPage = require('~pages/projectPage');
// Verify
const commonVerify = require('~actions/commonVerify');

// Author Catalin Diaconu
// AT-1034

Feature('Project');

Scenario('User can add an application to a project', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlProject);
  projectActions.addDAToProject(data.nameFirstDA);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonVerify.verifyValueExistsInTable(projectPage.container.projectDigitalAssetContainer, data.nameFirstDA);
  projectActions.addDAToProject(data.nameSecondDA);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonVerify.verifyValueExistsInTable(projectPage.container.projectDigitalAssetContainer, data.nameSecondDA);
  projectActions.deleteDAFromProject(data.nameFirstDA);
  projectActions.addDAToProject(data.nameThirdDA);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY, data.errorMessage);
  await commonActions.logoutFromApp();
});
