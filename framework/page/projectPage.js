module.exports = {
  fields: {
    nameInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    codeInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_code'),
    descriptionInputField: locate('textarea').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_description'),
    searchByNameDAInputApplicationField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '1' })),
    searchByNameInputField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
  },
  buttons: {
    insertProjectDigitalAssetButton: '#ebsContainerContent_projectApplication_projectId_project_forProject_toolbar_item_1',
    arrowDownAddDAButtonProjectButton: '#ebsContainerContent_applicationId_button',
    okButtonSelectDAApplication: '#ebsContainerContent_applicationId_popupLkp_lookupgrid_toolbar_item_4',
    insertButtonSelectDAApplication: '#ebsContainerContent_applicationId_popupLkp_lookupgrid_toolbar_item_3',
    arrowDownAddProjectDPButton: '#ebsContainerContent_projectId_button',
    okButtonAddProjectDP: '#ebsContainerContent_projectId_popupLkp_lookupgrid_toolbar_item_4',
    exportProjectDPButton: '#ExportProjectDeploymentPackageBtn',
    deleteDAProjectButton: '#ebsContainerContent_projectApplication_projectId_project_forProject_toolbar_item_2'
  },
  checkbox: {
    checkedCheckbox: locate('div').withAttr({ 'aria-checked': 'true' }),
  },
  table: {
    seventhPositionLine: locate('td').withAttr({ 'aria-colindex': '7' }),
    digitalAssetNameColumnName: locate('td').withAttr({ 'aria-label': 'Column Digital Asset Name' }),
    digitalAssetCodeColumnName: locate('td').withAttr({ 'aria-label': 'Column Digital Asset Code' }),
    digitalAssetVersionColumnName: locate('td').withAttr({ 'aria-label': 'Column Digital Asset Version' }),
    digitalAssetTypeColumnName: locate('td').withAttr({ 'aria-label': 'Column Digital Asset Type' }),
    digitalAssetStatusColumnName: locate('td').withAttr({ 'aria-label': 'Column Digital Asset Status' }),
    includedColumnName: locate('td').withAttr({ 'aria-label': 'Column Included' }),
  },
  container: {
    projectDigitalAssetContainer: '#ebsContainerContent_projectApplication_projectId_project_forProject',
  }
};
