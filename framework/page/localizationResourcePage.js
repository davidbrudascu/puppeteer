module.exports = {
  fields: {
    moduleNameInput: locate('input').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_ModuleName'),
    resourceNameInput: locate('input').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_ResourceKey'),
    cultureNameDropdown: locate('div').withAttr({ role: 'button' }).inside(locate('div').withAttr({ class: 'resource_cultureHolder dx-show-invalid-badge dx-selectbox dx-textbox dx-texteditor dx-dropdowneditor-button-visible dx-editor-outlined dx-widget dx-dropdowneditor dx-dropdowneditor-field-clickable' })),
    valueInput: locate('input').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_Value'),
  },
  selector: {
    englishOption: locate('div').withText('English').inside(locate('div').withAttr({ role: 'option'})),
  },
  container: {
    defaultContainer: '#ebsContainerContent',
  },
 };
