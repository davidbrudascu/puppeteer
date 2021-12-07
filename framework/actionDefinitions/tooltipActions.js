
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const actionsBusinessEntity = require('~actions/businessEntitiesActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const tooltipPage = require('~pages/tooltipPage');
const codePage = require('~pages/codePage');

const I = actor();

module.exports = {
  createNewFieldOptionTooltip(fieldOptionsTab, codeAttribute, nameShowTooltip, valueAttribute, textVirtualAttribute, tooltipVirtualAttribute) {
    // 3 Go to "Field Option" tab
    commonActions.navigateToFormStep(fieldOptionsTab)
    // 4 Click on Insert
    I.waitForVisible(tooltipPage.container.defaultEntityFormFieldContainer, constants.SHORT_WAIT);
    I.waitForVisible(tooltipPage.button.insertButton, constants.SHORT_WAIT);
    I.click(tooltipPage.button.insertFormFieldButton);
    // 5 Select "Code" Attribute
    commonActions.clickLookupTableButton(codePage.buttons.codeAttributeLookupPopupBtn);
    commonActions.fillInPopupLookupTableWithValue(codePage.selector.codeAttributeLookupTable,
        codeAttribute);
    I.click(tooltipPage.button.okLookupTableButton);
    // 6 Fill in Custom tooltip with: "Show tooltip"
    I.waitForVisible(tooltipPage.fields.customTooltipField, constants.SHORT_WAIT);
    I.click(tooltipPage.fields.customTooltipField);
    I.fillField(tooltipPage.fields.customTooltipField, nameShowTooltip);
    // 7 Save and New
    commonActions.saveAndNewAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 8 Select "Value" Attribute
    commonActions.clickLookupTableButton(codePage.buttons.codeAttributeLookupPopupBtn);
    commonActions.fillInPopupLookupTableWithValue(codePage.selector.codeAttributeLookupTable,
        valueAttribute);
    I.click(tooltipPage.button.okLookupTableButton);
    // 9 Change Show tooltip: "No"
    I.waitForClickable(tooltipPage.selector.selectFromShowTooltipDropdown, constants.SHORT_WAIT);
    I.click(tooltipPage.selector.selectFromShowTooltipDropdown);
    I.waitForVisible(tooltipPage.selector.selectNoFromShowTooltipDropdown, constants.SHORT_WAIT);
    I.click(tooltipPage.selector.selectNoFromShowTooltipDropdown);
    // 10 Save and New
    commonActions.saveAndNewAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 11 Check "Virtual" Attribute
    I.waitForVisible(tooltipPage.checkbox.virtualAttributeCheckbox, constants.SHORT_WAIT);
    I.click(tooltipPage.checkbox.virtualAttributeCheckbox);
    // 12 Select "TextVirtual"
    I.waitForVisible(tooltipPage.fields.virtualAttributeField, constants.SHORT_WAIT);
    I.click(tooltipPage.selector.selectVirtualAttributeDropdown);
    I.waitForVisible(tooltipPage.table.textVirtualDataTable, constants.SHORT_WAIT);
    I.click(tooltipPage.table.textVirtualDataTable);
    I.click(tooltipPage.button.okVirtualAttributeButton);
    // 13 Fill in Custom tooltip: Tooltip-Virtual Attribute
    I.waitForVisible(tooltipPage.fields.customTooltipField, constants.SHORT_WAIT);
    I.click(tooltipPage.fields.customTooltipField);
    I.fillField(tooltipPage.fields.customTooltipField, tooltipVirtualAttribute);
  },

  createNewAttributeTooltip(goToAttributeCodeUrl, tooltipAttribute, nameRelated, AT_EntForRelatedVAId_Name, nameTooltipVirtual) {
    // 3 Expand Data Model
    actionsBusinessEntity.selectDataModelSubMenu();
    // 4 Access your Attribute (Code)
    commonActions.accessDirectUrl(goToAttributeCodeUrl);
    // 5 Add a tooltip: Tooltip-Attribute
    I.waitForVisible(tooltipPage.fields.attributeTooltipField, constants.SHORT_WAIT);
    I.fillField(tooltipPage.fields.attributeTooltipField, tooltipAttribute);
    // 6 Save and Close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 7 Expand "Extended Model"
    actionsBusinessEntity.selectExtendedModelSubMenu();
    // 8 Access your model
    commonActions.doubleClickValueFromTable(tooltipPage.container.defaultEntityExtensionContainer, nameRelated);
    I.waitForVisible(tooltipPage.button.virtualAttributeTab, constants.SHORT_WAIT);
    I.forceClick(tooltipPage.button.virtualAttributeTab);
    // 9 Access your attribute (Related Name)
    commonActions.doubleClickValueFromTable(tooltipPage.container.relatedNameEntityFormExtension, AT_EntForRelatedVAId_Name);
    // 10 Add a tooltip: Tooltip-Virtual
    I.waitForVisible(tooltipPage.fields.inputAddTextTooltipField, constants.SHORT_WAIT);
    I.fillField(tooltipPage.fields.inputAddTextTooltipField, nameTooltipVirtual);
  },
};
