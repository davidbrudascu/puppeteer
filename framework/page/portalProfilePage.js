module.exports = {
  fields: {
    nameInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_name'),
    descriptionInputField: locate('textarea').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_description'),
    searchNameSystemParameterIDInputField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Name, Filter cell' })).inside('#ebsContainerContent_systemParameterId_popupLkp_lookupgrid'),
    parameterValueInputField: locate('textarea').withAttr({ role: 'textbox' }).inside('#ebsContainerContent_parameterValue'),
    searchDisplayNameMenuItemInputField: locate('input').withAttr({ type: 'text' }).inside(locate('td').withAttr({ 'aria-label': 'Column Display Name, Filter cell' })).inside('#ebsContainerContent_attachToMenuItem_popupLkp_lookupgrid'),
  },
  buttons: {
    addCompanyLogoButton: locate('div').withAttr({ role: 'button' }).inside('#ebsContainerContent_companyLogo_uploader'),
    systemParameterValueInsertButton: '#ebsContainerContent_systemParameterOnPortalProfile_portalProfileId_portalProfile_toolbar_item_1',
    systemParameterIDButton: '#ebsContainerContent_systemParameterId_button',
    systemParameterIDPopupOKButton: '#ebsContainerContent_systemParameterId_popupLkp_lookupgrid_toolbar_item_4',
    attachMenuItemButton: '#attachToMenuItemBtn',
    showMenuItemsPopupOKButton: '#ebsContainerContent_attachToMenuItem_popupLkp_lookupgrid_toolbar_item_3',
    showDashboardInsertButton: '#ebsContainerContent_dashboardOnPortalProfile_portalProfileId_portalProfile_toolbar_item_1',
    addDashboardIDButton: '#ebsContainerContent_dashboardId_button',
    selectDashboardPopupOKButton: '#ebsContainerContent_dashboardId_popupLkp_lookupgrid_toolbar_item_4',
    yesAnswerButton: locate('span').withText('Yes').inside(locate('div').withAttr({ 'aria-label': 'Yes' })),
    openMenuButton: '#ebs-context-menu',
    systemParameterValueDeleteButton: '#ebsContainerContent_systemParameterOnPortalProfile_portalProfileId_portalProfile_toolbar_item_2',
    showMenuItemDeleteButton: '#ebsContainerContent_menuItemOnPortalProfile_portalProfileId_portalProfile_toolbar_item_1',
    showDashboardDeleteButton: '#ebsContainerContent_dashboardOnPortalProfile_portalProfileId_portalProfile_toolbar_item_2',
    deleteCompanyLogoButton: locate('a').withAttr({ class: 'remove-file-btn' }).inside('#ebsContainerContent_companyLogo_textBox'),
    deleteBackgroundImageButton: locate('a').withAttr({ class: 'remove-file-btn' }).inside('#ebsContainerContent_backgroundImage_textBox'),
    deleteLoginBackgroundImageButton: locate('a').withAttr({ class: 'remove-file-btn' }).inside('#ebsContainerContent_loginBackgroundImage_textBox'),
  },
  selector: {
    addCompanyLogoFileInput: locate('input').withAttr({ type: 'file' }).inside('#ebsContainerContent_companyLogo_uploader'),
    addLoginBackgroundImageFileInput: locate('input').withAttr({ type: 'file' }).inside('#ebsContainerContent_loginBackgroundImage_uploader'),
    addBackgroundImageFileInput: locate('input').withAttr({ type: 'file' }).inside('#ebsContainerContent_backgroundImage_uploader'),
    accountDropdown: locate('span').withText('Administrator').inside(locate('ul').withAttr({ class: 'nav navbar-nav navbar-right' })),
    languageSelectorDropdown: locate('span').withText('Language').inside(locate('ul').withAttr({ class: 'account-dropdown-holder' })),
    logoImgContainer: locate('div').withAttr({ class: 'logoImg' }).first(),
  },
  dashboard: {
    mainDashboard: locate('a').withAttr({ 'data-dashboard-name': 'Main Dashboard' }).inside(locate('ul').withAttr({ role: 'tablist' })),
    localizeENDashboard: locate('a').withAttr({ 'data-dashboard-name': 'LocalizeEN' }).inside(locate('ul').withAttr({ role: 'tablist' })),
  },
  container: {
    menuContainer: '#menuSideScroll',
    container: '#ebsContainer',
    systemParameterValueContainer: '#ebsContainerContent_systemParameterOnPortalProfile_portalProfileId_portalProfile',
    showMenuItemsContainer: '#ebsContainerContent_menuItemOnPortalProfile_portalProfileId_portalProfile',
    showDashboardContainer: '#ebsContainerContent_dashboardOnPortalProfile_portalProfileId_portalProfile',
    attachToMenuItemContainer: '#ebsContainerContent_attachToMenuItem_popupLkp_lookupgrid',
    systemParameterContainer: '#ebsContainerContent_systemParameterId_popupLkp_lookupgrid',
  },
};
