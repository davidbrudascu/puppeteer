// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const userJourneyPage = require('~pages/userJourneyPage');
const businessEntityPage = require('~pages/businessEntityPage');
const formPage = require('~pages/formPage');

const I = actor();

module.exports = {
  createHTMLSourceCodeBasicForm(sectionDataForms, nameATHtmlF, isDefaultForEditCheckbox, goToUITab, customHtmlSample1) {
    // 3 Expand "Data forms" section -> check if only "default" form is displayed and default and default for edit checkboxes are checked
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityType_list' })), constants.LONG_WAIT);
    commonActions.menuSectionExpand(sectionDataForms);
    I.waitForVisible(locate('td').withText('default').inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms' })), constants.LONG_WAIT);
    I.waitForVisible(locate('div').withAttr({ 'aria-checked': 'true' }).inside(locate('td').withAttr({ 'aria-colindex': '4' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withAttr({ 'aria-checked': 'true' }).inside(locate('td').withAttr({ 'aria-colindex': '5' })), constants.SHORT_WAIT);
    I.seeElement(locate('tr').withAttr({ 'aria-rowindex': '1' }));
    I.waitForInvisible(locate('tr').withAttr({ 'aria-rowindex': '2' }), constants.SHORT_WAIT);
    // 4 Click on "Insert" button
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar' })));
    // 5 Fill in "Name" with "ATHtmlF"
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameATHtmlF);
    // 6 Select the checkbox "is default for edit"
    I.waitForVisible(locate('div').withText(isDefaultForEditCheckbox), constants.SHORT_WAIT);
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefaultEdit' })));
    // 7 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 8 Go to UI tab
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    commonActions.navigateToFormStep(goToUITab);
    // 9 Click on "tools" -> Source Code
    // 10 Paste your HTML code
    // 11 Click on "Ok" button
    commonActions.fillInCustomTinyMceEditor(
      userJourneyPage.selector.ujCodeTemplateLoc,
      userJourneyPage.selector.ujCodeTemplateTinyMceId,
      customHtmlSample1,
    );
  },

  createFormStepsBasicForm(sectionDataForms, form_AT_StepsCreateF, autoGenerateTemplateType, nameATStepsF, goToStepsTab, nameFirstStep, displayName1stStepAT,
    customHtmlP4, nameSecondStep, displayName2ndStepAT, goToUITab, customHtmlP5) {
    // 3 Expand "Data forms" section
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityType_list' })), constants.SHORT_WAIT);
    commonActions.menuSectionExpand(sectionDataForms);
    I.waitForVisible(locate('td').withText(form_AT_StepsCreateF), constants.LONG_WAIT);
    // 4 Click on "Insert" button
    I.waitForVisible(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar' })), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar' })));
    // 5 Fill in "Name" with "ATStepsF"
    I.waitForVisible(locate('div').withText(autoGenerateTemplateType), constants.SHORT_WAIT);
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameATStepsF);
    // 6 Check "is default" and "is default for edit"
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefault' })));
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefaultEdit' })));
    commonVerify.verifyToastMessage(commonPage.messagePopup.infoMessage, constants.TOAST_VANISH);
    // 7 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 8 Go to 3rd Section (Steps)
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    commonActions.navigateToFormStep(goToStepsTab);
    // 9 Check "Render section tabs as a bullet list"
    I.waitForVisible(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_renderTabsAsBullets' }).withAttr({ 'aria-checked': 'true' })), constants.SHORT_WAIT);
    // 10 Click on "Insert" button
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityformsection_entityform_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityformsection_entityform_toolbar' })));
    // 11 Fill in Name with: First Step
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameFirstStep);
    // 12 Fill in Display Name with: 1st Step AT
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })), displayName1stStepAT);
    // 13 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 14 Go to UI
    commonActions.navigateToFormStep(goToUITab);
    // 15 Click on Tools -> Source Code
    // 16 Paste the HTML Code (P4)
    // 17 Click Ok
    commonActions.fillInCustomTinyMceEditor(
      userJourneyPage.selector.ujCodeTemplateLoc,
      userJourneyPage.selector.ujCodeTemplateTinyMceId,
      customHtmlP4,
    );
    // 18 Click "Save and Close" icon -> Check if your section was added
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('td').withText(nameFirstStep).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(displayName1stStepAT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 19 Click on "Insert" button
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityformsection_entityform_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityformsection_entityform_toolbar' })));
    // 20 Fill in Name with: Second Step
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameSecondStep);
    // 21 Fill in DisplayName with: 2nd Step AT
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })), displayName2ndStepAT);
    // 22 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 23 Go to Code
    commonActions.navigateToFormStep(goToUITab);
    // 24 Click on Tools -> Source Code
    // 25 Paste the HTML Code (P5)
    // 26 Click Ok
    commonActions.fillInCustomTinyMceEditor(
      userJourneyPage.selector.ujCodeTemplateLoc,
      userJourneyPage.selector.ujCodeTemplateTinyMceId,
      customHtmlP5,
    );
    // 27 Click "Save and Close" icon
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_renderTabsAsBullets' }).withAttr({ 'aria-checked': 'true' })), constants.SHORT_WAIT);
  },

  createEditBasicForm(sectionDataForms, dataFormName, goToStepsTab, nameSection1, nameSectionUpdated, displayNameSectionUpdated, nameSection2, nameSection3) {
    // 3 Expand "Data forms" section
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityType_list' })), constants.SHORT_WAIT);
    commonActions.menuSectionExpand(sectionDataForms);
    // 4 Access your form
    I.waitForVisible(locate('td').withText(dataFormName).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms' })), constants.LONG_WAIT);
    commonActions.doubleClickValueFromTable(locate('div').withAttr({ id: 'ebsContainerContent' }), dataFormName);
    // 5 Go to 3rd Section (Steps)
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    commonActions.navigateToFormStep(goToStepsTab);
    // 6 Access Section 1
    I.waitForVisible(locate('td').withText(nameSection1).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entityformsection_entityform' })), constants.SHORT_WAIT);
    commonActions.doubleClickValueFromTable(locate('div').withAttr({ id: 'ebsContainerContent' }), nameSection1);
    // 7 Update its name and display name (SCT Updated)
    I.waitForVisible(locate('div').withText('DisplayName'), constants.SHORT_WAIT);
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameSectionUpdated);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })), displayNameSectionUpdated);
    // 8 Save and Close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 9 Switch SCT Updated with Section3
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(nameSectionUpdated)), constants.SHORT_WAIT);
    I.dragAndDrop(locate('td').withText(nameSectionUpdated), locate('td').withText(nameSection3));
    I.waitForElement(locate('td').withText(nameSectionUpdated).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })), constants.SHORT_WAIT);
    I.dragAndDrop(locate('td').withText(nameSection2), locate('td').withText(nameSection3));
    I.waitForElement(locate('td').withText(nameSection3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 10 Uncheck "render section tabs as bullet"
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_renderTabsAsBullets' })));
    I.waitForVisible(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_renderTabsAsBullets' }).withAttr({ 'aria-checked': 'false' })), constants.SHORT_WAIT);
  },

  createGenerateTemplateBasicForm(sectionDataForms, nameGenTemplForm, autoGenerateTemplateType, nameATGenerateF, select2Columns, goToUITab, name, Value, Code, Age) {
    // 3 Expand "Data forms" section
    commonActions.menuSectionExpand(sectionDataForms);
    // 4 Click on "Insert" button
    I.waitForVisible(locate('td').withText(nameGenTemplForm).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms' })), constants.LONG_WAIT);
    I.waitForVisible(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar' })), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar' })));
    // 5 Fill in "Name" with "ATGenerateF"
    I.waitForVisible(locate('div').withText(autoGenerateTemplateType), constants.SHORT_WAIT);
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), nameATGenerateF);
    // 6 Check "is default" and "is default for edit"
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefault' })));
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isdefaultEdit' })));
    commonVerify.verifyToastMessage(commonPage.messagePopup.infoMessage, constants.TOAST_VANISH);
    // 7 Check "Auto Generate Template" checkbox
    I.waitForVisible(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_autoGenerateTemplate' })), constants.SHORT_WAIT);
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_autoGenerateTemplate' })));
    // 8 Select 2 columns
    I.click(locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_autoGenerateTemplateType_list' })));
    I.waitForVisible(locate('p').withText(select2Columns), constants.SHORT_WAIT);
    I.click(locate('p').withText(select2Columns));
    // 9 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 10 Go to 2nd Section (UI) -> check if all attributes are displayed - name, Age, Value and Code
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })), constants.SHORT_WAIT);
    commonActions.navigateToFormStep(goToUITab);
    I.switchTo(locate('iframe').withAttr({ id: 'ebsContainerContent_template_ifr' }));
    I.waitForVisible(locate('div').withText(name), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Value), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Code), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(Age), constants.SHORT_WAIT);
    I.switchTo();
  },

  createDataFormDDR(sectionDataForm, name, errorMessage) {
    // 3 Expand Data Form Section
    commonActions.menuSectionExpand(sectionDataForm);
    // 4 Click on "Insert" button
    I.waitForVisible(businessEntityPage.buttons.insertButtonDataForms, constants.SHORT_WAIT);
    I.click(businessEntityPage.buttons.insertButtonDataForms);
    // 5 Fill in Name with any value and then click on "Save and Close"
    I.waitForVisible(formPage.labels.nameLabel, constants.SHORT_WAIT);
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entityNameField, name);
    I.pressKey(constants.KEY_ENTER);
    commonActions.saveAndCloseAction();
    // 6 An error message is displayed -> There are already 2 standard forms....
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
    // 7 Check "Go back"
    I.click(commonPage.buttons.goBackButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  async tryToDeleteDataFormEntryDDR(record, errorMessage) {
    // 8 Check "default" form and click on delete button
    I.waitForVisible(businessEntityPage.link.dataFormsLink, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.dataFormsLink);
    await commonActions.selectCheckboxOfaRow(record);
    I.click(businessEntityPage.buttons.deleteDataFormsButtons);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // 9 An error message is displayed -> You are not able to delete the default form
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
  },

  accessDataFormRecordDDR(record, checkbox, infoMessage) {
    // 10 Open "new" form
    commonActions.doubleClickValueFromTable(businessEntityPage.container.dataFormsTableContainer, record);
    // 11 Check "is default" checkbox -> Check if an info message is displayed
    I.waitForVisible(businessEntityPage.checkbox.isDefaultCheckbox, constants.SHORT_WAIT);
    I.click(businessEntityPage.checkbox.isDefaultCheckbox);
    commonVerify.verifyToastMessage(commonPage.messagePopup.infoMessage,
        constants.TOAST_STAY,
        infoMessage);
    // 12 Check "is default for edit" -> check again if an info message is displayed
    I.click(formPage.checkbox.isDefaultForEdit);
    // 13 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 14 Check if "is default" checkbox is readonly
    commonVerify.verifyCheckboxIsReadOnly(checkbox);
    // 15 Save and Close
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async deleteDataFormRecordDDR(record) {
    // 16 Check "default" form and click on delete button
    I.waitForVisible(businessEntityPage.link.dataFormsLink, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.dataFormsLink);
    await commonActions.selectCheckboxOfaRow(record);
    I.click(businessEntityPage.buttons.deleteDataFormsButtons);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // 17 Verify if your form was deleted
    I.waitForInvisible(locate('td').withText(record).inside(businessEntityPage.container.dataFormsTableContainer), constants.SHORT_WAIT);
    commonVerify.verifyValueDontExistsInTable(businessEntityPage.container.dataFormsTableContainer, record);
  },

  insertNewDataFormRecordDDR(name, errorMessage) {
    // 18 Click again on Insert button
    I.click(businessEntityPage.buttons.insertButtonDataForms);
    // 19 Fill in Name with "new"
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entityNameField, name);
    // 20 Save and Close
    commonActions.saveAndCloseAction();
    // 21 Check if an error message is displayed - Name already exists
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
  },
};
