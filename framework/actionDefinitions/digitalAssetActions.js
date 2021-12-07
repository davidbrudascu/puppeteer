// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
const digitalAssetVerify = require('~actions/digitalAssetVerify');

const I = actor();

module.exports = {
  createDigitalAsset(nameDigitalAsset, code, description) {
    I.waitForVisible(digitalAssetPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.nameInputField, nameDigitalAsset);
    I.fillField(digitalAssetPage.fields.codeInputField, code);
    I.fillField(digitalAssetPage.fields.descriptionInputField, description);
    I.waitForVisible(digitalAssetPage.tabs.dependenciesTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.click(digitalAssetPage.tabs.dependenciesTab.inside(digitalAssetPage.containers.tabContainer));
    this.selectLatestVersionDA();
  },

  skipWelcomeWindow() {
    I.waitForVisible(digitalAssetPage.buttons.skipWelcomeToStudioButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.skipWelcomeToStudioButton);
  },

  selectDigitalTab(tabName) {
    I.waitForVisible(locate('span').withText(tabName).inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.forceClick(locate('span').withText(tabName).inside(digitalAssetPage.containers.tabContainer));
  },

  async migrateDP(dpNameVersion, columnDisplayName) {
    I.waitForVisible(digitalAssetPage.buttons.chooseDPForMigrationLookupButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.chooseDPForMigrationLookupButton);
    await commonActions.searchInTableAfterASpecificColumn(columnDisplayName, dpNameVersion, digitalAssetPage.containers.customizationSetTableContainer);
    I.click(digitalAssetPage.buttons.okButtonDpMigrationLookup);
    I.waitForClickable(digitalAssetPage.buttons.migrateButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.migrateButton);
  },

  setAsContextDigitalAsset() {
    I.waitForVisible(digitalAssetPage.buttons.setAsContextDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.setAsContextDigitalAssetButton);
  },

  lockDigitalAsset(unlocked) {
    I.waitForVisible(digitalAssetPage.fields.statusInputField, constants.SHORT_WAIT);
    I.seeInField(digitalAssetPage.fields.statusInputField, unlocked);
    I.waitForClickable(digitalAssetPage.buttons.lockDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.lockDigitalAssetButton);
    I.waitForVisible(digitalAssetPage.buttons.unlockDigitalAssetButton, constants.SHORT_WAIT);
  },

  accessConfigurationItemsInfoTab() {
    I.waitForVisible(digitalAssetPage.buttons.configurationItemButtonInfoContainer, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.configurationItemButtonInfoContainer);
  },

  // Unlock digital asset and verify lock button is showing
  unlockDigitalAssetSuccess(locked) {
    I.waitForVisible(digitalAssetPage.fields.statusInputField, constants.SHORT_WAIT);
    I.seeInField(digitalAssetPage.fields.statusInputField, locked);
    I.waitForVisible(digitalAssetPage.buttons.unlockDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.unlockDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.unlockDigitalAssetButton);
    I.waitForVisible(digitalAssetPage.buttons.lockDigitalAssetButton, constants.SHORT_WAIT);
  },

  closeDAasContext() {
    I.waitForClickable(digitalAssetPage.buttons.closeDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.closeDigitalAssetButton);
  },

  // Status can be unlocked/locked and state can be false/true
  async accessDigitalAsset(nameDigitalAsset, columnName, status, state) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameDigitalAsset, digitalAssetPage.containers.defaultContainer);
    if (status !== undefined && state !== undefined) {
      I.waitForVisible(locate('td').withText(status), constants.SHORT_WAIT);
      I.waitForVisible(locate('div').withAttr({ 'aria-checked': state }).inside(locate('td').withAttr({ 'aria-colindex': '6' })), constants.SHORT_WAIT);
    }
    commonActions.doubleClickValueFromTable(digitalAssetPage.containers.defaultContainer, nameDigitalAsset);
  },

  branchDigitalAsset(branchDigitalAssetName) {
    I.waitForVisible(digitalAssetPage.buttons.branchDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.branchDigitalAssetButton);
    I.waitForVisible(digitalAssetPage.selector.branchDigitalAssetDropdown, constants.SHORT_WAIT);
    I.click(digitalAssetPage.selector.branchDigitalAssetDropdown);
    I.waitForVisible(locate('div').withText(branchDigitalAssetName).inside(digitalAssetPage.selector.dropdownOption), constants.SHORT_WAIT);
    I.click(locate('div').withText(branchDigitalAssetName).inside(digitalAssetPage.selector.dropdownOption));
    I.waitForClickable(digitalAssetPage.buttons.saveBranchDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.saveBranchDigitalAssetButton);
  },

  selectLatestVersionDA() {
    I.waitForVisible(digitalAssetPage.buttons.minimumPlatformVersionLookupButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.minimumPlatformVersionLookupButton);
    I.waitForVisible(digitalAssetPage.selector.pageTable.inside(digitalAssetPage.containers.minimumPlatformVersionContainer).last(), constants.SHORT_WAIT);
    I.click(digitalAssetPage.selector.pageTable.inside(digitalAssetPage.containers.minimumPlatformVersionContainer).last());
    I.waitForVisible(digitalAssetPage.selector.firstPositionTableRow.inside(digitalAssetPage.containers.minimumPlatformVersionContainer).last(), constants.SHORT_WAIT);
    I.click(digitalAssetPage.selector.firstPositionTableRow.inside(digitalAssetPage.containers.minimumPlatformVersionContainer).last());
    I.click(digitalAssetPage.buttons.okButtonMinimumPlatformVersionLookupContainer);
  },

  async getDAVersion() {
    I.waitForVisible(digitalAssetPage.fields.versionInputField, constants.SHORT_WAIT);
    const version = await I.grabValueFrom(digitalAssetPage.fields.versionInputField);
    return version;
  },

  accessConfigurationItemTab() {
    I.waitForVisible(digitalAssetPage.tabs.configurationItemsTab, constants.SHORT_WAIT);
    I.click(digitalAssetPage.tabs.configurationItemsTab);
  },

  async addDigitalAssetConfigurationItem(columnName, businessEntity, type) {
    I.waitForVisible(digitalAssetPage.buttons.addConfigurationItemButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.addConfigurationItemButton);
    I.waitForVisible(digitalAssetPage.fields.typeCIField, constants.SHORT_WAIT);
    I.click(digitalAssetPage.fields.typeCIField);
    I.waitForVisible(digitalAssetPage.selector.dropdownOption.withText(type), constants.SHORT_WAIT);
    I.click(digitalAssetPage.selector.dropdownOption.withText(type));
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      businessEntity,
      digitalAssetPage.containers.ciDataContainer,
    );
    I.waitForVisible(digitalAssetPage.buttons.insertCIData, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.insertCIData);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  openDigitalAsset() {
    I.waitForClickable(digitalAssetPage.buttons.openDigitalAsset, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.openDigitalAsset);
  },

  insertDigitalAsset() {
    I.waitForClickable(digitalAssetPage.buttons.createNewDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.createNewDigitalAssetButton);
  },

  selectTypeOfCI(whichtab, typeOfCI) {
    commonActions.navigateToFormStep(whichtab);
    I.click(digitalAssetPage.buttons.addConfigurationItemButton);
    I.waitForVisible(digitalAssetPage.selector.locatorForCIItem, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.selector.locatorForCIItem, typeOfCI);
    I.pressKey(constants.KEY_ENTER);
  },

  async fillFieldsForAttributeCI(columnNameAttribute, searchAfterNameAttribute, anchorContainerCI) {
    await commonActions.searchInTableAfterASpecificColumn(columnNameAttribute, searchAfterNameAttribute, anchorContainerCI);
  },

  insertCIItems() {
    I.waitForVisible(digitalAssetPage.buttons.insertButtonForCiItems2, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.insertButtonForCiItems2);
  },

  // Select type and a add a configuration item
  async addConfigurationItem(configItemsType, columnName, searchAfter) {
    I.waitForClickable(digitalAssetPage.buttons.addConfigurationItemButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.addConfigurationItemButton);
    I.waitForVisible(digitalAssetPage.fields.searchConfigItemsTypeField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.searchConfigItemsTypeField, configItemsType);
    I.pressKey(constants.KEY_ENTER);
    I.waitForVisible(digitalAssetPage.table.tableConfigItemsDataTypeTable, constants.SHORT_WAIT);
    await commonActions.searchInTableAfterASpecificColumn(columnName, searchAfter, digitalAssetPage.table.tableConfigItemsDataTypeTable);
    I.waitForVisible(digitalAssetPage.buttons.insertNewConfigItemButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.insertNewConfigItemButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async selectMinimumPlatformVersionDA(columnName, version) {
    I.waitForVisible(digitalAssetPage.buttons.minimumPlatformVersionLookupButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.minimumPlatformVersionLookupButton);
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      version,
      digitalAssetPage.containers.minimumPlatformVersionContainer,
    );
    I.click(digitalAssetPage.buttons.okButtonMinimumPlatformVersionLookupContainer);
  },

  deleteDigitalAssetWithOutCI() {
    I.waitForVisible(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  deleteDigitalAssetWithCI(warningMessage) {
    I.waitForVisible(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY, warningMessage);
    I.waitForVisible(commonPage.messagePopup.errorMessage);
    I.click(commonPage.messagePopup.errorMessage);
  },

  unlockDigitalAssetFailed(locked, toastMessage) {
    I.waitForVisible(digitalAssetPage.fields.statusInputField, constants.SHORT_WAIT);
    I.seeInField(digitalAssetPage.fields.statusInputField, locked);
    I.waitForClickable(digitalAssetPage.buttons.unlockDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.unlockDigitalAssetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY, toastMessage);
    I.waitForVisible(commonPage.messagePopup.closeErrorMessage, constants.SHORT_WAIT);
    I.click(commonPage.messagePopup.closeErrorMessage);
  },
  lockDigitalAssetFailed(unlocked, toastMessage) {
    I.waitForVisible(digitalAssetPage.fields.statusInputField, constants.SHORT_WAIT);
    I.seeInField(digitalAssetPage.fields.statusInputField, unlocked);
    I.waitForClickable(digitalAssetPage.buttons.lockDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.lockDigitalAssetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.errorMessage, constants.TOAST_STAY, toastMessage);
    I.waitForVisible(commonPage.messagePopup.closeErrorMessage, constants.SHORT_WAIT);
    I.click(commonPage.messagePopup.closeErrorMessage);
  },

  async deleteCI(columnName, entityName) {
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      entityName,
      digitalAssetPage.containers.ciContainer,
    );
    I.waitForVisible(digitalAssetPage.buttons.removeConfigurationItemButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.removeConfigurationItemButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  editBusinessEntityWithCI(newValue) {
    I.waitForVisible(digitalAssetPage.fields.displayNameBusinessEntityWithDA, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.displayNameBusinessEntityWithDA, newValue);
  },

  async deleteBusinessEntityWithCI(columnName, nameEntity) {
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      nameEntity,
      commonPage.container.containerContent,
    );
    I.waitForVisible(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  async insertDependenciesForDigitalAsset(columnName, searchAfter, anchorContainer) {
    I.waitForVisible(digitalAssetPage.buttons.insertButtonDependenciesForDigitalAsset, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.insertButtonDependenciesForDigitalAsset);
    I.waitForVisible(digitalAssetPage.buttons.buttonForReferencedDigitalAsset, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.buttonForReferencedDigitalAsset);
    await commonActions.searchInTableAfterASpecificColumn(columnName, searchAfter, anchorContainer);
    I.waitForClickable(digitalAssetPage.buttons.okButtonForReferencedDigitalAsset, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.okButtonForReferencedDigitalAsset);
    I.click(commonPage.buttons.saveAndCloseButton);
  },

  async editDataImportTemplate(columnNameDataImportTemplate, dataImportFiles, newType, newDataImportTemplate, okButton, columnName, container, pathToFile, fileName, errorMessageForImportTwoFiles, insertDataImportTemplate, digitalAssetAccess, dataImportForEdit) {
    I.doubleClick(digitalAssetAccess);
    I.click(digitalAssetAccess);
    // set context
    I.waitForVisible(digitalAssetPage.buttons.setAsContextDigitalAssetButton, constants.SHORT_WAIT);
    I.forceClick(digitalAssetPage.buttons.setAsContextDigitalAssetButton);
    // go Data Import Files
    I.waitForVisible(digitalAssetPage.tabs.dataImportFilesTab, constants.SHORT_WAIT);
    I.click(digitalAssetPage.tabs.dataImportFilesTab);
    // chose data import for edit
    await commonActions.searchInTableAfterASpecificColumn(
      columnNameDataImportTemplate,
      dataImportFiles,
      digitalAssetPage.containers.dataImportFilesContainer,
    );
    I.doubleClick(dataImportForEdit);
    I.click(dataImportForEdit);
    // change type for data import
    I.waitForVisible(digitalAssetPage.containers.typeDataImportContainer, constants.SHORT_WAIT);
    I.click(digitalAssetPage.containers.typeDataImportContainer);
    I.waitForVisible(newType, constants.SHORT_WAIT);
    I.click(newType);
    // change data import template
    I.waitForVisible(insertDataImportTemplate, constants.SHORT_WAIT);
    I.click(insertDataImportTemplate);
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      newDataImportTemplate,
      container,
    );
    I.waitForVisible(okButton, constants.SHORT_WAIT);
    I.click(okButton);
    // import file without deleting the current one
    I.waitForElement(digitalAssetPage.selector.addDataImportTemplateFile, constants.SHORT_WAIT);
    I.attachFile(digitalAssetPage.selector.addDataImportTemplateFile, pathToFile);
    commonVerify.verifyToastMessage(
      commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessageForImportTwoFiles,
    );
    // change file
    I.waitForVisible(digitalAssetPage.buttons.closeImportedFileButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.closeImportedFileButton);
    I.waitForElement(digitalAssetPage.selector.addDataImportTemplateFile, constants.SHORT_WAIT);
    I.attachFile(digitalAssetPage.selector.addDataImportTemplateFile, pathToFile);
    I.waitForElement(locate('a').withText(fileName), constants.SHORT_WAIT);
  },

  async deleteDataConfigDefinition(columnName, dataConfigDefinition) {
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      dataConfigDefinition,
      digitalAssetPage.containers.dataImportFilesContainer,
    );
    I.waitForVisible(digitalAssetPage.buttons.deleteDataImportFilesButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.deleteDataImportFilesButton);
    I.waitForVisible(digitalAssetPage.buttons.cancelButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.cancelButton);
    I.waitForVisible(digitalAssetPage.buttons.deleteDataImportFilesButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.deleteDataImportFilesButton);
    I.waitForVisible(digitalAssetPage.buttons.yesButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.yesButton);
  },

  async addDataImportTemplates(errorMessage, columnName, nameData, pathToFile, fileName, type, errorMessageWrongFile, pathToWrongFile, dataImport, container, okButton, pathToWrongData, errorMessageWrongData) {
    I.waitForVisible(digitalAssetPage.buttons.insertDataImportFilesButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.insertDataImportFilesButton);
    // type dropdown verify
    digitalAssetVerify.verifyDropdownForTypeDataImport();
    // verify none assignment
    I.click(digitalAssetPage.fields.noneDataImportField);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(
      commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessage,
    );
    commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      errorMessage,
    );
    // assign the correct type
    I.waitForVisible(digitalAssetPage.containers.typeDataImportContainer, constants.SHORT_WAIT);
    I.click(digitalAssetPage.containers.typeDataImportContainer);
    I.waitForVisible(type, constants.SHORT_WAIT);
    I.click(type);
    // choose data import template
    I.waitForVisible(dataImport, constants.SHORT_WAIT);
    I.click(dataImport);
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      nameData,
      container,
    );
    I.waitForVisible(okButton, constants.SHORT_WAIT);
    I.click(okButton);
    // import wrong file
    I.waitForElement(digitalAssetPage.selector.addDataImportTemplateFile, constants.SHORT_WAIT);
    I.attachFile(digitalAssetPage.selector.addDataImportTemplateFile, pathToWrongFile);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(
      commonPage.messagePopup.errorMessage,
      constants.TOAST_STAY,
      errorMessageWrongFile,
    );
    commonActions.closeToastMessage(
      commonPage.messagePopup.errorMessage,
      errorMessageWrongFile,
    );
    I.waitForVisible(digitalAssetPage.buttons.closeImportedFileButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.closeImportedFileButton);
    // wrong data in xml for data config definition
    if (nameData === 'AT_DataConfigDefinition') {
      I.waitForElement(digitalAssetPage.selector.addDataImportTemplateFile, constants.SHORT_WAIT);
      I.attachFile(digitalAssetPage.selector.addDataImportTemplateFile, pathToWrongData);
      commonActions.saveAndCloseAction();
      commonVerify.verifyToastMessage(
        commonPage.messagePopup.errorMessage,
        constants.TOAST_STAY,
        errorMessageWrongData,
      );
      commonActions.closeToastMessage(
        commonPage.messagePopup.errorMessage,
        errorMessageWrongData,
      );
      I.waitForVisible(digitalAssetPage.buttons.closeImportedFileButton, constants.SHORT_WAIT);
      I.click(digitalAssetPage.buttons.closeImportedFileButton);
    }
    // import file
    I.waitForElement(digitalAssetPage.selector.addDataImportTemplateFile, constants.SHORT_WAIT);
    I.attachFile(digitalAssetPage.selector.addDataImportTemplateFile, pathToFile);
    // Wait until it is attached
    I.waitForElement(locate('a').withText(fileName), constants.SHORT_WAIT);
  },

  async openDA(nameDA, columnName) {
    I.waitForClickable(digitalAssetPage.buttons.openDigitalAsset, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.openDigitalAsset);
    await commonActions.searchInTableAfterASpecificColumn(
      columnName,
      nameDA,
      digitalAssetPage.containers.defaultContainer,
    );
    I.doubleClick(locate('td').withText(nameDA).inside(digitalAssetPage.containers.searchDAContainer));
    I.click(locate('td').withText(nameDA).inside(digitalAssetPage.containers.searchDAContainer));
  },

  accessEntityLinkToDACodeEditor(nameDA, entity) {
    I.waitForVisible(locate('li').withAttr({ 'aria-label': nameDA }), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })));
    I.waitForVisible(digitalAssetPage.selector.entitiesCodeEditorOption, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(digitalAssetPage.selector.entitiesCodeEditorOption), constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(digitalAssetPage.selector.entitiesCodeEditorOption));
    I.waitForVisible(digitalAssetPage.selector.thirdLevelCodeEditorOption.withAttr({ 'aria-label': entity }), constants.SHORT_WAIT);
    I.click(digitalAssetPage.selector.thirdLevelCodeEditorOption.withAttr({ 'aria-label': entity }));
  },

  deleteReferenceDigitalAsset() {
    I.waitForVisible(digitalAssetPage.buttons.deleteReferenceDigitalAsset, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.deleteReferenceDigitalAsset);
    I.click(commonPage.buttons.yesAnswerButton);
    I.dontSee(commonPage.checkbox.selectSingleResultCheckbox);
  },

  filterDigitalAssetCodeEditor(nameDA) {
    I.click(digitalAssetPage.buttons.filterByDigitalAssetButton);
    I.waitForVisible(digitalAssetPage.buttons.deselectAllDigitalAssetsButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.deselectAllDigitalAssetsButton);
    I.click(locate('span').withText(nameDA).inside(digitalAssetPage.selector.filterByOptionsCodeEditor));
    I.click(digitalAssetPage.buttons.filterByDigitalAssetButton);
  },

  filterItemTypeCodeEditor(styleSheets) {
    I.click(digitalAssetPage.buttons.filterByItemTypeButton);
    I.click(digitalAssetPage.buttons.deselectAllItemTypesButton);
    I.click(locate('span').withText(styleSheets).inside(digitalAssetPage.selector.filterByOptionsCodeEditor));
    I.click(digitalAssetPage.buttons.filterByItemTypeButton);
  },

  addStyleSheetCodeEditor(nameDA, styleSheets, nameStyleSheet) {
    I.waitForVisible(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })));
    I.waitForVisible(digitalAssetPage.selector.secondLevelCodeEditorOption.withAttr({ 'aria-label': styleSheets }), constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(digitalAssetPage.selector.secondLevelCodeEditorOption.withAttr({ 'aria-label': styleSheets })));
    I.waitForVisible(digitalAssetPage.buttons.addNewStyleSheetButtonCodeEditor, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.addNewStyleSheetButtonCodeEditor);
    I.waitForVisible(digitalAssetPage.fields.nameInputField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.nameInputField, nameStyleSheet);
    commonActions.saveAndCloseAction();
  },
};
