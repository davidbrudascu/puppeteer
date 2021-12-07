module.exports = {
  label: {
    firstAttribute: '//*[@id="ebsContainerContent"]/div/div[5]/div/table/tbody/tr[1]/td[2]/div[2]',
    primaryAttributeField: '.dx-text-content-alignment-left',
    noDataLabel: '.dx-datagrid-nodata',
    viewName: '#ebsContainerContent_name',
    firstAttributeInView: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[2]',
    secondAttributeInView: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[3]',
    thirdAttributeInView: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[4]',
    forthAttributeInView: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[5]',
    fifthAttributeInView: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[6]',
    sixthAttributeInView: '//*[@id="ebsContainerContent"]/div/div[6]/div/table/tbody/tr[1]/td[7]',
    currencyNameLabelView: locate('td').withText('{ AT_CreateViewFetchCrncy.Code | metadata}'),
  },
  container: {
    viewTable: '//*[@id="ebsContainerContent_sys_entity_sys_entityview"]/div/div[6]/div/table',
    defaultViewCheckboxStart: '//*[@id="ebsContainerContent_sys_entity_sys_entityview"]/div/div[6]/div/table/tbody/tr[',
    defaultViewCheckboxEnd: ']/td[4]',
    defaultEntityTableContainer: '#ebsContainerContent',
    defaultEntityContainer: locate('div').withAttr({ id: 'ebsContainerContent' }),
    defaultContainer: locate('.ftos-container'),
    currencyAT_InlineEditingRowContainer: '#lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_popupLkp_lookupgrid',
  },
  field: {
    inputNameViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    inputNNameViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })),
    inputCodeViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })),
    inputValueViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })),
    inputDescriptionViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Description' })),
    inputDisplayNameViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    inputSizeViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'optionsetedit_base_Size_displayname_0_list' })),
    inputParentViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_RelFormParentId_textBox' })),
    inputCurrencyViewField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_textBox' })),
    viewSearchField: '//*[@id="ebsContainerContent_entityViewId_popupLkp_lookupgrid"]/div/div[5]/div/table/tbody/tr[2]/td[2]/div/div[2]/div/div/input',
    viewResultsFirstLine: '//*[@id="ebsContainerContent_entityViewId_popupLkp_lookupgrid"]/div/div[6]/div/div/div[1]/div/table/tbody/tr[1]/td[2]',
    attributeName: '#ebsContainerContent_attributeName div input',
    labelForFirstAttribute: '//*[@id="ebsContainerContent_sys_entityviewcolumn_entityview"]/div/div[6]/div/table/tbody/tr[1]/td[4]',
    inputLabel: '//*[@id="ebsContainerContent_sys_entityviewcolumn_entityview"]/div/div[6]/div/table/tbody/tr[1]/td[4]/div/div/div/input',
    viewName: '#ebsContainerContent_name div input',
    fetchExprerssionMonaco: '.view-line',
    data: '#ebsContainerContent_data div textarea',
    dataSort: '#ebsContainerContent_sortExpression div input',
    entityViewColumnsSearchInTable: 'div#ebsContainerContent_sys_entityviewcolumn_entityview > div > div:nth-of-type(5) > div > table > tbody > tr:nth-of-type(2) > td:nth-of-type(3) > div > div:nth-of-type(2) > div > div > div > input',
    dataNameTextAreaField: locate('textarea').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_data' })),
    dataSortExpressionField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sortExpression' })),
    originalNameField: '#ebsContainerContent__originalName div div input',
    auditedUserIdField: 'div#ebsContainerContent__ADTedUserId_textBox > div > div > input',
    genericEntityIdField: 'div#ebsContainerContent__entityId_textBox > div > div > input',
    atAuditInsertIdField: 'div#ebsContainerContent__AT_AuditInsertid > div > div > input',
    atAuditDeleteIdField: 'div#ebsContainerContent__AT_AuditDeleteid > div > div > input',
    atAuditEditedIdField: 'div#ebsContainerContent__AT_AuditEditid > div > div > input',
    oparationNameField: 'div#ebsContainerContent__operationName > div > div > input',
    adTedNameField: 'div#ebsContainerContent__ADTedName > div > div > input',
    attributeNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_attributeName' })),
    attributeLabelField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_label' })),
    inputNewCurrencyNameField: locate('input').withAttr({ type: 'text' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    entityViewColumnWrapField: locate('div').withAttr({ id: 'ebsContainerContent_sys_entityviewcolumn_entityview_wrap' }),
    codeAfterGenerateEditorLink: locate('a').withText('After Generate Js'),
    waitForDivAfterGenerateJsmonaco: locate('div').withAttr({ class: 'view-line' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_afterGenerateJsmonaco' })),
    waitForDivDisplayOptionsMonaco: locate('div').withAttr({ class: 'view-line' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayOptionsmonaco' })),
    tableColumnHeader: locate('td').withAttr({ role: 'columnheader' }),
    defaultContainerField: locate('#modelType'),
    filterRowNotVisible: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ class: 'dx-editor-container' })),
    waitForNameDivVisible: locate('div').withText('Name'),
    waitForTrueDivVisible: locate('div').withText('true').inside(locate('div').withAttr({ class: 'dx-scrollable-wrapper' })),
    waitForFalseDivVisible: locate('div').withText('false').inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    waitForAllDivVisible: locate('div').withText('(All)').inside(locate('div').withAttr({ class: 'dx-scrollview-content' })),
    inputSearchByName: locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    inputSearchByColumnType: locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    inputSearchByCountryCode: locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    inputSearchByCity: locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '6' })),
    verifyNameInSecondColumnTable: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })).inside('.dx-select-checkboxes-hidden'),
    verifyCodeInSecondColumnTable: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })).inside('.dx-select-checkboxes-hidden'),
    verifyCurrencyInSecondColumnTable: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_textBox' })),
    firstInputFromRowTable: locate('input').withAttr({ type: 'text' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    firstInputRowTableNotEditable: locate('input').withAttr({ type: 'text' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')),
    inputUpdateNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).last(),
    inputFromSecondRowTable: locate('input').withAttr({ type: 'text' }).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })),
    inputSearchByValueField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '5' })),
    inputSearchByInvariantDateField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '4' })),
    inputSecondColumnField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    inputSearchByAgeField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    inputSearchByDoBField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    inputSearchByTimeField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '5' })),
    inputRangeStartFilter: locate('input').withAttr({ type: 'text' }).inside(locate('.dx-datagrid-filter-range-start')),
    inputRangeEndFilter: locate('input').withAttr({ type: 'text' }).inside(locate('.dx-datagrid-filter-range-end')),
    waitForFormAT_InlineEditingField: locate('.form_AT_InlineEditingForm_default'),
    waitForViewDisplayOptionsObject: locate('span').withText('ebs.createViewDisplayOptionsObject({'),
    inputSizeDisplayName: locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'optionsetedit_base_Size_displayname_0_list' })),
    locatorNameField: locate('label').withChild(locate('span').withAttr({ class: 'dx-field-item-label-content' })).withDescendant(locate('span').withText('Name:')),
    locatorUserField: locate('label').withChild(locate('span').withAttr({ class: 'dx-field-item-label-content' })).withDescendant(locate('span').withText('User:')),
    locatorCodeField: locate('label').withChild(locate('span').withAttr({ class: 'dx-field-item-label-content' })).withDescendant(locate('span').withText('Code:')),
    locatorPriceField: locate('label').withChild(locate('span').withAttr({ class: 'dx-field-item-label-content' })).withDescendant(locate('span').withText('Price:')),
    locatorDescriptionField: locate('label').withChild(locate('span').withAttr({ class: 'dx-field-item-label-content' })).withDescendant(locate('span').withText('Description:')),
    inputBaseEntityField: locate('input').withAttr({ type: 'text' }).inside('#baseEntity'),
    baseAT_CreateViewFetchField: locate('div').withText('AT_CreateViewFetch (base.AT_CreateViewFetch)'),
    inputTextNameField: locate('input').withAttr({ type: 'text' }).inside('#txtName'),
    inputEntityField: locate('input').withAttr({ type: 'text' }).inside('#entityrow1'),
    inputTextCodeField: locate('input').withAttr({ type: 'text' }).inside('#txtCode'),
    inputConditionField: locate('input').withAttr({ type: 'text' }).inside('#conditionrow1'),
    inputEntityCNDField: locate('input').withAttr({ type: 'text' }).inside('#entityrowCNDc13'),
    inputAttributeCNDField: locate('input').withAttr({ type: 'text' }).inside('#entityrowCNDattr3'),
    inputOperandField: locate('input').withAttr({ type: 'text' }).inside('#entityrowCNDop3'),
    fetchObjectExpression: locate('span').inside(locate('div').withAttr({class:'lines-content monaco-editor-background'})),
    recordDataViewEitScript:   locate('td').withText('default').inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside('#ebsContainerContent_sys_entity_sys_entityview_wrap'),
  },
  table: {
    firstElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '1' }),
    secondElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '2' }),
    thirdElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '3' }),
    fourthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '4' }),
    fifthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '5' }),
    sixthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '6' }),
    seventhElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '7' }),
    eighthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '8' }),
    ninthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '9' }),
    tenthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '10' }),
    thirteenthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '13' }),
    twentythElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '20' }),
    twentyfirstElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '21' }),
    twentysecondElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '22' }),
    twentythirdElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '23' }),
    twentyfourthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '24' }),
    twentyfifthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '25' }),
    twentysixthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '26' }),
    twentyseventhElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '27' }),
    firstPageTable: locate('div').withAttr({ 'aria-label': 'Page 1' }),
    secondPageTable: locate('div').withAttr({ 'aria-label': 'Page 2' }),
    thirdPageTable: locate('div').withAttr({ 'aria-label': 'Page 3' }),
    thirdColumnFieldTable: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    firstViewLinkFromFirstRowTable: locate('a').withText('View').inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    majorColumnHeaderTable: locate('div').withText('Major').inside(locate('td').withAttr({ role: 'columnheader' })),
    valueColumnHeaderTable: locate('div').withText('Value').inside(locate('td').withAttr({ role: 'columnheader' })),
    doBColumnHeaderTable: locate('div').withText('DoB').inside(locate('td').withAttr({ role: 'columnheader' })),
    timeColumnHeaderTable: locate('div').withText('Time').inside(locate('td').withAttr({ role: 'columnheader' })),
    invariantDateColumnHeaderTable: locate('div').withText('InvariantDate').inside(locate('td').withAttr({ role: 'columnheader' })),
    ageDateColumnHeaderTable: locate('div').withText('Age').inside(locate('td').withAttr({ role: 'columnheader' })),
    nameColumnTable: locate('div').withText('Name').inside(locate('td').withAttr({ 'aria-label': 'Column Name' })),
    codeColumnTable: locate('div').withText('Code').inside(locate('td').withAttr({ 'aria-label': 'Column Code' })),
    valueColumnTable: locate('div').withText('Value').inside(locate('td').withAttr({ 'aria-label': 'Column Value' })),
    priceColumnTable: locate('div').withText('Price').inside(locate('td').withAttr({ 'aria-label': 'Column Price' })),
    currencyColumnTable: locate('div').withText('Currency').inside(locate('td').withAttr({ 'aria-label': 'Column Currency' })),
    boolColumnTable: locate('div').withText('Bool').inside(locate('td').withAttr({ 'aria-label': 'Column Bool' })),
    sizeColumnTable: locate('div').withText('Size').inside(locate('td').withAttr({ 'aria-label': 'Column Size' })),
    tvaColumnTable: locate('div').withText('TVA').inside(locate('td').withAttr({ 'aria-label': 'Column TVA' })),
    dateColumnTable: locate('div').withText('Date').inside(locate('td').withAttr({ 'aria-label': 'Column Date' })),
    userColumnTable: locate('div').withText('User').inside(locate('td').withAttr({ 'aria-label': 'Column User' })),
    descriptionColumnTable: locate('div').withText('Description').inside(locate('td').withAttr({ 'aria-label': 'Column Description' })),
    columnNameNtoNTable: locate('td').withAttr({ 'aria-label': 'Column Name' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InlineEditRel1_AT_InlineEditRel2_relationship_manyPopup_lookupgrid' })),
    columnValueNtoNTable: locate('td').withAttr({ 'aria-label': 'Column Value' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InlineEditRel1_AT_InlineEditRel2_relationship_manyPopup_lookupgrid' })),
    columnCodeNtoNTable: locate('td').withAttr({ 'aria-label': 'Column Code' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_InlineEditRel1_AT_InlineEditRel2_relationship_manyPopup_lookupgrid' })),
    selectedRowTable: locate('tr').withAttr({ 'aria-selected': 'true' }),
    checkIfSelectedRowNotEditable: locate('tr').withAttr({ 'aria-selected': 'true' }).inside('.dx-select-checkboxes-hidden'),
    notSelectedRowTable: locate('tr').withAttr({ 'aria-selected': 'false' }),
    verify5ColumnFromFirstRowTable: locate('td').withAttr({ 'aria-colindex': '5' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    columnValueTable: locate('td').withAttr({ 'aria-label': 'Column Value' }).withAttr({ 'aria-colindex': '2' }),
    columnNameTable: locate('td').withAttr({ 'aria-label': 'Column Name' }).withAttr({ 'aria-colindex': '3' }),
    columnCrncyCodeTable: locate('td').withAttr({ 'aria-label': 'Column Crncy Code' }).withAttr({ 'aria-colindex': '4' }),
    currencyPopupTable: '#entityrowCNDval3_effective_popupLkp_lookupgrid',
    entityViewTable: '#ebsContainerContent_sys_entityviewcolumn_entityview',
    dataViewTable: '#ebsContainerContent_sys_entity_sys_entityview_wrap',
  },
  link: {
    editTextLinkPos8: locate('a').withText('Edit').inside(locate('td').withAttr({ 'aria-colindex': '8' })),
    editTextLinkPos10: locate('a').withText('Edit').inside(locate('td').withAttr({ 'aria-colindex': '10' })),
    editTextLinkPos4: locate('a').withText('Edit').inside(locate('td').withAttr({ 'aria-colindex': '4' })),
    cancelTextLink: locate('a').withText('Cancel'),
    viewTextLink: locate('a').withText('View').inside('#ebsContainerContent_AT_InlineRelChild_AT_InlineRelParentId_AT_InlineRelParent_relationship'),
    fullItemDetailsLink: locate('a').withText('Full item details'),
  },
  checkbox: {
    isDefault: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_isDefault' })),
    showViewButton: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_showViewButton' })),
    secondViewToSelect: '//*[@id="ebsContainerContent_sys_entity_sys_entityview"]/div/div[6]/div/table/tbody/tr[2]/td[1]',
    allowEdit: '//*[@id="ebsContainerContent_sys_entityviewcolumn_entityview"]/div/div[6]/div/table/tbody/tr[1]/td[8]/div/div/div',
    showDisplayNameAsTitleCheckbox: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_showDisplayNameAsTitle' })),
    disableViewColumnCheckbox: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_disabled' })),
    allEditingForCode: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('td').withAttr({ 'aria-colindex': '8' })),
    majorColumnNullFirstRowCheckbox: locate('div').withAttr({ 'aria-checked': 'mixed' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    hostUserColumnRowCheckbox: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ 'aria-checked': 'true' })),
    majorColumnTrueFirstRowCheckbox: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ 'aria-checked': 'true' })).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    defaultCheckbox: locate('.dx-checkbox-icon'),
    nameCheckbox: '#chkName',
    codeCheckbox: '#chkCode',
  },
  button: {
    views: '//*[@id="ebsContainerContent_sys_entity_sys_entityview_collapse"]',
    insertViewColumn: '#ebsContainerContent_sys_entityviewcolumn_entityview_toolbar_item_1',
    selectEntityViewInColumn: '#ebsContainerContent_entityViewId_button',
    ok: '#ebsContainerContent_entityViewId_popupLkp_lookupgrid_toolbar_item_4',
    generateColumnsButton: locate('button').withAttr({ id: 'btnGenerateColumns' }),
    insertNewRelFormParentViewButton: locate('div').withAttr({ id: 'ebsContainerContent_AT_RelFormChild_AT_RelFormParentId_AT_RelFormParent_toolbar_item_1' }),
    insertNewAT_InsIns1_AT_InsIns2Button: locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2_manyPopup_lookupgrid_toolbar_item_3' }),
    okPopupButton: locate('div').withAttr({ id: 'ebsContainerContent_AT_InsIns1_AT_InsIns2_manyPopup_lookupgrid_toolbar_item_4' }),
    okPopupNtoNButton: locate('div').withAttr({ id: 'ebsContainerContent_AT_InlineEditRel1_AT_InlineEditRel2_relationship_manyPopup_lookupgrid_toolbar_item_4' }),
    okPopupInlineEditingButton: locate('div').withAttr({ id: 'lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_popupLkp_lookupgrid_toolbar_item_4' }),
    insertNewAT_InlineEditRel1Button: locate('div').withAttr({ id: 'ebsContainerContent_AT_InlineEditRel1_AT_InlineEditRel2_relationship_toolbar_item_1' }),
    saveInlineEditingButton: locate('a').withText('Save').inside('.dx-command-edit'),
    saveBatchViewButton: locate('i').withAttr({ class: 'dx-icon dx-icon-edit-button-save' }),
    saveButton: locate('a').withText('Save'),
    saveSpanButton: locate('span').withText('Save'),
    cancelButton: locate('span').withText('Cancel'),
    discardButton: locate('i').withAttr({ class: 'dx-icon dx-icon-edit-button-cancel' }),
    page1Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 1' }),
    page2Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 2' }),
    page3Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 3' }),
    page4Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 4' }),
    page5Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 5' }),
    page6Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 6' }),
    page7Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 7' }),
    page8Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 8' }),
    page9Button: locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'Page 9' }),
    pageNumberSeparatorButton: locate('div').withAttr({ class: 'dx-separator' }).withText('. . .'),
    pageSize20Button: locate('div').withAttr({ 'aria-label': 'Display 20 items on page' }).withText('20'),
    pageSize5Button: locate('div').withAttr({ 'aria-label': 'Display 5 items on page' }).withText('5'),
    cancelCurrencyPopupTableAT_InlineEditingRowButton: '#lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_popupLkp_lookupgrid_toolbar_item_1',
    removeCurrencyPopupTableAT_InlineEditingRowButton: '#lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_popupLkp_lookupgrid_toolbar_item_2',
    insertCurrencyPopupTableAT_InlineEditingRowButton: '#lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_popupLkp_lookupgrid_toolbar_item_3',
    fetchDesignerButton: '#btnFetchDesigner',
    baseEntityButton: '#baseEntity',
    baseEntityAttrButton: '#baseEntityAttrButton',
    okAttributePopupButton: '#popup_popupContent_designer_btnPopupClose',
    secondAttributeButton: '#entityrowc21',
    thirdAttributeButton: '#entityrowCNDc13',
    selectCurrencyButton: '#entityrowCNDval3_effective_button',
    okCurrencyButton: '#entityrowCNDval3_effective_popupLkp_lookupgrid_toolbar_item_4',
    okPopupAddButton: '#popup_btnPopupClose',
    checkoutCodeEditorButton: '#displayOptionsCheckOutButtonId',
    insertDataViewsButton: '#ebsContainerContent_sys_entity_sys_entityview_toolbar_item_1',
    checkOutButton: '#fetchObjectExpressionCheckOutButtonId',
    dataButton:locate('span').withText('Data').inside('#stepper'),
  },
  selector: {
    selectSearchMajor: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ class: 'dx-dropdowneditor-input-wrapper dx-selectbox-container' })),
    selectFromDropdownIcon: locate('.dx-icon-arrowdown'),
    selectColumnAge: locate('span').withAttr({ class: 'dx-menu-item-popout-container' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    selectColumnName: locate('span').withAttr({ class: 'dx-menu-item-popout-container' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    selectColumnValue: locate('span').withAttr({ class: 'dx-menu-item-popout-container' }).inside(locate('td').withAttr({ 'aria-colindex': '5' })),
    selectColumnDoB: locate('span').withAttr({ class: 'dx-menu-item-popout-container' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
    selectColumnTime: locate('span').withAttr({ class: 'dx-menu-item-popout-container' }).inside(locate('td').withAttr({ 'aria-colindex': '5' })),
    selectColumnInvariantDate: locate('span').withAttr({ class: 'dx-menu-item-popout-container' }).inside(locate('td').withAttr({ 'aria-colindex': '4' })),
    selectDoesNotContainFilter: locate('.dx-icon-filter-operation-not-contains'),
    selectStartsWithFilter: locate('.dx-icon-filter-operation-starts-with'),
    selectEndsWithFilter: locate('.dx-icon-filter-operation-ends-with'),
    selectEqualsFilter: locate('.dx-icon-filter-operation-equals'),
    selectDoesNotEqualsFilter: locate('.dx-icon-filter-operation-not-equals'),
    selectLessFilter: locate('.dx-icon-filter-operation-less'),
    selectGreaterFilter: locate('.dx-icon-filter-operation-greater'),
    selectLessThanOrEqual: locate('.dx-icon-filter-operation-less-equal'),
    selectGreaterThanOrEqual: locate('.dx-icon-filter-operation-greater-equal'),
    selectBetweenFilter: locate('.dx-icon-filter-operation-between'),
    selectDefaultFilter: locate('.dx-icon-filter-operation-default').last(),
    selectDropdownSize: locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'optionsetedit_base_Size_displayname_0_list' })),
    selectTypeOptionSet: locate('div').withText('Type (Option Set)').inside(locate('td').withAttr({ 'aria-label': 'Column Type (Option Set)' })),
    selectColumnCity: locate('div').withText('City').inside(locate('td').withAttr({ 'aria-label': 'Column City' })),
    selectDropdownAT_InlineEditingCell: locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_dropDownBox' })),
    selectSecondAttributeDDPopup: '#entityrowc11',
  },
  popup: {
    isDefaultPopup: locate('div').withText('This entity has another default view.').withText('After saving this will be the default one.').inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })),
  },
};