// Constants
const constants = require('~config/constants');
// Actions
const projectActions = require('~actions/projectActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/project/TC001_CreateApplication.json');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const projectVerify = require('~actions/projectVerify');

// Author Catalin Diaconu
// AT-1032

Feature('Project');

Scenario('User can create a project and from the project an application', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlProjectList);
  projectActions.insertProject(
    data.nameProject,
    data.codeProject,
    data.descriptionProject,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  projectActions.addDAToProject(data.firstDA);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  projectActions.insertDAFromProject(
    data.nameDA,
    data.codeDA,
    data.descriptionDA,
  );
  projectActions.selectDAForProject(data.nameDA);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  projectVerify.verifyValueExistsInTable(data.nameDA);
  await commonActions.logoutFromApp();
});
