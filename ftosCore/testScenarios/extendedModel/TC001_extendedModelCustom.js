// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const emcActions = require('~actions/extendedModelCustomActions');
// Data
const data = require('~data/extendedModelCustomData');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const emcVerify = require('~actions/extendedModelCustomVerify');

// Author Sebastian Draghici
// AT-171
Feature('Extended Model');

Scenario('Backoffice user creates an extended model - custom', async () => {
  // 1. Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2. Navigate to your entity: "...Main#/entity/entity/edit/{AT_AddCEMEntity1Id}"
  commonActions.accessDirectUrl(data.urlEmcEntity);
  // 3. Expand "Extended Model' Section
  commonActions.menuSectionExpand(data.emSection);
  // 4. Click on "Insert" button
  commonActions.clickToolbarButton(data.emInsertButton);
  // 5. Fill in name with "CustomVA"
  // 6. Select Extension Type: "Custom"
  emcActions.emcFillInValues();
  // 7. Click on "Save and Reload" icon
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // Go to Virtual Attributes tab
  emcActions.goToVirtualAttributesTab();
  // 8. Check if "Virtual Attributes" table is available and empty
  commonVerify.verifyEmptyTableData();
  // 9. Click on "Insert" button
  commonActions.clickToolbarButton(data.emInsertButton);
  // 10. Fill in Name with: "AT_Text_VA"
  // 11. Fill in Display Name with: "AT Text Virtual A"
  // 12. Select Attribute Type: "Text"
  // 13. Set length: 10
  // 14. Required level: None
  emcActions.emcVaFillInValues();
  // 15. Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 16. Navigate to your UJ: "...Main#/entity/entityform/edit/{AT_AddCEMEntity1UJ1}"
  commonActions.accessDirectUrl(data.urlEmcUj);
  // 17. Go to "Data Model" section
  commonActions.navigateToFormStep(data.emcUjPage2);
  // 18. Click on "Insert existing" button
  emcActions.insertBusinessEntityExtensions();
  // 19. Check if there is only one result: "CustomVA"
  emcVerify.emcUjVerifyTableValue();
  emcActions.emcUjClickValue();
  // 20. Select it and click "Ok" button
  commonActions.clickToolbarButton(data.emOkButton);
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 21. Check if your extension was added
  emcVerify.emcUjVerifyNewAddition();
  // 22. Logoff
  await commonActions.logoutFromApp();
});
