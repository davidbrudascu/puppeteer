// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
const menuItemsVerify = require('~actions/menuItemsVerify');
// Pages
const commonPage = require('~pages/commonPage');
const securityRolesPage = require('~pages/securityRolesPage');

const I = actor();

module.exports = {

  verifyCustomFlowEntityExistInPortal(securityRoleCustomFlow, verifyTextCustomFlow) {
    commonActions.portalSideMenuOpen();
    menuItemsVerify.searchAfterEntityLinkVisibleAndClick(securityRoleCustomFlow);
    I.waitForVisible(locate('h5').withText(securityRoleCustomFlow), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(verifyTextCustomFlow), constants.SHORT_WAIT);
    commonActions.goBackToPreviousPage();
  },

  verifyCustomFlowEntityDontExist(securityRoleCustomFlow) {
    commonActions.portalSideMenuOpen();
    menuItemsVerify.searchAfterEntityLinkInvisible(securityRoleCustomFlow);
  },

  verifyDashboardEntityExistInPortal(verifyDashboardEntity) {
    I.waitForVisible(locate('a').withText(verifyDashboardEntity), constants.SHORT_WAIT);
    I.click(locate('a').withText(verifyDashboardEntity));
    I.waitForVisible(locate('a').withText(verifyDashboardEntity).withAttr({ 'aria-selected': 'true' }), constants.SHORT_WAIT);
  },

  verifyDashboardDontExist(mainDashboard, verifyDashboardEntity) {
    I.waitForVisible(locate('a').withText(mainDashboard), constants.SHORT_WAIT);
    I.click(locate('a').withText(mainDashboard));
    commonActions.refreshPage();
    I.waitForInvisible(locate('a').withText(verifyDashboardEntity), constants.SHORT_WAIT);
  },

  verifyFormStepUser2InPortal(clickToInsert, verifyStep2Name, addNameField1) {
    commonVerify.verifyEmptyTableData();
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(locate('h5').withText(verifyStep2Name), constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputNameField, addNameField1);
  },

  verifyFormStepUser1InPortal(clickToInsert, verifyStep2Name, addNameField2) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputNameField, addNameField2);
    I.waitForInvisible(locate('h5').withText(verifyStep2Name), constants.SHORT_WAIT);
  },


  verifyFormUser2InPortal(clickToInsert, addNameField1) {
    commonVerify.verifyEmptyTableData();
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputNameField, addNameField1);
  },

  verifyFormUser1InPortal(clickToInsert, errorMessage) {
    commonActions.clickSidebarButton(clickToInsert);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
  },

  verifyEntityExtension(addTypeField1, viewEntityExtensionB, addNameField1, editViewEntityExtensionB) {
    I.waitForVisible(locate('td').withText(addTypeField1).inside(securityRolesPage.table.firstTableRow), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(addTypeField1).inside(securityRolesPage.table.firstTableRow));
    I.click(locate('td').withText(addTypeField1).inside(securityRolesPage.table.firstTableRow));
    I.waitForVisible(locate('h4').withText(viewEntityExtensionB), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(addNameField1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableAT_EntSecRoleEntExt_A), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(addNameField1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableAT_EntSecRoleEntExt_A));
    I.click(locate('td').withText(addNameField1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableAT_EntSecRoleEntExt_A));
    I.waitForVisible(locate('span').withText(editViewEntityExtensionB).inside(securityRolesPage.labels.modelTypeLabel), constants.SHORT_WAIT);
  },

  verifyFDFStepUser2InPortal(clickToInsert, addNameField1) {
    commonVerify.verifyEmptyTableData();
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputNameField, addNameField1);
    I.click(securityRolesPage.buttons.nextButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(securityRolesPage.buttons.finishButton, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyFDFStepUser1InPortal(clickToInsert, addNameField1) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputNameField, addNameField1);
    I.click(securityRolesPage.buttons.finishButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyFDFUser1InPortal(clickToInsert, errorMessage) {
    commonVerify.verifyEmptyTableData();
    commonActions.clickSidebarButton(clickToInsert);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
  },

  verifyDisplayNameNavBar(displayName) {
    I.waitForVisible(locate('span').withText(displayName).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })), constants.SHORT_WAIT);
    I.seeElement(locate('span').withText(displayName).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })));
  },

  verifySysAdminPrivilegesPortal(urlPortalAccount) {
    commonActions.accessDirectUrl(urlPortalAccount);
    // Verify that no toast message appears
    I.waitForInvisible(commonPage.messagePopup.errorMessage, constants.SHORT_WAIT);
    I.dontSeeElement(commonPage.messagePopup.errorMessage);
  },
};
