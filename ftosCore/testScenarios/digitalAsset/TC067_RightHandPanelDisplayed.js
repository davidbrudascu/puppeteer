// Actions
const digitalAssetActions = require('~actions/digitalAssetActions');
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/digitalAsset/TC067_RightHandPanelDisplayed');
// Verify
const digitalAssetVerify = require('~actions/digitalAssetVerify');

// Author Catalin Diaconu
// AT- 1215

Feature('Digital Asset');

Scenario('User can see the right hand panel when filter by entity is pressed', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlAdvancedCodeEditor);
  digitalAssetVerify.verifyFilterButtonsCodeEditor();
  digitalAssetActions.accessEntityLinkToDACodeEditor(data.nameDA, data.nameEntity);
  digitalAssetVerify.verifyEntityInfoCodeEditor(
    data.nameDA,
    data.nameDA,
    data.falseOption,
    data.nameDA,
    data.nameDA,
    data.activeOption,
    data.falseOption,
    data.falseOption,
    data.falseOption,
  );
  await commonActions.logoutFromApp();
});
