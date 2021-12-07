// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/edit_Text_Attribute');
// Verify
const verifyViewAction = require('~actions/viewActionsVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');

Feature('Attributes');

Scenario('User can edit a text attribute of an entity.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Find attribute by name
  attributeActions.searchForAttributeByNameAction(data.editDNAttrName);
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.editDNAttrName);
  // Open attribute and change Display Name and Length
  attributeActions.renameAndChangeLengthAction(data.editDNAttrNameUpdated, data.newLength);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Find attribute by name
  // Check for validity if I need new element.
  attributeActions.searchForAttributeByNameAction(data.editReadOnlyAttrName);
  commonActions.doubleClickValueFromTable(attributePage.container.defaultEntityTableContainer, data.editReadOnlyAttrName);
  // Open attribute and mark as read-only
  attributeActions.markReadOnlyAction();
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Login to Portal
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password)
  commonActions.accessDirectUrl(data.viewURL)
  // Verify new attribute values in Portal
  verifyViewAction.verifyEditAttribute(data.primaryAttDN, data.editDNAttrNameUpdated);
  // verifyViewAction.verifyViewInPortal(data.primaryAttDN);
  commonActions.clickSidebarButton('Insert')
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      data.toastErrorMessage);
  verifyViewAction.verifyAndEditAttributeInPortal()
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  //Logoff
  await commonActions.logoutFromApp();
});
