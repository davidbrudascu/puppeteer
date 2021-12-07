// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const dataConfigPage = require('~pages/dataConfigPage');

const I = actor();

module.exports = {
  // Verify Table Columns Names and Regenerate Buttons
  verifyTableColumns() {
    // Check 'Regenerate' Button
    I.waitForVisible(dataConfigPage.buttons.regenerateButton, constants.SHORT_WAIT);
    // Check the table columns
    I.waitForVisible(dataConfigPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(dataConfigPage.table.typeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(dataConfigPage.table.entityNameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(dataConfigPage.table.includeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(dataConfigPage.table.identificationConstraintNameColumnTable, constants.SHORT_WAIT);
  },

  // Verify Table Entities and Entities Types
  verifyTableEntities(nameFirstEntity, nameSecondEntity, firstEntityType, secondEntityType) {
    I.waitForVisible(locate('div').withText(nameFirstEntity).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(nameSecondEntity).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(firstEntityType).withAttr({ 'aria-colindex': '2' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(secondEntityType).withAttr({ 'aria-colindex': '2' }).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
  },

  verifyTableRow(nameEntity, nameType) {
    I.waitForVisible(locate('td').withText(nameEntity).withAttr({ 'aria-colindex': '1' }).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameType).withAttr({ 'aria-colindex': '2' }).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
  }
};
