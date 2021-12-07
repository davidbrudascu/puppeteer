const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const transientEntityPage = require('~pages/transientEntityPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  insertEntity(transEntityName, transEntityDisplayName) {
    // Using LONG_WAIT when accessing a new page and we need to wait for all elements to load.
    I.waitForElement(transientEntityPage.fields.businessEntityResultsField, constants.LONG_WAIT);
    I.click(transientEntityPage.buttons.entityInsertButton);
    I.waitForElement(transientEntityPage.fields.insertEntityLastField, constants.LONG_WAIT);
    I.click(transientEntityPage.buttons.entityTypeButton);
    I.click(transientEntityPage.selector.transientEntityTypeSelector);
    // After selecting this entity type, some fields will be hidden.
    // Checking for hidden elements in the next line before continue with the form.
    I.waitToHide(transientEntityPage.fields.entityStatusField, constants.SHORT_WAIT);
    I.click(transientEntityPage.fields.entityNameField);
    I.fillField(transientEntityPage.fields.entityNameField, transEntityName);
    I.click(transientEntityPage.fields.entityDisplayNameField);
    I.fillField(transientEntityPage.fields.entityDisplayNameField, transEntityDisplayName);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  editTransientEntity(transEntityName) {
    I.waitForElement(transientEntityPage.fields.entitySearchField, constants.LONG_WAIT);
    I.click(transientEntityPage.fields.entitySearchField);
    I.fillField(transientEntityPage.fields.entitySearchField, transEntityName);
    I.waitForElement(locate('td').withText(transEntityName), constants.SHORT_WAIT);
    commonActions.doubleClickValueFromTable(
      transientEntityPage.fields.businessEntityResultsField,
      transEntityName,
    );
  },

  insertLoadScript(loadScriptName) {
    I.waitForElement(transientEntityPage.buttons.entityLoadScriptButton, constants.SHORT_WAIT);
    commonActions.clickLookupTableButton(transientEntityPage.buttons.entityLoadScriptButton);
    I.waitForElement(locate('td').withText(loadScriptName));
    I.doubleClick(locate('td').withText(loadScriptName));
    I.click(locate('td').withText(loadScriptName));
  },

  insertSaveScript(saveScriptName) {
    I.waitForElement(transientEntityPage.buttons.entitySaveScriptButton, constants.SHORT_WAIT);
    commonActions.clickLookupTableButton(transientEntityPage.buttons.entitySaveScriptButton);
    // Using locate here to select the script from list based on the name
    I.waitForElement(locate('td').withText(saveScriptName));
    I.doubleClick(locate('td').withText(saveScriptName));
    I.click(locate('td').withText(saveScriptName));
  },

  createLoadScript(loadScriptName, scriptCode, transEntityName) {
    I.waitForElement(transientEntityPage.fields.scriptResultsPage, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(transientEntityPage.fields.scriptTypeField, constants.SHORT_WAIT);
    I.click(transientEntityPage.fields.entityNameField);
    I.fillField(transientEntityPage.fields.entityNameField, loadScriptName);
    I.click(transientEntityPage.fields.scriptTypeField);
    I.click(transientEntityPage.selector.onDemandScriptTypeSelector);
    I.click(transientEntityPage.fields.serverScriptCodeAreaField);
    I.fillField(transientEntityPage.fields.serverScriptCodeAreaField, scriptCode);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Fill out Output tab info
    I.click(transientEntityPage.tabs.scriptOutputTab);
    I.waitForElement(transientEntityPage.buttons.scriptOutputType, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.scriptOutputType);
    I.click(transientEntityPage.selector.scriptOutputEntityType);
    I.waitForElement(transientEntityPage.buttons.scriptOutputParamTypeButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.scriptOutputParamTypeButton);
    I.click(transientEntityPage.selector.scriptOutputParamType);
    I.click(transientEntityPage.buttons.scriptOutputEntityButton);
    I.fillField(transientEntityPage.fields.scriptEntityField, transEntityName);
    // Using locate here to select result based on entity name.
    I.waitForElement(locate('td').withText(transEntityName), constants.SHORT_WAIT);
    I.click(locate('td').withText(transEntityName));
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  createSaveScript(saveScriptName, scriptCode) {
    I.waitForElement(transientEntityPage.fields.scriptResultsPage, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(transientEntityPage.fields.scriptTypeField, constants.SHORT_WAIT);
    I.click(transientEntityPage.fields.entityNameField);
    I.fillField(transientEntityPage.fields.entityNameField, saveScriptName);
    I.click(transientEntityPage.fields.scriptTypeField);
    I.click(transientEntityPage.selector.onDemandScriptTypeSelector);
    I.click(transientEntityPage.fields.serverScriptCodeAreaField);
    I.fillField(transientEntityPage.fields.serverScriptCodeAreaField, scriptCode);
    I.click(commonPage.buttons.saveAndCloseButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addEntityDescription(transientDescription) {
    I.waitForElement(transientEntityPage.fields.entityDescriptionField, constants.SHORT_WAIT);
    I.click(transientEntityPage.fields.entityDescriptionField);
    I.fillField(transientEntityPage.fields.entityDescriptionField, transientDescription);
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  searchDeleteScripts(scriptName) {
    I.waitForElement(transientEntityPage.fields.entitySearchField, constants.LONG_WAIT);
    I.click(transientEntityPage.fields.entitySearchField);
    I.fillField(transientEntityPage.fields.entitySearchField, scriptName);
    I.wait(1);
    I.click(locate('td').withAttr({ 'aria-label': 'Select all' }));
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  searchDeleteEntity(businessEntityURL, transEntityName) {
    I.amOnPage(businessEntityURL);
    I.waitForElement(transientEntityPage.fields.entitySearchField, constants.LONG_WAIT);
    I.click(transientEntityPage.fields.entitySearchField);
    I.fillField(transientEntityPage.fields.entitySearchField, transEntityName);
    I.waitForElement(locate('td').withText(transEntityName), constants.SHORT_WAIT);
    I.click(locate('td').withText(transEntityName));
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  insertTransExtModel(extModelSection, transExtModelName, invalidTransEntity, validTransEntity) {
    // Using LONG_WAIT because it's the loading of first page after login
    I.waitForElement(transientEntityPage.fields.entityDescriptionField, constants.LONG_WAIT);
    commonActions.menuSectionExpand(extModelSection);
    I.waitForElement(transientEntityPage.buttons.insertExtModel, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.insertExtModel);
    // Fill the Extended Model Form
    I.waitForElement(transientEntityPage.buttons.extTypeButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.fields.extNameField);
    I.fillField(transientEntityPage.fields.extNameField, transExtModelName);
    I.click(transientEntityPage.buttons.extTypeButton);
    I.click(transientEntityPage.selector.extTypeSelector);
    I.waitForElement(transientEntityPage.buttons.transEntityButton, constants.SHORT_WAIT);
    // Selecting the wrong entity to check the validation
    I.click(transientEntityPage.buttons.transEntityButton);
    I.fillField(transientEntityPage.fields.transEntityLookupField, invalidTransEntity);
    I.waitForElement(locate('td').withText(invalidTransEntity), constants.SHORT_WAIT);
    I.click(locate('td').withText(invalidTransEntity));
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY);
    // Selecting the correct entity
    I.click(transientEntityPage.buttons.transEntityButton);
    I.fillField(transientEntityPage.fields.transEntityLookupField, validTransEntity);
    I.waitForElement(locate('td').withText(validTransEntity), constants.SHORT_WAIT);
    I.click(locate('td').withText(validTransEntity));
    I.click(commonPage.buttons.saveAndRefreshButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addVirtualAttr() {
    I.waitForElement(transientEntityPage.tabs.extVATab, constants.SHORT_WAIT);
    I.forceClick(transientEntityPage.tabs.extVATab);
    I.waitForElement(transientEntityPage.fields.vaResultsTableField, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.insertVAButton);
    I.waitForElement(transientEntityPage.buttons.relatedAttrButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.relatedAttrButton);
    I.waitForElement(transientEntityPage.selector.relatedAttrTypeSelector, constants.SHORT_WAIT);
    I.click(transientEntityPage.selector.relatedAttrTypeSelector);
    I.click(commonPage.buttons.saveAndRefreshButton);
  },

  addExtModelToFDF(transExtModelName) {
    I.waitForElement(transientEntityPage.fields.bussinessExtResultsField, constants.LONG_WAIT);
    I.click(transientEntityPage.buttons.insertBusinessExtButton);
    I.waitForElement(locate('td').withText(transExtModelName)
      .inside(transientEntityPage.locate.lookupExt), constants.SHORT_WAIT);
    I.doubleClick(locate('td').withText(transExtModelName)
      .inside(transientEntityPage.locate.lookupExt));
    I.click(locate('td').withText(transExtModelName)
      .inside(transientEntityPage.locate.lookupExt));
    I.waitForElement(commonPage.messagePopup.successMessage, constants.SHORT_WAIT);
  },

  addVirtAttrToFDF(selectTheAttribute) {
    I.waitForVisible(transientEntityPage.buttons.checkoutUIDesignerButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.checkoutUIDesignerButton);
    I.waitForElement(transientEntityPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.uiDesignerButton);
    I.waitForVisible(transientEntityPage.buttons.addAttrButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.addAttrButton);
    // Select and entity from the list
    I.waitForVisible(transientEntityPage.selector.selectAttributeDropdown, constants.SHORT_WAIT);
    I.click(transientEntityPage.selector.selectAttributeDropdown);
    I.waitForVisible(locate('div').withText(selectTheAttribute).inside(transientEntityPage.selector.optionDropdown).inside(transientEntityPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(selectTheAttribute).inside(transientEntityPage.selector.optionDropdown).inside(transientEntityPage.containers.scrollableContainer));
    I.click(transientEntityPage.buttons.applyChangesAttrDataFormButton);
    I.waitForElement(transientEntityPage.buttons.updateTemplateButton, constants.SHORT_WAIT);
    I.click(transientEntityPage.buttons.updateTemplateButton);
    I.waitForElement(commonPage.buttons.saveAndRefreshButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.saveAndRefreshButton);
    I.waitForElement(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  insertTransRecord(
    recordSourceEmail,
    recordSourceName,
    recordSourceCity,
    recordSourcePhone,
    recordProduct,
  ) {
    I.waitForElement(commonPage.buttons.insertButton, constants.LONG_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForElement(transientEntityPage.fields.recordEmailField, constants.SHORT_WAIT);
    I.click(transientEntityPage.fields.recordEmailField);
    I.fillField(transientEntityPage.fields.recordEmailField, recordSourceEmail);
    I.click(transientEntityPage.buttons.formNextButton);
    I.waitForElement(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Verify data from source entity
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordSourceNameField,
      recordSourceName,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordSourceCityField,
      recordSourceCity,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordSourceEmailField,
      recordSourceEmail,
    );
    commonVerify.verifyValueExistsInInput(
      transientEntityPage.fields.recordSourcePhoneField,
      recordSourcePhone,
    );
    // Fill rest of form.
    I.click(transientEntityPage.fields.recordProductField);
    I.fillField(transientEntityPage.fields.recordProductField, recordProduct);
    I.click(transientEntityPage.buttons.formFinishButton);
    I.waitForElement(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },
};
