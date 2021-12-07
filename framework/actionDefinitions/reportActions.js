// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const reportPage = require('~pages/reportPage');

const I = actor();

module.exports = {
  // Create a report Entity Document
  createReportEntityDocument(clickToInsert, reportNameField, reportDisplayNameField, entityCreateDoc, reportFieldName, reportFileName) {
    commonActions.clickSidebarButton(clickToInsert);
    // Click on Insert button.
    // Fill out Name field:
    // Fill out Display Name field:
    I.waitForVisible(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportNameField);
    I.fillField(reportPage.fields.reportDisplayNameField, reportDisplayNameField);
    // Select Scope: 'Entity'
    I.waitForVisible(reportPage.buttons.selectScopeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectScopeBtn);
    I.waitForVisible(reportPage.selector.selectScopeEntityDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectScopeEntityDD);
    // Select Type: 'Document'
    I.waitForVisible(reportPage.buttons.selectTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectTypeBtn);
    I.waitForVisible(reportPage.selector.selectTypeDocumentDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectTypeDocumentDD);
    // 	Click on Entity lookup button
    I.waitForVisible(reportPage.buttons.searchForEntityDDBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.searchForEntityDDBtn);
    commonActions.fillInDropdownLookupTableWithValue(reportPage.container.entityDDContainer, entityCreateDoc);
    I.waitForVisible(reportPage.buttons.okPopupEntityLkpBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.okPopupEntityLkpBtn);
    I.waitForInvisible(reportPage.buttons.okPopupEntityLkpBtn, constants.SHORT_WAIT);
    // 	Select 'Output Method' = Attach to entity
    I.waitForClickable(reportPage.buttons.selectOutputMethodBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectOutputMethodBtn);
    I.waitForVisible(reportPage.selector.selectOutputAttachEntityDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectOutputAttachEntityDD);
    // 	Fill 'Destination Field'
    I.waitForVisible(reportPage.fields.destinationField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.destinationField, reportFieldName);
    I.fillField(reportPage.fields.destinationFileNameField, reportFileName);
    // 	Fill 'Destination File Name'
    // 	Select 'Report Document Type' = PDF
    I.waitForVisible(reportPage.buttons.selectReportTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectReportTypeBtn);
    I.waitForVisible(reportPage.selector.selectReportDocumentTypeDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectReportDocumentTypeDD);
    // 	Click on Save & Refresh button.
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  // add a new report Items
  addReportItems(reportStartDate, reportEndDate, reportDocumentName, reportItemDocumentName) {
    // 	Scroll to Report Items and click on Insert button.
    I.scrollTo(reportPage.container.reportItemWrapContainer);
    I.waitForVisible(reportPage.fields.noDataReportItemField, constants.SHORT_WAIT);
    I.waitForVisible(reportPage.buttons.insertNewReportItemBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.insertNewReportItemBtn);
    I.waitForVisible(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.click(reportPage.fields.reportStartDateField);
    I.fillField(reportPage.fields.reportStartDateField, reportStartDate);
    I.fillField(reportPage.fields.reportEndDateField, reportEndDate);
    // 	Click on Report Document lookup button
    I.waitForClickable(reportPage.buttons.reportDocumentLkpBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.reportDocumentLkpBtn);
    commonActions.fillInDropdownLookupTableWithValue(reportPage.container.documentReportLkpContainer, reportDocumentName);
    I.waitForVisible(reportPage.buttons.okDocumentReportPopupBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.okDocumentReportPopupBtn);
    I.waitForInvisible(reportPage.buttons.okDocumentReportPopupBtn, constants.SHORT_WAIT);
    // 	Search and select from list:
    I.waitForClickable(reportPage.checkbox.isDefaultCheckbox, constants.SHORT_WAIT);
    I.click(reportPage.checkbox.isDefaultCheckbox);
    I.waitForClickable(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportItemDocumentName);
  },

  // create a custom entity report
  createReportEntityCustom(
    clickToInsert,
    reportNameField,
    reportDisplayNameField,
    entityCreateDoc,
    reportFieldName,
    reportFileName,
  ) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportNameField);
    I.fillField(reportPage.fields.reportDisplayNameField, reportDisplayNameField);
    // 	Select Scope: 'Entity'
    I.waitForVisible(reportPage.buttons.selectScopeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectScopeBtn);
    I.waitForVisible(reportPage.selector.selectScopeEntityDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectScopeEntityDD);
    //	Select Type: 'Custom Report'
    I.waitForVisible(reportPage.buttons.selectTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectTypeBtn);
    I.waitForVisible(reportPage.selector.selectTypeCustomReportDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectTypeCustomReportDD);
    I.waitForVisible(reportPage.buttons.searchForEntityDDBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.searchForEntityDDBtn);
    commonActions.fillInDropdownLookupTableWithValue(reportPage.container.entityDDContainer, entityCreateDoc);
    I.waitForVisible(reportPage.buttons.okPopupEntityLkpBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.okPopupEntityLkpBtn);
    I.waitForInvisible(reportPage.buttons.okPopupEntityLkpBtn, constants.SHORT_WAIT);
    // 	Select 'Output Method' = Attach to entity
    I.waitForClickable(reportPage.buttons.selectOutputMethodBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectOutputMethodBtn);
    I.waitForVisible(reportPage.selector.selectOutputAttachEntityDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectOutputAttachEntityDD);
    //	Fill 'Destination Field'
    //	Fill 'Destination File Name'
    I.waitForVisible(reportPage.fields.destinationField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.destinationField, reportFieldName);
    I.fillField(reportPage.fields.destinationFileNameField, reportFileName);
    // 13	Select 'Report Document Type' = PDF
    I.waitForVisible(reportPage.buttons.selectReportTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectReportTypeBtn);
    I.waitForVisible(reportPage.selector.selectReportDocumentTypeDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectReportDocumentTypeDD);
  },

  // add a custom report items
  addCustomReportItems(reportStartDate, reportEndDate, reportPath, reportItemCustomName) {
    I.scrollTo(reportPage.container.reportItemWrapContainer);
    I.waitForVisible(reportPage.fields.noDataReportItemField, constants.SHORT_WAIT);
    I.waitForVisible(reportPage.buttons.insertNewReportItemBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.insertNewReportItemBtn);
    I.waitForVisible(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.click(reportPage.fields.reportStartDateField);
    I.fillField(reportPage.fields.reportStartDateField, reportStartDate);
    I.fillField(reportPage.fields.reportEndDateField, reportEndDate);
    I.fillField(reportPage.fields.inputReportPathField, reportPath);
    I.waitForClickable(reportPage.checkbox.isDefaultCheckbox, constants.SHORT_WAIT);
    I.click(reportPage.checkbox.isDefaultCheckbox);
    I.waitForClickable(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportItemCustomName);
  },

  // create a general custom report
  createGeneralCustomReport(
    clickToInsert,
    reportNameField,
    reportDisplayNameField,
  ) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportNameField);
    I.fillField(reportPage.fields.reportDisplayNameField, reportDisplayNameField);
    // 	Select Scope: 'General'
    I.waitForVisible(reportPage.buttons.selectScopeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectScopeBtn);
    I.waitForVisible(reportPage.selector.selectScopeGeneralDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectScopeGeneralDD);
    // 	Select Type: 'Custom Report'
    I.waitForVisible(reportPage.buttons.selectTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectTypeBtn);
    I.waitForVisible(reportPage.selector.selectTypeCustomReportDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectTypeCustomReportDD);
  },

  // create a general simple grid report
  createGeneralSimpleGridReport(
    clickToInsert,
    reportNameField,
    reportDisplayNameField,
  ) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportNameField);
    I.fillField(reportPage.fields.reportDisplayNameField, reportDisplayNameField);
    //  Select Scope: 'General'
    I.waitForVisible(reportPage.buttons.selectScopeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectScopeBtn);
    I.waitForVisible(reportPage.selector.selectScopeGeneralDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectScopeGeneralDD);
    // 	Select Type: 'Simple Grid Report'
    I.waitForVisible(reportPage.buttons.selectTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectTypeBtn);
    I.waitForVisible(reportPage.selector.selectTypeSimpleGridReportDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectTypeSimpleGridReportDD);
    // 	Select Report Type: 'On Screen'
    I.waitForVisible(reportPage.buttons.selectReportTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectReportTypeBtn);
    I.waitForVisible(reportPage.selector.selectReportOnScreenTypeDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectReportOnScreenTypeDD);
  },

  // add general simple grid report items
  addGeneralGridReportItems(reportStartDate, reportEndDate, entityDataSource, reportItemGridName) {
    I.scrollTo(reportPage.container.reportItemWrapContainer);
    I.waitForVisible(reportPage.fields.noDataReportItemField, constants.SHORT_WAIT);
    I.waitForVisible(reportPage.buttons.insertNewReportItemBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.insertNewReportItemBtn);
    I.waitForVisible(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.waitForClickable(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.click(reportPage.fields.reportStartDateField);
    I.fillField(reportPage.fields.reportStartDateField, reportStartDate);
    I.fillField(reportPage.fields.reportEndDateField, reportEndDate);
    // 	Click on Data Source lookup button.
    I.waitForClickable(reportPage.buttons.dataSourceLkpBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.dataSourceLkpBtn);
    commonActions.fillInDropdownLookupTableWithValue(reportPage.container.entityDataSourceDDContainer, entityDataSource);
    I.waitForVisible(reportPage.buttons.okDataSourcePopupLkp, constants.SHORT_WAIT);
    I.click(reportPage.buttons.okDataSourcePopupLkp);
    I.waitForInvisible(reportPage.buttons.okDataSourcePopupLkp, constants.SHORT_WAIT);
    // 	Click on IsDefault checkbox.
    I.waitForClickable(reportPage.checkbox.isDefaultCheckbox, constants.SHORT_WAIT);
    I.click(reportPage.checkbox.isDefaultCheckbox);
    I.waitForClickable(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportItemGridName);
  },

  // edit your report item
  editReportItem(reportEndDate, reportStartDate, reportItemEditName) {
    I.waitForVisible(reportPage.container.reportItemWrapContainer, constants.SHORT_WAIT);
    I.scrollTo(reportPage.container.reportItemWrapContainer);
    I.waitForVisible(reportPage.table.firstRecordReportItems, constants.SHORT_WAIT);
    I.doubleClick(reportPage.table.firstRecordReportItems);
    I.click(reportPage.table.firstRecordReportItems);
    //	Scroll to Report Items and click to edit existing item.
    I.waitForVisible(reportPage.labels.editReportItemPageLabel, constants.SHORT_WAIT);
    // 	Change StartDate:
    // 	Change EndDate:
    I.waitForVisible(reportPage.fields.reportStartDateField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportEndDateField, reportEndDate);
    I.fillField(reportPage.fields.reportStartDateField, reportStartDate);
    //	Uncheck IsDefault checkbox.
    I.waitForClickable(reportPage.checkbox.isDefaultCheckbox, constants.SHORT_WAIT);
    I.click(reportPage.checkbox.isDefaultCheckbox);
    I.waitForClickable(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportItemEditName);
  },

  // delete your report item
  deleteReportItems(reportItemEditDelete) {
    I.waitForVisible(locate('td').withText(reportItemEditDelete).inside(reportPage.table.reportItemsContainerTable), constants.SHORT_WAIT);
    I.click(locate('td').withText(reportItemEditDelete).inside(reportPage.table.reportItemsContainerTable));
    // 	Select the Report item record and click on Delete button
    I.click(reportPage.buttons.deleteReportItemsBtn);
    // 	Click Yes to confirm.
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForVisible(reportPage.table.noDataReportItemsTable, constants.SHORT_WAIT);
  },

  // update  report
  updateReport(reportNameFieldUpdated, reportDisplayNameFieldUpdated) {
    I.waitForVisible(reportPage.fields.reportNameField, constants.SHORT_WAIT);
    I.fillField(reportPage.fields.reportNameField, reportNameFieldUpdated);
    I.fillField(reportPage.fields.reportDisplayNameField, reportDisplayNameFieldUpdated);
    I.waitForVisible(reportPage.buttons.selectReportTypeBtn, constants.SHORT_WAIT);
    I.click(reportPage.buttons.selectReportTypeBtn);
    I.waitForVisible(reportPage.selector.selectReportOnScreenTypeDD, constants.SHORT_WAIT);
    I.click(reportPage.selector.selectReportOnScreenTypeDD);
  },

  // delete your report
  deleteReport(reportNameFieldUpdated, clickToDelete) {
    I.waitForVisible(reportPage.labels.reportsListLabel, constants.SHORT_WAIT);
    I.waitForVisible(reportPage.fields.inputSearchReports, constants.SHORT_WAIT);
    I.click(reportPage.fields.inputSearchReports);
    I.fillField(reportPage.fields.inputSearchReports, reportNameFieldUpdated);
    commonActions.selectARowFromTableAfterText(reportNameFieldUpdated);
    // 	Select the report.
    commonActions.clickSidebarButton(clickToDelete);
    // 	Click on Delete button.
    // 	Click Yes to confirm.
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    // 	Check that the report was deleted succesfully.
    commonVerify.verifyEmptyTableData();
  },
};
