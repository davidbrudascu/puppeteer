module.exports = {
  fields: {
    dataImExName: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    dataImExColumnName: locate('input').withAttr({ role: 'textbox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_columnName' })),
    dataImExImpAttrType: locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_dataImportAttributeTypeId_list' })),
  },
  buttons: {
    dataImExEntityPopupBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_entityId' })),
    dataImExAttributePopupBtn: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_attributeId' })),
    insertImportAttributeBtn: locate('div').withAttr({ id: 'ebsContainerContent_dataImportAttribute_dataimport_toolbar_item_1' }),
    insertListOfDataImportsBtn: locate('div').withAttr({ id: 'ebsContainerContent_dataimportitem_dataimport_toolbar_item_1' }),
    exportButton: locate('button').withAttr({class:'btn btn-fill btn-blue-states'})
  },
  selector: {
    dataImExEntityLookupTable: locate('div').withAttr({ id: 'ebsContainerContent_entityId_popupLkp_lookupgrid' }),
    listOfDataImportAttributes: locate('div').withAttr({ id: 'ebsContainerContent_dataImportAttribute_dataimport_wrap' }),
    listOfDataImports: locate('div').withAttr({ id: 'ebsContainerContent_dataimportitem_dataimport_wrap' }),
    dataImExAttributeLookupTable: locate('div').withAttr({ id: 'ebsContainerContent_attributeId_popupLkp_lookupgrid' }),
    // FIXME
    dataImExFileUpload: locate('input').withAttr({ type: 'file' }),
    dataImExTemplatesTable: locate('div').withAttr({ id: 'ebsContainerContent' }),
    dataImExDataImportLogsTable: locate('div').withAttr({ id: 'ebsContainerContent_dataImportLog_dataimportitem' }),
    dataImExImportEntityTable: locate('div').withAttr({ id: 'ebsContainerContent' }),
    dataImExRelLookupTable: locate('div').withAttr({ id: 'ebsContainerContent_AT_ExportDataRelation_AT_EntityForExportRelLkpId_AT_EntityForExportRelLkp' }),
  },
  checkbox: {
    dataImExRollBackCheckbox: locate('div').withAttr({ id: 'ebsContainerContent_rollbackError' }).withAttr({ role: 'checkbox' }),
  },
};
