// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dataConfigActions = require('~actions/dataConfigActions');
// Data
const data = require('~data/dataConfig/TC005_CreateDataConfDefLkpAtt.json');
// Verify
const commonVerify = require('~actions/commonVerify');
const dataConfigVerify = require('~actions/dataConfigVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-486

Feature('Data Config');

Scenario('User can create a Lookup Attribute Data Definition', async () => {
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
  await commonActions.logoutFromApp();
});
