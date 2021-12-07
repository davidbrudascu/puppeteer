module.exports = {
  fields: {
    ffCityLookupSearchFieldDropdown: locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': '1' })).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_ForFFCityId_dataGrid' })),
  },
  container: {
    formTable: '.dx-datagrid-rowsview', // daca nu dai cu xpath
    fieldOptionsTable: '#ebsContainerContent_sys_entityformoptionfield_entityform',
    firstFieldOptionsRow: '#ebsContainerContent_sys_entityformoptionfield_entityform',
    defaultContainerContent: locate('div').withAttr({id: 'ebsContainerContent'}),
  },
  buttons: {
    fieldOptions: '.stepNumber-4',
    insertFieldOption: '#ebsContainerContent_sys_entityformoptionfield_entityform_toolbar_item_1',
    attributeField: '#ebsContainerContent_attributeId_button',
    virtualAttributeField: '#ebsContainerContent_virtualAttributeId_button',
    lookupAsDropdownCheckbox: '#ebsContainerContent_lookupAsDropDown',
    radioButtonCheckbox: '#ebsContainerContent_fieldIsRadioGroup',
  },
  checkbox: {
    makeReadOnly: '#ebsContainerContent_fieldIsReadOnly div span',
    isDefaultForEdit: '#ebsContainerContent_isdefaultEdit',
    isDefaultCheckbox: '#ebsContainerContent_isdefault',
  },
  popup: {
    isDefaultPopup: locate('div').withText('This entity has another default form.').withText('After saving this will be the default one.').inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })),
  },
  labels: {
    nameLabel: locate('div').withText('Name'),
  },
};
