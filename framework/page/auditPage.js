module.exports = {
  fields: {
    auditNameLocateField:locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })),
    formHeadersHistoryTable:locate('h5').withText('AT_AuditInsert_ADTs list'),
    operationNameInsertHistoryTable:locate('td').withText('Insert'),
    firstRowHistory:locate('tr').withAttr({ 'aria-rowindex': '1' }),
    secondRowHistory:locate('tr').withAttr({ 'aria-rowindex': '2' })
  },
  container:  {
    containerContent:locate('div').withAttr({ id: 'ebsContainerContent' }),
  },
};
