module.exports = {
  buttons: {
    insertEndpointButton: "#ebsContainerContent_action_workflow_toolbar_item_1",
    deleteEndpointButton: "#ebsContainerContent_action_workflow_toolbar_item_2",
    afterEvents: '//*[@id="ui-id-2"]'
  },
  fields: {
    endpointName: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    endpointDisplayName: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_displayName'),
    endpointSearchByNameField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })).inside(locate('div').withAttr({ class: 'row wf-form-actions' }))
  },
  selector: {
    afterEventsEditorId0: 0,
    afterEventsEditorId1: 1,
    afterEventsEditorId2: 2,
    afterEventsEditorId3: 3,
    afterEventsEditor: '//*[@id="ebsContainerContent_afterGenerateJsmonaco"]/div/div[1]/div[2]/div[1]/div[4]/div',
  }
};
