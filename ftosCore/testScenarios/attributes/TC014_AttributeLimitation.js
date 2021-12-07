// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC014_AttributeLimitation');
// Verify
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Attributes');

Scenario('User can edit an attribute limitation.', async () => {

  // 1	Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to "TextMaxLength" edit form "...Main#/entity/attribute/edit/b9d4c1b6-6505-4d28-bf2a-d60a84d93481"
  commonActions.accessDirectUrl(data.accessTextMaxLengthEditForm);
  // 3	Fill in Length with "5000"
  // 4	Save and Reload
  // 5	Check if Length is "4000"
  //await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_length' })), '4,000')
  await attributeActions.fillVAMaxLengthConstraint(data.overMaxLength, data.maxLength)
  // 6	Navigate to "NumericMaxPrecision" edit form "...Main#/entity/attribute/edit/5b43fcdd-b443-48d3-b195-69a710e2df96"
  commonActions.accessDirectUrl(data.accessNumericMaxPrecisionEditForm);
  // 7	Try to fill in Precision with: 9 -> you are not able
  // 8	Fill in Precision with: 8
  // 9	Save and Reload
  // 10	Check if Precision is: 8
  await attributeActions.fillAndVerifyVAMaxPrecisionConstraint(data.overMaxPrecision, data.maxPrecision)
  // 11	Logoff
  await commonActions.logoutFromApp();
  // 12	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 13	Access "AT_AttributeLimitation" entity "...Main#/entity/AT_AttributeLimitation/list/"
  commonActions.accessDirectUrl(data.accessYourAttributeLimitationList);
  // 14	Click on Insert
  commonActions.clickSidebarButton('Insert')
  // 15	Fill in TextMaxLength with a text with 4000 characters
  // 16	Fill in NumericMaxPrecision with a number with 8 decimals (10.12345678)
  // 17	Save and Reload -> Success message is displayed
  // 18	Check if you are able to fill in "TextCheckLength" max 3 characters
  // 19	Check if you are able to fill in "NumericCheckPrecision" max 2 decimals
  await verifyAttributeActions.verifyAttributeLimitation(data.valueAttrTextMaxLength, data.valueNumericMaxPrecision, data.valueTextCheckLength, data.valueNumericCheckPrecision);
  // 20	Save and Reload -> Success message is displayed
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 21	Logoff
  await commonActions.logoutFromApp();
});
