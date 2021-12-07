module.exports = {
  fields: {
    dpResultsField: locate('div').withAttr({ class: 'dx-datagrid-content' }),
    dpPackageNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_modulename' })),
    dpPackageVersion: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_version' })),
    dpPackageComponentsTable: locate('div').withAttr({ class: 'dx-datagrid-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_customizationsetitem_customizationset' })),
    //dpComponentSearchNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('tr').withAttr({ class: 'dx-row dx-column-lines dx-datagrid-filter-row noselect' })),
    dpComponentSearchNameField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Filter cell' })),
    dpMainPagePackageNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('tr').withAttr({ class: 'dx-row dx-column-lines dx-datagrid-filter-row noselect' })),
  },
  buttons: {
    exportBasicButton: '#ExportCSBtn',
    dpInsertComponentButton: locate('div').withAttr({ id: 'csItemAddBtn' }).inside(locate('div').withAttr({ id: 'ebsToolbar' })),
    dpDeleteComponentButton: locate('div').withAttr({ idx: '0' }).inside(locate('div').withAttr({ id: 'ebsToolbar' })),
    dpComponentResultInsertButton: locate('div').withAttr({ id: 'csDataGridContainer_toolbar_item_1' }).inside(locate('div').withAttr({ id: 'ebsToolbar' })),
  },
  selector: {
    dpTypeComponent: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'typeCtrl' })),
    dpComponentFirstResult: locate('tr').withAttr({ 'aria-rowindex': '1' }).inside(locate('tbody').withAttr({ role: 'presentation' })),
    dpComponentItem: locate('td').withAttr({ 'aria-colindex': '2' }).inside(locate('tbody').withAttr({ role: 'presentation' })),
  },
  locate: {
    locateGridcell: locate('td').withAttr({ role: 'gridcell' }),
  },
  container: {
    csDataGridContainer: '#csDataGridContainer',
  },
};
