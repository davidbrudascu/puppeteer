// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
// Pages
const auditPage = require('~pages/auditPage');

const I = actor();

module.exports = {
  verifyHistoryPageInsertOperation() {
    I.waitForVisible(auditPage.fields.formHeadersHistoryTable, constants.SHORT_WAIT);
    // 8.Check if there is one entry with "Insert" operation name and with the current timestamp
    I.waitForVisible(auditPage.fields.operationNameInsertHistoryTable, constants.SHORT_WAIT);
    I.waitForVisible(auditPage.fields.firstRowHistory, constants.SHORT_WAIT);
    I.waitForInvisible(auditPage.fields.secondRowHistory, constants.SHORT_WAIT);
  },
};
