module.exports = {
  buttons: {
    addStepbutton: '#fmLeftButtonsHolder',
    detailsButtons: locate('div').withAttr({ title: 'Details' }).inside('#fmRightButtonsHolder'),
    deleteButton: locate('div').withAttr({ title: 'Delete' }).inside('#fmRightButtonsHolder'),
    insertFlowControlRuleButton: '#ebsContainerContent_entityFormSectionRule_formSection_entityformsection_toolbar_item_1',
    addNewRuleExpressionButton: locate('div').withAttr({ class: 'dx-filterbuilder-action-icon dx-icon-plus dx-filterbuilder-action' }).inside('#ebsContainerContent_condition_filter_filterBuilder'),
    enterAValueButton: locate('div').withAttr({ class: 'dx-filterbuilder-text dx-filterbuilder-item-value' }).inside(locate('div').withAttr({ class: 'dx-filterbuilder-group-content' })),
    deleteFlowControlRuleButton: '#ebsContainerContent_entityFormSectionRule_formSection_entityformsection_toolbar_item_2',
    deleteStepsButton: '#ebsContainerContent_sys_entityformsection_entityform_toolbar_item_2',
  },
  fields: {
    nameInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    displayNameInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    addValueDREInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ class: 'dx-filterbuilder-text dx-filterbuilder-item-value' })),
    navigateToField: '#ebsContainerContent_navigateTo_list',
  },
  selector: {
    addConditionDRE: locate('span').withText('Add Condition').inside(locate('li').withAttr({ 'aria-label': 'Add Condition' })),
    navigateToDropdown: 'body > div.dx-overlay-wrapper.dx-dropdowneditor-overlay.dx-popup-wrapper.dx-dropdownlist-popup-wrapper.dx-selectbox-popup-wrapper > div',
    tabList: locate('div').withAttr({ id: 'stepper' }),
  },
  checkboxes: {
    cancelNavigationCheckbox: '#ebsContainerContent_cancelNavigation',
    closeFlowCheckbox: '#ebsContainerContent_closeFlow',
  },
};
