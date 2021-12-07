// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
const assert = require('assert');
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');
const businessEntityPage = require('~pages/businessEntityPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Actions
const commonActions = require('~actions/commonActions');
const attributeActions = require('~actions/attributeActions');

module.exports = {
  // Doesn't work, needs fixing. Unused. Should count the number of attributes
  // with a certain name in attributes table but it doesn't do shit.
  verifyAttributeInEntityAction() {
    I.click(businessEntityPage.buttons.attributesSectionButton);
    I.waitForInvisible(businessEntityPage.buttons.attributesSectionLoader, constants.SHORT_WAIT);
    within('#ebsContainerContent_sys_entity_sys_attribute_entityView', () => {
      I.seeNumberOfElements('tr', 13);
    });
  },
  async verifyAttributeInPortalAction(attributeDName, insertValue, verifyValue, dateDiv) {
    // verifySpecific checks that the specific field restrictions apply. This is made to work for Text Length 5 and Number Precision 3 so deal with it.
    // MUST BE FIXED BY FIXING THE MARKING PROCESS IN DESIGNER ! AFTER THEY ARE MARKED CORRECTLY, UNCOMMENT THE WAIT FOR VISIBLE LINES !!!
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, insertValue);
    const verifyFirst = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_None${dateDiv}div div input`);
    const verifyFourth = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div div input`);
    const verifySecond = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div div input`);
    const verifyThird = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div div input`);
    I.assert(verifyFirst, verifyValue);
    I.assert(verifySecond, verifyValue);
    I.assert(verifyThird, verifyValue);
    I.assert(verifyFourth, '');
  },

  // verifySpecific checks that the specific field restrictions apply.
  // This is made to work for Text Length 5 and Number Precision 3 so deal with it.
  // FIXME MUST BE FIXED BY FIXING THE MARKING PROCESS IN DESIGNER !
  // AFTER THEY ARE MARKED CORRECTLY, UNCOMMENT THE WAIT FOR VISIBLE LINES !!!
  async verifyJSAttributeInPortalAction(attributeDName, insertValue, verifyValue) {
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Requiredmonaco div div.overflow-guard textarea`, constants.SHORT_WAIT);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Nonemonaco div div.overflow-guard textarea`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Requiredmonaco div div.overflow-guard textarea`, insertValue);
    const verifySpecific = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Requiredmonaco div div.overflow-guard textarea`);
    I.assert(verifySpecific, verifyValue);
  },

  setLookupAttributeInPortalAction(attributeDName, attributeRequiredLevel) {
    I.waitForVisible(locate('.dx-state-readonly').inside('#ebsContainerContent_AT_AddLkpAttr_ReadOnly'));
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), attributeRequiredLevel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_${attributeRequiredLevel}_button`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_${attributeRequiredLevel}_button`);
    I.waitForVisible(locate('div').withAttr({ id: `ebsContainerContent_AT_AddLkpAttr_${attributeRequiredLevel}_popupLkp_lookupgrid` }), constants.SHORT_WAIT);
    I.switchTo('.dx-overlay-modal');
    I.waitForInvisible(commonPage.popup.loadIndicator, constants.SHORT_WAIT);
    I.waitForVisible(`//*[@id="ebsContainerContent_AT_AddLkpAttr_${attributeRequiredLevel}_popupLkp_lookupgrid"]/div/div[6]/div/div/div[1]/div/table/tbody/tr[1]/td`, 20);
    I.click(`//*[@id="ebsContainerContent_AT_AddLkpAttr_${attributeRequiredLevel}_popupLkp_lookupgrid"]/div/div[6]/div/div/div[1]/div/table/tbody/tr[1]/td`);
    I.waitForVisible(locate('div').withAttr({ id: `ebsContainerContent_AT_AddLkpAttr_${attributeRequiredLevel}_popupLkp_lookupgrid_toolbar_item_4` }), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ id: `ebsContainerContent_AT_AddLkpAttr_${attributeRequiredLevel}_popupLkp_lookupgrid_toolbar_item_4` }));
    I.switchTo();
    I.waitForVisible(locate('div').withText(`${attributeDName}_${attributeRequiredLevel}`), constants.SHORT_WAIT);
  },
  verifyLookupReadOnly() {
    I.seeElement(locate('.dx-state-readonly').inside('#ebsContainerContent_AT_AddLkpAttr_ReadOnly'));
  },
  setOptionsetAttributeInPortalAction(attributeDName, attributeRequiredLevel) {
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_${attributeRequiredLevel}_list`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_${attributeRequiredLevel}_list`);
    I.fillField(`#ebsContainerContent_${attributeDName}_${attributeRequiredLevel}_list div[1] div input`, 'Billing Address');
    I.pressKey('Enter');
    I.see('Billing Address');
  },
  // verifySpecific checks that the specific field restrictions apply.
  // This is made to work for Text Length 5 and Number Precision 3 so deal with it.
  verifyEditedAttributeInPortalAction(attributeName, insertValue, verifyValue, dateDiv, newAttributeDName) {
    I.waitForVisible(locate('div').withText(newAttributeDName), constants.SHORT_WAIT);
    I.waitForVisible(`#ebsContainerContent_${attributeName}${dateDiv}div input`, constants.SHORT_WAIT);
    // I.fillField(`#ebsContainerContent_${newAttributeDN}${dateDiv}div input`, insertValue);
    // const verifySpecific = I.grabTextFrom(`#ebsContainerContent_${newAttributeDN}${dateDiv}div input`);
    // I.assert(verifySpecific, verifyValue);
    // I.waitForVisible(`#ebsContainerContent_${newAttributeDN}_ReadOnly${dateDiv}div input`, constants.SHORT_WAIT);
  },
  // verifySpecific checks that the specific field restrictions apply.
  // This is made to work for Text Length 5 and Number Precision 3 so deal with it.
  async verifyColorAttributeInPortalAction(attributeDName, insertValue, dateDiv) {
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_None${dateDiv}div div input`, insertValue);
    I.pressKey(constants.KEY_ENTER);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None${dateDiv}div div input`, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.requiredField, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div div input`, insertValue);
    I.pressKey(constants.KEY_ENTER);
    I.fillField(`#ebsContainerContent_Name${dateDiv}div input`, 'Name');
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div div input`, insertValue);
    I.pressKey(constants.KEY_ENTER);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div div input`, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.recommendedField, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div div input`, insertValue);
    I.pressKey(constants.KEY_ENTER);
    const actualValue = await I.grabValueFrom(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: `ebsContainerContent_${attributeDName}_ReadOnly` })));
    I.assert(actualValue, '');
  },
  // verifySpecific checks that the specific field restrictions apply.
  // This is made to work for Text Length 5 and Number Precision 3 so deal with it.
  verifyMapAttributeInPortalAction(attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required`, constants.SHORT_WAIT);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None`, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.requiredField, constants.SHORT_WAIT);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended`, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.recommendedField, constants.SHORT_WAIT);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly`, constants.SHORT_WAIT);
  },
  verifyBoolAttributeInPortalAction(attributeDName, dateDiv) {
    // verifySpecific checks that the specific field restrictions apply.
    // This is made to work for Text Length 5 and Number Precision 3 so deal with it.
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div span`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div span`);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div span`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div span`);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None${dateDiv}div span`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_None${dateDiv}div span`);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div span`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div span`);
    I.waitForVisible(locate('div').withAttr({ id: `ebsContainerContent_${attributeDName}_ReadOnly` }).withAttr({ 'aria-checked': 'mixed' }), constants.SHORT_WAIT);
  },

  verifyRequiredAttributePortalAction(primaryAttDN, attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.see(primaryAttDN);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None`, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      `${primaryAttDN}_Required is required`);
    I.waitForVisible(commonPage.messagePopup.closeErrorMessage, constants.SHORT_WAIT);
    I.click(commonPage.messagePopup.closeErrorMessage);
  },

  verifyRequiredJSAttributePortalAction(primaryAttDN, attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.see(primaryAttDN);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Nonemonaco div div.overflow-guard textarea`, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.see(attributeDName);
  },

  verifyRequiredLookupPortalAction(primaryAttDN, attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.see(primaryAttDN);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None_button`, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.waitForVisible(commonPage.messagePopup.errorMessage, constants.SHORT_WAIT);
    I.see(attributeDName);
  },


  verifyRequiredOptionsetPortalAction(primaryAttDN, attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.see(primaryAttDN);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None_list`, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.waitForVisible(commonPage.messagePopup.errorMessage, constants.SHORT_WAIT);
    I.see(attributeDName);
  },
  verifyErrorMessage(errorMessage) {
    // Verify error message displayed
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    I.waitForVisible(commonPage.messagePopup.closeErrorMessage, constants.SHORT_WAIT);
    I.click(commonPage.messagePopup.closeErrorMessage);
  },
  verifyRequiredBoolAttributePortalAction(primaryAttDN, attributeDName, errorMessage) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.see(primaryAttDN);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None div span`, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.waitForVisible(commonPage.messagePopup.errorMessage, constants.SHORT_WAIT);
    this.verifyErrorMessage(errorMessage);
  },

  verifyPrimaryAttribute(primaryAttDN) {
    I.click(businessEntityPage.buttons.attributesSectionButton);
    within(attributePage.container.attributeContainer, () => {
      I.see(primaryAttDN);
      I.fillField(attributePage.fields.attributeSearch, primaryAttDN);
      I.waitForInvisible(attributePage.fields.attributeResultsFound, constants.SHORT_WAIT);
    });
    I.click(commonPage.buttons.viewButton);
    I.seeNumberOfElements(commonPage.properties.readonlyProperties, 7);
    I.seeNumberOfElements(commonPage.properties.mandatoryProperties, 5);
    I.click(commonPage.buttons.saveAndCloseButton);
  },

  verifyPrimaryKey(entityName) {
    I.click(businessEntityPage.buttons.attributesSectionButton);
    within(attributePage.container.attributeContainer, () => {
      I.fillField(attributePage.fields.attributeSearch, `${entityName}id`);
      I.waitForInvisible(attributePage.fields.attributeResultsFound, constants.SHORT_WAIT);
    });
    I.see('Pk');
    I.click(commonPage.buttons.viewButton);
    // because implementation sees other things like option set - hidden
    I.seeNumberOfElements(commonPage.properties.readonlyProperties, 7);
    I.seeNumberOfElements(commonPage.properties.mandatoryProperties, 4);
    I.click(commonPage.buttons.saveAndCloseButton);
    I.waitForVisible(commonPage.messagePopup.errorMessage, constants.SHORT_WAIT);
  },
  verifyDeletedAttribute(primaryAttDN, deleteAttributeName) {
    I.waitForVisible(locate('div').withText(primaryAttDN).inside(locate('td').withAttr({ role: 'columnheader' })), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(deleteAttributeName).inside(locate('td').withAttr({ role: 'columnheader' })), constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(locate('div').withText(primaryAttDN), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withAttr({ id: `ebsContainerContent_${deleteAttributeName}` }), constants.SHORT_WAIT);
  },

  verifyOptionOrder(optionName, orderIndex) {
    I.waitForVisible(locate('td').withText(optionName), constants.SHORT_WAIT);
    I.seeElement(locate('td').withText(optionName).inside(locate('tr').withText(orderIndex)));
  },

  verifyEditedOptionSet(editedOption, deletedOption) {
    I.see(editedOption);
    I.dontSee(deletedOption);
  },

  verifyEditedOptionSetPortal(optionsetName, firstOption, secondOption, thirdOption) {
    I.waitForVisible(`#ebsContainerContent_${optionsetName}_list`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${optionsetName}_list`);
    I.see(firstOption);
    I.see(secondOption);
    I.see(thirdOption);
    I.clearField(`#ebsContainerContent_${optionsetName}_list`);
    I.fillField(`#ebsContainerContent_${optionsetName}_list`, secondOption);
    I.pressKey(constants.KEY_ENTER);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.waitForVisible(`#ebsContainerContent_${optionsetName}_list`, constants.SHORT_WAIT);
    I.see(secondOption);
  },

  // Verify an input value and readonly property
  // TODO  Verify an input value and readonly property  after locator
  async verifyInputAndReadonlyDetailFromAuditPage(withinID, valueForSearchName) {
    I.waitForVisible(withinID, constants.SHORT_WAIT);
    const value = await I.grabValueFrom(withinID);
    I.assert(value, valueForSearchName);
    I.seeElement(locate(withinID).withAttr({ 'aria-readonly': 'true' }));
  },

  // Verify an input value and readonly property
  // TODO  Verify an input value after locator
  async verifyInputDetailFromAuditPage(withinID, valueForSearchName) {
    I.waitForVisible(withinID, constants.SHORT_WAIT);
    const value = await I.grabValueFrom(withinID);
    I.assert(value, valueForSearchName);
  },

  searchAndVerifyForAProductInsertExistingTable(searchEditAttributeId,
    tableRowValueFromEditAttribute, valueForSearchNAme) {
    I.waitForVisible(searchEditAttributeId, constants.SHORT_WAIT);
    I.fillField(searchEditAttributeId, valueForSearchNAme);
    I.waitForVisible(tableRowValueFromEditAttribute, constants.SHORT_WAIT);
    I.waitForText(valueForSearchNAme, constants.SHORT_WAIT);
  },
  async verifyVALimitation(virtualAttrMaxLength, valueVAMaxPrecision, valueRelatedMaxPrecision, valueVACheckLength, valueVACheckPrecision, valueRelatedCheckLength, valueRelatedCheckPrecision) {
    // 23	Fill in "VAMaxLength" field with a text with 4000 characters
    I.waitForVisible(businessEntityPage.fields.inputVAMaxLengthField, constants.SHORT_WAIT);
    commonActions.fillInFormAttribute('ebsContainerContent', 'VAMaxLength', virtualAttrMaxLength);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputVAMaxLengthField, virtualAttrMaxLength);
    // 24	Fill in "VAMaxPrecision" field with a number with 8 decimals (10.12345678)
    I.waitForVisible(businessEntityPage.fields.inputVAMaxPrecisionField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.inputVAMaxPrecisionField, `${valueVAMaxPrecision}99`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputVAMaxPrecisionField, valueVAMaxPrecision);
    // 25	Fill in "RelatedMaxPrecision" field with a number with 8 decimals (20.12345678)
    I.fillField(businessEntityPage.fields.inputRelatedMaxPrecisionField, `${valueRelatedMaxPrecision}99`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputRelatedMaxPrecisionField, valueRelatedMaxPrecision);
    // 26	Fill in "RelatedMaxLength" field with a text with 4000 characters
    I.fillField(businessEntityPage.fields.inputRelatedMaxLengthField, `${virtualAttrMaxLength}aaaaaaa`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputRelatedMaxLengthField, virtualAttrMaxLength);
    // 27	Save and Reload -> Success message is displayed
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 28	Check if you are able to fill in "VACheckLength" with maximum 3 characters
    I.fillField(businessEntityPage.fields.inputVACheckLengthField, `${valueVACheckLength}ccc`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputVACheckLengthField, valueVACheckLength);
    // 29	Check if you are able to fill in "VACheckPrecision" with maximum 2 decimals
    I.fillField(businessEntityPage.fields.inputVACheckPrecisionField, `${valueVACheckPrecision}3`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputVACheckPrecisionField, valueVACheckPrecision);
    // 30	Check if you are able to fill in "RelatedCheckLength" with maximum 3 characters
    I.fillField(businessEntityPage.fields.inputRelatedCheckLengthField, `${valueRelatedCheckLength}D`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputRelatedCheckLengthField, valueRelatedCheckLength);
    // 31	Check if you are able to fill in "RelatedCheckPrecision" with maximum 2 decimals
    I.fillField(businessEntityPage.fields.inputRelatedCheckPrecisionField, `${valueRelatedCheckPrecision}233`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputRelatedCheckPrecisionField, valueRelatedCheckPrecision);
  },
  async verifyAttributeLimitation(valueAttrTextMaxLength, valueNumericMaxPrecision, valueTextCheckLength, valueNumericCheckPrecision) {
    // 15	Fill in TextMaxLength with a text with 4000 characters
    I.waitForVisible(businessEntityPage.fields.inputTextMaxLengthField, constants.SHORT_WAIT);
    commonActions.fillInFormAttribute('ebsContainerContent', 'TextMaxLength', valueAttrTextMaxLength);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputTextMaxLengthField, valueAttrTextMaxLength);
    // 16	Fill in NumericMaxPrecision with a number with 8 decimals (10.12345678)
    I.waitForVisible(businessEntityPage.fields.inputNumericMaxPrecisionField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.inputNumericMaxPrecisionField, `${valueNumericMaxPrecision}99`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputNumericMaxPrecisionField, valueNumericMaxPrecision);
    // 17	Save and Reload -> Success message is displayed
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 18	Check if you are able to fill in "TextCheckLength" max 3 characters
    I.waitForVisible(businessEntityPage.fields.inputTextCheckLengthField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.inputTextCheckLengthField, `${valueTextCheckLength}ccc`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputTextCheckLengthField, valueTextCheckLength);
    // 19	Check if you are able to fill in "NumericCheckPrecision" max 2 decimals
    I.fillField(businessEntityPage.fields.inputNumericCheckPrecisionField, `${valueNumericCheckPrecision}3`);
    await commonVerify.verifyValueExistsInInput(businessEntityPage.fields.inputNumericCheckPrecisionField, valueNumericCheckPrecision);
  },

  async verifyEntriesDltLookup(displayNameLabel, nameLabel, lookupInput, updateName) {
    // 12 Verify if there are only 2 attributes (Name and Lookup - TBU)
    await commonVerify.verifyValueExistsInLabel(attributePage.label.lookupUpdatedLabel, displayNameLabel);
    await commonVerify.verifyValueExistsInLabel(attributePage.label.nameLabel, nameLabel);
    // 13 Verify if Lookup - TBU contains Lkp2 - TBU
    await commonVerify.verifyValueExistsInInput(attributePage.fields.lookupUpdatedReadonlyFieldEditDltLookup, lookupInput);
    // 14 Verify if lookup is read-only
    I.waitForVisible(attributePage.fields.lookupUpdatedReadonlyFieldEditDltLookup, constants.SHORT_WAIT);
    // 15 Update Name from "Test 1" to "Test 1 Updated"
    I.fillField(attributePage.fields.attributeNameField, updateName);
    // 16 Save and Reload
    commonActions.saveAndRefreshAction();
    // 17 Verify the success message
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },
  verifyAttributeNoneInPortal(primaryAttDN, attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(primaryAttDN), constants.SHORT_WAIT);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None`, constants.SHORT_WAIT);
    I.click(`#ebsContainerContent_${attributeDName}_None`);
  },
  verifyHtmlAttributeInPortalAction(primaryAttDN, attributeDName) {
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(businessEntityPage.fields.primaryAttributeField, constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(primaryAttDN), constants.SHORT_WAIT);
    I.dontSee(businessEntityPage.labels.businessUnitIdLabel);
    I.waitForElement(`#ebsContainerContent_${attributeDName}_None`, constants.SHORT_WAIT);
    I.waitForElement(`#ebsContainerContent_${attributeDName}_ReadOnly`, constants.SHORT_WAIT);
  },
  async verifyUniqueIdentifierAttrInPortal(attributeDName, insertValue, verifyValue, dateDiv) {
    // verifySpecific checks that the specific field restrictions apply. This is made to work for Text Length 5 and Number Precision 3 so deal with it.
    // MUST BE FIXED BY FIXING THE MARKING PROCESS IN DESIGNER ! AFTER THEY ARE MARKED CORRECTLY, UNCOMMENT THE WAIT FOR VISIBLE LINES !!!
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, insertValue);
    const verifyFirst = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`);
    const verifyFourth = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`);
    const verifySecond = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`);
    const verifyThird = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`);
    I.assert(verifyFirst, verifyValue);
    I.assert(verifySecond, verifyValue);
    I.assert(verifyThird, verifyValue);
    I.assert(verifyFourth, '');
  },
  async verifyWholeNumberAttrInPortal(attributeDName, insertValue, verifyValue, dateDiv) {
    // verifySpecific checks that the specific field restrictions apply. This is made to work for Text Length 5 and Number Precision 3 so deal with it.
    // MUST BE FIXED BY FIXING THE MARKING PROCESS IN DESIGNER ! AFTER THEY ARE MARKED CORRECTLY, UNCOMMENT THE WAIT FOR VISIBLE LINES !!!
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`, insertValue);
    const verifyFirst = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_None${dateDiv}div input`);
    const verifyFourth = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div input`);
    const verifySecond = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div input`);
    const verifyThird = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div input`);
    I.assert(verifyFirst, verifyValue);
    I.assert(verifySecond, verifyValue);
    I.assert(verifyThird, verifyValue);
    I.assert(verifyFourth, '');
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    const verifyIsIdentify = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_IsIdentity${dateDiv}div input`);
    I.assert(verifyIsIdentify, '1');
  },

  async verifyLookup1AttributeInPortalAction(insertButton, errorMessage, attributeLkpName, lookupFieldRequired, recordLookup1, recordLookup2, nameOfFirstRecord, editLkpEntityAttr) {
    commonVerify.verifyEmptyTableData();
    commonActions.clickSidebarButton(insertButton);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      errorMessage,
    );
    I.waitForVisible(locate('div').withText(attributeLkpName), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(lookupFieldRequired), constants.SHORT_WAIT);
    I.waitForVisible(attributePage.buttons.lookupAttributeButton, constants.SHORT_WAIT);
    I.click(attributePage.buttons.lookupAttributeButton);
    I.waitForVisible(locate('td').withText(recordLookup1).inside(attributePage.table.lookupLkpAttrEntIdTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(recordLookup2).inside(attributePage.table.lookupLkpAttrEntIdTable), constants.SHORT_WAIT);
    commonActions.selectARowFromTableAfterText(recordLookup1);
    I.click(attributePage.buttons.okLookupAttributeButton);
    I.waitForInvisible(attributePage.buttons.okLookupAttributeButton, constants.SHORT_WAIT);
    I.waitForVisible(attributePage.fields.inputAttributeName, constants.SHORT_WAIT);
    I.fillField(attributePage.fields.inputAttributeName, nameOfFirstRecord);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withText(editLkpEntityAttr), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputAttributeName, nameOfFirstRecord);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputAttributeLookupField, recordLookup1);
  },

  verifyLookup2AttributeInPortalAction(recordLookup1, nameOfFirstRecord) {
    I.waitForElement(locate('td').withText(recordLookup1), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(recordLookup1));
    I.click(locate('td').withText(recordLookup1));
    I.waitForVisible(locate('td').withText(nameOfFirstRecord).inside(attributePage.table.relationshipLookupTable), constants.SHORT_WAIT);
  },

  async verifyRawTextAttributeInPortal(attributeDName, insertValue, verifyValue, dateDiv, name) {
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div textarea`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_None${dateDiv}div textarea`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div textarea`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div textarea`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_None${dateDiv}div textarea`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div textarea`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div textarea`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div textarea`, insertValue);
    I.waitForVisible(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div textarea`, constants.SHORT_WAIT);
    I.fillField(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div textarea`, insertValue);
    const verifyFirst = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_None${dateDiv}div div textarea`);
    const verifyFourth = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_ReadOnly${dateDiv}div div textarea`);
    const verifySecond = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Required${dateDiv}div div textarea`);
    const verifyThird = await I.grabValueFrom(`#ebsContainerContent_${attributeDName}_Recommended${dateDiv}div div textarea`);
    I.assert(verifyFirst, verifyValue);
    I.assert(verifySecond, verifyValue);
    I.assert(verifyThird, verifyValue);
    I.assert(verifyFourth, '');
    I.fillField(attributePage.fields.attributeNameField, name);
  },

  verifyRemovedProdNotExistInTable(valueOfProductRemove1, valueOfProductRemove2) {
    I.waitForInvisible(locate('td').withText(valueOfProductRemove1), constants.SHORT_WAIT);
    I.waitForInvisible(locate('td').withText(valueOfProductRemove2), constants.SHORT_WAIT);
  },

  async verifyIfChangeDefaultValue(text, textArea, numeric, wholeNumber) {
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAtt, text);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAreaAtt, textArea);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultNumericAtt, numeric);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultWholeNumberAtt, wholeNumber);
  },

  async verifyDefaultValueTextAttr(name, newValue) {
    commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultEntityTableContainer, name);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAtt, newValue);
  },

  async verifyDefaultValueTextAreaAttr(name, newValue) {
    commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultEntityTableContainer, name);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultTextAreaAtt, newValue);
  },

  async verifyDefaultValueNumericAttr(name, newValue) {
    commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultEntityTableContainer, name);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultNumericAtt, newValue);
  },

  async verifyDefaultValueWholeNumberAttr(name, newValue) {
    commonActions.doubleClickValueFromTable(businessEntityPage.container.defaultEntityTableContainer, name);
    await commonVerify.verifyValueExistsInInput(attributePage.fields.inputForAtEntityDefaultWholeNumberAtt, newValue);
  },
};
