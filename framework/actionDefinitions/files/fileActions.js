// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  attachFileToInput(locator, pathToFile) {
    I.waitForElement(locator, constants.SHORT_WAIT);
    I.attachFile(locator, pathToFile);
    // Wait until it is attached
    I.waitForElement(locate('div').withChild(locate('div').withAttr({ class: 'file-link-holder label' })), constants.SHORT_WAIT);
  },

  async startDataImport() {
    const startImportBtn = locate('div').withAttr({ id: 'btnImport' });
    I.waitForVisible(startImportBtn, constants.SHORT_WAIT);
    // I click Start Import
    I.click(startImportBtn);
    // I wait for success
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // I wait for data logs to be generated
    const rows = locate('tr').withAttr({ role: 'row' }).inside(locate('div').withAttr({ class: 'dx-datagrid-content' }));
    I.waitForVisible(rows, constants.SHORT_WAIT);
    I.say(`Data Import: ${await I.grabNumberOfVisibleElements(rows)} data import log(s) generated.`);
  },

  insertListOfDataImports(){
    I.waitForVisible(locate('div').withAttr({ id: 'ebsContainerContent_dataimportitem_dataimport_toolbar_item_1' }),constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_dataimportitem_dataimport_toolbar_item_1' }));
  },

  insertImportAttribute(){
    I.waitForVisible(locate('div').withAttr({ id: 'ebsContainerContent_dataImportAttribute_dataimport_toolbar_item_1' }),constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_dataImportAttribute_dataimport_toolbar_item_1' }));
  },
};
