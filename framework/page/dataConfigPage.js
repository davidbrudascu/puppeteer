module.exports = {
  fields: {
    nameInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    displayNameInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_displayName'),
    searchNameMasterEntityLookupInputField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })).inside('#ebsContainerContent_lkpMasterEntity_popupLkp_lookupgrid'),
    searchNameInputField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })),
    descriptionInputField: locate('textarea').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_description'),
  },
  buttons: {
    lookupArrowDownMasterEntity: '#ebsContainerContent_lkpMasterEntity_button',
    okButtonMasterEntityLookup: '#ebsContainerContent_lkpMasterEntity_popupLkp_lookupgrid_toolbar_item_3',
    regenerateButton: '#buttonRegenerateTextId',
    editButtonDefinitionTable: locate('a').withText('Edit').inside(locate('td').withAttr({ 'aria-colindex': '7' })),
    dropdownButtonIdentificationConstraintName: locate('div').withAttr({ role: 'button' }).withAttr({ class: 'dx-button-normal dx-button-mode-contained dx-widget dx-dropdowneditor-button' }),
    saveButton: locate('div').withAttr({ 'aria-label': 'Save' }),
  },
  selector: {
    tabList: locate('div').withAttr({ id: 'stepper' }),
  },
  table: {
    nameColumnTable: locate('div').withText('Name').inside(locate('td').withAttr({ 'aria-label': 'Column Name' })),
    typeColumnTable: locate('div').withText('Type').inside(locate('td').withAttr({ 'aria-label': 'Column Type' })),
    entityNameColumnTable: locate('div').withText('Entity Name').inside(locate('td').withAttr({ 'aria-label': 'Column Entity Name' })),
    includeColumnTable: locate('div').withText('Include').inside(locate('td').withAttr({ 'aria-label': 'Column Include' })),
    identificationConstraintNameColumnTable: locate('div').withText('Identification Constraint Name').inside(locate('td').withAttr({ 'aria-label': 'Column Identification Constraint Name' })),
  },
  container: {
    defaultContainer: '#ebsContainerContent',
    masterEntityContainer: '#ebsContainerContent_lkpMasterEntity_popupLkp_lookupgrid',
  },
};
