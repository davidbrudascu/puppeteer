// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const tooltipPage = require('~pages/tooltipPage');

const I = actor();

module.exports = {
  async verifyTooltipDisplayed(tooltipDisplay) {
    const locatorTooltip = locate('div').withAttr({ 'data-original-title': tooltipDisplay });
    const idN = await I.grabAttributeFrom(locatorTooltip, 'aria-describedby');
    if (idN === null) throw new Error(`Tooltip should be displayed "${tooltipDisplay}"!`);
  },

  async verifyTooltipNotDisplayed(idLocatorTooltip) {
    const locatorTooltip = locate('div').withAttr({ id: idLocatorTooltip });
    const idN = await I.grabAttributeFrom(locatorTooltip, 'aria-describedby');
    if (idN !== null) throw new Error(`Tooltip shouldn't display "${idLocatorTooltip}"!`);
  },

  async verifyFieldOptionTooltipDisplayed(tooltipAttribute, nameShowTooltip, verifyValueTooltipNotDisplayed, tooltipVirtualAttribute, verifyCodeTooltipNotDisplayed, verifyNameTooltipNotDisplayed, verifyTextVirtualTooltipNotDisplayed) {
    // 18 Click on Insert
    commonVerify.verifyEmptyTableData();
    I.click(tooltipPage.button.insertTooltipButton);
    I.waitForVisible(tooltipPage.button.tooltipsOnButton, constants.SHORT_WAIT);
    // 19 Mouseover Name
    I.waitForVisible(tooltipPage.fields.inputCodeTooltipField, constants.SHORT_WAIT);
    I.waitForVisible(tooltipPage.fields.inputNameTooltipField, constants.SHORT_WAIT);
    I.moveCursorTo(tooltipPage.fields.inputNameTooltipField);
    // 20 Check tooltip: "Tooltip-Attribute"
    await this.verifyTooltipDisplayed(tooltipAttribute);
    // 21 Mouseover Code
    I.moveCursorTo(tooltipPage.fields.inputCodeTooltipField);
    // 22 Check tooltip: "Show tooltip"
    await this.verifyTooltipDisplayed(nameShowTooltip);
    // 23 Mouseover Value
    I.moveCursorTo(tooltipPage.fields.inputValueTooltipField);
    // 24 Check tooltip - no tooltip is displayed
    await this.verifyTooltipNotDisplayed(verifyValueTooltipNotDisplayed);
    // 25 Mouseover Text Virtual
    I.moveCursorTo(tooltipPage.fields.inputTextVirtualTooltipField);
    // 26 Check tooltip: "Tooltip-Virtual Attribute"
    await this.verifyTooltipDisplayed(tooltipVirtualAttribute);
    // 27 Deactivate tooltip
    I.click(tooltipPage.button.toggleOnOFFTooltip);
    // 28 Check if there is no tooltip displayed
    // Mouseover Code
    I.moveCursorTo(tooltipPage.fields.inputCodeTooltipField);
    await this.verifyTooltipNotDisplayed(verifyCodeTooltipNotDisplayed);
    // Mouseover Name
    I.moveCursorTo(tooltipPage.fields.inputNameViewField);
    await this.verifyTooltipNotDisplayed(verifyNameTooltipNotDisplayed);
    // Mouseover Value
    I.moveCursorTo(tooltipPage.fields.inputValueTooltipField);
    await this.verifyTooltipNotDisplayed(verifyValueTooltipNotDisplayed);
    // Mouseover TextVirtual
    I.moveCursorTo(tooltipPage.fields.inputTextVirtualTooltipField);
    await this.verifyTooltipNotDisplayed(verifyTextVirtualTooltipNotDisplayed);
  },

  verifyAttributeDisplayed(tooltipAttribute, nameTooltipLookup, nameTooltipVirtual, verifyCodeTooltipNotDisplayed, verifyVARelatedTooltipNotDisplayed, verifyNameVARelatedTooltipNotDisplayed) {
    // 15 Click on Insert icon
    commonVerify.verifyEmptyTableData();
    I.click(tooltipPage.button.insertTooltipButton);
    I.waitForVisible(tooltipPage.button.tooltipsOnButton, constants.SHORT_WAIT);
    // 16 Mouseover Code attribute
    I.moveCursorTo(tooltipPage.fields.inputCodeTooltipField);
    // 17 Check if "Tooltip-Attribute" is displayed
    this.verifyTooltipDisplayed(tooltipAttribute);
    // 18 Mouseover VA attribute
    I.moveCursorTo(tooltipPage.fields.inputVARelatedAttributeField);
    // 19 Check if "Tooltip-Lookup" is displayed
    this.verifyTooltipDisplayed(nameTooltipLookup);
    // 20 Mouseover Related Name attribute
    I.moveCursorTo(tooltipPage.fields.inputNameVARelatedAttributeField);
    // 21 Check if "Tooltip-Virtual" is displayed
    this.verifyTooltipDisplayed(nameTooltipVirtual);
    // 22 Deactivate Tooltip (upper right corner)
    I.click(tooltipPage.button.toggleOnOFFTooltip);
    // 23 There is no tooltip displayed
    // Mouseover Code
    I.moveCursorTo(tooltipPage.fields.inputCodeTooltipField);
    this.verifyTooltipNotDisplayed(verifyCodeTooltipNotDisplayed);
    // Mouseover VA attribute
    I.moveCursorTo(tooltipPage.fields.inputVARelatedAttributeField);
    this.verifyTooltipNotDisplayed(verifyVARelatedTooltipNotDisplayed);
    // Mouseover Related Name attribute
    I.moveCursorTo(tooltipPage.fields.inputNameVARelatedAttributeField);
    this.verifyTooltipNotDisplayed(verifyNameVARelatedTooltipNotDisplayed);
    // 24 Activate again the tooltip
    I.click(tooltipPage.button.toggleOnOFFTooltip);
    I.moveCursorTo(tooltipPage.fields.inputCodeTooltipField);
    // 17 Check if "Tooltip-Attribute" is displayed
    this.verifyTooltipDisplayed(tooltipAttribute);
    // 25 Click on UI Container and uncheck "show tooltip"
    commonActions.clickTripleDotMenu()
    I.waitForVisible(tooltipPage.checkbox.showTooltipsOnFormsCheckbox, constants.TOAST_VANISH);
    I.click(tooltipPage.checkbox.tooltipsOnFormsCheckbox);
    // 26 Click Save
    I.click(tooltipPage.button.saveShowTooltipsFormsButton);
    // 27 There is no tooltip displayed
    // Mouseover Code
    I.moveCursorTo(tooltipPage.fields.inputCodeTooltipField);
    this.verifyTooltipNotDisplayed(verifyCodeTooltipNotDisplayed);
    // Mouseover VA attribute
    I.moveCursorTo(tooltipPage.fields.inputVARelatedAttributeField);
    this.verifyTooltipNotDisplayed(verifyVARelatedTooltipNotDisplayed);
    // Mouseover Related Name attribute
    I.moveCursorTo(tooltipPage.fields.inputNameVARelatedAttributeField);
    this.verifyTooltipNotDisplayed(verifyNameVARelatedTooltipNotDisplayed);
  },
};
