// Actions
const commonActions = require('~actions/commonActions');
const dpActions = require('~actions/dpActions');
// Data
const data = require('~data/deploymentPackage/TC002_editDeleteDP_data');


// Author Ionut Daniel Mindrescu

Feature('Deployment Packages');

Scenario('PART 1 User can export a Deployment Package', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Navigate to edit the Deployment Package
  commonActions.accessDirectUrl(data.editPackageURL);
  dpActions.handleDownloads(data.handleDownloadFilePath);
  // Export the package to verify the initial state
  dpActions.exportPackage(data.downloadFilePath, data.dpInitialDownloadedFileName);
  // Logout from app
  await commonActions.logoutFromApp();
});
