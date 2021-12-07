// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const tooltipActions = require('~actions/tooltipActions');
// Data
const data = require('~data/tooltip/TC001_FieldOptionTooltip');
// Pages
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const tooltipVerify = require('~actions/tooltipVerify');

// Author Victor Pana

Feature('Tooltip');

Scenario('User can edit field option tooltip', async () => {
  // 1 Login using Designer
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  // 2 Access your User Journey
  commonActions.accessDirectUrl(data.accessUserJourneyURL);
  // 3 Go to Field Option tab
  // 4 Click on Insert
  // 5 Select "Code" Attribute
  // 6 Fill in Custom tooltip with: "Show tooltip"
  // 7 Save and New
  // 8 Select "Value" Attribute
  // 9 Change Show tooltip: "No"
  // 10 Save and New
  // 11 Check "Virtual" Attribute
  // 12 Select "TextVirtual"
  // 13 Fill in Custom tooltip: Tooltip-Virtual Attribute
  tooltipActions.createNewFieldOptionTooltip(
    data.fieldOptionsTab,
    data.codeAttribute,
    data.nameShowTooltip,
    data.valueAttribute,
    data.textVirtualAttribute,
    data.tooltipVirtualAttribute,
  );
  // 14 Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 15 Logoff
  await commonActions.logoutFromApp();
  // 16 Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 17 Access your entity
  commonActions.accessDirectUrl(data.AT_TooltipFieldOptionPortalUrl);
  // 18 Click on Insert
  // 19 Mouseover Name
  // 20 Check tooltip: "Tooltip-Attribute"
  // 21 Mouseover Code
  // 22 Check tooltip: "Show tooltip"
  // 23 Mouseover Value
  // 24 Check tooltip - no tooltip is displayed
  // 25 Mouseover Text Virtual
  // 26 Check tooltip: "Tooltip-Virtual Attribute"
  // 27 Deactivate tooltip
  // 28 Check if there is no tooltip displayed
  // Mouseover Code
  // Mouseover Name
  // Mouseover Value
  // Mouseover TextVirtual
  await tooltipVerify.verifyFieldOptionTooltipDisplayed(
    data.tooltipAttribute,
    data.nameShowTooltip,
    data.verifyValueTooltipNotDisplayed,
    data.tooltipVirtualAttribute,
    data.verifyCodeTooltipNotDisplayed,
    data.verifyNameTooltipNotDisplayed,
    data.verifyTextVirtualTooltipNotDisplayed,
  );
  // 29 Logoff
  await commonActions.logoutFromApp();
});
