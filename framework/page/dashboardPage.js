module.exports = {
  buttons: {
    deploymentPackagesButton: '.fa-archive',
    bussinessEntitiesButton: '.fa-sitemap',
    mainMenuButton: '#ebs-context-menu',
    menuFintechAutomationButton: '//*[@id="topMenuContainer"]/li[3]/label',
    menuBusinessWorkflowButton: '#topMenuContainer > li:nth-child(4) ul li:nth-child(1)',
    businessWorkflowDesigner: '#topMenuContainer li:nth-child(4) ul li:nth-child(1) ul li:nth-child(2) a',
    businessWorkflowConfigurations: '#topMenuContainer li:nth-child(4) ul li:nth-child(1) ul li:nth-child(3) a',
    evolutiveDataModel: '#topMenuContainer li:nth-child(2) label',
    dataModelExplorer: '#topMenuContainer li:nth-child(2) ul li:nth-child(2) a',
    addHtmlWidgetButton: locate('button').withAttr({ id: 'designer_detailsSaveBtn' }),
    deleteWidgetButton: locate('button').withAttr({ id: 'designer_detailsDeleteBtn' }),
    deleteIconWidget: locate('span').withAttr({ class: 'pe-7s-junk' }).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })),
    addWidgetButton: '#designer_toolbarAddBtn',
    radioButton: locate('div').withAttr({ class: 'dx-radio-value-container' }).inside('#designer_entityShortcutOperationRadio'),
    closeSearchMenu: '#ebs-context-menu',
  },
  fields: {
    addWidgetNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })),
    addWidgetTitleField: locate('input').withAttr({ type: 'text'}).inside(locate('div').withAttr({ id: 'ebsContainerContent_Title'})),
    addDashboardNameField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_name' })),
    addDashboardDisplayName: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_displayName' })),
    addDashboardCodeField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })),
    addTitleWidgetField: locate('textarea').withAttr({ id: 'designer_titleTextBox' }),
    dashboardTargetField: locate('div').withAttr({ dashboardtarget: 'htmlwidget' }),
    addDescriptionDashboardField: locate('textarea').withAttr({ id: 'designer_descriptionTextBox' }),
    addTagWidgetDashboardField: locate('input').withAttr({ id: 'designer_tagTextBox' }),
    attributeNameField: locate('div').withText('Name').inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
    attributeCodeField: locate('div').withText('Code').inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
    attributeValueField: locate('div').withText('Value').inside(locate('div').withAttr({ id: 'ebsContainerContent' })),
    controllerFillLayout: locate('span').withAttr({ 'data-fill': 'fill' }).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })),
    controllerSizeLayout: locate('span').withAttr({ class: 'pe-7s-crop' }).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })),
    halfLayoutDisplay: locate('.card-preview-fill').inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })),
    xxlSizeDisplay: locate('.col-lg-12'),
    controllerPositionLayout: locate('span').withAttr({ class: 'pe-7s-refresh-2' }).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })),
    landscapeDisplay: locate('.card-landscape').inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })),
    entityWidgetInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'designer_entityDD' })),
    shortcutWidgetInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'designer_shortcutTypeDD' })),
    entityViewWidgetInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'designer_entityForViewDD' })),
    viewWidgetField: locate('div').withAttr({ id: 'designer_viewDD' }).last(),
    nameAT_DashEntityViewField: locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': '2' })),
    codeAT_DashEntityViewField: locate('input').withAttr({ role: 'textbox' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })),
    formWidgetInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'designer_formDD' })),
    addValueField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })),
    chartWidgetInputField: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'designer_chartDD' })),
    inputVerticalMargin: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_verticalMargin' })),
    inputHorizontalMargin: locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_horizontalMargin' })),
  },
  text: {
    businessEntitiesLinktext: 'Business Entities',
  },
  checkboxes: {
    showOnHomeCheckbox: locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_showOnHome' })),
    showTitleCheckbox: locate('input').withAttr({ id: 'designer_showTitleCheckBox' }),
  },
  link: {
    pinListToHomeLink: locate('i').withAttr({ class: 'pe-7s-note2' }).inside(locate('a').withAttr({ 'entity-name': 'AT_EntForPinToHome' })),
    pinAddToHomeLink: locate('i').withAttr({ class: 'pe-7s-note' }).inside(locate('a').withAttr({ 'entity-name': 'AT_EntForPinToHome' })),
    iconWidgetPinToHome: locate('i').withAttr({ 'data-original-title': 'Hot!' }),
    iconEditPinToHome: locate('i').withAttr({ id: 'trigger-0' }),
    iconRightArrowPinToHome: locate('i').withAttr({ class: 'pe-7s-angle-right' }),
    iconWidgetAddToHome: locate('i').withAttr({ 'data-original-title': 'Hot!' }),
    cujAddPinToHomeLink: locate('i').withAttr({ class: 'pe-7s-pin' }).inside(locate('a').withAttr({ 'custom-action-id': '3f16850a-d7e5-4479-92fa-aee29c63f0ce' })),
    iconWidgetCUJAddToHome: locate('i').withAttr({ 'data-original-title': 'Hot!' }),
  },
  selector: {
    codeTemplateLoc: locate('iframe').withAttr({ id: 'ebsContainerContent_Html_ifr' }),
    codeTemplateTinyMceId: 'ebsContainerContent_Html',
    widgetDropdownList: locate('select').withAttr({ id: 'designer_widgetTypeDD' }),
    selectComboWidgetDropdownList: locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'designer_htmlWidgetDD' })),
    selectAutoWidgetList: locate('div').withAttr({ class: 'dx-item-content dx-list-item-content' }),
    deleteWidgetDiv: locate('div').withAttr({ 'htmlwidgetname': 'DeleteWidget' }),
    dashboardPanel: '//*[@id="designer"]/div[2]/div[7]',
  },
  container: {
    containerContent: locate('div').withAttr({ id: 'ebsContainerContent' }),
  },
  tabs: {
    entityViewTab: locate('a').withAttr({ 'data-dashboard-name': 'EntityView' }).inside(locate('ul').withAttr({ role: 'tablist' })),
    shortcutCujTab: locate('a').withAttr({ 'data-dashboard-name': 'ShortcutCUJ' }).inside(locate('ul').withAttr({ role: 'tablist' })),
    shortcutEntityTab: locate('a').withAttr({ 'data-dashboard-name': 'ShortcutEntity' }).inside(locate('ul').withAttr({ role: 'tablist' })),
    chartsTab: locate('a').withAttr({ 'data-dashboard-name': 'Charts' }).inside(locate('ul').withAttr({ role: 'tablist' }))
  },
  charts: {
    firstSliceChart: '//*[local-name()=\'path\'][@class=\'highcharts-point highcharts-color-0\']',
    firstSliceValueChart: '//*[local-name()=\'tspan\'][text() = \'200\']',
    secondSliceChart: '//*[local-name()=\'path\'][@class=\'highcharts-point highcharts-color-1 highcharts-point-inactive\']',
    secondSliceValueChart: '//*[local-name()=\'tspan\'][text() = \'300\']',
    thirdSliceChart: '//*[local-name()=\'path\'][@class=\'highcharts-point highcharts-color-2 highcharts-point-inactive\']',
    thirdSliceValueChart: '//*[local-name()=\'tspan\'][text() = \'100\']',
    chartHTMLUpdateWidget: locate('div').withAttr({ description: 'HTML - UpdateWidget' }),
  },
};
