module.exports = {
  fields: {
    codeBlockName: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_Name'),
    codeBlockDisplayName: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_DisplayName'),
    categoryField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_Category_container_multiselect'),
    searchByNameField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })),
  },
  dropdown: {
    dropdownButtonUsage: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_UsageLocation_list' })),
    categoryToSelect: locate('div').withAttr({ role: 'option' }),
  },
  buttons: {
    removeCategoryButton: locate('div').withAttr({ class: 'dx-tag-remove-button' }).inside('#ebsContainerContent_Category'),
    afterEvents: '//*[@id="ui-id-2"]',
    codeBlockInsertDiv: locate('div').withAttr({ id: 'codeBlocksContentId' }),
    insertCodeButton: locate('button').withText('Insert code'),
    checkoutButton: '#afterGenerateJsCheckOutButtonId',
  },
  selectors: {
    categoryMultiselectDiv: '#ebsContainerContent_Category_container_multiselect',
    monacoEditor: '//*[@id="ebsContainerContent_Codemonaco"]/div/div[1]/div[2]/div[1]/div[4]/div',
    monacoEditorId0: 0,
    monacoEditorId1: 1,
    monacoEditorId2: 2,
    monacoEditorId3: 3,
    afterEventsEditor: '//*[@id="ebsContainerContent_afterGenerateJsmonaco"]/div/div[1]/div[2]/div[1]/div[4]/div',
    rightClickCodeBlocksOption: locate('span').withText('Insert Code Block').inside(locate('a').withAttr({ role: 'menuitem' })),
    codePreview: locate('span').withText('Code block works yay').inside(locate('code').withText('ebs.showMessage(')),
  },
  containers: {
    defaultContainer: '#ebsContainerContent',
  },
};
