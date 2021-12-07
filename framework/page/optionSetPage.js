module.exports = {
  fields: {
    inputNameField: locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_name'})),
    inputNamePortalField: locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_Name'})),
    inputDisplayNameField: locate('input').withAttr({ type: 'text'}).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName'})),
    inputValueNameField : locate('input').withAttr( {type:'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_value'})),
    valueDivInputField: locate('div').withAttr({id:'ebsContainerContent_value'}),
    inputTableColumnNameField: locate('input').withAttr({ type: 'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_tableColumnName'})),
    nameOsAttributeField: locate('div').withText('OS Attribute'),
    inputValueOsAttributeField: locate('input').withAttr({ type: 'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_OSAttribute_list'})),
    statusIdField: locate('div').withText('StatusId'),
    inputNameReadOnly: locate('input').withAttr({ 'aria-readonly': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    inputIdReadOnly: locate('input').withAttr({ 'aria-disabled': 'true' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_id' })),
    inputOptionsetItem1: locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({id:'ebsContainerContent_OptionSet1_list'})),
    inputOptionsetItem: locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({id:'ebsContainerContent_OptionSet_list'})),
    inputOptionsetItem2: locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({id:'ebsContainerContent_OptionSet2_list'}))
  },
  buttons: {
    insertOptionSetItemBtn: locate('div').withAttr({id:'ebsContainerContent_optionSetItem_optionSet_toolbar_item_1'}),
    insertNewAttributeBtn: locate('div').withAttr({id:'ebsContainerContent_sys_entity_sys_attribute_entityView_toolbar_item_1'}),
    selectTypeAttributeBtn: locate('div').withAttr({id:'ebsContainerContent_attributeTypeId_list'}),
    openOptionSetList: locate('div').withAttr({id:'ebsContainerContent_optionSetId_button'}),
    okOptionSetListBtn: locate('div').withAttr({id:'ebsContainerContent_optionSetId_popupLkp_lookupgrid_toolbar_item_4'}),
    openOptionSetDefaultValue: locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_button'}),
    cancelPopupButton: locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid_toolbar_item_1'}),
    selectRequiredLevel: locate('div').withAttr({id:'ebsContainerContent_requiredLevelId_list'}),
    okSelectedOptionSetItem: locate('div').withAttr({id: 'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid_toolbar_item_3'}),
    selectOSAttribute: locate('div').withAttr({id: 'ebsContainerContent_OSAttribute_list'}),
    deleteOptionSetItemBtn: locate('div').withAttr({ id: 'ebsContainerContent_optionSetItem_optionSet_toolbar_item_2' }),
    closeErrorMessage: locate('span').withAttr({ class: 'close-jq-toast-single' }),
    dropdownOptionSet1List: locate('div').withAttr({id:'ebsContainerContent_OptionSet1_list'}),
    dropdownoptionSet2List: locate('div').withAttr({id:'ebsContainerContent_OptionSet2_list'}),
    dropdownoptionSetList: locate('div').withAttr({id:'ebsContainerContent_OptionSet_list'})
  },
  labels: {
    dataModelLink: locate('h4').withText('Data Model').inside(locate('a').withAttr({id:'ebsContainerContent_sys_entity_sys_attribute_entityView_collapse'})),
    attributeDataModelLabel: locate('div').withAttr({id:'ebsContainerContent_sys_entity_sys_attribute_entityView'}),
    waitForPopupOptionSetList: locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'}),
    columnNameOptionSet: locate('td').withAttr({'aria-label':'Column Name'}).withAttr({'aria-colindex':'2'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'})),
    columnValueOptionSet: locate('td').withAttr({'aria-label':'Column Value'}).withAttr({'aria-colindex':'3'}).inside(locate('div').withAttr({id:'ebsContainerContent_optionSetItemId_popupLkp_lookupgrid'}))
  },
  table: {
    relationTableDisplayed: locate('div').withAttr({id:'ebsContainerContent_optionSetItem_optionSet'}),
    optionSetTableAnchor: locate('div').withAttr({id:'ebsContainerContent_optionSetId_popupLkp_lookupgrid'}),
    thirdColumnFieldTable: locate('tr').withAttr( {'aria-rowindex':'3'})
  },
  container: {
    defaultContainer: locate('div').withAttr({ id:'ebsContainerContent'}),
  },
};
