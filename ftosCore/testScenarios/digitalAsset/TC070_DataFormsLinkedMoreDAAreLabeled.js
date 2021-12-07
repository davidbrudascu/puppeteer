const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
const codeEditorActions = require('~actions/codeEditorActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Data
const data = require('~data/digitalAsset/TC070_DataFormsLinkedMoreDAAreLabeled.json');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const actionsBusinessEntityVerify = require('~actions/businessEntityVerify');
const codeEditorVerify = require('~actions/codeEditorVerify');


// Author Avram Adina
// AT-1209

Feature('Digital Asset');

Scenario('Data forms linked to more than one DAs are labeled', async () => {
  await commonActions.loginInStudioApp(data.urlDesigner, data.username, data.password);
  await digitalAssetActions.openDA(data.nameDA2, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  // insert a data form in context DA2
  await actionsBusinessEntity.accessEntity(data.search, data.nameEntity, data.columnName);
  actionsBusinessEntity.insertDataForm(data.nameDataForm2);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  await actionsBusinessEntityVerify.verifyExistDataForm(data.columnName, data.nameDataForm2);
  // verify if data form was linked in CI in DA2
  await actionsBusinessEntityVerify.verifyIfDataForm2LinkedToDA2(data.columnName2, data.nameDataForm2);
  // select DA1 AND DA2 from filter by DA
  codeEditorActions.accessAdvancedCodeEditor(data.advancedCodEditorSearch);
  codeEditorVerify.verifyFilterContainer();
  codeEditorVerify.verifyFilterByDAAction(data.nameDA1, data.nameDA2);
  // verify id data form are linked to DA in code editor
  codeEditorVerify.verifyDataFormLinkedDA(data.nameDA2, data.nameEntity);
  codeEditorVerify.verifyDataFormLinkedDA(data.nameDA1, data.nameEntity);
  // verify if data forms are linked with DA in entity
  await actionsBusinessEntity.accessEntity(data.search, data.nameEntity, data.columnName);
  await actionsBusinessEntityVerify.verifyIfExist2DataFormLinked(
    data.nameDA1,
    data.nameDA2,
    data.nameDataForm1,
    data.nameDataForm2,
    data.columnName,
    data.columnName3,
  );
  await commonActions.logoutFromApp();
});
