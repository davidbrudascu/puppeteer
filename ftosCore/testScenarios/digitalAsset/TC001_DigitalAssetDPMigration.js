// Constants
const constants = require('~config/constants');
// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC001_DigitalAssetDPMigration');
// Page
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalin Diaconu
// AT-1015

Feature('Digital Asset');

Scenario('A deployment package can be migrated to a digital asset project', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDAList);
  commonActions.clickButtonAfterLocator(data.insert);
  digitalAssetActions.createDigitalAsset(
    data.nameDigitalAsset,
    data.code,
    data.description,
  );
  commonActions.saveAndRefreshAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  digitalAssetActions.selectDigitalTab(data.generalTab);
  digitalAssetActions.setAsContextDigitalAsset();
  digitalAssetActions.selectDigitalTab(data.configurationItemsMigrationTab);
  await digitalAssetActions.migrateDP(data.dpNameVersion, data.columnDisplayName);
  await digitalAssetVerify.verifyMigration(data.entityName, data.trueState);
  await commonActions.logoutFromApp();
});
