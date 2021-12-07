// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');
// Data
const data = require('~data/attributes/TC010_VALimitation');
// Verify
const verifyAttributeActions = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');
// Constants
const constants = require('~config/constants');
//  Pages
const commonPage = require('~pages/commonPage');

// Author Victor Pana

Feature('Attributes');

Scenario('User can edit a virtual attribute limitation.', async () => {

  // 1	Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2	Navigate to "VAMaxLength" edit form "...Main#/entity/virtualattribute/edit/a8ca93d9-f1eb-4bd6-ba9b-6b19ff1415bd"
  commonActions.accessDirectUrl(data.accessVAMaxLengthEditForm);
  // 3	Fill in Length with "5000"
  // 4	Save and Reload
  // 5	Check if Length is "4000"
  await attributeActions.fillVAMaxLengthConstraint(data.overMaxLength, data.maxLength)
  // 6	Navigate to "VAMaxPrecision" edit form "...Main#/entity/virtualattribute/edit/36e60c75-bf20-479e-9ef5-5fcb3b4cbd82"
  commonActions.accessDirectUrl(data.accessVAMaxPrecisionEditForm);
  // 7	Try to fill in Precision with: 9 -> you are not able
  // 8	Fill in Precision with: 8
  // 9	Save and Reload
  // 10	Check if Precision is: 8
  await attributeActions.fillAndVerifyVAMaxPrecisionConstraint(data.overMaxPrecision, data.maxPrecision)
  // 11	Navigate to "AT_EntForVALimitation" Related Extended Model "...Main#/entity/entityExtension/edit/b0772be3-0d76-46b1-8db9-7f3af1b94521/pageno/1"
  commonActions.accessDirectUrl(data.accessYourRelatedExtendedModel);
  // 12	Click on "insert"
  // 13	Select "ForMaxLength"
  // 14	Check if Length is "4000"
  await attributeActions.addVARelatedForMaxLength(data.selectForMaxLength, data.maxLength)
  // 15	Save and New -> A success message is displayed and a new "insert" form is displayed
  commonActions.saveAndNewAction()
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16	Select "ForMaxPrecision"
  // 17	Check if Precision is: 8
  await attributeActions.addVARelatedForMaxPrecision(data.selectForMaxPrecision, data.maxPrecision)
  // 18	Save and Reload -> Success message is displayed
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19	Logoff
  await commonActions.logoutFromApp();
  // 20	Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 21	Access "AT_VALimitation" entity "...Main#/entity/AT_VALimitation/list/"
  commonActions.accessDirectUrl(data.accessYourVALimitationList);
  // 22	Click on Insert
  commonActions.clickSidebarButton('Insert')
  // 23	Fill in "VAMaxLength" field with a text with 4000 characters
  // 24	Fill in "VAMaxPrecision" field with a number with 8 decimals (10.12345678)
  // 25	Fill in "RelatedMaxPrecision" field with a number with 8 decimals (20.12345678)
  // 26	Fill in "RelatedMaxLength" field with a text with 4000 characters
  // 27	Save and Reload -> Success message is displayed
  // 28	Check if you are able to fill in "VACheckLength" with maximum 3 characters
  // 29	Check if you are able to fill in "VACheckPrecision" with maximum 2 decimals
  // 30	Check if you are able to fill in "RelatedCheckLength" with maximum 3 characters
  // 31	Check if you are able to fill in "RelatedCheckPrecision" with maximum 2 decimals
  await verifyAttributeActions.verifyVALimitation(data.virtualAttrMaxLength, data.valueVAMaxPrecision, data.valueRelatedMaxPrecision, data.valueVACheckLength, data.valueVACheckPrecision, data.valueRelatedCheckLength, data.valueRelatedCheckPrecision)
  // 32	Save and Reload -> Success message is displayed
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 33	Logoff
  await commonActions.logoutFromApp();
});
