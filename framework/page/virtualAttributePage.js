module.exports = {
  fields: {
    vaAttributeOptionSet: '#ebsContainerContent_OptionSet_list div div div input',
    vaAttributeName: '#ebsContainerContent_Name div div input',
    vaAttributeDisplayName: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    vaAttributeText: '#ebsContainerContent_Text div div input',
    vaAttributeProductLookupTable: '#ebsContainerContent_AT_EntForRelatedVAId_button',
    vaAttributeProductLookupTableEdit: '#ebsContainerContent_AT_EntForRelatedVAId_buttonEdit',
    vaAttributeRelatedValue: '#ebsContainerContent_AT_EntForRelatedVAId_Value div div input',
    vaAttributeRelatedCode: '#ebsContainerContent_AT_EntForRelatedVAId_Code div div input',
    vaAttributeRelatedCurrency: '#ebsContainerContent_AT_EntForRelatedVAId_AT_EntForRelCurrencyId div div div div input',
    vaAttributeRelatedCurrencyLookupTable: '#ebsContainerContent_AT_EntForRelatedVAId_AT_EntForRelCurrencyId_button',
    vaAttributeRelatedDescription: '#ebsContainerContent_AT_EntForRelatedVAId_Description div div input',
    vaAttributeEntValue: '#ebsContainerContent_Value div div input',
    vaAttributeEntCode: '#ebsContainerContent_Code div div input',
    vaAttributeEntCurrency: '#ebsContainerContent_AT_EntForRelCurrencyId_textBox div div input',
    vaAttributeRelatedName: '#ebsContainerContent_AT_EntForRelatedVAOwnedId_Name div div input',
    vaAttributeOwnerProduct: '#ebsContainerContent_AT_EntForRelatedVAOwnedId div div div div input',
    vaAttributeOwnerCode: '#ebsContainerContent_AT_EntForRelatedVAOwnedId_Code div div input',
    vaAttributeOwnerValue: '#ebsContainerContent_AT_EntForRelatedVAOwnedId_Value div div input',
    vaAttributeOwnerCurrency: '#ebsContainerContent_AT_EntForRelatedVAOwnedId_AT_EntForRelOwnCurrencyId div div div div input',
    vaAttributeOwnerCurrencyLookupTable: '#ebsContainerContent_AT_EntForRelatedVAOwnedId_AT_EntForRelOwnCurrencyId_button',
    vaAttributeOwnerEntCurrency: '#ebsContainerContent_AT_EntForRelOwnCurrencyId_textBox div div input',
    relatedCodeEnAT_LocalizeVAField: locate('input').withAttr({ type: 'text' }).inside(locate('#ebsContainerContent_AT_EntForLocalizeVAId_Code')),
    labelHeaderVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_label'),
    inputName01Field: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_Name_01'),
    inputNameVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_att_lkp_02_to_01_Name_02'),
    inputNameAtt_textVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_att_lkp_02_to_01_att_text_02'),
    inputNameAtt_numericVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_att_lkp_02_to_01_att_numeric_02'),
    inputNameAtt_DateVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_att_lkp_02_to_01_att_date_02'),
    inputNameAtt_InvarDateVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_att_lkp_02_to_01_att_invar_date_02'),
    inputNameAtt_LookupVAField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_att_lkp_02_to_01_att_lkp_02_to_01_textBox'),
  },
  buttons: {
    dropdownLookupArrowAT_LocalizeVA: '#ebsContainerContent_AT_EntForLocalizeVAId_button',
    okButtonLookupTableAT_LocalizeVA: '#ebsContainerContent_AT_EntForLocalizeVAId_popupLkp_lookupgrid_toolbar_item_4',
    okButtonLookupTableAT_EntForRelatedVA: '#ebsContainerContent_AT_EntForRelatedVAId_popupLkp_lookupgrid_toolbar_item_4',
    okButtonLookupTableAT_EntForRelCurrency: '#ebsContainerContent_AT_EntForRelatedVAId_AT_EntForRelCurrencyId_popupLkp_lookupgrid_toolbar_item_4',
    insertNewHeaderItems: '#ebsContainerContent_entityformheaderitem_entityform_toolbar_item_1',
    dropdownVirtualAttributeId: '#ebsContainerContent_virtualAttributeId_button',
    okPopupVirtualAttributeBtn: '#ebsContainerContent_virtualAttributeId_popupLkp_lookupgrid_toolbar_item_3',
    finishButton: locate('button').withText('Finish'),
    dropdownLookup02_to_01Button: '#ebsContainerContent_att_lkp_02_to_01_att_lkp_02_to_01_button',
    removeLookupAttributeButton: '#ebsContainerContent_att_lkp_02_to_01_att_lkp_02_to_01_popupLkp_lookupgrid_toolbar_item_2',
    okPopupLookupgridButton: '#ebsContainerContent_att_lkp_02_to_01_att_lkp_02_to_01_popupLkp_lookupgrid_toolbar_item_4',
    deleteHeaderItemsButton:'#ebsContainerContent_entityformheaderitem_entityform_toolbar_item_2'
  },
  labels: {
    nameLabel: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_Name' }),
    lookupAT_LocalizeVALabel: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_AT_EntForLocalizeVAId' }),
    customTestAT_LocalizeVALabel: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_CustomTest' }),
    relatedCodeAT_LocalizeVALabel: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_AT_EntForLocalizeVAId_Code' }),
    headerItemsHolderLabel: locate('div').withAttr({ class: 'data-container header-items-holder' })
  },
  selector: {
    attributeRequired: '.ebs-required',
    vaAttributeTextId: 'ebsContainerContent_Text',
    vaAttributeRelatedProductId: 'ebsContainerContent_AT_EntForRelatedVAId_textBox',
    vaAttributeLookupTableState: '.dx-state-readonly',
    vaAttributeOwnerProductId: 'ebsContainerContent_AT_EntForRelatedVAOwnedId_textBox',
    vaAttributeOwnerCurrencyId: 'ebsContainerContent_AT_EntForRelatedVAOwnedId_AT_EntForRelOwnCurrencyId_textBox',
    vaMenuItemsTable: '#ebsContainerContent div div div table tbody',
    vaProductLookupTable: locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForRelatedVAId_popupLkp_lookupgrid' }),
    vaCurrencyLookupTable: locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForRelatedVAId_AT_EntForRelCurrencyId_popupLkp_lookupgrid' }),
    vaOwnedCurrencyLookupTable: locate('div').withAttr({ id: 'ebsContainerContent_AT_EntForRelatedVAOwnedId_AT_EntForRelOwnCurrencyId_popupLkp_lookupgrid' }),
  },
  checkbox: {
    useVirtualAttribute: '#useVirtualAttributeId'
  },
  container: {
    lookupContainerAT_LocalizeVA: '#ebsContainerContent_AT_EntForLocalizeVAId_popupLkp_lookupgrid',
    virtualAttributeTableContainer: '#ebsContainerContent_virtualAttributeId_popupLkp_lookupgrid',
    defaultContainer: '#ebsContainerContent',
    popupLkpGridContainer: '#ebsContainerContent_att_lkp_02_to_01_att_lkp_02_to_01_popupLkp_lookupgrid',
    entityFormHeaderItemContainer: '#ebsContainerContent_entityformheaderitem_entityform'
  },
};
