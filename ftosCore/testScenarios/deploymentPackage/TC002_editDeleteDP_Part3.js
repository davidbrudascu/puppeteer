// Actions
const commonActions = require('~actions/commonActions');
const dpActions = require('~actions/dpActions');
// Data
const data = require('~data/deploymentPackage/TC002_editDeleteDP_data');
// Verify
const dpVerify = require('~actions/dpVerify');

// Author Ionut Daniel Mindrescu

Feature('Deployment Packages');

Scenario('PART 3 User can modify and compare deployment package with reference and delete a Deployment Package', async () => {
  // Set current working directory to root to avoid bad relative paths
  commonActions.setCWDasRoot();
  // Prepare the downloaded file and verify it against reference xml file.
  dpActions.parseModifyXml(
    data.downloadFilePath,
    data.dpUpdatedDownloadedFileName,
    data.regexVersion,
    data.referenceFilePath,
    data.dpUpdatedModifiedFileName,
    data.parseFilePath,
  );
  dpVerify.verifyDownloadedPackage(
    data.referenceFilePath,
    data.dpUpdatedModifiedFileName,
    data.dpUpdatedReferenceFilePath,
  );
  // Remove the created directory
  dpActions.removeDir(data.parseFilePath);
  // Login in Studio App
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // Delete the Deployment Package and verify it.
  dpActions.deleteDeploymentPackage(data.deploymentPackageURL, data.dpDisplayName);
  dpVerify.verifyDeletedDeploymentPackage(data.dpDisplayName);
  // Logout from app
  await commonActions.logoutFromApp();
});
