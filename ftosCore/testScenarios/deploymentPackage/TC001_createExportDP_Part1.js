// Actions
const commonActions = require('~actions/commonActions');
const dpActions = require('~actions/dpActions');
// Data
const data = require('~data/deploymentPackage/TC001_createExportDP_data');
// Verify
const dpVerify = require('~actions/dpVerify');

// Author Ionut Daniel Mindrescu

Feature('Deployment Packages');

Scenario('PART 1 User can create a Deployment Package, add an Entity component and export it.', async () => {
  // Login in Studio App and navigate to Deployment Package page
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.deploymentPackageURL);
  // Insert a new Deployment Package and verify it
  dpActions.insertDeploymentPackage(data.dpPackageName, data.dpPackageVersion);
  dpVerify.verifyPackageCreation(data.dpPackageName, data.dpPackageVersion);
  // Insert Business Entity as Deployment Package Component and verify it
  await dpActions.addEntityPackageComponent(data.dpEntityComponentType, data.dpEntityName, data.columnName);
  dpVerify.verifyComponentCreation(data.dpEntityComponentName);
  dpActions.handleDownloads(data.handleDownloadFilePath);
  // Export the package
  dpActions.exportPackage(data.downloadFilePath, data.dpDownloadedFileName);
  // Logout from app
  await commonActions.logoutFromApp();
});
