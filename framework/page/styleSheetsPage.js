module.exports = {
  fields: {
    nameField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    codeField: '//*[@id="ebsContainerContent_code_MonacoCss"]/div/div[1]/div[2]/div[1]/div[4]/div',
    searchMenuField: locate('i').withAttr({ class: 'dx-icon dx-icon-filter-operation-default' }).inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': '2' })).inside('#ebsContainerContent'),
    searchEqual: locate('i').withAttr({ class: 'dx-icon dx-icon-filter-operation-equals' }),
    searchStyleSheet : locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': '2' })).inside('#ebsContainerContent')
  },
  entities: {
    styleSheetCreateDelete: locate('td').withText('AT_StyleSheet'),
    styleSheetEditCheck: locate('td').withText('AT_StyleSheetEdit'),
  },
  container: {
    titleContainer: locate('div').withAttr({ class: 'ew-form-title border-radius-top block-height-4rem block-line-height-4rem block-ftosblue' }),
    containerContent: '#ebsContainerContent',
  },
};
