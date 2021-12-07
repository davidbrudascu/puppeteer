module.exports = {
  fields: {
    nameField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    displayNameField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_displayName'),
    descriptionField: locate('textarea').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_description'),
    dataTypeInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_type_list'),
    searchByNameField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    widgetSuggestion: locate('div').withAttr({ widgetid: 'editor.widget.suggestWidget' }),
    nameSearchFieldOutputStructEntity: '//*[@id="ebsContainerContent_outputStructureEntityId_dataGrid"]/div/div[5]/div/table/tbody/tr[2]/td[1]/div/div[2]/div/div/div[1]/input',
    outputStructureTypeInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureType_list' })),
    outputParameterTypeInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputParameterType_list' })),
    outputStructureEntityInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureEntityId_dropDownBox' })),
    nameFieldEntitySearch: (locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '1' })).inside('#ebsContainerContent_entityId_popupLkp_lookupgrid')),
  },
  buttons: {
    dropdownArrowScriptType: locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_workflowTypeId_list' })),
    insertEndPointButton: '#ebsContainerContent_action_workflow_toolbar_item_1',
    insertWorkflowInputParam: '#ebsContainerContent_workflowInputParameter_workflowId_workflow_toolbar_item_1',
    dropdownArrowDataType: locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_type_list' })),
    dropdownArrowOutputStructureType: locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureType_list' })),
    dropdownArrowOutputParamType: locate('div').withAttr({ class: 'dx-dropdowneditor-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputParameterType_list' })),
    dropdownArrowOutputStructureEntity: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_outputStructureEntityId_dropDownBox' })),
    extendMonacoCodeEditorButton: '//*[@id="ebsContainerContent_code"]/div[1]/a',
    closeMonacoEditorButton: '//*[@id="mncFullScreenPopup"]/div/div/div[1]/div/div[3]/div/div/div',
    dropdownEvent: '#ebsContainerContent_workflowEventId_button',
    dropdownStage: '#ebsContainerContent_workflowStageId_button',
    dropdownEntity: '#ebsContainerContent_entityId_button',
    okButtonEvent: '#ebsContainerContent_workflowEventId_popupLkp_lookupgrid_toolbar_item_4',
    okButtonStage: '#ebsContainerContent_workflowStageId_popupLkp_lookupgrid_toolbar_item_4',
    okButtonEntity: '#ebsContainerContent_entityId_popupLkp_lookupgrid_toolbar_item_4',
    checkoutCodeButton: '#codeCheckOutButtonId',
  },
  selector: {
    firstLineCodeMonacoEditor: '//*[@id="ebsContainerContent_codemonaco"]/div/div[1]/div[2]/div[1]/div[4]/div',
    firstLineOutputStructureEditor: '//*[@id="ebsContainerContent_outputStructureCustommonaco"]/div/div[1]/div[2]/div[1]/div[4]/div',
    codeMonacoEditorID0: '0',
    codeMonacoEditorID2: '2',
  },
  tabs: {
    inputParametersTab: locate('span').withText('Input Parameters').inside(locate('div').withAttr({ id: 'stepper' })),
    generalTab: locate('span').withText('General').inside(locate('div').withAttr({ id: 'stepper' })),
    outputStructureTab: locate('span').withText('Output Structure').inside(locate('div').withAttr({ id: 'stepper' })),
  },
  tables: {
    workflowInputTable: '#ebsContainerContent_workflowInputParameter_workflowId_workflow',
  },
  checkboxes: {
    allowNullOrEmptyValueCheckbox: '#ebsContainerContent_allowNull',
  },
  errors: {
    onDemandFirstError: locate('div').withText('Script Works').inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })),
    onDemandSecondError: locate('div').withText('Script Works Update').inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })),
    onDemandThirdError: locate('div').withText('host@change.me').inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })),
    onDemandFourthError: locate('div').withText('Updated: host@change.me').inside(locate('div').withAttr({ class: 'jq-toast-wrap bottom-center' })),
  },
  container: {
    portalEntityRecordContainer: '#ebsContainerContent',
  },
};