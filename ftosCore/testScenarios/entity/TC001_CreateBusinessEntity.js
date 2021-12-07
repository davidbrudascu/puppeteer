// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/entity/TC001_CreateBusinessEntity');
// Pages
const commonPage = require('~pages/commonPage');
const businessEntityPage = require('~pages/businessEntityPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const actionsBusinessEntityVerify = require('~actions/businessEntityVerify');

// Author Victor Pana

Feature('Business Entity');

Scenario('User can create a new business entity', async () => {
  // 1.Login using Studio
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2.Navigate to "...Main#/entity/entity/list"
  commonActions.accessDirectUrl(data.urlToBusinessEntityList);
  // 3.Click on "Insert" icon
  // 4.Add Entity's details
  // 5.Name: {AT_NewEntity}
  // 6.Display Name: {New Entity for AutoTest}
  // 7.Display Collection Name: {DCN New Entity}
  // 8.Description: {DB Description}
  // 9.TableName: check if it's populated with added Entity Name (upper camel case) - AT_NewEntity
  // 10.PrimaryAttributeName: {Name}
  // 11.PrimaryAttributeDisplayName: {Name}
  // 12.PrimaryAttributeTableColumn: check if it's populated with
  // Primary Attribute Name (upper camel case) - Name
  // 13.Select Default Entity Status: Active
  actionsBusinessEntity.insertNewBusinessEntity();
  actionsBusinessEntity.fillAllMandatoryFieldsForBusinessEntity(data.entityName,
    data.entityDisplayName, data.collectionName, data.description, data.primaryAttName,
    data.primaryAttDN, data.tableName, data.primaryAttTableColumn);
  actionsBusinessEntityVerify.verifyAttributesAndPropertiesUponCreatingNewlyBusinessEntity(
    data.entityName, data.primaryAttDN,
  );
  actionsBusinessEntity.selectStatusForBusinessEntity();
  await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.defaultEntityStatusActiveField, 'Active');
  // 14.Click Save and Reload
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15.Expand "Data Model"" section and
  actionsBusinessEntity.selectDataModelSubMenu();
  // 16.Check the following atributes (Name, DisplayName and Attribute types)
  //     1) AT_NewEntityid
  //     2) Name
  //     3) userId
  //     4) createdByUserId
  //     5) modifiedByUserId
  //     6) businessUnitId
  //     7) createdOn
  //     8) modifiedOn
  //     9) entityStatusId"
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.AT_NewEntityid_NameAttributeDM,
    data.AT_NewEntityid_DisplayNameAttributeDM, data.AT_NewEntityid_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.Name_NameAttributeDM,
    data.Name_DisplayNameAttributeDM, data.Name_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.userId_NameAttributeDM,
    data.userId_DisplayNameAttributeDM, data.userId_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.createdByUserId_NameAttributeDM,
    data.createdByUserId_DisplayNameAttributeDM, data.createdByUserId_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.modifiedByUserId_NameAttributeDM,
    data.modifiedByUserId_DisplayNameAttributeDM, data.modifiedByUserId_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.businessUnitId_NameAttributeDM,
    data.businessUnitId_DisplayNameAttributeDM, data.businessUnitId_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.createdOn_NameAttributeDM,
    data.createdOn_DisplayNameAttributeDM, data.createdOn_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.modifiedOn_NameAttributeDM,
    data.modifiedOn_DisplayNameAttributeDM, data.modifiedOn_AttributeTypeAttributeDM);
  actionsBusinessEntityVerify.verifyIfAttributeExistsInSearch(data.entityStatusId_NameAttributeDM,
    data.entityStatusId_DisplayNameAttributeDM, data.entityStatusId_AttributeTypeAttributeDM);
  // 17.Expand "data form" section --->
  // Check if "default" form is listed and is marked as default and default for edit
  // 18.Expand "data views" section--->
  // Check if "default" view is listed and is marked as default
  actionsBusinessEntity.selectDataModelSubMenu();
  actionsBusinessEntity.selectDataFormsSubMenu();
  actionsBusinessEntityVerify.verifyIfAttributeDataFormExistsInSearch(
    data.AT_NewAutotest_EntityAttributeDF, data.AT_NewAutotest_NameAttributeDF,
  );
  // 19. Click on "Go back" icon in order to go to entities list
  commonActions.goBackToPreviousPage();
  // 20.Search for your recent added entity -> Your entity is displayed in search results
  // (check name, display name, show in menu - unchecked and Is System Entity - unchecked)
  actionsBusinessEntityVerify.verifyIfBusinessEntityExistsInSearch(data.entityName);
  // 21. Logout
  await commonActions.logoutFromApp();
  // 22. Re-login with Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 23.Navigate to your entity "...Main#/entity/AT_NewEntity/list"
  commonActions.accessDirectUrl(data.viewUrl + data.entityName + data.portalViewList);
  // 24.Check the view - A single column is displayed (PrimaryAttributeDisplayName - Name)
  // 25.Click on "Insert" icon - A new page is displayed
  // 26.Only one field is available - (PrimaryAttributeDisplayName - Name) and has no req level
  // 27.Fill in "Name" field with a value - Auto Test Record 1
  // 28.Click on "save and Close" icon
  // 29.User is redirected to list page -> Check if your inserted value is displayed
  actionsBusinessEntity.verifyViewAndFormForSmokeInPortal(
    data.primaryAttDN, data.dataRecordNameField,
  );
  // 30.Logout
  await commonActions.logoutFromApp();
});
