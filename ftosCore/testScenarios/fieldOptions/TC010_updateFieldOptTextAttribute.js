// Actions
const commonActions = require('~actions/commonActions');
const fieldOptionsActions = require('~actions/fieldOptionsActions');
// Data
const data = require('~data/fieldOptions/TC010_updateFieldOptTextAttribute.json');
// Verify
const fieldOptionVerify = require('~actions/fieldOptionVerify');

// Author Adina Avram
// AT-551

Feature('Field Options');

Scenario('User can create a field options record and fill Default Value when it has Default Value on Basic Form.', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFDF);
  await fieldOptionsActions.insertEntityFromField(
    data.attText,
    data.attTextDefaultValue,
    data.attTextArea,
    data.attTextAreaDefaultValue,
    data.attNumeric,
    data.attNumericDefaultValue,
    data.attWholeNumber,
    data.attWholeNumberDefaultValue,
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
