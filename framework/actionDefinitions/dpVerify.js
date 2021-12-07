const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const dpPage = require('~pages/dpPage');
// actions
const commonVerify = require('~actions/commonVerify');
const commonActions = require('~actions/commonActions');

module.exports = {
  verifyPackageCreation(dpPackageName, dpPackageVersion) {
    I.waitForElement(dpPage.fields.dpPackageComponentsTable, constants.LONG_WAIT);
    I.seeInField(dpPage.fields.dpPackageNameField, dpPackageName);
    I.seeInField(dpPage.fields.dpPackageVersion, dpPackageVersion);
  },

  verifyComponentCreation(dpEntityComponentName) {
    I.waitForElement(dpPage.fields.dpPackageNameField, constants.SHORT_WAIT);
    I.waitForElement(dpPage.selector.dpComponentItem, constants.SHORT_WAIT);
    I.seeElement(locate('td').withText(dpEntityComponentName));
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForElement(dpPage.selector.dpComponentItem, constants.SHORT_WAIT);
  },

  verifyDeletedDeploymentPackage(dpDisplayName) {
    I.waitForInvisible(locate('div').withText(dpDisplayName), constants.SHORT_WAIT);
    I.dontSeeElement(locate('div').withText(dpDisplayName));
  },

  verifyDownloadedPackage(refFilePath, modifiedFileName, dpReferenceFilePath) {
    // Set file path then wait and check that the file was downloaded
    I.amInPath(refFilePath);
    I.waitForFile(modifiedFileName, constants.LONG_WAIT);
    I.seeFile(modifiedFileName);
    // Compare the xml file with the reference one.
    I.seeFileContentsEqualReferenceFile(dpReferenceFilePath, 'utf8');
  },
};
