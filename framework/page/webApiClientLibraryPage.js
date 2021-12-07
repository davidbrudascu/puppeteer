module.exports = {
  fields: {
    webApiClientLibraryResultsTable: locate('table').withAttr({ style: 'table-layout: fixed;' }).inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
    webApiClientLibraryNameField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    webApiClientLibraryDescriptionField: locate('textarea').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_description' })),
    webApiClientLibraryVersionField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_minPlatformVersion' })),
    webApiClientLibraryApiDefinitionField: locate('textarea').withAttr({ class: 'dx-texteditor-input' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_apiDefinition' })),
    webApiClientLibraryTypeScriptField: locate('div').withAttr({ class: 'view-lines' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_typescriptDefinitionmonaco' })),
    workflowResultsTable: locate('div').withAttr({ class: 'dx-datagrid-rowsview dx-datagrid-nowrap' }).inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
    serverScriptCodeMonacoField: locate('div').withAttr({ class: 'view-line' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_codemonaco' })),
    widgetSuggestion: locate('span').withAttr({ class: 'parameter active' }).inside(locate('div').withAttr({ widgetid: 'editor.widget.parameterHintsWidget' })),
    webApiClientLibrarySearchField: locate('input').withAttr({ class: 'dx-texteditor-input' }).inside(locate('tr').withAttr({ class: 'dx-row dx-column-lines dx-datagrid-filter-row noselect' })),
  },
  tabs: {
    typescriptDefinitionTab: locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-2' }).inside(locate('div').withAttr({ id: 'stepper' })),
    generalTab: locate('div').withAttr({ class: 'dx-item dx-tab stepNumber-1' }),
  },
  buttons: {
    webApiClientLibraryApiTypeButton: locate('div').withAttr({ class: 'dx-button-content' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_apiType_list' })),
  },
  selector: {
    webApiClientLibraryResultsRow: locate('td').withAttr({ 'aria-label': 'Select row' }).inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
  },
  locate: {
    openApiSwagger: locate('pre').withAttr({ style: 'word-wrap: break-word; white-space: pre-wrap;' }),
    wsdlApiService: locate('div').withAttr({ class: 'folder' }),
  },
};
