// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const emrActions = require('~actions/extendedModelRelatedActions');
// Data
const data = require('~data/extendedModelRelatedData');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const emrVerify = require('~actions/extendedModelRelatedVerify');

// Author Sebastian Draghici
// AT-171
Feature('Extended Model');

Scenario('Backoffice user creates an extended model - related', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to your entity: "...Main#/entity/entity/edit/{AT_AddREMEntity1Id}"
  commonActions.accessDirectUrl(data.urlEmrEntity);
  // 3. Expand "Extended Model' Section
  commonActions.menuSectionExpand(data.emSection);
  // 4. Click on "Insert" button
  commonActions.clickToolbarButton(data.emInsertButton);
  // 5. Fill in name with "RelatedVA"
  // 6. Select Extension Type: "Related"
  // 7. Select Relation Attribute: "AT_ForREMEntity1Id"
  // 8. Check "Is owner for relation"
  emrActions.emrFillInValues();
  // 9. Click on "Save and Reload" icon
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Go to Virtual Attributes tab
  emrActions.goToVirtualAttributesTab();
  // 10. Check if "Virtual Attributes" table is available and empty
  commonVerify.verifyEmptyTableData();
  // 11. Click on "Insert" button
  commonActions.clickToolbarButton(data.emInsertButton);
  // 13. Select "Related Attribute": "Code"
  emrActions.emrVaFillInValues1();
  // 14. Check if Display Name is pre-filled with "RelatedVA Code"
  // 15. Check if "Updatable" is checked
  // 16. Check if "Attribute Type" is Text and readonly
  // 17. Check if length is "3" - readonly
  await emrVerify.emrVaVerifyValues();
  // 18. Select "Required level" - "Required"
  emrActions.emrVaFillInValues2();
  // 19. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 20. Navigate to your UJ: "...Main#/entity/entityform/edit/{AT_AddREMEntity1UJ1Id}"
  commonActions.accessDirectUrl(data.urlEmrUj);
  // 21. Go to "Data Model" section
  commonActions.navigateToFormStep(data.emrUjPage2);
  // 22. Click on "Insert existing" button
  emrActions.insertBusinessEntityExtensions();
  // 23. Check if there is only one result: "RelatedVA"
  emrVerify.emrUjVerifyTableValue();
  // 24. Select it and click "Ok" button
  emrActions.emrUjClickValue();
  commonActions.clickToolbarButton(data.emOkButton);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 25. Check if your extension was added
  emrVerify.emrUjVerifyNewAddition();
  // 26. Logoff
  await commonActions.logoutFromApp();
});
