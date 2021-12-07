// Constants
const constants = require('~config/constants');
// Page
const projectPage = require('~pages/projectPage');

const I = actor();

module.exports = {
  verifyValueExistsInTable(value) {
    I.waitForVisible(locate('td').withText(value), constants.SHORT_WAIT);
  },

  verifyDPProjectTableColumnsName() {
    I.waitForVisible(projectPage.table.digitalAssetNameColumnName, constants.SHORT_WAIT);
    I.waitForVisible(projectPage.table.digitalAssetCodeColumnName, constants.SHORT_WAIT);
    I.waitForVisible(projectPage.table.digitalAssetVersionColumnName, constants.SHORT_WAIT);
    I.waitForVisible(projectPage.table.digitalAssetTypeColumnName, constants.SHORT_WAIT);
    I.waitForVisible(projectPage.table.digitalAssetStatusColumnName, constants.SHORT_WAIT);
    I.waitForVisible(projectPage.table.includedColumnName, constants.SHORT_WAIT);
  },

  // Verify Digital Asset info in the DP Project Table
  verifyDPProjectTableDA(nameDA, codeDA, versionDA, typeDA, statusDA) {
    I.waitForVisible(locate('td').withText(nameDA).withAttr({ 'aria-colindex': '2' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(codeDA).withAttr({ 'aria-colindex': '3' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(versionDA).withAttr({ 'aria-colindex': '4' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(typeDA).withAttr({ 'aria-colindex': '5' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(statusDA).withAttr({ 'aria-colindex': '6' }), constants.SHORT_WAIT);
    I.waitForVisible(projectPage.checkbox.checkedCheckbox.inside(projectPage.table.seventhPositionLine), constants.SHORT_WAIT);
  },
};
