// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Pages
const commonPage = require('~pages/commonPage');
const viewPage = require('~pages/viewPage');
const userJourneyPage = require('~pages/userJourneyPage');
const businessEntityPage = require('~pages/businessEntityPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const viewActionsVerify = require('~actions/viewActionsVerify');

module.exports = {
  expandAndInsertNewView() {
    I.waitForVisible(viewPage.button.views, constants.SHORT_WAIT);
    I.click(viewPage.button.views);
    within(commonPage.buttons.buttonsTable, () => {
      I.waitForVisible(commonPage.buttons.firstButton, constants.SHORT_WAIT);
      I.click(commonPage.buttons.firstButton);
    });
  },

  selectAndDeleteView() {
    I.click(viewPage.checkbox.secondViewToSelect);
    I.click(commonPage.buttons.secondButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  modifyNameAndMakeDefault(viewName) {
    I.waitForVisible(viewPage.label.viewName, constants.SHORT_WAIT);
    I.fillField(viewPage.field.viewName, viewName);
    I.click(viewPage.checkbox.isDefault);
  },

  addViewDataAndSortForSmoke(sortExpression, viewData) {
    I.waitForInvisible(commonPage.messagePopup.successMessage, constants.SHORT_WAIT);
    I.click(commonPage.buttons.tabStepTwo);
    I.fillField(viewPage.field.data, viewData);
    I.fillField(viewPage.field.dataSort, sortExpression);
  },

  editViewForSmoke(dataPreconditions, viewData, sortExpression) {
    I.click(commonPage.buttons.viewButton);
    I.click(viewPage.checkbox.showViewButton);
    I.click(commonPage.buttons.tabStepTwo);
    I.seeInField(viewPage.field.data, dataPreconditions);
    I.waitForVisible(viewPage.field.data, constants.SHORT_WAIT);
    I.fillField(viewPage.field.data, viewData);
    I.fillField(viewPage.field.dataSort, sortExpression);
    I.click(commonPage.buttons.saveAndCloseButton);
  },

  addEntityViewColumns(viewName, label) {
    I.click(commonPage.buttons.tabStepTwo);
    // "optionSet", "date", "bool", "numeric",
    const attribute = ['lookup', 'text'];
    attribute.forEach((attributeType) => {
      I.waitForVisible(viewPage.button.insertViewColumn, constants.SHORT_WAIT);
      I.click(viewPage.button.insertViewColumn);
      I.waitForVisible(viewPage.button.selectEntityViewInColumn, constants.SHORT_WAIT);
      I.click(viewPage.button.selectEntityViewInColumn);
      I.waitForVisible(viewPage.field.viewSearchField, constants.SHORT_WAIT);
      I.fillField(viewPage.field.viewSearchField, viewName);
      I.click(viewPage.field.viewResultsFirstLine);
      I.click(viewPage.button.ok);
      I.waitForVisible(viewPage.field.attributeName, constants.SHORT_WAIT);
      I.fillField(viewPage.field.attributeName, attributeType);
      I.click(commonPage.buttons.saveAndCloseButton);
    });
    I.click(viewPage.field.labelForFirstAttribute);
    I.fillField(viewPage.field.inputLabel, label);
    I.click(viewPage.checkbox.allowEdit);
    I.click(commonPage.buttons.saveAndRefreshButton);
  },

  insertNewViewInDataViewAndIsDefaultChecked(newViewName, newDisplayName, showDisplayName) {
    // Fill in Name "NewView"
    I.waitForVisible(viewPage.field.inputNameViewField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputNameViewField, newViewName);
    // Fill in DisplayName "Not Displayed"
    I.fillField(viewPage.field.inputDisplayNameViewField, newDisplayName);
    // Check "isDefault"
    I.click(viewPage.checkbox.isDefault);
    if (showDisplayName === 'no') {
      // Don't Show Display Name checkbox
      I.click(viewPage.checkbox.showDisplayNameAsTitleCheckbox);
    }
  },

  createNewDataView(dataViewsTab, insertButton, newViewName, newDisplayName, dataTab, dataName, dataSortExpression) {
    // Expand Data Views
    commonActions.clickExpandAndCollapseSection(dataViewsTab);
    // Click on "insert" button
    commonActions.clickToolbarButton(insertButton);
    // Fill in Name "NewView"
    // Check "isDefault"
    this.insertNewViewInDataViewAndIsDefaultChecked(newViewName, newDisplayName);
    // Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Go to "data" section
    commonActions.navigateToFormStep(dataTab);
    // Fill in Data with: Name,Age
    I.waitForVisible(viewPage.field.dataNameTextAreaField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.dataNameTextAreaField, dataName);
    // Fill in Sort Expression: Age*desc
    I.fillField(viewPage.field.dataSortExpressionField, dataSortExpression);
  },

  createNewColumnsView(dataViewsTab, newViewName, newDisplayName, showDisplayName,
    dataTab, nameName, labelProductName, nameCode, labelProductCode, nameValue, labelProductValue) {
    // Expand Data Views
    commonActions.clickExpandAndCollapseSection(dataViewsTab);
    // Click on "insert" button
    I.waitForVisible(viewPage.button.insertDataViewsButton, constants.SHORT_WAIT);
    I.click(viewPage.button.insertDataViewsButton);
    // Fill in Name "NewView"
    // Check "isDefault"
    this.insertNewViewInDataViewAndIsDefaultChecked(newViewName, newDisplayName, showDisplayName);
    // Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Go to "data" section
    commonActions.navigateToFormStep(dataTab);
    // Click on "Insert" button
    I.waitForVisible(viewPage.button.insertViewColumn, constants.SHORT_WAIT);
    I.click(viewPage.button.insertViewColumn);
    // Fill in Attribute Name: Name and in Label: Product Name
    I.waitForVisible(viewPage.field.attributeNameField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.attributeNameField, nameName);
    I.fillField(viewPage.field.attributeLabelField, labelProductName);
    // Save and New
    commonActions.saveAndNewAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Fill in Attribute Name: Code and in Label: Product Code
    I.waitForVisible(viewPage.field.attributeNameField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.attributeNameField, nameCode);
    I.fillField(viewPage.field.attributeLabelField, labelProductCode);
    // Save and New
    commonActions.saveAndNewAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Fill in Attribute Name: Value, Label: Product Value and Check Disabled
    I.waitForVisible(viewPage.field.attributeNameField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.attributeNameField, nameValue);
    I.fillField(viewPage.field.attributeLabelField, labelProductValue);
    I.click(viewPage.checkbox.disableViewColumnCheckbox);
  },

  createNewFetchView(dataViewsTab, insertButton, newViewName, newDisplayName, showDisplayName,
    dataTab, fetchObjectExpressionMonaco, popupDialogYes, crncyCode, currencyCode,
    baseValue, baseName) {
    // 3. Expand Data Views
    commonActions.clickExpandAndCollapseSection(dataViewsTab);
    // 4. Click on "insert" button
    commonActions.clickToolbarButton(insertButton);
    // 5. Fill in Name "NewView
    // 6. Check "isDefault"
    this.insertNewViewInDataViewAndIsDefaultChecked(newViewName, newDisplayName, showDisplayName);
    // 7. Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 8. Go to "data" section
    commonActions.navigateToFormStep(dataTab);
    // 9. Paste the text in Fetch Object Expression (line 31)
    I.waitForVisible(userJourneyPage.fields.fetchObjectExpression, constants.SHORT_WAIT);
    commonActions.fillInCustomMonacoEditor(userJourneyPage.fields.fetchObjectExpression, '0', fetchObjectExpressionMonaco);
    // 10. Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 11. Click on "Generate View Columns" button
    I.click(viewPage.button.generateColumnsButton);
    // 12. Click Yes
    commonActions.clickPopupDialog(popupDialogYes);
    // 13. Update Label for CurrencyCode: set "Crncy Code"
    I.waitForVisible(viewPage.label.currencyNameLabelView, constants.SHORT_WAIT);
    I.click(viewPage.label.currencyNameLabelView);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputNewCurrencyNameField, crncyCode);
    I.click(viewPage.field.entityViewColumnWrapField);
    // 14. Change the order of columns (value,  base.Name, Crncy Code)
    I.scrollTo(locate('td').withText(baseValue));
    I.dragAndDrop(locate('td').withText(crncyCode), locate('td').withText(baseValue));
    I.waitForVisible(locate('td').withText(crncyCode).inside(viewPage.table.thirdElementRowOfTable), constants.SHORT_WAIT);
    I.dragAndDrop(locate('td').withText(baseValue), locate('td').withText(baseName));
    I.waitForVisible(locate('td').withText(baseValue).inside(viewPage.table.firstElementRowOfTable), constants.SHORT_WAIT);
  },

  createNewDisplayOptionView(defaultViewURL, dataTab, codeTab, displayOptionExpressionMonaco, displayOptionsTab) {
    // 4. Access your view (default)
    commonActions.accessDirectUrl(defaultViewURL);
    // 5. Check "ShowViewButton"
    I.waitForVisible(viewPage.checkbox.showViewButton, constants.SHORT_WAIT);
    I.click(viewPage.checkbox.showViewButton);
    // 6. Go to Data secton
    commonActions.navigateToFormStep(dataTab);
    // 7. Check "Allow Editing" for Code
    I.waitForVisible(viewPage.checkbox.allEditingForCode, constants.SHORT_WAIT);
    I.click(viewPage.checkbox.allEditingForCode.last());
    // 8. Save and Reload
    // commonActions.saveAndRefreshAction()
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 9. Go to Code section/Display Options
    commonActions.navigateToFormStep(codeTab);
    I.waitForElement(viewPage.field.codeAfterGenerateEditorLink, constants.SHORT_WAIT);
    I.waitForElement(viewPage.field.waitForDivAfterGenerateJsmonaco, constants.SHORT_WAIT);
    commonActions.clickTabMenuItem(displayOptionsTab);
    I.waitForElement(viewPage.field.waitForDivDisplayOptionsMonaco, constants.SHORT_WAIT);
    // 10. Paste the JSON
    commonActions.fillInCustomMonacoEditor(userJourneyPage.fields.displayOptionsViewField, '1', displayOptionExpressionMonaco);
    I.waitForVisible(viewPage.field.waitForViewDisplayOptionsObject, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.checkoutCodeEditorButton, constants.SHORT_WAIT);
    I.click(viewPage.button.checkoutCodeEditorButton);
    },

  async createAndEditNewRelFormParentView(recordParent1, nameRelationshipTableNoData, attributeName, attributeCode, nameChild1, codeCH1, attributeParent) {
    // 3	Open your record (Parent1) -> edit form is displayed
    commonActions.doubleClickValueFromTable(viewPage.container.defaultEntityContainer, recordParent1);
    // 4	Check if relationship table is displayed and is empty
    // I.waitForVisible(locate('h4').withText('AT_RelFormChild').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameRelationshipTableNoData).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_RelFormChild_AT_RelFormParentId_AT_RelFormParent' })), constants.SHORT_WAIT);
    // 5	Click on "Insert" button -> a new form is displayed
    I.click(viewPage.button.insertNewRelFormParentViewButton);
    // 6	Check the form (title Name: INSERT REL FORM and Attributes: Name and Code)
    // I.waitForVisible(locate('h4').withText('Insert REL Form').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    // 7	Fill in Name with Child1
    I.fillField(viewPage.field.inputNNameViewField, nameChild1);
    // 8	Fill in Code with CH1
    I.fillField(viewPage.field.inputCodeViewField, codeCH1);
    // 9	Save and Reload -> a new form is displayed
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 10	Check the form (title Name: REL FORM and Attributes: Name, Code and Parent)
    // I.waitForVisible(locate('h4').withText('Edit Form').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    // I.waitForVisible(locate('div').withText(attributeParent).withAttr({ 'data-label-for': 'ebsContainerContent_AT_RelFormParentId' }), constants.SHORT_WAIT);
    // 11	Check if Parent is: Parent1, Name: Child1 and Code CH1
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputNNameViewField, nameChild1);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputCodeViewField, codeCH1);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputParentViewField, recordParent1);
    // 12	Click "Go Back" icon
    commonActions.goBackToPreviousPage();
    // 13	Access again "Child1"
    I.waitForVisible(locate('td').withText(nameChild1).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_RelFormChild_AT_RelFormParentId_AT_RelFormParent' })), constants.SHORT_WAIT);
    I.click(locate('td').withText(nameChild1).inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    commonActions.doubleClickValueFromTable(viewPage.container.defaultEntityContainer, nameChild1);
    // 14	Check the form (title Name: REL FORM and Attributes: Name, Code and Parent)
    // I.waitForVisible(locate('h4').withText('AT_RelFormParent').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeParent).withAttr({ 'data-label-for': 'ebsContainerContent_AT_RelFormParentId' }), constants.SHORT_WAIT);
  },

  async insertNewRelFormChildView(toolbarButtonInsert, nameChild0, value1000, descriptionDescAuto, attributeName, attributeCode, attributeValue, codeEmpty) {
    // 16	Click on Insert (Check form title: Default)
    commonActions.clickSidebarButton(toolbarButtonInsert);
    // I.waitForVisible(locate('h4').withText('Default').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    // 17	Fill in the following fields (Name: Child0, Value: 1000, Description: Desc Auto)
    I.waitForVisible(viewPage.field.inputNNameViewField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputNNameViewField, nameChild0);
    I.fillField(viewPage.field.inputValueViewField, value1000);
    I.fillField(viewPage.field.inputDescriptionViewField, descriptionDescAuto);
    // 18	Save and Reload -> a new form is displayed
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 19	Check the form (title Name: Edit FORM and Attributes: Name, Code and Value)
    // I.waitForVisible(locate('h4').withText('Edit Form').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeValue).withAttr({ 'data-label-for': 'ebsContainerContent_Value' }), constants.SHORT_WAIT);
    // 20	Check Name: Child2
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputNNameViewField, nameChild0);
    // 21	Check Value: 1000
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputValueViewField, value1000);
    // 22 Check Code: empty
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputCodeViewField, codeEmpty);
  },

  async insertInsertExistingRelationship(nameRelationshipTable, nameRelationshipTableNoData, relationshipName, attributeName, attributeCode, attributeValue, nameInsInsertAttribute,
    valueOfCodePR1, valueOfValue100, valueOfProd1, formNameRelationForm, entity_AT_InsIns1_Name, entryNameAutoTestInsIns1) {
    // 4	Check if relationship table "AT_InsIns2" is displayed and is empty
    I.waitForVisible(locate('h4').withText(nameRelationshipTable).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameRelationshipTableNoData).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2' })), constants.SHORT_WAIT);
    // 5. Click on "Insert existing" button -> A new window is opened
    commonActions.clickButtonAfterLocator(
      commonPage.buttons.insertExistingButton_AT_InsIns1_AT_InsIns2_Relationship,
    );
    // 6. Check if the table is empty
    I.waitForVisible(locate('span').withText(nameRelationshipTableNoData).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2_manyPopup_lookupgrid' })), constants.SHORT_WAIT);
    // 7. Click on "Insert" button -> A new window is displayed
    I.click(viewPage.button.insertNewAT_InsIns1_AT_InsIns2Button);
    I.wait(5);
    I.switchToNextTab();
    I.grabCurrentUrl();
    // 8 Check the form (Name: default and Attributes: Name, Code and Value)
    I.waitForVisible(locate('h4').withText(relationshipName).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(attributeValue).withAttr({ 'data-label-for': 'ebsContainerContent_Value' }), constants.SHORT_WAIT);
    // 9	Fill in (Name: Prod1, Code: PR1, Value: 100)
    I.fillField(viewPage.field.inputNNameViewField, nameInsInsertAttribute);
    I.fillField(viewPage.field.inputCodeViewField, valueOfCodePR1);
    I.fillField(viewPage.field.inputValueViewField, valueOfValue100);
    // 10 Click on "Save and Close" - > Window is closed
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.switchToPreviousTab();
    I.refreshPage();
    commonActions.clickButtonAfterLocator(
      commonPage.buttons.insertExistingButton_AT_InsIns1_AT_InsIns2_Relationship,
    );
    // 11	Added entry is displayed in list
    I.waitForVisible(locate('td').withText(nameInsInsertAttribute).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2_manyPopup_lookupgrid' })), constants.SHORT_WAIT);
    // 12	Select it
    I.click(locate('td').withText(nameInsInsertAttribute).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2_manyPopup_lookupgrid' })));
    // 13	Click "Ok" Button -> window is closed
    I.click(viewPage.button.okPopupButton);
    // 14. Check if the new entries were added in your table
    I.waitForVisible(locate('td').withText(valueOfProd1).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2' })), constants.SHORT_WAIT);
    // 15	Open your record (Prod1) -> RelationForm is displayed
    I.click(locate('td').withText(valueOfProd1).inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    commonActions.doubleClickValueFromTable(viewPage.container.defaultEntityContainer, valueOfProd1);
    // 16	Check the form (FormName: RelationForm and Attributes: Name: Prod1 and Value 100; Code is not displayed)
    I.waitForVisible(locate('h4').withText(formNameRelationForm).inside(locate('div').withAttr({ 'data-template-id': 'entityTitle_1' })), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputNNameViewField, valueOfProd1);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputValueViewField, valueOfValue100);
    // 17	Check if relationship table is displayed
    I.waitForVisible(locate('h4').withText(entity_AT_InsIns1_Name).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    // 18	Check if one entry is displayed in table (Name: AutoTest InsIns1)
    I.waitForVisible(locate('td').withText(entryNameAutoTestInsIns1).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
  },

  deleteAllRecordsFromATableDltRecords(deleteBtn) {
    commonActions.selectAllRecordsFromTable(commonPage.container.containerContent);
    commonActions.clickSidebarButton(deleteBtn);
    commonActions.clickButtonAfterLocator(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyEmptyTableData();
  },

  clickButtonThenPressCancel(button) {
    commonActions.clickSidebarButton(button);
    commonActions.clickButtonAfterLocator(commonPage.buttons.cancelAnswerButton);
  },

  clickButtonThenPressYes(button) {
    commonActions.clickSidebarButton(button);
    commonActions.clickButtonAfterLocator(commonPage.buttons.yesAnswerButton);
  },

  // Select 2 records and try to delete them
  async tryToDelete2Records(firstRecord, secondRecord, firstRow, secondRow, deleteButton) {
    // 3	Navigate to 3rd page
    commonActions.clickButtonAfterLocator(viewPage.button.page3Button);
    // 4	Check both records "Record121" and "Record122"
    await commonActions.selectCheckboxOfaRow(firstRecord);
    await commonActions.selectCheckboxOfaRow(secondRecord);
    // 5	Click on "Delete icon" -> Click Cancel
    this.clickButtonThenPressCancel(deleteButton);
    // 6	Verify if records are still displayed
    viewActionsVerify.verify2ValuesDoesExistInTableDltRecords(firstRecord, secondRecord);
    // 7	Verify if checkbox are still selected
    viewActionsVerify.verifyIf2CheckboxesAreSelected(firstRow, secondRow);
    // 8	Click again on "Delete icon" -> Click Yes
    this.clickButtonThenPressYes(deleteButton);
    // 9	Verify if your records were deleted
    viewActionsVerify.verify2ValuesDoesntExistInTableDltRecords(firstRecord, secondRecord);
  },

  // Delete 1 records
  async delete1Record(recordName, recordRow, nextRecord, deleteButton) {
    // 11	Check "Record111"
    await commonActions.selectCheckboxOfaRow(recordName);
    // 12	Click on "Delete icon" -> Click Ok
    this.clickButtonThenPressYes(deleteButton);
    // 13	Verify if your record was deleted
    commonVerify.verifyValueDontExistsInTable(commonPage.container.containerContent, recordName);
    // 14	Verify if 1st record is "Record112"
    await commonVerify.verifyFirstRecordOfATableAfterText(commonPage.container.containerContent, nextRecord);
  },

  // Select pages and verify first and last records on that page
  async selectPageAndVerifyContent(firstPage, firstRecord, secondRecord, thirdRecord, fourthRecord, fifthRecord) {
    // 6	Click on 5th page -> verify if 5th page is selected
    commonActions.clickButtonAfterLocator(viewPage.button.page5Button);
    viewActionsVerify.verifySelectedPage(firstPage);
    // 7	Verify if 1st record is "Record141"
    await commonVerify.verifyFirstRecordOfATableAfterText(commonPage.container.containerContent, firstRecord);
    // 8	Verify if latest record is "Record150"
    await commonVerify.verifyLastRecordOfATableAfterText(commonPage.container.containerContent, secondRecord);
    // 9	Verify if "1", "...", "3", "4", "5", "6" and "..." pages are available/ displayed
    viewActionsVerify.verifyPagesAndSeparatorAreDisplayedPagination();
    // 10	Click on "20" option
    commonActions.clickButtonAfterLocator(viewPage.button.pageSize20Button);
    // 11	Verify if 1st record is "Record181"
    await commonVerify.verifyFirstRecordOfATableAfterText(commonPage.container.containerContent, thirdRecord);
    // 12	Verify if latest record is "Record200"
    await commonVerify.verifyLastRecordOfATableAfterText(commonPage.container.containerContent, fourthRecord);
    // 13	Verify if all 7 pages are displayed
    viewActionsVerify.verifyFirst7PageNumbersAreDisplayed();
    // 14	Click on 7th page
    commonActions.clickButtonAfterLocator(viewPage.button.page7Button);
    // 15	Verify if "Record221" is displayed;
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, fifthRecord);
  },

  // Select page size option and check if records in table are displayed correctly
  async selectPageSizeAndVerifyContent(firstRecord, secondRecord, thirdRecord, fourthRecord, fifthRecord, sixthRecord, seventhRecord, page, pageSize) {
    // 16	Click on "5" option
    commonActions.clickButtonAfterLocator(viewPage.button.pageSize5Button);
    // 17	Verify if only 5 records/page are displayed
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, firstRecord);
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, secondRecord);
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, thirdRecord);
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, fourthRecord);
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, fifthRecord);
    // 18	Verify if 1st record is "Record131"
    await commonVerify.verifyFirstRecordOfATableAfterText(commonPage.container.containerContent, firstRecord);
    // 19	Verify if latest record is "Record 135"
    await commonVerify.verifyLastRecordOfATableAfterText(commonPage.container.containerContent, fifthRecord);
    // 20	Verify if "1", "...", "6", "7", "8", "9" and "..." pages are available/ displayed
    viewActionsVerify.verifyCertainPagesAndSeparatorAreDisplayedPagination();
    // 21	Click on 1st page
    commonActions.clickButtonAfterLocator(viewPage.button.page1Button);
    // 22	Verify if 1st record is "Record101"
    await commonVerify.verifyFirstRecordOfATableAfterText(commonPage.container.containerContent, sixthRecord);
    // 23	Verify if latest record is "Record 105"
    await commonVerify.verifyLastRecordOfATableAfterText(commonPage.container.containerContent, seventhRecord);
    // 24	Verify if 1st page is selected
    viewActionsVerify.verifySelectedPage(page);
    // 25	Verify if "5" option is selected
    I.waitForVisible(locate('div').withAttr({ 'aria-label': `Display ${pageSize} items on page` }).withAttr({ class: 'dx-page-size dx-selection' }), constants.SHORT_WAIT);
  },

  async deleteDataViewRecordDDRV(firstRecord, secondRecord, firstRow, secondRow, errorMessage) {
    // 3 Expand Data Views
    I.waitForVisible(businessEntityPage.link.dataViewsLink, constants.SHORT_WAIT);
    I.click(businessEntityPage.link.dataViewsLink);
    // 4 Check "noDelete" view and click on "delete -> error message is displayed "you are not able to delete default view"
    await commonActions.selectCheckboxOfaRow(firstRecord);
    I.click(businessEntityPage.buttons.deleteDataViewButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessage,
    );
    // 5 Check "delete" view and click on "delete" -> your view was deleted
    await commonActions.selectCheckboxOfaRow(secondRecord);
    I.click(businessEntityPage.buttons.deleteDataViewButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyValueDontExistsInTable(businessEntityPage.container.dataViewsTableContainer, secondRecord);
  },

  insertDataViewRecordDDR(firstName, secondName, checkbox, errorMessage) {
    // 6 Click on "Insert" button
    I.click(businessEntityPage.buttons.insertDataViewButton);
    // 7 Fill in name with "noDelete"
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entityNameField, firstName);
    // 8 Click save and reload -> error message is displayed "delete view already exists"
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage);
    // 9 Fill in name with "new"
    I.waitForVisible(businessEntityPage.fields.entityNameField, constants.SHORT_WAIT);
    I.fillField(businessEntityPage.fields.entityNameField, secondName);
    // 10 Check "is default" -> an info message is displayed
    I.click(viewPage.checkbox.isDefault);
    I.waitForVisible(viewPage.popup.isDefaultPopup, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.popup.isDefaultPopup, constants.SHORT_WAIT);
    // 11 Click on "save and reload"
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 12 Check if default checkbox is read only
    commonVerify.verifyCheckboxIsReadOnly(checkbox);
  },

  addNewFetchDesigner(
    entityAT_CreateViewFetch,
    aliasName,
    firstEntity,
    secondEntity,
    thirdEntity,
    fourthEntity,
    fifthEntity,
    sixthEntity,
    currencyCode,
    andCondition,
    baseAT_CreateViewFetchEntity,
    currencyAttribute,
    operand,
    codeEuro,
  ) {
    I.waitForVisible(viewPage.button.checkOutButton, constants.SHORT_WAIT);
    I.waitForClickable(viewPage.button.checkOutButton, constants.SHORT_WAIT)
    I.forceClick(viewPage.button.checkOutButton);
    I.waitForElement(viewPage.button.fetchDesignerButton, constants.SHORT_WAIT);
    I.waitForClickable(viewPage.button.fetchDesignerButton, constants.SHORT_WAIT);
    I.click(viewPage.button.fetchDesignerButton);
    I.waitForVisible(viewPage.button.baseEntityButton, constants.SHORT_WAIT);
    I.waitForClickable(viewPage.button.baseEntityButton, constants.SHORT_WAIT);
    I.click(viewPage.button.baseEntityButton);
    I.fillField(viewPage.field.inputBaseEntityField, entityAT_CreateViewFetch);
    I.waitForVisible(viewPage.field.baseAT_CreateViewFetchField, constants.SHORT_WAIT);
    I.pressKey('Enter');
    I.waitForVisible(viewPage.button.baseEntityAttrButton, constants.SHORT_WAIT);
    I.click(viewPage.button.baseEntityAttrButton);
    // 4	Select your entity "AT_CreateViewFetch"
    // 5	Click on "attribute list" button -> a new window is displayed
    // 6	Check "Name" and set Alias "name"
    I.waitForVisible(viewPage.checkbox.nameCheckbox, constants.SHORT_WAIT);
    I.click(viewPage.checkbox.nameCheckbox);
    I.fillField(viewPage.field.inputTextNameField, aliasName);
    // 7	Click Ok  -> attribute window is closed
    I.waitForVisible(viewPage.button.okAttributePopupButton, constants.SHORT_WAIT);
    I.click(viewPage.button.okAttributePopupButton);
    // 8	Click on 2nd drop-down list -> List is opened
    I.waitForVisible(viewPage.selector.selectSecondAttributeDDPopup, constants.SHORT_WAIT);
    I.click(viewPage.selector.selectSecondAttributeDDPopup);
    I.waitForVisible(locate('div').withText(firstEntity), constants.SHORT_WAIT);
    I.waitForElement(locate('div').withText(secondEntity), constants.SHORT_WAIT);
    I.waitForElement(locate('div').withText(thirdEntity), constants.SHORT_WAIT);
    I.waitForElement(locate('div').withText(fourthEntity), constants.SHORT_WAIT);
    I.waitForElement(locate('div').withText(fifthEntity), constants.SHORT_WAIT);
    I.waitForElement(locate('div').withText(sixthEntity), constants.SHORT_WAIT);
    // 9	"Verify if there are 6 enties displayed
    // Business Unit - Business Unit
    // Created by user - System User
    // Currency - AT_CreateFetchViewCrncy
    // Modified by user - System User
    // Status - Status
    // User - System User"
    // 10	Select Currency
    I.fillField(viewPage.field.inputEntityField, thirdEntity);
    I.pressKey('Enter');
    I.waitForVisible(viewPage.button.secondAttributeButton, constants.SHORT_WAIT);
    I.click(viewPage.button.secondAttributeButton);
    // 11	Click on the 2nd "attribute list" button
    I.waitForVisible(viewPage.checkbox.codeCheckbox, constants.SHORT_WAIT);
    I.click(viewPage.checkbox.codeCheckbox);
    I.fillField(viewPage.field.inputTextCodeField, currencyCode);
    // 12	Check "Code" and add an alias "CurrencyCode"
    // 13	Click on "Ok"
    I.waitForVisible(viewPage.button.okAttributePopupButton, constants.SHORT_WAIT);
    I.click(viewPage.button.okAttributePopupButton);
    // 14	Open Conditions list and select "And"
    I.fillField(viewPage.field.inputConditionField, andCondition);
    I.pressKey('Enter');
    I.waitForVisible(viewPage.button.thirdAttributeButton, constants.SHORT_WAIT);
    I.click(viewPage.button.thirdAttributeButton);
    I.waitForVisible(locate('div').withText(baseAT_CreateViewFetchEntity), constants.SHORT_WAIT);
    I.waitForElement(locate('div').withText(thirdEntity), constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputEntityCNDField, baseAT_CreateViewFetchEntity);
    I.pressKey('Enter');
    I.fillField(viewPage.field.inputAttributeCNDField, currencyAttribute);
    I.pressKey('Enter');
    // 15	Open Entity list - Check if 2 enties are displayed
    // 16	Select "AT_CreateViewFetch"
    // 17	Select Attribute: "Currency"
    I.fillField(viewPage.field.inputOperandField, operand);
    I.pressKey('Enter');
    I.waitForVisible(viewPage.button.selectCurrencyButton, constants.SHORT_WAIT);
    I.click(viewPage.button.selectCurrencyButton);
    commonActions.fillInDropdownLookupTableWithValue(viewPage.table.currencyPopupTable, codeEuro);
    // 18	Select Operand: "Equals"
    // 19	Select value: "Euro"
    // 20	Click on "Ok" button
    I.click(viewPage.button.okCurrencyButton);
    I.waitForInvisible(viewPage.button.okCurrencyButton, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.okPopupAddButton, constants.SHORT_WAIT);
    I.click(viewPage.button.okPopupAddButton);
  },

  generateNewColumns(popupDialogYes, currencyCode, nameColumn){
    I.click(viewPage.button.generateColumnsButton);
    // 12. Click Yes
    commonActions.clickPopupDialog(popupDialogYes);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 23	Verify columns order :CurrencyCode, name
    // 24	Click Yes
    I.scrollTo(locate('td').withText(currencyCode).inside(viewPage.table.firstElementRowOfTable).inside(viewPage.table.entityViewTable));
    I.waitForVisible(locate('td').withText(currencyCode).inside(viewPage.table.firstElementRowOfTable).inside(viewPage.table.entityViewTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameColumn).inside(viewPage.table.secondElementRowOfTable).inside(viewPage.table.entityViewTable), constants.SHORT_WAIT);
  },

  async accessDataFromDefaultDataView(entityName, columnName, defaultView, viewNameColumn, dataViewCode){
    // search and select one entity
    await commonActions.searchInTableAfterASpecificColumn(columnName, entityName, businessEntityPage.container.businessEntityContainer);
    I.doubleClick(businessEntityPage.fields.recordEntityEditScriptField);
    I.doubleClick(businessEntityPage.fields.recordEntityEditScriptField);
    // search and select the default data view
    I.waitForVisible(viewPage.button.views, constants.SHORT_WAIT);
    I.click(viewPage.button.views);
    await commonActions.searchInTableAfterASpecificColumn(viewNameColumn, defaultView, viewPage.table.dataViewTable);
    I.click(viewPage.field.recordDataViewEitScript);
    I.doubleClick(viewPage.field.recordDataViewEitScript);
    I.doubleClick(viewPage.field.recordDataViewEitScript);
    // select Data tab
    commonActions.refreshPage();
    I.waitForVisible(viewPage.button.dataButton, constants.SHORT_WAIT);
    I.forceClick(viewPage.button.dataButton);
    // press the check out button and fill the fetch object expression with the given code
    I.waitForVisible(viewPage.button.checkOutButton, constants.SHORT_WAIT);
    I.click(viewPage.button.checkOutButton);
    I.waitForVisible(viewPage.field.fetchObjectExpression);
    I.click(viewPage.field.fetchObjectExpression);
    I.fillField(viewPage.field.fetchObjectExpression, dataViewCode);
  }
};
