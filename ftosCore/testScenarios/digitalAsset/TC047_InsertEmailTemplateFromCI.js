// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions.js');
// Data
const data = require('~data/digitalAsset/TC047_InsertEmailTemplateFromCI.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Avram Adina
// AT-1143

Feature('Digital Asset');

Scenario('User can add an Email Template to CI tab', async () => {
  // Login Studio as 'AT_Developer'
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // access DA and set as context
  await digitalAssetActions.openDA(data.nameDA, data.columnName);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.accessConfigurationItemTab();
  // Add an Email Template extension from configuration items
  await digitalAssetActions.addDigitalAssetConfigurationItem(
    data.templateName,
    data.emailTemplate,
    data.configItemsType,
  );
  // Verify if Email Template extension was added in configuration items
  await digitalAssetVerify.verifyConfigurationItems(data.recordName, data.emailTemplate);
  await commonActions.logoutFromApp();
});
