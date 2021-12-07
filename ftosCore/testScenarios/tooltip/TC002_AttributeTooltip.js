// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const tooltipActions = require('~actions/tooltipActions');
// Data
const data = require('~data/tooltip/TC002_AttributeTooltip');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const tooltipVerify = require('~actions/tooltipVerify');

// Author Victor Pana

Feature('Tooltip');

Scenario('User can edit attribute tooltip', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your entity
  commonActions.accessDirectUrl(data.accessAT_TooltipAttrEntityURL);
  // 3 Expand Data Model
  // 4 Access your Attribute (Code)
  // 5 Add a tooltip: Tooltip-Attribute
  // 6 Save and Close
  // 7 Expand "Extended Model"
  // 8 Access your model
  // 9 Access your attribute (Related Name)
  // 10 Add a tooltip: Tooltip-Virtual
  tooltipActions.createNewAttributeTooltip(
    data.goToAttributeCodeUrl,
    data.tooltipAttribute,
    data.nameRelated,
    data.AT_EntForRelatedVAId_Name,
    data.nameTooltipVirtual,
  );
  // 11 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12 Logoff
  await commonActions.logoutFromApp();
  // 13 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 14 Access your entity "Main#/entity/AT_TooltipAttr/list/"
  commonActions.accessDirectUrl(data.AT_TooltipAttributePortalUrl);
  // 15 Click on Insert icon
  // 16 Mouseover Code attribute
  // 17 Check if "Tooltip-Attribute" is displayed
  // 18 Mouseover VA attribute
  // 19 Check if "Tooltip-Lookup" is displayed
  // 20 Mouseover Related Name attribute
  // 21 Check if "Tooltip-Virtual" is displayed
  // 22 Deactivate Tooltip (upper right corner)
  // 23 There is no tooltip displayed
  //   Mouseover Code
  //   Mouseover VA attribute
  //   Mouseover Related Name attribute
  // 24 Activate again the tooltip
  // 17 Check if "Tooltip-Attribute" is displayed
  // 25 Click on UI Container and uncheck "show tooltip"
  // 26 Click Save
  // 27 There is no tooltip displayed
  //    Mouseover Code
  //    Mouseover VA attribute
  //    Mouseover Related Name attribute
  tooltipVerify.verifyAttributeDisplayed(data.tooltipAttribute, data.nameTooltipLookup, data.nameTooltipVirtual, data.verifyCodeTooltipNotDisplayed, data.verifyVARelatedTooltipNotDisplayed, data.verifyNameVARelatedTooltipNotDisplayed);
  // 28 Logoff
  await commonActions.logoutFromApp();
});
