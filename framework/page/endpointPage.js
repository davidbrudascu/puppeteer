module.exports = {
  fields: {
    nameField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    displayNameField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_displayName'),
    scriptName: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_workflowId_textBox'),
    searchByNameField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
  },
  buttons: {
    scriptDropdownArrow: '#ebsContainerContent_workflowId_button',
    okButtonScriptWindow: '#ebsContainerContent_workflowId_popupLkp_lookupgrid_toolbar_item_4',
  },
};
