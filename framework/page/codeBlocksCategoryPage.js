module.exports = {
  fields: {
    searchByNameField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })),
    nameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    displayNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    statusIdDropdownActiveOption: locate('p').withAttr({ title: 'Active' }).inside(locate('div').withAttr({ role: 'option' })),
    statusIdDropdownInactiveOption: locate('p').withAttr({ title: 'Inactive' }).inside(locate('div').withAttr({ role: 'option' })),
    statusIdDropdownSelectedOption: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_statusId_list' }))
  },
  buttons: {
    insertButtonCategory: '#ebsContainerContent_optionSetItem_optionSet_toolbar_item_1',
    deleteButtonCategory: '#ebsContainerContent_optionSetItem_optionSet_toolbar_item_2',
    statusIdDropdownButton: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_statusId_list' })),
    checkoutButton: '#afterGenerateJsCheckOutButtonId',
  },
  container: {
    optionSetListContainer: locate('div').withAttr({ id: 'ebsContainerContent' }),
  },
};
