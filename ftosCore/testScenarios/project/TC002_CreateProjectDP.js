// Constants
const constants = require('~config/constants');
// Actions
const projectActions = require('~actions/projectActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/project/TC002_CreateProjectDP.json');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const projectVerify = require('~actions/projectVerify');

// Author Catalin Diaconu
// AT-1034

Feature('Project');

Scenario('User can add a Deployment Package to a project', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlProjectDPList);
  projectActions.insertDPProject(
    data.nameProjectDP,
    data.nameProject,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  projectVerify.verifyDPProjectTableColumnsName();
  projectVerify.verifyDPProjectTableDA(
    data.typeDA,
    data.typeDA,
    data.versionDA,
    data.typeDA,
    data.statusDA,
  );
  projectActions.excludeDAFromDPProject();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  projectActions.exportDPProject(data.nameProject);
  await commonActions.logoutFromApp();
});
