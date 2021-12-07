const I = actor();
// Constants
const fs = require('fs');
const path = require('path');
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const dpPage = require('~pages/dpPage');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  insertDeploymentPackage(dpPackageName, dpPackageVersion) {
    // Waiting for the deployment package results table to be fully loaded.
    I.waitForVisible(commonPage.buttons.insertButton, constants.LONG_WAIT);
    I.click(commonPage.buttons.insertButton);
    // Fill the insert deployment package form.
    I.waitForElement(dpPage.fields.dpPackageVersion, constants.LONG_WAIT);
    I.fillField(dpPage.fields.dpPackageNameField, dpPackageName);
    I.fillField(dpPage.fields.dpPackageVersion, dpPackageVersion);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  editPackageInfo(dpPackageName, dpPackageVersion) {
    I.waitForElement(dpPage.fields.dpPackageVersion, constants.LONG_WAIT);
    I.clearField(dpPage.fields.dpPackageNameField);
    I.fillField(dpPage.fields.dpPackageNameField, dpPackageName);
    I.clearField(dpPage.fields.dpPackageVersion);
    I.fillField(dpPage.fields.dpPackageVersion, dpPackageVersion);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addEntityPackageComponent(dpEntityComponentType, dpEntityName, columnName) {
    I.waitForElement(dpPage.buttons.dpInsertComponentButton, constants.LONG_WAIT);
    I.click(dpPage.buttons.dpInsertComponentButton);
    I.waitForElement(dpPage.selector.dpTypeComponent, constants.SHORT_WAIT);
    I.click(dpPage.selector.dpTypeComponent);
    I.fillField(dpPage.selector.dpTypeComponent, dpEntityComponentType);
    I.pressKey('Enter');
    await commonActions.searchInTableAfterASpecificColumn(columnName, dpEntityName, dpPage.container.csDataGridContainer);
    // Added wait() in order to wait for the results to be filtered
    I.wait(1);
    I.click(dpPage.buttons.dpComponentResultInsertButton);
  },

  editPackageComponents(dpEntityComponentName) {
    I.waitForElement(dpPage.locate.locateGridcell.withText(dpEntityComponentName),
      constants.LONG_WAIT);
    I.click(dpPage.locate.locateGridcell.withText(dpEntityComponentName));
    I.click(dpPage.buttons.dpDeleteComponentButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForInvisible(dpPage.locate.locateGridcell.withText(dpEntityComponentName), constants.SHORT_WAIT);
    I.dontSeeElement(dpPage.locate.locateGridcell.withText(dpEntityComponentName));
  },

  parseModifyXml(downloadFilePath, dpDownloadedFileName, regexVersion, referenceFilePath, modifiedFileName, parseFilePath) {
    // set the xml path, composed of the default download path + file name
    I.amInPath(downloadFilePath);
    I.waitForFile(dpDownloadedFileName, constants.SHORT_WAIT);
    I.seeFile(dpDownloadedFileName);
    const xmlFilePath = parseFilePath + dpDownloadedFileName;
    // read/parse the xml file and put the data in an objects
    const result = fs.readFileSync(xmlFilePath, 'utf8');
    // create a new regex to be used to remove lines from object
    const newRegexVersion = new RegExp(regexVersion);
    // replace the CoreSettings lines with blank
    const data = result.replace(newRegexVersion, '');
    // write the modified object data to a new file
    const modifiedFilePath = referenceFilePath + modifiedFileName;
    fs.writeFileSync(path.join(__dirname, `../${modifiedFilePath}`), data);
  },

  exportPackage(downloadFilePath, dpDownloadedFileName) {
    I.waitForClickable(dpPage.buttons.exportBasicButton, constants.LONG_WAIT);
    I.click(dpPage.buttons.exportBasicButton);
    // Set the path to output/downloads to check the downloaded files
    I.amInPath(downloadFilePath);
    // Wait and check that the file was downloaded
    // TODO: waitForFile() & seeFile() will fail randomly (3/10 tries) because file is not visible;
    // TODO: error returned from node_module 'mocha': cannot access 'watcher' before initialization;
    // TODO: requires further investigation, possible due to a codeceptjs version change;
    I.wait(5);
    I.waitForFile(dpDownloadedFileName, constants.SHORT_WAIT);
    I.seeFile(dpDownloadedFileName);
  },

  handleDownloads(path) {
    // handleDownloads cleans the 'output/downloads' directory to ensure no old files are kept
    I.handleDownloads(path); // TODO modify this, find a better way, create sub-folders
  },

  deleteDeploymentPackage(deploymentPackageURL, dpDisplayName) {
    I.amOnPage(deploymentPackageURL);
    I.waitForElement(dpPage.fields.dpMainPagePackageNameField, constants.LONG_WAIT);
    I.fillField(dpPage.fields.dpMainPagePackageNameField, dpDisplayName);
    I.waitForElement(locate('td').withText(dpDisplayName));
    I.click(locate('td').withText(dpDisplayName));
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  removeDir(dir) {
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  },
};
