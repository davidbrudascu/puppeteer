// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC007_DigitalAssetFieldsOnTheFormBeforeSave.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
// Constants
const constants = require('~config/constants');

// Author Avram Adina
// AT-1011

Feature('Digital Asset');

Scenario('User can create a DA from the home page and view the fields of a digital asset before saving', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  digitalAssetActions.insertDigitalAsset();
  digitalAssetActions.createDigitalAsset(
    data.nameDigitalAsset,
    data.code,
    data.description,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  digitalAssetVerify.verifyDigitalAssetTabs();
  commonActions.accessDirectUrl(data.urlHomePage);
  digitalAssetActions.openDigitalAsset();
  await commonActions.searchInTableAfterASpecificColumn(
    data.columnName,
    data.nameDigitalAsset,
    commonPage.container.containerContent,
  );
  await commonActions.logoutFromApp();
});
