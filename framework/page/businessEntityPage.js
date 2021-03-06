module.exports = {
  fields: {
    entityNameField: '#ebsContainerContent_name div input',
    entitynameField: '#ebsContainerContent_Name div input',
    displayNameField: '#ebsContainerContent_displayName div input',
    collectionNameField: '#ebsContainerContent_displayCollectionName div input',
    tableNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_tableName' })),
    primaryAttNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_primaryAttributeName' })),
    primaryAttDisplayNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_primaryAttributeDisplayName' })),
    primaryAttTableColumnField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_primaryAttributeTableColumn' })),
    entitySearchField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    attributeNameSearchFieldd: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView"]/div/div[5]/div/table/tbody/tr[2]/td[2]/div/div[2]/div/div/input',
    attributeNameSearchField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Filter cell' })),
    primaryAttributeField: '.dx-texteditor-input',
    entityNameField1: '#ebsContainerContent_name div div input',
    descriptionField: 'div#ebsContainerContent_description > div > div > textarea',
    defaultEntityStatusField: '#ebsContainerContent_defaultEntityStatusId_textBox div input',
    secondAttributeField: 'div#ebsContainerContent_Code > div > div > input',
    primaryAttributeValueField: 'div#ebsContainerContent_Value > div > div > input',
    attributeDataModelField: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView"]/div[1]/div[5]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]',
    attributeDataFormField: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[5]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]',
    attributeRelationshipReferencingField: '//*[@id="ebsContainerContent_sys_relationship_entityreferencing_withReferencedEntity"]/div[1]/div[5]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]',
    dataFormsEntityField: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[2]',
    addNameRelationshipField: 'div#ebsContainerContent_name > div > div > input',
    addDisplayNameRelationshipField: 'div#ebsContainerContent_displayName > div > div > input',
    referencedEntityRelationshipField: 'div#ebsContainerContent_referencedEntityId_textBox > div > div > input',
    nameEntitySearchForField: 'div#ebsContainerContent_referencingEntityId_popupLkp_lookupgrid > div > div:nth-of-type(5) > div > table > tbody > tr:nth-of-type(2) > td > div > div:nth-of-type(2) > div > div > div > input',
    firstNameFromTableEntityRelationship: 'div#ebsContainerContent_referencingEntityId_popupLkp_lookupgrid > div > div:nth-of-type(6) > div > div > div > div > table > tbody > tr > td',
    referencingEntityRelationshipField: 'div#ebsContainerContent_referencingEntityId_textBox > div > div > input',
    nameRelationshipField: '#ebsContainerContent_name',
    displayNameRelationshipField: '#ebsContainerContent_displayName',
    relationshipTypeField: 'div#ebsContainerContent_relationshipType > div > div > input',
    relationshipConstraintField: '#ebsContainerContent_relationshipConstraint',
    relationshipConstraintInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_relationshipConstraint' })),
    tableColumnNameOnlyForViewField: locate('td').withText('Name (only for view)'),
    tableColumnNameField: locate('td').withAttr({ 'aria-label': 'Column Name' }),
    inputSearchInColumnNameTableField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })),
    defaultEntityStatusActiveField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_defaultEntityStatusId_textBox' })),
    lookUpFieldInputAT_1toNSame: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_1toNSameRelLkpId_textBox' })),
    referencingEntityInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_referencingEntityId_textBox' })),
    relationshipTypeInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_relationshipType' })),
    inputLengthAttributeField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_length' })),
    inputPrecisionAttributeField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_precision' })),
    inputVAMaxLengthField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_VAMaxLength' })),
    inputTextMaxLengthField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_TextMaxLength' })),
    inputVAMaxPrecisionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_VAMaxPrecision' })),
    inputNumericMaxPrecisionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_NumericMaxPrecision' })),
    inputRelatedMaxPrecisionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForVALimitationId_RelatedMaxPrecision' })),
    inputTextCheckLengthField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_TextCheckLength' })),
    inputRelatedMaxLengthField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForVALimitationId_RelatedMaxLength' })),
    inputVACheckLengthField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_VACheckLegth' })),
    inputNumericCheckPrecisionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_NumericCheckPrecision' })),
    inputVACheckPrecisionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_VACheckPrecision' })),
    inputRelatedCheckLengthField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForVALimitationId_RelatedCheckLength' })),
    inputRelatedCheckPrecisionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForVALimitationId_RelatedCheckPrecision' })),
    inputNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    inputDisplayNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    inputReferencedEntityIdField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_referencedEntityId_textBox' })),
    inputReferencingEntityIdField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_referencingEntityId_textBox' })),
    inputRelationshipTypeField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_relationshipType' })),
    inputRelationshipTypeReadonlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_relationshipType' })),
    iconForSearchForText: locate('div').withAttr({ role: 'menuitem' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })).inside('#ebsContainerContent_sys_entity_sys_attribute_entityView'),
    iconForSearchForEquals: locate('i').withAttr({ class: 'dx-icon dx-icon-filter-operation-equals' }),
    recordEntityEditScriptField: locate('td').withText('AT_EditScriptDataView').inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside('#ebsContainerContent'),
    businessEntityField: locate('a').withText('Data Model Explorer').inside(locate('li').withAttr({ class: 'leaf-menu-item found' })),
    nameDataFormField: locate('input').withAttr({type:'text'}).inside('#ebsContainerContent_name'),
  },
  buttons: {
    entityViewButton: '//a[contains(text(),\'View\')]',
    attributesSectionLoader: '.dx-loadindicator',
    addedAttribute: '//*[contains(., \'autotest_\')]',
    entityMenuButton: '#ebsContainerContent_entityMenuSectionId_button',
    entityStatusButton: '#ebsContainerContent_defaultEntityStatusId_button',
    statusSelectorButton: '#ebsContainerContent_defaultEntityStatusId_popupLkp_lookupgrid',
    attributesSectionButton: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView_collapse"]',
    insertAttributeButton: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView_toolbar_item_1"]',
    allResults: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[2]/td[3]',
    viewsSectionCollapseButton: '#ebsContainerContent_sys_entity_sys_entityview_collapse',
    formsSectionCollapseButton: '#ebsContainerContent_sys_entity_sys_entityform_basicForms_collapse',
    selectEntityAfterSearch: '.dx-command-select',
    entityMenuSection: '#ebsContainerContent_entityMenuSectionId_popupLkp_lookupgrid',
    resultForNoData: '.dx-datagrid-nodata',
    resultFirstLine: '//*[@id="ebsContainerContent_lookupToEntityName_popupLkp_lookupgrid"]/div/div[6]/div/div/div[1]/div/table/tbody/tr[1]',
    resultForSearch1stLine: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[3]',
    resultForSearch2ndLine: '//*[@id="ebsContainerContent"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[2]',
    resultForFirstLineInTabel: '//*[@id="ebsContainerContent"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]',
    resultForSearch1ndLineDataModel: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView"]/div[1]/div[5]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]',
    resultForSearch2ndLineDataForms: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[2]',
    resultForSearch2ndLineRelationshipReferencing: '//*[@id="ebsContainerContent_sys_relationship_entityreferencing_withReferencedEntity"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[2]',
    resultForSearch2ndLine3rdColumnRelationshipReferencing: '//*[@id="ebsContainerContent_sys_relationship_entityreferencing_withReferencedEntity"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[3]',
    resultForSearch2ndLineDataModel: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[2]',
    resultForSearch2ndLine3rdColumnDataModel: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[3]',
    resultForSearch2ndLine3rdColumnDataForms: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[3]',
    resultForSearch2ndLine4thColumnDataModel: '//*[@id="ebsContainerContent_sys_entity_sys_attribute_entityView"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[4]',
    resultForSearch2ndLine2thColumnDataForms: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[2]',
    resultForSearch2ndLine4thColumnDataForms: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/div[1]/span[1]',
    resultForSearch2ndLine5thColumnDataForms: '//*[@id="ebsContainerContent_sys_entity_sys_entityform_basicForms"]/div[1]/div[6]/div[1]/table[1]/tbody[1]/tr[1]/td[5]',
    referencingEntityRelationshipButton: 'div#ebsContainerContent_referencingEntityId_button > div > i',
    insertNewAttributeButton: locate('i').withAttr({ class: 'sidebar-icons new' }).inside(locate('a').withAttr({ id: 'InsertBtn' })),
    editLookupButtonAT_1toNSame: locate('div').withAttr({ id: 'ebsContainerContent_AT_1toNSameRelLkpId_buttonEdit' }),
    deleteButtonAT_1toNSame: '#ebsContainerContent_AT_1toNSameRel_AT_1toNSameRelLkpId_AT_1toNSameRel_toolbar_item_2',
    entityLookUpButtonAT_1toNSame: '#ebsContainerContent_AT_1toNSameRelLkpId_button',
    okButtonLookupContainerAT_1toNSame: '#ebsContainerContent_AT_1toNSameRelLkpId_popupLkp_lookupgrid_toolbar_item_4',
    insertButtonContainerAT_1toNSame: '#ebsContainerContent_AT_1toNSameRel_AT_1toNSameRelLkpId_AT_1toNSameRel_toolbar_item_1',
    aT_NTONSAMERELInsertButton: '#ebsContainerContent_AT_NtoNSameRel_AT_NtoNSameRel_toolbar_item_1',
    aT_NTONSAMERELLookUpGridOkButton: '#ebsContainerContent_AT_NtoNSameRel_AT_NtoNSameRel_manyPopup_lookupgrid_toolbar_item_4',
    aT_NTONSAMERELRemoveButton: '#ebsContainerContent_AT_NtoNSameRel_AT_NtoNSameRel_toolbar_item_2',
    insertDataModelButton: '#ebsContainerContent_sys_entity_sys_attribute_entityView_toolbar_item_1',
    attributeTypeDropdownButton: '#ebsContainerContent_attributeTypeId_list > div.dx-dropdowneditor-input-wrapper.dx-selectbox-container > div > div.dx-texteditor-buttons-container > div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button',
    insertButtonRelationshipReferencing: '#ebsContainerContent_sys_relationship_entityreferencing_withReferencedEntity_toolbar_item_1',
    lookupToEntityDropdownButton: '#ebsContainerContent_lookupToEntityName_button',
    okButtonLookupEntityTable: '#ebsContainerContent_lookupToEntityName_popupLkp_lookupgrid_toolbar_item_4',
    referencedEntityIdButton: '#ebsContainerContent_referencedEntityId_button',
    okButtonReferencedEntityTable: '#ebsContainerContent_referencedEntityId_popupLkp_lookupgrid_toolbar_item_4',
    selectAllButtonLookUpAT_NtoNSameRel: locate('td').withAttr({ 'aria-label': 'Select all' }).inside('#ebsContainerContent_AT_NtoNSameRel_AT_NtoNSameRel'),
    selectAllButtonAT_NtoNSameRel: locate('td').withAttr({ 'aria-label': 'Select all' }).inside('#ebsContainerContent_AT_NtoNSameRel_AT_NtoNSameRel'),
    insertVARelatedForMaxLength: locate('div').withAttr({ id: 'ebsContainerContent_virtualAttribute_entityExtension_fromEntityExtension_toolbar_item_1' }),
    insertButtonDataForms: '#ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_1',
    deleteDataFormsButtons: '#ebsContainerContent_sys_entity_sys_entityform_basicForms_toolbar_item_2',
    deleteDataViewButton: '#ebsContainerContent_sys_entity_sys_entityview_toolbar_item_2',
    insertDataViewButton: '#ebsContainerContent_sys_entity_sys_entityview_toolbar_item_1',
    deleteDataModelButton: '#ebsContainerContent_sys_entity_sys_attribute_entityView_toolbar_item_2',
    lookupRelationDropdownButton: locate('div').withAttr({ role: 'button' }).inside('#ebsContainerContent_lookupRelationType_list'),
    dataFormButton: locate('h4').withText('Data Forms').inside('#ebsContainerContent_sys_entity_sys_entityform_basicForms_collapse'),
  },
  labels: {
    businessUnitIdLabel: 'businessUnitIdLabel',
  },
  popup: {
    openStatusPopup: '#ebsContainerContent_defaultEntityStatusId_popupLkp_lookupgrid_wrap',
  },
  selector: {
    generalSelector: '//*[contains(text(),\'General\')]',
    entityNameSelector: '//*[contains(text(),\'teste\')]',
    activeSelector: 'div#ebsContainerContent_defaultEntityStatusId_popupLkp_lookupgrid > div > div:nth-of-type(6) > div > div > div > div > table > tbody > tr > td',
    firstEntityFromTableRelationshipSelector: 'div#ebsContainerContent_referencingEntityId_popupLkp_lookupgrid > div > div:nth-of-type(6) > div > div > div > div > table > tbody > tr > td',
    attributeType: '//*[contains(text(),\'Attribute Type\')]',
    extensionType: '//*[contains(text(),\'Extension Type\')]',
    referencingEntity: '//*[contains(text(),\'Referencing Entity\')]',
    referencedEntity: '//*[contains(text(),\'Referenced Entity\')]',
    selectActiveStatusForBusinessEntity: locate('td').withText('Active').inside(locate('div').withAttr({ id: 'ebsContainerContent_defaultEntityStatusId_popupLkp_lookupgrid' })),
    selectRelatedEntityAttribute: locate('div').withAttr({ id: 'relatedEntityAttributesSelect' }),
    dataImpFileNoneUpload: locate('input').withAttr({ type: 'file' }).inside(locate('div').withAttr({ id:'ebsContainerContent_AT_AddFileAttr_None'})),
  },
  checkbox: {
    showInMenuCheckbox: '#ebsContainerContent_showInMenu',
    isAuditedCheckbox: 'div#ebsContainerContent_isAudited > div > span',
    optimizationSearchDataCheckbox: 'div#ebsContainerContent_dataOptimization > div > span',
    isDefaultCheckbox: '#ebsContainerContent_isdefault',
  },
  link: {
    dataModelLink: '#ebsContainerContent_sys_entity_sys_attribute_entityView_collapse h4',
    extendedModelLink: '#ebsContainerContent_entityExtension_entity_default_collapse h4',
    dataFormsLink: '#ebsContainerContent_sys_entity_sys_entityform_basicForms_collapse',
    relationshipReferenced: '#ebsContainerContent_sys_relationship_entityreferenced_withReferencingEntity_collapse',
    relationshipReferencing: '#ebsContainerContent_sys_relationship_entityreferencing_withReferencedEntity_collapse',
    dataViewsLink: '#ebsContainerContent_sys_entity_sys_entityview_collapse',
  },
  container: {
    defaultEntityTableContainer: '#ebsContainerContent',
    defaultDivEntityTableContainer: locate('div').withAttr({ id: 'ebsContainerContent' }),
    aT_NTONSAMERELTableContainer: '#ebsContainerContent_AT_NtoNSameRel_AT_NtoNSameRel',
    lookupToEntityTableContainer: '#ebsContainerContent_lookupToEntityName_popupLkp_lookupgrid',
    relationshipReferencingTableContainer: '#ebsContainerContent_sys_relationship_entityreferencing_withReferencedEntity',
    aT_1toNSameRelTableContainer: '#ebsContainerContent_AT_1toNSameRel_AT_1toNSameRelLkpId_AT_1toNSameRel',
    aT_1toNSameRelLookupTableContainer: '#ebsContainerContent_AT_1toNSameRelLkpId_popupLkp_lookupgrid',
    referencedRelationshipTableContainer: '#ebsContainerContent_referencedEntityId_popupLkp_lookupgrid',
    dataFormsTableContainer: '#ebsContainerContent_sys_entity_sys_entityform_basicForms',
    dataViewsTableContainer: '#ebsContainerContent_sys_entity_sys_entityview',
    dataModelTableContainer: '#ebsContainerContent_sys_entity_sys_attribute_entityView',
    businessEntityContainer: '#ebsContainerContent',
  },
};
