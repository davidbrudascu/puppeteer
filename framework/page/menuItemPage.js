module.exports = {
  fields: {
    menuItemsChildrenGridField: locate('h4').withText('Menu Items Children').inside(locate('div').withAttr({ id: 'childrenMenuItem' })),
    displayNameMenuField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    searchAfterDisplayName: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Filter cell' }).withAttr({ 'aria-colindex': '3' })).inside('#ebsContainerContent_menuItem_parentMenuItemid_menuItem_children'),
    searchAfterDisplayNoIdName: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Display Name, Filter cell' })),
    inputNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })),
    inputCodeField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })),
    inputValueField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })),
    searchInMenuPortalField: locate('input').withAttr({ id: 'mainMenuSearchInput' }),
    clearSearchFieldPortal: locate('a').withAttr({ id: 'clearSearchMenu' }),
    resultForNodataInTable: locate('span').withText('No data').inside(locate('div').withAttr({ id: 'ebsContainerContent_menuItemXsecurityRole' })),
    resultReportForNodataInTable: locate('span').withText('No data').inside(locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children' })),
    customUJSearchField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Custom Journey, Filter cell' })),
  },
  buttons: {
    insertNewMenuItemBtn: locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_toolbar_item_1' }),
    addMenuTypeListBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_type_list' })),
    entityViewBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityViewId_dropDownBox' })),
    entityIdDropboxBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityId_dropDownBox' })),
    customIdDropboxBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_customActionId_dropDownBox' })),
    insertEntityFormBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_insertEntityFormId_dropDownBox' })),
    insertEditEntityFormBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_editEntityFormId_dropDownBox' })),
    deleteMenuSectionBtn: locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_toolbar_item_2' }),
    reportEntityBtn: locate('div').withAttr({ id: 'ebsContainerContent_reportId_button' }),
    reportEntityDropboxBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_reportId' })),
    okReportDropboxBtn: locate('div').withAttr({ id: 'ebsContainerContent_reportId_popupLkp_lookupgrid_toolbar_item_4' }),
  },
  labels: {
    businessEntityField: locate('div').withText('Business Entity'),
    customJourneyEntityField: locate('div').withText('Custom Journey'),
    reportEntityField: locate('div').withText('Report'),
    addMenuItemBtn: locate('span').withText('Add Menu Item'),
    viewEntityGrid: locate('div').withAttr({ id: 'ebsContainerContent_entityViewId_dataGrid' }),
    entityDataGrid: locate('div').withAttr({ id: 'ebsContainerContent_entityId_dataGrid' }),
    customDataGrid: locate('div').withAttr({ id: 'ebsContainerContent_customActionId_dataGrid' }),
    reportDataGrid: locate('div').withAttr({ id: 'ebsContainerContent_reportId_popupLkp_lookupgrid' }),
    entityFormIdGrid: locate('div').withAttr({ id: 'ebsContainerContent_insertEntityFormId_dataGrid' }),
    editEntityFormIdGrid: locate('div').withAttr({ id: 'ebsContainerContent_editEntityFormId_dataGrid' }),
  },
  table: {
    fourthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '4' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children' })),
    fifthElementRowOfTable: locate('tr').withAttr({ 'aria-rowindex': '5' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children' })),
    tableIndexOrder1: locate('td').withText('1').inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).last(),
    tableIndexOrder2: locate('td').withText('2').inside(locate('tr').withAttr({ 'aria-rowindex': '2' })).last(),
    tableIndexOrder3: locate('td').withText('3').inside(locate('tr').withAttr({ 'aria-rowindex': '3' })).last(),
    tableIndexOrder4: locate('td').withText('4').inside(locate('tr').withAttr({ 'aria-rowindex': '4' })).last(),
    tableIndexOrder5: locate('td').withText('5').inside(locate('tr').withAttr({ 'aria-rowindex': '5' })).last(),
  },
  checkbox: {
    useMenuDisplayName: locate('div').withAttr({ id: 'ebsContainerContent_useMenuDisplayNameAsViewTitle' }),
    divForCheckForAll: locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_wrap' }),
    selectAllRecordsFromTale: locate('.dx-select-checkbox').inside(locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children_wrap' })),
    unselectSecondElementFromTable: locate('.dx-select-checkbox').inside(locate('tr').withAttr({ 'aria-rowindex': '2' })),
    disableMenuItemCheckbox: locate('div').withAttr({ id: 'ebsContainerContent_disabled' }),
  },
  container: {
    defaultContainer: locate('div').withAttr({ id: 'ebsContainerContent' }),
    childrenMenuItemsContainer: locate('div').withAttr({ id: 'ebsContainerContent_menuItem_parentMenuItemid_menuItem_children' }),
  },
};
