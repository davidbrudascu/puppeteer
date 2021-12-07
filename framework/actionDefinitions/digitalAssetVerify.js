// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const digitalAssetActions = require('~actions/digitalAssetActions');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');

const I = actor();

module.exports = {
  verifyFieldIsReadOnly(locator, state, fieldID) {
    I.waitForVisible(locate(locator).withAttr({ 'aria-readonly': state }).inside(fieldID), constants.SHORT_WAIT);
  },

  async verifyDigitalAssetState(state) {
    await commonVerify.verifyValueExistsInInputReadOnly(digitalAssetPage.fields.statusInputField, state);
  },

  // Verify that buttons from the configuration items tab are invisible
  verifyCIBtnAreInvisible() {
    I.waitForInvisible(digitalAssetPage.buttons.addConfigurationItemButton, constants.SHORT_WAIT);
    I.waitForInvisible(digitalAssetPage.buttons.branchDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForInvisible(digitalAssetPage.buttons.removeConfigurationItemButton, constants.SHORT_WAIT);
  },

  // Verify if all fields of a Digital Asset are locked
  async verifyDAIsLocked(inputLocator, textAreaLocator, state, locked, version) {
    this.verifyFieldIsReadOnly(inputLocator, state, digitalAssetPage.fields.codeField);
    this.verifyFieldIsReadOnly(inputLocator, state, digitalAssetPage.fields.nameField);
    this.verifyFieldIsReadOnly(textAreaLocator, state, digitalAssetPage.fields.descriptionField);
    this.verifyFieldIsReadOnly(inputLocator, state, digitalAssetPage.fields.typeField);
    this.verifyFieldIsReadOnly(inputLocator, state, digitalAssetPage.fields.versionField);
    this.verifyFieldIsReadOnly(inputLocator, state, digitalAssetPage.fields.creationModeList);
    await commonVerify.verifyValueExistsInInputReadOnly(digitalAssetPage.fields.statusListField, locked);
    await commonVerify.verifyValueExistsInInput(digitalAssetPage.fields.versionInputField, version);
  },

  // Verify if the migration of a Deployment Package was a success
  async verifyMigration(entity, state, existingDigitalAsset) {
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonVerify.verifyValueExistsInTable(digitalAssetPage.containers.migrationContainer, entity);
    // Verify if the 'is Migrated' Checkbox is checked
    I.waitForVisible(locate('div').withAttr({ 'aria-checked': state }).inside(digitalAssetPage.checkbox.isMigratedCheckboxContainer), constants.SHORT_WAIT);
    // If the DP is already migrated, the migration Digital Asset will appear in the table
    if (existingDigitalAsset) {
      I.waitForVisible(locate('td').withAttr({ 'aria-colindex': '6' }).withText(existingDigitalAsset), constants.SHORT_WAIT);
    }
  },

  verifyBranchingSuccess(tab, url, branchDigitalAsset) {
    I.waitForInvisible(digitalAssetPage.buttons.branchDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForInvisible(digitalAssetPage.buttons.addConfigurationItemButton, constants.SHORT_WAIT);
    commonVerify.verifyEmptyTableData();
    I.waitForVisible(locate('span').withText(tab).inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.forceClick(locate('span').withText(tab).inside(digitalAssetPage.containers.tabContainer));
    I.waitForVisible(digitalAssetPage.checkbox.obsoleteCheckbox, constants.SHORT_WAIT);
    commonActions.accessDirectUrl(url);
    I.waitForVisible(locate('td').withText(branchDigitalAsset), constants.SHORT_WAIT);
  },

  verifyDigitalAssetTabs() {
    I.waitForVisible(digitalAssetPage.tabs.configurationItemsTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.tabs.relatedProjectsTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.tabs.dataImportFilesTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.tabs.configurationItemsMigrationTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
  },

  async verifyConfigurationItems(recordName, searchAfter) {
    await commonActions.searchInTableAfterASpecificColumn(recordName, searchAfter, digitalAssetPage.table.configItemsDataContainerTable);
  },

  async verifyVersionOfDA(version) {
    I.waitForVisible(digitalAssetPage.fields.versionInputField, constants.SHORT_WAIT);
    if (version !== await I.grabValueFrom(digitalAssetPage.fields.versionInputField)) {
      await commonVerify.verifyValueExistsInInput(digitalAssetPage.fields.versionInputField, +version + +'1');
    }
  },

  verifyCiInsertSuccess(businessEntity) {
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonVerify.verifyValueExistsInTable(digitalAssetPage.containers.ciContainer, businessEntity);
  },

  verifyMinimumPlatformVersion(version) {
    I.waitForVisible(digitalAssetPage.fields.minimumPlatformVersionField, constants.SHORT_WAIT);
    I.seeInField(digitalAssetPage.fields.minimumPlatformVersionField, version);
  },

  async verifyIfDigitalAssetWasDeleted(columnName, searchAfter, anchorContainer) {
    I.waitForVisible(locate('td').withAttr({ 'aria-label': `Column ${columnName}` }).inside(anchorContainer), constants.SHORT_WAIT);
    const row = await I.grabAttributeFrom(locate('td').withAttr({ 'aria-label': `Column ${columnName}` }).inside(anchorContainer), 'aria-colindex');
    const selector = locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': row })).inside(anchorContainer);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.fillField(selector, searchAfter);
    const clickSelector = locate('td').withText(searchAfter).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(anchorContainer);
    I.waitForInvisible(clickSelector, constants.SHORT_WAIT);
  },

  verifyCiDeleteSuccess(businessEntity) {
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    commonVerify.verifyValueDontExistsInTable(digitalAssetPage.containers.ciContainer, businessEntity);
  },

  verifyDAFieldsState(state) {
    I.waitForVisible(digitalAssetPage.fields.inputFieldReadOnly.inside(digitalAssetPage.fields.codeField), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.inputFieldReadOnly.inside(digitalAssetPage.fields.nameField), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.inputFieldReadOnly.inside(digitalAssetPage.fields.typeField), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.inputFieldReadOnly.inside(digitalAssetPage.fields.versionField), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.inputFieldReadOnly.inside(digitalAssetPage.fields.statusField), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.inputFieldReadOnly.inside(digitalAssetPage.fields.creationModeField), constants.SHORT_WAIT);
    if (state === 'Locked') {
      I.waitForVisible(digitalAssetPage.fields.textareaFieldReadOnly.inside(digitalAssetPage.fields.descriptionField), constants.SHORT_WAIT);
    } else {
      I.waitForInvisible(digitalAssetPage.fields.textareaFieldReadOnlyFalse.inside(digitalAssetPage.fields.descriptionField), constants.SHORT_WAIT);
      I.waitForVisible(digitalAssetPage.fields.descriptionInputField, constants.SHORT_WAIT);
    }
  },

  verifyGeneralTab(state) {
    I.waitForVisible(digitalAssetPage.tabs.generalTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.click(digitalAssetPage.tabs.generalTab.inside(digitalAssetPage.containers.tabContainer));
    I.waitForClickable(digitalAssetPage.buttons.setAsContextDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.lockDigitalAssetButton, constants.SHORT_WAIT);
    this.verifyDAFieldsState(state);
  },

  verifyCiTab() {
    I.waitForVisible(digitalAssetPage.tabs.configurationItemsTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.click(digitalAssetPage.tabs.configurationItemsTab.inside(digitalAssetPage.containers.tabContainer));
    I.waitForClickable(digitalAssetPage.buttons.addConfigurationItemButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.branchDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.removeConfigurationItemButton, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.entityNameField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.recordNameField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.parentNameField, constants.SHORT_WAIT);
  },

  verifyCiMigrationTab() {
    I.waitForVisible(digitalAssetPage.tabs.configurationItemsMigrationTab.inside(digitalAssetPage.containers.tabContainer), constants.SHORT_WAIT);
    I.click(digitalAssetPage.tabs.configurationItemsMigrationTab.inside(digitalAssetPage.containers.tabContainer));
    I.waitForClickable(digitalAssetPage.buttons.chooseDPForMigrationLookupButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.migrateButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.exportCIMigrationButton, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.digitalAssetField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.entityField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.recordField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.isMigratedField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.existingDAField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.deploymentPackageField, constants.SHORT_WAIT);
  },

  async verifyDigitalAssetDependencies(column, search, container) {
    await commonActions.searchInTableAfterASpecificColumn(column, search, container);
  },

  verifyDropdownForTypeDataImport() {
    I.waitForVisible(digitalAssetPage.containers.typeDataImportContainer, constants.SHORT_WAIT);
    I.click(digitalAssetPage.containers.typeDataImportContainer);
    I.waitForVisible(digitalAssetPage.fields.noneDataImportField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.basedDataImportTemplatesField, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.fields.basedDataConfigDefinitionField, constants.SHORT_WAIT);
  },

  verifyFilterButtonsCodeEditor() {
    I.waitForVisible(digitalAssetPage.buttons.filterByProjectButton, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.buttons.filterByDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.buttons.filterByItemTypeButton, constants.SHORT_WAIT);
  },

  // Verify all the entries of an entity in the code editor right hand panel
  verifyEntityInfoCodeEditor(displayName, displayNameCollection, showInMenu, primaryAttribute, tableName, defaultEntityStatus, isAudited, dataOptimization, isSystemEntity) {
    I.waitForVisible(digitalAssetPage.labels.displayNameLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(displayName).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.displayNameCollectionLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(displayNameCollection).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.showInMenuLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(showInMenu).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.primaryAttributeLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(primaryAttribute).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.tableNameLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(tableName).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.defaultEntityStatusLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(defaultEntityStatus).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.isAuditedLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(isAudited).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.dataOptimizationLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(dataOptimization).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(digitalAssetPage.labels.isSystemEntityLabelCodeEditor.inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(isSystemEntity).inside(digitalAssetPage.selector.codeEditorRightHandPanelHolder), constants.SHORT_WAIT);
  },

  async verifyDAStatus(statusInput) {
    I.waitForVisible(digitalAssetPage.fields.statusInputField, constants.SHORT_WAIT);
    const status = await I.grabValueFrom(digitalAssetPage.fields.statusInputField);
    I.assert(status, statusInput);
  },

  // Verify that a value exists in a table defined by an anchor on the page
  verifyValueDontExistsTable(anchor, value) {
    commonActions.waitForLoadersToFinish();
    I.waitForElement(anchor, constants.SHORT_WAIT);
    const selector = locate('td').withText(value).inside(locate(anchor));
    I.dontSeeElement(selector);
  },

  // Digital Asset name and the color showing the highlighted option must be provided
  verifyDAIsHighlightedInCodeEditor(nameDA, cssColor) {
    I.seeCssPropertiesOnElements(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })), { color: cssColor });
  },

  verifyStyleSheetCodeEditor(nameDA, styleSheets, nameStyleSheet) {
    I.waitForVisible(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })));
    I.waitForVisible(digitalAssetPage.selector.secondLevelCodeEditorOption.withAttr({ 'aria-label': styleSheets }), constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.toggleTreeViewItemsButton.inside(digitalAssetPage.selector.secondLevelCodeEditorOption.withAttr({ 'aria-label': styleSheets })));
    I.waitForVisible(locate('span').withText(`${nameStyleSheet}.css`).inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
  },
};
