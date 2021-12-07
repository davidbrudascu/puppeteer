// Actions
const commonActions = require('~actions/commonActions');
const dpActions = require('~actions/dpActions');
// Data
const data = require('~data/deploymentPackage/TC002_editDeleteDP_data');
// Verify
const dpVerify = require('~actions/dpVerify');

// Author Ionut Daniel Mindrescu

Feature('Deployment Packages');

Scenario('PART 2 User can modify and compare deployment package with reference, edit the deployment package and export ', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // Prepare the downloaded file and verify it against reference xml file.
  dpActions.parseModifyXml(
    data.downloadFilePath,
    data.dpInitialDownloadedFileName,
    data.regexVersion,
    data.referenceFilePath,
    data.dpInitialModifiedFileName,
    data.parseFilePath,
  );
  dpVerify.verifyDownloadedPackage(
    data.referenceFilePath,
    data.dpInitialModifiedFileName,
    data.dpInitialReferenceFilePath,
  );
  // Edit the deployment package: basic info and remove components
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.editPackageURL);
  dpActions.editPackageInfo(data.dpPackageName, data.dpPackageVersion);
  dpVerify.verifyPackageCreation(data.dpPackageName, data.dpPackageVersion);
  dpActions.editPackageComponents(data.dpEntityComponentName);
  dpActions.handleDownloads(data.handleDownloadFilePath);
  // Export the package
  dpActions.exportPackage(data.downloadFilePath, data.dpUpdatedDownloadedFileName);
  // Logout from app
  await commonActions.logoutFromApp();
});
