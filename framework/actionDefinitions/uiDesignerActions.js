// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const uiDesignerPage = require('~pages/uiDesignerPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  async editAndVerifyContainers() {
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    I.waitForVisible(uiDesignerPage.containers.container2and10, constants.SHORT_WAIT);
    I.click(uiDesignerPage.containers.container2and10);
    I.waitForVisible(uiDesignerPage.buttons.moveUpButton210Container, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.moveUpButton210Container);
    I.click(uiDesignerPage.buttons.moveDownButton210Container);
    I.click(uiDesignerPage.buttons.deleteButton210Container);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify containers within the HTML Editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(uiDesignerPage.containers.container12HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container3and9HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container4and8HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container6and6HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container8and4HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container9and3HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container10and2HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container4x3HTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.containers.container3x4HTMLEditor, constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async editVerifyLabelAttribute() {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    I.waitForVisible(uiDesignerPage.dataTemplates.forthLabelAttributeTemplate, constants.SHORT_WAIT);
    I.click(uiDesignerPage.dataTemplates.forthLabelAttributeTemplate);
    I.click(uiDesignerPage.buttons.moveUpButtonLabelAttribute);
    I.click(uiDesignerPage.buttons.moveDownButtonLabelAttribute);
    I.click(uiDesignerPage.buttons.deleteButtonLabelAttribute);
    I.waitForInvisible(uiDesignerPage.dataTemplates.forthLabelAttributeTemplate, constants.SHORT_WAIT);
    // Click on 'Update Template'
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify remaining data templates in html editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(uiDesignerPage.dataTemplates.firstLabelAttributeTemplateHTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.dataTemplates.secondLabelAttributeTemplateHTMLEditor, constants.SHORT_WAIT);
      I.waitForVisible(uiDesignerPage.dataTemplates.thirdLabelAttributeTemplateHTMLEditor, constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addAttribute(numericAttribute) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Select Attribute Data Template
    I.waitForVisible(uiDesignerPage.dataTemplates.labelAttrSelectLA, constants.SHORT_WAIT);
    I.click(uiDesignerPage.dataTemplates.labelAttrSelectLA);
    // Select Numeric Attribute from dropdown
    I.waitForVisible(uiDesignerPage.buttons.dropdownButtonSelectAttribute, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.dropdownButtonSelectAttribute);
    I.waitForVisible(locate('div').withText(numericAttribute).inside(uiDesignerPage.selector.optionDropdown), constants.SHORT_WAIT);
    I.click(locate('div').withText(numericAttribute).inside(uiDesignerPage.selector.optionDropdown));
    I.click(uiDesignerPage.buttons.applyChangesAttributeButton);
    // Verify changes in UI Designer
    I.waitForVisible(locate('div').withAttr({ 'data-label-for': numericAttribute }).inside(uiDesignerPage.dataTemplates.labelAttrSelectLA), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(`{${numericAttribute}}`).inside(uiDesignerPage.dataTemplates.labelAttrSelectLA), constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify changes in HTML Editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('div').withAttr({ 'data-label-for': numericAttribute }).inside(uiDesignerPage.dataTemplates.labelAttrSelectLAHTMLEditor), constants.SHORT_WAIT);
      I.waitForVisible(locate('div').withText(`{${numericAttribute}}`).inside(uiDesignerPage.dataTemplates.labelAttrSelectLAHTMLEditor), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addVirtualAttribute(virtualAttributeList, virtualAttributeName) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Select Attribute Data Template
    I.waitForVisible(uiDesignerPage.dataTemplates.labelAttrSelectLA, constants.SHORT_WAIT);
    I.click(uiDesignerPage.dataTemplates.labelAttrSelectLA);
    // Select Numeric Attribute from dropdown
    I.waitForVisible(uiDesignerPage.buttons.dropdownButtonSelectVAttribute, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.dropdownButtonSelectVAttribute);
    I.waitForVisible(locate('div').withText(virtualAttributeList).inside(uiDesignerPage.containers.scrollableContainer).last(), constants.SHORT_WAIT);
    I.click(locate('div').withText(virtualAttributeList).inside(uiDesignerPage.containers.scrollableContainer).last());
    I.click(uiDesignerPage.buttons.applyChangesButtonVA);
    // Verify changes in UI Designer
    I.waitForVisible(locate('div').withAttr({ 'data-label-for': virtualAttributeName }).inside(uiDesignerPage.dataTemplates.labelAttrSelectLA), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(`{${virtualAttributeName}}`).inside(uiDesignerPage.dataTemplates.labelAttrSelectLA), constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify changes in HTML Editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('div').withAttr({ 'data-label-for': virtualAttributeName }).inside(uiDesignerPage.dataTemplates.labelAttrSelectLAHTMLEditor), constants.SHORT_WAIT);
      I.waitForVisible(locate('div').withText(`{${virtualAttributeName}}`).inside(uiDesignerPage.dataTemplates.labelAttrSelectLAHTMLEditor), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonActions.refreshPage();
  },

  async addHeading(heading, text, localizationKey, textAlignment) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    I.waitForVisible(uiDesignerPage.selector.headingUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.selector.headingUIDesigner);
    // Select Heading type
    I.waitForVisible(uiDesignerPage.selector.headingTypeDropdown, constants.SHORT_WAIT);
    I.click(uiDesignerPage.selector.headingTypeDropdown);
    I.waitForVisible(locate('div').withText(heading).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(heading).inside(uiDesignerPage.containers.scrollableContainer));
    I.fillField(uiDesignerPage.fields.desiredTextInputField, text);
    I.fillField(uiDesignerPage.fields.localizableTextInputField, localizationKey);
    // Click and select a text alignment
    I.click(uiDesignerPage.selector.textAlignmentDropdown);
    I.waitForVisible(locate('div').withText(textAlignment).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(textAlignment).inside(uiDesignerPage.containers.scrollableContainer));
    I.click(uiDesignerPage.buttons.applyChangesButtonHeading);
    // Verify changes in UI Designer
    I.waitForVisible(uiDesignerPage.selector.testHeading.withText(text).inside(uiDesignerPage.containers.htmlHolderContainer), constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify changes in HTML Editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(uiDesignerPage.selector.testHeading.withText(text), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addChart(chartType) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Add a Chart container
    // Select it
    I.waitForVisible(uiDesignerPage.selector.chartUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.selector.chartUIDesigner);
    // In top right part of the screen the chart options are enabled
    I.waitForVisible(uiDesignerPage.selector.selectChartDropdown, constants.SHORT_WAIT);
    I.fillField(uiDesignerPage.selector.selectChartDropdown, chartType);
    // Click the Charts drop down
    I.waitForVisible(locate('div').withText(chartType).inside(uiDesignerPage.selector.optionDropdown), constants.SHORT_WAIT);
    I.click(locate('div').withText(chartType).inside(uiDesignerPage.selector.optionDropdown));
    // Select a chart from the list
    // Click the 'Apply Changes'
    I.click(uiDesignerPage.buttons.applyChangesButtonChart);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Select 'Update Template'
    // Open the HTML editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('div').withText(`{$${chartType}$}`).inside(uiDesignerPage.containers.htmlContainer), constants.SHORT_WAIT);
    });
    // All changes are saved and present in the editor too
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addButton(color, size, icon, buttonType, textButton, idButton, classButton) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Add a Button container
    // Select it
    I.waitForVisible(uiDesignerPage.buttons.buttonUIDesigner, constants.SHORT_WAIT);
    I.waitForClickable(uiDesignerPage.buttons.buttonUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonUIDesigner);
    // In top right part of the screen the button options are enabled: behaviour and appearance
    // A color for the button can be selected
    I.waitForVisible(uiDesignerPage.buttons.selectColorDropdownButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.selectColorDropdownButton);
    I.waitForVisible(locate('div').withAttr({ class: color }).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ class: color }).inside(uiDesignerPage.containers.scrollableContainer));
    // A style can be selected for the button
    I.click(uiDesignerPage.checkboxes.roundStyleButtonCheckbox);
    I.click(uiDesignerPage.checkboxes.filledStyleButtonCheckbox);
    // A size can be selected for the button
    I.click(uiDesignerPage.buttons.selectSizeDropdownButton);
    I.waitForVisible(locate('div').withText(size).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer).first(), constants.SHORT_WAIT);
    I.click(locate('div').withText(size).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer).first());
    // An icon can be selected for the button
    I.click(uiDesignerPage.buttons.selectIconDropdownButton);
    I.waitForVisible(locate('span').withText(icon).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('span').withText(icon).inside(uiDesignerPage.containers.scrollableContainer));
    // A button type can be selected
    I.click(uiDesignerPage.buttons.buttonTypeDropdownButton);
    I.waitForVisible(locate('div').withText(` ${buttonType}`).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer).first(), constants.SHORT_WAIT);
    I.pressKey(constants.KEY_DOWN_ARROW);
    I.pressKey(constants.KEY_ENTER);
    // A text can be added for the button
    I.click(uiDesignerPage.fields.fillButtonTextInputField);
    I.fillField(uiDesignerPage.fields.fillButtonTextInputField, textButton);
    // A button ID is mandatory
    I.click(uiDesignerPage.fields.fillButtonIDField);
    I.fillField(uiDesignerPage.fields.fillButtonIDInputField, idButton);
    // Apply changes and update the template
    I.click(uiDesignerPage.buttons.applyChangesButton);
    I.waitForVisible(uiDesignerPage.tabs.uiTab, constants.SHORT_WAIT);
    I.click(uiDesignerPage.tabs.uiTab);
    // Open the HTML editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('button').withAttr({ class: classButton }).withAttr({ id: idButton }), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addCustomButton(buttonType, textButton, idButton) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Select the button
    I.waitForVisible(uiDesignerPage.buttons.buttonUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonUIDesigner);
    // Select the Custom button type
    I.waitForVisible(uiDesignerPage.buttons.buttonTypeDropdownButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonTypeDropdownButton);
    I.waitForVisible(locate('div').withText(` ${buttonType}`).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.pressKey(constants.KEY_DOWN_ARROW);
    I.pressKey(constants.KEY_ENTER);
    I.click(uiDesignerPage.fields.fillButtonTextInputField);
    I.fillField(uiDesignerPage.fields.fillButtonTextInputField, textButton);
    I.click(uiDesignerPage.fields.fillButtonIDField);
    I.fillField(uiDesignerPage.fields.fillButtonIDInputField, idButton);
    I.click(uiDesignerPage.buttons.applyChangesButton);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addCustomProcessorButton(customProcessor, text, idButton, customProcessorOption) {
    // Open the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Add a button
    // Select it
    I.waitForVisible(uiDesignerPage.buttons.buttonUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonUIDesigner);
    // In top right part of the screen the button options are enabled: behaviour and appearance
    // Select the Call Custom Processor button type
    I.waitForVisible(uiDesignerPage.buttons.buttonTypeDropdownButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonTypeDropdownButton);
    I.waitForVisible(locate('div').withText(customProcessor).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(customProcessor).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer));
    // Add a button text
    // Add a button ID
    I.click(uiDesignerPage.fields.fillButtonTextInputField);
    I.fillField(uiDesignerPage.fields.fillButtonTextInputField, text);
    I.click(uiDesignerPage.fields.fillButtonIDField);
    I.fillField(uiDesignerPage.fields.fillButtonIDInputField, idButton);
    // Add a custom processor from the drop down
    I.click(uiDesignerPage.buttons.selectCustomProcessorDropdownButton);
    I.waitForVisible(locate('div').withText(customProcessorOption).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(customProcessorOption).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer));
    // Apply the changes
    I.click(uiDesignerPage.buttons.applyChangesButton);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Update the template
    // Open the HTML editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('button')
        .withText(text)
        .withAttr({ id: idButton })
        .withAttr({ 'data-endpoint-name': `${customProcessorOption}[${customProcessorOption}]` }), constants.SHORT_WAIT);
    });
    // The HTML code reflects the button
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addFormActionButton(buttonType, text, idButton) {
    // Access the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Select the button
    I.waitForVisible(uiDesignerPage.buttons.buttonUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonUIDesigner);
    // Select button type
    I.waitForVisible(uiDesignerPage.buttons.buttonTypeDropdownButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.buttonTypeDropdownButton);
    I.waitForVisible(locate('div').withText(buttonType).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(buttonType).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer));
    // Add text
    I.click(uiDesignerPage.fields.fillButtonTextInputField);
    I.fillField(uiDesignerPage.fields.fillButtonTextInputField, text);
    // Add button ID
    I.click(uiDesignerPage.fields.fillButtonIDField);
    I.fillField(uiDesignerPage.fields.fillButtonIDInputField, idButton);
    // Add form action
    I.click(uiDesignerPage.fields.formActionField);
    I.waitForVisible(uiDesignerPage.checkboxes.customFormActionCheckbox, constants.SHORT_WAIT);
    I.click(uiDesignerPage.checkboxes.customFormActionCheckbox);
    // Clicking the Text field again so the form action dropdown disappears
    I.click(uiDesignerPage.fields.fillButtonTextInputField);
    // Add a message
    I.click(uiDesignerPage.fields.formActionMessageInputField);
    I.fillField(uiDesignerPage.fields.formActionMessageInputField, text);
    I.click(uiDesignerPage.buttons.applyChangesButton);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify changes in HTML editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('button').withAttr({ id: idButton }).withText(text), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addRelationshipType(relationName) {
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    I.wait(3)
    I.waitForVisible(uiDesignerPage.selector.relationshipTypeUIDesigner, constants.SHORT_WAIT);
    I.waitForClickable(uiDesignerPage.selector.relationshipTypeUIDesigner, constants.SHORT_WAIT);
    I.click(uiDesignerPage.selector.relationshipTypeUIDesigner);
    I.click(uiDesignerPage.selector.relationshipTypeUIDesigner);
    I.waitForVisible(uiDesignerPage.fields.selectRelationInputField, constants.SHORT_WAIT);
    I.click(uiDesignerPage.fields.selectRelationInputField);
    // Select a relation from the ones available
    I.waitForVisible(locate('div').withText(relationName).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(relationName).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer));
    // Click on a checkbox
    I.click(uiDesignerPage.checkboxes.noInsertCheckbox);
    I.click(uiDesignerPage.buttons.applyChangesRelationButton);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify changes in html editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('div').withText(`{#${relationName}, noinsert#}`), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addAttributesDataForm(userAttribute, user, relationName) {
    // Access the UI Designer
    I.waitForVisible(uiDesignerPage.buttons.checkoutButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.checkoutButton);
    I.waitForVisible(uiDesignerPage.buttons.uiDesignerButton, constants.SHORT_WAIT);
    I.click(uiDesignerPage.buttons.uiDesignerButton);
    // Select the attribute container
    I.waitForVisible(uiDesignerPage.selector.attributeContainerDataForm, constants.SHORT_WAIT);
    I.click(uiDesignerPage.selector.attributeContainerDataForm);
    // Click the select attribute field
    I.waitForVisible(uiDesignerPage.fields.selectAttributeDataFormField, constants.SHORT_WAIT);
    I.click(uiDesignerPage.fields.selectAttributeDataFormField);
    // Select and entity from the list
    I.waitForVisible(locate('div').withText(userAttribute).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer).last(), constants.SHORT_WAIT);
    I.click(locate('div').withText(userAttribute).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer).last());
    I.click(uiDesignerPage.buttons.applyChangesAttrDataFormButton);
    // Select the relationship container
    I.waitForClickable(uiDesignerPage.selector.relationshipTypeDataForm, constants.SHORT_WAIT);
    I.click(uiDesignerPage.selector.relationshipTypeDataForm);
    I.click(uiDesignerPage.selector.relationshipTypeDataForm);
    // Select the relationship from the list
    I.waitForVisible(uiDesignerPage.fields.selectRelationDataFormField, constants.SHORT_WAIT);
    I.click(uiDesignerPage.fields.selectRelationDataFormField);
    I.waitForVisible(locate('div').withText(relationName).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer), constants.SHORT_WAIT);
    I.click(locate('div').withText(relationName).inside(uiDesignerPage.selector.optionDropdown).inside(uiDesignerPage.containers.scrollableContainer));
    I.click(uiDesignerPage.checkboxes.noInsertCheckbox);
    I.click(uiDesignerPage.buttons.applyChangesRelationButtonDataForms);
    I.click(uiDesignerPage.buttons.updateTemplateButton);
    // Verify changes in the html editor
    await within({ frame: uiDesignerPage.selector.htmlEditorIFrame }, () => {
      I.waitForVisible(locate('div').withText(`{${user}Id}`), constants.SHORT_WAIT);
      I.waitForVisible(locate('div').withText(`{#${relationName}, noinsert#}`), constants.SHORT_WAIT);
    });
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },
};
