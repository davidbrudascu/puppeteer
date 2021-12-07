// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/fieldOptions/TC011_deleteFieldOptTextAttribute.json');
// Verify
const fieldOptionVerify = require('~actions/fieldOptionVerify');

// Author Adina Avram
// AT-551

Feature('Field Options');

Scenario('User can create a field options record with no Default Value set.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFDF);
  await fieldOptionsActions.insertAttEntityFromField(
    data.attText,
    data.attTextArea,
    data.attNumeric,
    data.attWholeNumber,
    data.columnName,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.viewURL);
  await fieldOptionVerify.verifyIfExistDefaultValue(
    data.attTextDefaultValue,
    data.attTextAreaDefaultValue,
    data.attNumericDefaultValue,
    data.attWholeNumberDefaultValue,
  );
  await commonActions.logoutFromApp();
});
