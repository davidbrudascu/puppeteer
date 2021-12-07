module.exports = {
  fields: {
    l10nAttributeName: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })),
    l10nAttributeCulture: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Culture' })),
    l10nAttributeIso: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_IsoCode' })),
    l10nAttributeCurrency: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Currency' })),
    l10nAttributeValue: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })),
    l10nIsLocalizable: locate('div').withAttr({ id: 'ebsContainerContent_isLocalizable' }).withAttr({ role: 'checkbox' }),
    l10nLocalizedAttr: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_LocalizedAttr' })),
    l10nAttrName: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    l10nAttrDisplayName: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    l10nAttrType: locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_attributeTypeId_list' })),
    l10nAttrLength: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_length' })),
    l10nLocalizedTextArea: locate('textarea').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_TextArea' })),
    l10nAttrTooltip: locate('textarea').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_tooltip' })),
    l10nAttrLabel: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_label' })),
    l10nAttrCollectionName: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayCollectionName' })),
    l10nAttrOsLocalize: locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_OSLocalize_list' })),
    l10nViewColumnLabel: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_label' })),
    l10nAddTextTooltip: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_TextEN' })),
    l10nViewText: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Text' })),
  },
  labels: {
    l10nLabelDisplayName: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_TextEN' }),
    l10nUjStep1: locate('h5').withAttr({ 'data-section-name': 'Step1' }),
    l10nUjStep2: locate('h5').withAttr({ 'data-section-name': 'Step2' }),
    l10nUjHeader: locate('h5').inside(locate('div').withAttr({ class: 'sticky-header-holder' })),
    l10nEntityList: locate('h5').inside(locate('div').withAttr({ id: 'listViewContainerId' })),
    l10nEntityTitle: locate('span').inside(locate('h5').withAttr({ id: 'modelType' })),
    l10nEntityHeader: locate('h5').inside(locate('div').withAttr({ class: 'data-container header-items-holder' })),
    l10nEntityValue: locate('span').inside(locate('div').withAttr({ class: 'data-container header-items-holder' })),
    l10nEntityRel: locate('h4').inside(locate('a').withAttr({ id: 'ebsContainerContent_AT_LocalizeEntityCNDN_AT_LocalizeRel_collapse' })),
  },
  selector: {
    l10nResourceTable: locate('div').withAttr({ id: 'ebsContainerContent' }),
    l10nDataFormTable: locate('div').withAttr({ class: 'dx-datagrid-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_entityform_basicForms' })),
    l10nTinyMceLoc: locate('iframe').withAttr({ id: 'ebsContainerContent_template_ifr' }),
    l10nTinyMceId: 'ebsContainerContent_template',
    l10nCustomUjTable: locate('div').withAttr({ id: 'ftosCustomJourneysHolder' }),
    l10nDataModelTable: locate('div').withAttr({ id: 'ebsContainerContent_sys_entity_sys_attribute_entityView' }),
    l10nUjStepsTable: locate('div').withAttr({ id: 'ebsContainerContent_sys_entityformsection_entityform' }),
    l10nUjHeadersTable: locate('div').withAttr({ id: 'ebsContainerContent_entityformheaderitem_entityform' }),
    l10nOptionSetTable: locate('div').withAttr({ id: 'ebsContainerContent_optionSetItem_optionSet' }),
    l10nEntityViewTable: locate('div').withAttr({ id: 'ebsContainerContent_sys_entityviewcolumn_entityview' }),
    l10nViewTableColumn1Header: locate('div').withAttr({ class: 'dx-datagrid-text-content dx-text-content-alignment-left' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    l10nViewTableColumn2Header: locate('div').withAttr({ class: 'dx-datagrid-text-content dx-text-content-alignment-right' }).inside(locate('td').withAttr({ 'aria-colindex': '3' })),
  },
};
