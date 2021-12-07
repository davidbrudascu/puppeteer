// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC031_VerifyLookupRelationAttribute');
// Verify
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Attributes');

Scenario('User can add a lookup attribute to an entity and verify relation in Portal.', async () => {
  // Login to Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.entityURL);
  // Add a new lookup attribute
  await attributeActions.addNewLookupAttribute(
    data.attributeName,
    data.attributeDisplayName,
    data.columnName,
    data.attributeType,
    data.requiredLevel,
    data.entityLkpAttr2,
    data.lookupRelationshipName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
  // Login to Portal
  // Navigate to your entity AT_LkpAttrEnt1 list in Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewLkp1URL);
  // Verify that the new lookup attribute restrictions apply correctly for AT_LkpAttrEnt1
  await verifyAttributeActions.verifyLookup1AttributeInPortalAction(
    data.insertButton,
    data.errorMessage,
    data.attributeLkpName,
    data.lookupFieldRequired,
    data.recordLookup1,
    data.recordLookup2,
    data.nameOfFirstRecord,
    data.editLkpEntityAttr,
  );
  // Navigate to your entity AT_LkpAttrEnt2 list in Portal
  commonActions.accessDirectUrl(data.viewLkp2URL);
  // Verify that the new lookup attribute restrictions apply correctly for AT_LkpAttrEnt2
  verifyAttributeActions.verifyLookup2AttributeInPortalAction(data.recordLookup1, data.nameOfFirstRecord);
  await commonActions.logoutFromApp();
});
