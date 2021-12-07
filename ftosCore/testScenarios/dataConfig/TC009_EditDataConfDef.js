// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dataConfigActions = require('~actions/dataConfigActions');
// Data
const data = require('~data/dataConfig/TC009_EditDataConfDef');
// Verify
const commonVerify = require('~actions/commonVerify');
const dataConfigVerify = require('~actions/dataConfigVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-486

Feature('Data Config');

Scenario('User can create and edit a Data Definition', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlConfigurationDataDefinitions);
  await dataConfigActions.insertDataDefinition(
    data.nameDataDefinition,
    data.displayNameDataDefinition,
    data.nameMasterEntity,
    data.columnName,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  dataConfigActions.selectTab(data.definitionTab);
  dataConfigVerify.verifyTableColumns();
  dataConfigVerify.verifyTableEntities(
    data.nameFirstEntity,
    data.nameSecondEntity,
    data.firstEntityType,
    data.secondEntityType,
  );
  dataConfigActions.selectUniqueConstraint(
    data.first,
    data.uniqueConstraintName,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await dataConfigActions.accessDataDef(data.nameDataDefinition, data.columnName);
  dataConfigActions.editFieldsDataDef(
    data.editNameDataDef,
    data.editDisplayNameDataDef,
    data.editDescriptionDataDef,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
