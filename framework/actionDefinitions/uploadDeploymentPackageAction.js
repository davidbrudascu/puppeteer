// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Pages
const designerDashboard = require('~pages/dashboardPage');
const deploymentPackagesPage = require('~pages/deploymentPackagesPage');

module.exports = {
  // Method created as a test/PoC a long time ago,
  // TODO to be rewritten when we develop Deployment Package tests.
  uploadDeploymentPackageAction() {
    I.click(designerDashboard.buttons.deploymentPackagesButton);
    I.click(deploymentPackagesPage.buttons.ImportPackage);
    I.attachFile('file', '../testData/ExportTestBogdan.xml');
    I.click(deploymentPackagesPage.buttons.confirmImport);
    // FIXME
    I.wait(5);
    I.see('ExportTestBogdan', '.dx-datagrid-table');
  },
};
