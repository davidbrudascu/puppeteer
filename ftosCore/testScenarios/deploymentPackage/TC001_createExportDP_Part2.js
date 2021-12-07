// Actions
const commonActions = require('~actions/commonActions');
const dpActions = require('~actions/dpActions');
// Data
const data = require('~data/deploymentPackage/TC001_createExportDP_data');
// Verify
const dpVerify = require('~actions/dpVerify');

// Author Ionut Daniel Mindrescu

Feature('Deployment Packages');

Scenario('PART 2 Parse the xml file, modify it, write the new object to a new file and compare it with the reference file', async () => {
  commonActions.setCWDasRoot();
  await dpActions.parseModifyXml(
    data.downloadFilePath,
    data.dpDownloadedFileName,
    data.regexVersion,
    data.referenceFilePath,
    data.modifiedFileName,
    data.parseFilePath,
  );
  dpVerify.verifyDownloadedPackage(
    data.referenceFilePath,
    data.modifiedFileName,
    data.dpReferenceFilePath,
  );
  dpActions.removeDir(data.parseFilePath);
});
