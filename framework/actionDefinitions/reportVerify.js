// Constants
const constants = require('~config/constants');
// Pages
const reportPage = require('~pages/reportPage');

const I = actor();

module.exports = {

  // verify in portal if Action button appear and
  verifyReportEntityDocument(reportDisplayNameField) {
    // 	Select a record for edit.
    I.waitForElement(reportPage.table.firstTestRecord, constants.SHORT_WAIT);
    I.doubleClick(reportPage.table.firstTestRecord);
    I.click(reportPage.table.firstTestRecord);
    // 	Check that Actions button is displayed.
    I.waitForVisible(reportPage.labels.editDocReportPageLabel, constants.SHORT_WAIT);
    I.waitForVisible(reportPage.buttons.actionBtn, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.buttons.actionBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.actionBtn);
    // 	Click on Actions button
    // 	Check that AT_CreateDocReport report is displayed in dropdown.
    I.waitForVisible(locate('span').withText(reportDisplayNameField).inside(reportPage.labels.reportLink), constants.SHORT_WAIT);
  },

  verifyReportEntityCustom(reportDisplayNameField){
    I.waitForElement(reportPage.table.firstTestRecord, constants.SHORT_WAIT);
    I.doubleClick(reportPage.table.firstTestRecord);
    I.click(reportPage.table.firstTestRecord);
    // 	Check that Actions button is displayed.
    // 	Click on Actions button
    I.waitForVisible(reportPage.labels.editCustomReportPageLabel, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.fields.inputNameEditPageField, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.buttons.actionBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.actionBtn);
    // 	Check that AT Entity Custom Report is displayed in dropdown.
    I.waitForVisible(locate('span').withText(reportDisplayNameField).inside(reportPage.labels.reportLink), constants.SHORT_WAIT);
  },

  verifyReportErrorInPortal() {
    I.waitForVisible(reportPage.fields.errorReporting, constants.SHORT_WAIT);
  },

  verifyGeneralSimpleGridReport() {
    I.waitForVisible(reportPage.labels.formTitleGridReport, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.buttons.showReportBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.showReportBtn);
    //	Check that a record table with 'Test One' record is displayed.
    I.waitForVisible(reportPage.table.reportRecordFromTable, constants.SHORT_WAIT);
  },
};
