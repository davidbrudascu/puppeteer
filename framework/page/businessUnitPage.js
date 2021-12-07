module.exports = {
  fields: {
    inputNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    businessUnitSearchField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })),
    noDataField: locate('.dx-datagrid-nodata').inside('#ebsContainerContent'),
  },
  container: {
    lookupAsDropdownContainer: '#ebsContainerContent_Lookup_dataGrid',
    lookupAsDDParentContainer: '#ebsContainerContent_parentBusinessUnitId_popupLkp_lookupgrid',
    defaultContainer: '#ebsContainerContent',
  },
  buttons: {
    lkpAsDDParentBusinessButton: '#ebsContainerContent_parentBusinessUnitId_button',
    okLkpAsDDParentPopup: '#ebsContainerContent_parentBusinessUnitId_popupLkp_lookupgrid_toolbar_item_4',
    insertLkpAsDDParentPopup: '#ebsContainerContent_parentBusinessUnitId_popupLkp_lookupgrid_toolbar_item_3',
  },
  table: {
    firstTableRow: locate('tr').withAttr({ 'aria-rowindex': '1' }),
  },
};
