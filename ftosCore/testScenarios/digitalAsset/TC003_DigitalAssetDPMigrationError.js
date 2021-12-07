// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC003_DigitalAssetDPMigrationError.json');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalin Diaconu
// AT-1016

Feature('Digital Asset');

Scenario('User cannot migrate if the package already migrated', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlDigitalAssetMigrationTab);
  await digitalAssetActions.migrateDP(data.dpNameVersion, data.columnDisplayName);
  await digitalAssetVerify.verifyMigration(
    data.entityName,
    data.falseState,
    data.existingDigitalAsset,
  );
  await commonActions.logoutFromApp();
});
