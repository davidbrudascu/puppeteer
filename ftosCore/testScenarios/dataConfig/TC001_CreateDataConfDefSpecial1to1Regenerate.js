// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const dataConfigActions = require('~actions/dataConfigActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/dataConfig/TC001_CreateDataConfDefSpecial1to1Regenerate');
// Verify
const commonVerify = require('~actions/commonVerify');
const dataConfigVerify = require('~actions/dataConfigVerify');
// Pages
const commonPage = require('~pages/commonPage');

// Author Catalin Diaconu
// AT-486

Feature('Data Config');

Scenario('User can create a Specialized One to One Data Definition and use Regenerate Button', async () => {
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
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.firstEntityUrl);
  actionsBusinessEntity.selectDataModelSubMenu();
  actionsBusinessEntity.insertLookupAttribute(
    data.nameAttribute,
    data.attributeType,
    data.displayNameAttribute,
    data.lookupEntity,
    data.relationType,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  commonActions.accessDirectUrl(data.urlConfigurationDataDefinitions);
  await dataConfigActions.accessDataDef(data.nameDataDefinition, data.columnName);
  dataConfigActions.selectTab(data.definitionTab);
  commonActions.refreshPage();
  dataConfigActions.clickRegenerateButton();
  dataConfigVerify.verifyTableRow(
    data.nameSecondEntity,
    data.thirdEntityType,
  );
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await commonActions.logoutFromApp();
});
