module.exports = {
  fields: {
    businessEntityResultsField: locate('tbody').withAttr({ role: 'presentation' }).inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
    insertEntityLastField: locate('div').withAttr({ id: 'ebsContainerContent_BWId' }),
    entityTypeField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityType' })),
    entityTypeReadOnlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityType' })),
    entityNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    extNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })),
    entityNameReadOnlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    entityDisplayNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    entityDescriptionField: locate('textarea').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_description' })),
    entityColumnField: locate('td').withAttr({ 'aria-label': 'Column Name' }),
    entitySearchField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    entitySearchResultsField: locate('tr').withAttr({ role: 'row' }),
    scriptResultsPage: locate('tbody').withAttr({ role: 'presentation' }).inside((locate('div').withAttr({ id: 'ebsContainerContent' }))),
    entityListViewField: locate('div').withAttr({ id: 'listViewContainerId' }),
    attrReadOnlyField: locate('div').withAttr({ id: 'ebsContainerContent_isReadonly' }),
    attrNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    attrTypeField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_attributeTypeId_list' })),
    attrDisplayName: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    attrTableColumnNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_tableColumnName' })),
    entityLoadScriptField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_workflowForLoadId_textBox' })),
    entitySaveScriptField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_workflowForLoadId_textBox' })),
    scriptTypeField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_workflowTypeId_list' })),
    serverScriptCodeAreaField: locate('div').withAttr({ id: 'ebsContainerContent_code' }),
    scriptEntityField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureEntityId_dataGrid' })),
    loadScriptValueField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_workflowForLoadId_textBox' })),
    saveScriptValueField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_workflowForSaveId_textBox' })),
    transEntityLookupField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_transientEntityId_dataGrid' })),
    vaResultsTableField: locate('div').withAttr({ class: 'dx-datagrid-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_virtualAttribute_entityExtension_fromEntityExtension' })),
    vaRelAttReadOnlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_relatedEntityAttrId_textBox' })),
    vaNameReadOnlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    vaAttrTypeReadOnlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_attributeTypeId_list' })),
    vaLengthReadOnlyField: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_length' })),
    bussinessExtResultsField: locate('div').withAttr({ class: 'dx-datagrid-rowsview dx-datagrid-nowrap dx-empty' }),
    recordEmailField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Email' })),
    recordProductField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Product' })),
    recordOrderIdField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_OrderID' })),
    recordOrderStatusField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_OrderStatus_list' })),
    recordSourceNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name_Name' })),
    recordSourceCityField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_City_City' })),
    recordSourceEmailField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Email_Email' })),
    recordSourcePhoneField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Phone_Phone' })),
    entityStatusField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_defaultEntityStatusId' })),
    vaAttribute: locate('div').withAttr({ class: 'row' }).inside(locate('div').withAttr({ class: 'container ftos-uid-html-holder' })).last(),
    uiDesignerBox: locate('div').withAttr({ class: 'dx-overlay-content dx-popup-normal dx-popup-draggable dx-resizable dx-popup-fullscreen-width ftos-uid-popup ftos-corner-straight' }),
    uiElementlist: ('#ebsContainerContent_template'),
    selectAttributeDataFormField: locate('div').withAttr({ 'data-label-for': 'Name' }).inside(locate('div').withAttr({ 'data-template-id': 'attribute_1_2' })),
  },
  buttons: {
    entityInsertButton: locate('a').withAttr({ id: 'InsertBtn' }),
    entityTypeButton: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityType_list' })),
    entityLoadScriptButton: locate('div').withAttr({ id: 'ebsContainerContent_workflowForLoadId_button' }),
    entitySaveScriptButton: locate('div').withAttr({ id: 'ebsContainerContent_workflowForSaveId_button' }),
    attrLookupToEntityButton: locate('div').withAttr({ class: 'dx-button-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_lookupToEntityName_button' })),
    scriptOutputType: locate('div').withAttr({ class: 'dx-texteditor-buttons-container' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureType_list' })),
    scriptOutputParamTypeButton: locate('div').withAttr({ class: 'dx-texteditor-buttons-container' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputParameterType_list' })),
    scriptOutputEntityButton: locate('div').withAttr({ class: 'dx-texteditor-buttons-container' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureEntityId_dropDownBox' })),
    insertExtModel: locate('div').withAttr({ id: 'ebsContainerContent_entityExtension_entity_default_toolbar_item_1' }),
    extTypeButton: locate('div').withAttr({ class: 'dx-button-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_extensionType_list' })),
    transEntityButton: locate('div').withAttr({ class: 'dx-button-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_transientEntityId_dropDownBox' })),
    insertVAButton: locate('div').withAttr({ id: 'ebsContainerContent_virtualAttribute_entityExtension_fromEntityExtension_toolbar_item_1' }),
    relatedAttrButton: locate('div').withAttr({ class: 'dx-button-content' }).inside(locate('div').withAttr({ id: 'relatedEntityAttributesSelect' })),
    insertBusinessExtButton: locate('div').withAttr({ id: 'ebsContainerContent_sys_entityForm_entityExtension_toolbar_item_1' }),
    uiDesignerButton: locate('span').withAttr({ class: 'mce-txt' }).withText('UI Designer'),
    addAttrButton: locate('div').withAttr({ 'data-label-for': 'Name' }),
    dropdownAttrButton: locate('div').withAttr({ role: 'button' }).inside(locate('div').withText('Select the Attribute')),
    insertAttrButton: locate('button').withText('Add'),
    updateTemplateButton: locate('button').withText('Update template'),
    formNextButton: locate('button').withText('Next'),
    formFinishButton: locate('button').withText('Finish'),
    selectAttributeButton: ('.ftos-panel-wrap:nth-of-type(4) [aria-haspopup]'),
    vaTransientAttribute: ('[role] [role=\'option\']:nth-of-type(9) .dx-list-item-content'),
    applyChangesButton: ('.ftos-panel-wrap:nth-of-type(4) .ftos-uid-btn'),
    updateTemplatebutton: ('.dx-toolbar-after .btn-fill'),
    applyChangesAttrDataFormButton: locate('button').withText('Apply changes').inside(locate('div').withAttr({ class: 'ftos-uid-prop-form ftos-panel-wrap' })).at(6),
    checkoutUIDesignerButton: '#templateCheckOutButtonId',
  },
  tabs: {
    scriptOutputTab: locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-3' }),
    extVATab: locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-2' }).inside(locate('div').withAttr({ id: 'stepper' })),
  },
  popup: {
    entityStatusTable: locate('div').withAttr({ id: 'ebsContainerContent_defaultEntityStatusId_popupLkp_lookupgrid_wrap' }),
  },
  selector: {
    transientEntityTypeSelector: locate('p').withAttr({ title: 'Transient Data' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    isAuditedCheckbox: locate('div').withAttr({ id: 'ebsContainerContent_isAudited' }),
    isAuditedCheckboxTrue: locate('div').withAttr({ id: 'ebsContainerContent_isAudited', 'aria-checked': 'true' }),
    isAuditedCheckboxFalse: locate('div').withAttr({ id: 'ebsContainerContent_isAudited', 'aria-checked': 'false' }),
    optimizeSearchCheckbox: locate('div').withAttr({ id: 'ebsContainerContent_dataOptimization' }),
    optimizeSearchCheckboxTrue: locate('div').withAttr({ id: 'ebsContainerContent_dataOptimization', 'aria-checked': 'true' }),
    optimizeSearchCheckboxFalse: locate('div').withAttr({ id: 'ebsContainerContent_dataOptimization', 'aria-checked': 'false' }),
    attrIsExternalIdCheckbox: locate('div').withAttr({ id: 'ebsContainerContent_isExternalId' }),
    attrTypeSelector: locate('p').withAttr({ title: 'Uniqueidentifier' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    attrTypeLookupSelector: locate('p').withAttr({ title: 'Lookup' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    onDemandScriptTypeSelector: locate('p').withAttr({ title: 'On demand' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    scriptOutputEntityType: locate('p').withAttr({ title: 'Entity' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    scriptOutputParamType: locate('p').withAttr({ title: 'Single Instance' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    extTypeSelector: locate('p').withAttr({ title: 'Transient Data Entity' }).inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    relatedAttrTypeSelector: locate('div').withAttr({ class: 'dx-item-content dx-list-item-content' }).inside(locate('div').withAttr({ class: 'dx-scrollable-container' })),
    vaSelector: locate('div').withAttr({ class: 'dx-item-content dx-list-item-content' }),
    optionDropdown: locate('div').withAttr({ role: 'option' }),
    selectAttributeDropdown: '//*[@id="main-page"]/body/div[7]/div/div[2]/div/div/div[2]/div[2]/div[2]/div[6]/div[1]/div/div[1]/div/div[1]/div[2]/div[1]/div/div/div/div[2]/div[2]',
  },
  containers: {
    scrollableContainer: locate('div').withAttr({ class: 'dx-scrollable-content' }),
  },
  locate: {
    lookupExt: locate('div').withAttr({ id: 'ebsContainerContent_sys_entityForm_entityExtension_manyPopup_lookupgrid' }),
  },
};
