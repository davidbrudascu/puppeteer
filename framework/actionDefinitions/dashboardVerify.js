// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const dashboardPage = require('~pages/dashboardPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Actions
const commonActions = require('~actions/commonActions');

const I = actor();

module.exports = {
  verifyEditPinToHomeDashboard(nameCustomJourneyPintoHomeWidget, namePin2HomeDNWidget, selectHalfLayout, selectXXLSize, selectLandscape) {
    // 2 Your "Apps" dashboard is loaded
    // 3 Verify if you have 2 widgets "Pin2Home - DN" and "Custom Journey - Pin to Home"
    I.waitForVisible(locate('h4').withText(nameCustomJourneyPintoHomeWidget).inside(locate('div').withAttr({ index: '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(namePin2HomeDNWidget).inside(locate('div').withAttr({ index: '0' })), constants.SHORT_WAIT);
    // 4 Click on "edit" icon for Pin to Home - DN
    I.wait(5);
    I.waitForVisible(dashboardPage.link.iconEditPinToHome, constants.SHORT_WAIT);
    I.forceClick(dashboardPage.link.iconEditPinToHome);
    // 5 Click on "right arrow"
    I.pressKey(constants.KEY_RIGHT_ARROW);
    // 6 Exit from edit mode
    I.click(dashboardPage.link.iconEditPinToHome);
    // 7 Verify if order is "Custom Journey - Pin to Home" and "Pin to Home - DN"
    commonActions.waitForLoadersToFinish();
    I.waitForVisible(locate('h4').withText(nameCustomJourneyPintoHomeWidget).inside(locate('div').withAttr({ index: '0' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(namePin2HomeDNWidget).inside(locate('div').withAttr({ index: '1' })), constants.SHORT_WAIT);
    // 8 Click again on "Edit" icon for "Pin to Home DN"
    I.click(dashboardPage.link.iconEditPinToHome);
    // 9 Select "Half" layout
    I.moveCursorTo(dashboardPage.fields.controllerFillLayout);
    I.waitForVisible(locate('a').withText(selectHalfLayout).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })), constants.SHORT_WAIT);
    I.click(locate('a').withText(selectHalfLayout).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })));
    // 10 Exit from edit mode
    I.click(dashboardPage.link.iconEditPinToHome);
    // 11 Verify if your layout is changed
    I.waitForVisible(dashboardPage.fields.halfLayoutDisplay, constants.SHORT_WAIT);
    // 12 Click again on "Edit" icon for "Pin to Home DN"
    I.click(dashboardPage.link.iconEditPinToHome);
    // 13 Select "XXL" size
    I.moveCursorTo(dashboardPage.fields.controllerSizeLayout);
    I.waitForVisible(locate('a').withText(selectXXLSize).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })), constants.SHORT_WAIT);
    I.click(locate('a').withText(selectXXLSize).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })));
    // 14 Exit from edit mode
    I.click(dashboardPage.link.iconEditPinToHome);
    // 15 Verify if your size is larger
    I.waitForVisible(dashboardPage.fields.xxlSizeDisplay, constants.SHORT_WAIT);
    // 16 Click again on "Edit" icon for "Pin to Home DN"
    I.click(dashboardPage.link.iconEditPinToHome);
    // 17 Select "Landscape" layout
    I.scrollTo(dashboardPage.fields.controllerPositionLayout, constants.SHORT_WAIT);
    I.waitForVisible(dashboardPage.fields.controllerPositionLayout, constants.SHORT_WAIT);
    I.moveCursorTo(dashboardPage.fields.controllerPositionLayout);
    I.waitForVisible(locate('a').withAttr({ 'data-position': selectLandscape }).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })), constants.SHORT_WAIT);
    I.click(locate('a').withAttr({ 'data-position': selectLandscape }).inside(locate('div').withAttr({ 'data-tour-element': 'first-card' })));
    // 18 Exit from edit mode
    I.click(dashboardPage.link.iconEditPinToHome);
    // 19 Verify if your layout is changed (Icon on left side and title on the right side)
    I.waitForVisible(dashboardPage.fields.landscapeDisplay, constants.SHORT_WAIT);
    // 20 Click again on "Edit" icon for "Pin to Home DN"
    I.click(dashboardPage.link.iconEditPinToHome);
    // 21 Click on "Delete" icon
    I.waitForVisible(dashboardPage.buttons.deleteIconWidget, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.deleteIconWidget);
    // 23 Verify if only "Custom Journey - Pin to Home" widget is displayed
    I.waitForVisible(locate('h4').withText(nameCustomJourneyPintoHomeWidget), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withAttr({ index: '1' }), constants.SHORT_WAIT);
    // 24 Verify if "Pin to Home DN" widget is not displayed anymore
    I.waitForInvisible(locate('h4').withText(namePin2HomeDNWidget), constants.SHORT_WAIT);
  },

  verifyCustomUserJourneyPinToHomeDashboard(
    subMenuCustomJourneyPinToHome,
    widgetLabelPinToHome,
    widgetTitleCustomJourneyPinToHome,
    h4WidgetCustomJourneyPinToHome,
    titlePinToHomeCUJ,
    contentCujPinToHome,
  ) {
    // 4 Click on "Pin to home" for "Custom Journey - Pin to Home"
    I.moveCursorTo(locate('a').withText(subMenuCustomJourneyPinToHome));
    I.waitForVisible(dashboardPage.link.cujAddPinToHomeLink, constants.SHORT_WAIT);
    I.click(dashboardPage.link.cujAddPinToHomeLink);
    // 5 A new widget is displayed on your home
    // 6 Verify widget label: "pin to Home"
    I.waitForVisible(locate('div').withText(widgetLabelPinToHome).withAttr({ class: 'tag' }), constants.SHORT_WAIT);
    // 7 Verify widget title: "Custom Journey - Pin to Home"
    I.waitForVisible(locate('h4').withText(widgetTitleCustomJourneyPinToHome), constants.SHORT_WAIT);
    // 8 Verify icon
    I.waitForVisible(dashboardPage.link.iconWidgetCUJAddToHome, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.closeSearchMenu);
    // 9 Click on "Custom Journey - Pin to Home" widget
    I.click(locate('h4').withText(h4WidgetCustomJourneyPinToHome));
    // 10 A new Custom User Journey is displayed
    // 11 Verify title: "PIN TO HOME - CUJ"
    I.waitForVisible(locate('h5').withText(titlePinToHomeCUJ), constants.SHORT_WAIT);
    // 12 Verify content: "Cuj - Pin to Home"
    I.waitForVisible(locate('h4').withText(contentCujPinToHome), constants.SHORT_WAIT);
  },

  async verifyAddPinToHomeDashboard(
    Pin2HomeDNMenuItem,
    widgetLabelPinToHome,
    widgetTitleInsertPin2HomeDN,
    h4widgetInsertPin2HomeDN,
    formNamePinToHomeInsert,
    nameInsertPin1,
    codeLP1,
    formNamePinToHomeEdit,
    nameName,
    nameCode,
    nameValue,
  ) {
    // 4 Click on "Pin - List to home" for "Pin2Home - DN"
    I.moveCursorTo(locate('a').withText(Pin2HomeDNMenuItem));
    // 3 Expand "Pin to Home" section
    // 4 Click on "Pin 'Add' to Home" for "Pin2Home - DN"
    I.waitForVisible(dashboardPage.link.pinAddToHomeLink, constants.SHORT_WAIT);
    I.click(dashboardPage.link.pinAddToHomeLink);
    // 5 A new widget is displayed on your home
    // 6 Verify widget label: "pin to Home"
    I.waitForVisible(locate('div').withText(widgetLabelPinToHome).withAttr({ class: 'tag' }), constants.SHORT_WAIT);
    // 7 Verify widget title: "Insert Pin2Home - DN"
    I.waitForVisible(locate('h4').withText(widgetTitleInsertPin2HomeDN), constants.SHORT_WAIT);
    // 8 Verify icon
    I.click(dashboardPage.buttons.closeSearchMenu);
    I.waitForVisible(dashboardPage.link.iconWidgetAddToHome, constants.SHORT_WAIT);
    // 9 Click on "Insert Pin2Home-DN" widget
    I.click(locate('h4').withText(h4widgetInsertPin2HomeDN));
    // 10 A new form is displayed
    // 11 Verify form name (PIN TO HOME INSERT)
    I.waitForVisible(locate('h4').withText(formNamePinToHomeInsert), constants.SHORT_WAIT);
    // 12 Verify if only 2 attributes are displayed (Name and Code are displayed; Value is not displayed)
    I.waitForVisible(locate('div').withText(nameName), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(nameCode), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(nameValue), constants.SHORT_WAIT);
    // 13 Fill in Name with: Insert Pin 1
    I.fillField(dashboardPage.fields.addWidgetNameField, nameInsertPin1);
    // 14 Fill in Code with: IP1
    I.fillField(dashboardPage.fields.addDashboardCodeField, codeLP1);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 15 Verify if a new form is displayed
    // 16 Verify form name (PIN TO HOME Edit)
    I.waitForVisible(locate('h4').withText(formNamePinToHomeEdit).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    // 17 Check if only Name attribute is displayed and its value is "Insert Pin 1"
    I.waitForVisible(dashboardPage.fields.attributeNameField, constants.SHORT_WAIT);
    I.waitForInvisible(dashboardPage.fields.attributeCodeField, constants.SHORT_WAIT);
    I.waitForInvisible(dashboardPage.fields.attributeValueField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(dashboardPage.fields.addWidgetNameField, nameInsertPin1);
  },

  async verifyListPinToHomeDashboard(
    submeniuPin2HomeDNItem,
    namePinToHomeLabel,
    insertButton,
    formPinToHomeInsert,
    nameListPin1,
    codeLP1,
    formPinToHomeEdit,
    columnName,
    columnCode,
    columnValue,
    nameName,
    nameCode,
    nameValue,
  ) {
    // 4 Click on "Pin - List to home" from "Pin2Home - DN"
    I.moveCursorTo(locate('a').withText(submeniuPin2HomeDNItem));
    I.waitForVisible(dashboardPage.link.pinListToHomeLink, constants.SHORT_WAIT);
    I.click(dashboardPage.link.pinListToHomeLink);
    // 5 A new widget is displayed on your home
    // 6 Verify widget label: "pin to Home"
    I.waitForVisible(locate('div').withText(namePinToHomeLabel).withAttr({ class: 'tag' }), constants.SHORT_WAIT);
    // 7 Verify widget title: "Pin2Home - DN"
    I.waitForVisible(locate('h4').withText(submeniuPin2HomeDNItem), constants.SHORT_WAIT);
    // 8 Verify icon
    I.waitForVisible(dashboardPage.link.iconWidgetPinToHome, constants.SHORT_WAIT);
    // 9 Click on "Pin2Home-DN" widget
    I.click(dashboardPage.buttons.closeSearchMenu);
    I.click(locate('h4').withText(submeniuPin2HomeDNItem));
    // 10 Verify the view name: "Pin2Home - DN"
    I.waitForVisible(locate('h5').withText(submeniuPin2HomeDNItem), constants.SHORT_WAIT);
    // 11 Verify View Column (Name, Code and Value) Name
    I.waitForVisible(locate('td').withAttr({ 'aria-label': columnName }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withAttr({ 'aria-label': columnCode }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withAttr({ 'aria-label': columnValue }), constants.SHORT_WAIT);
    // 12 Click on "Insert" icon
    commonActions.clickSidebarButton(insertButton);
    // 13 A new form is displayed
    // 14 Verify form name (PIN TO HOME INSERT)
    I.waitForVisible(locate('h4').withText(formPinToHomeInsert), constants.SHORT_WAIT);
    // 15 Verify if only 2 attributes are displayed (Name and Code are displayed; Value is not displayed)
    I.waitForVisible(locate('div').withText(nameName).withAttr({ 'data-label-for': 'ebsContainerContent_Name' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(nameCode).withAttr({ 'data-label-for': 'ebsContainerContent_Code' }), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(nameValue), constants.SHORT_WAIT);
    // 16 Fill in Name with: List Pin 1
    I.fillField(dashboardPage.fields.addWidgetNameField, nameListPin1);
    // 17 Fill in Code with: LP1
    I.fillField(dashboardPage.fields.addDashboardCodeField, codeLP1);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 18 Verify if a new form is displayed
    // 19 Verify form name (PIN TO HOME Edit)
    I.waitForVisible(locate('h4').withText(formPinToHomeEdit).inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    // 20 Check if only Name attribute is displayed and its value is "List Pin 1"
    I.waitForVisible(dashboardPage.fields.attributeNameField, constants.SHORT_WAIT);
    I.waitForInvisible(dashboardPage.fields.attributeCodeField, constants.SHORT_WAIT);
    I.waitForInvisible(dashboardPage.fields.attributeValueField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(dashboardPage.fields.addWidgetNameField, nameListPin1);
  },

  verifyDeleteAndChangeOrderWidgetDashboard(
    nameDeleteWidgetDashboard,
    nameAT_DeleteWidget,
    nameChangeWidgetOrder1Widget,
    nameChangeWidgetOrder2Widget,
    nameChangeWidgetOrderDashboard,
    nameChangeWidget1,
    nameChangeWidget2,
  ) {
    // 17 Access your Dashboard "Delete Widget"
    I.waitForVisible(locate('a').withText(nameDeleteWidgetDashboard), constants.SHORT_WAIT);
    I.click(locate('a').withText(nameDeleteWidgetDashboard));
    // 18 Verify there are no widgets visible
    I.waitForInvisible(locate('div').withAttr({ 'description': nameAT_DeleteWidget }), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withAttr({ 'description': nameChangeWidgetOrder1Widget }), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withAttr({ 'description': nameChangeWidgetOrder2Widget }), constants.SHORT_WAIT);
    // 19 Access your Dashboard "Change Widget Order"
    I.waitForVisible(locate('a').withText(nameChangeWidgetOrderDashboard), constants.SHORT_WAIT);
    I.click(locate('a').withText(nameChangeWidgetOrderDashboard));
    // 20 Check if your widgets order and size are ok
    I.waitForVisible(locate('div').withAttr({ 'htmlwidgetname': nameChangeWidget1 }).withAttr({ 'data-gs-x': '0' }).withAttr({ 'data-gs-y': '2' }).withAttr({ 'data-gs-width': '4' }).withAttr({ 'data-gs-height': '2' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withAttr({ 'htmlwidgetname': nameChangeWidget2 }).withAttr({ 'data-gs-x': '0' }).withAttr({ 'data-gs-y': '0' }).withAttr({ 'data-gs-width': '2' }).withAttr({ 'data-gs-height': '2' }), constants.SHORT_WAIT);
  },

  verifyEditShortcutWidgetDashboard(
    dashboardEditShortcutWidget,
    nameEntityShortcutTitle,
    nameEntityShortcutDescription,
    firstEntityWidgetTag,
    formNameAT_EntEditShortcutWidget,
    titleCUJShortcutTitle,
    descriptionCUJShortcutDescription,
    tagCUJShortcutTag,
    nameDashboardCUJ,
    listViewDashboard1,
    titleEntityViewWidgetTitle,
  ) {
    // 21 Access your Dashboard (Edit Shortcut Widget)
    I.waitForVisible(locate('a').withText(dashboardEditShortcutWidget), constants.SHORT_WAIT);
    I.click(locate('a').withText(dashboardEditShortcutWidget));
    // 22 Check 1st widget title: "Entity Shortcut Title"
    I.waitForVisible(locate('h4').withText(nameEntityShortcutTitle).inside(locate('div').withAttr({ entityname: 'AT_EntEditShortcutWidget' })), constants.SHORT_WAIT);
    // 23 Check 1st widget description "Entity Shortcut Description"
    I.waitForVisible(locate('p').withText(nameEntityShortcutDescription).inside(locate('div').withAttr({ entityname: 'AT_EntEditShortcutWidget' })), constants.SHORT_WAIT);
    // 24 Check 1st widget tag:  "Entity Shortcut Tag"
    I.waitForVisible(locate('div').withText(firstEntityWidgetTag).withAttr({ class: 'tag' }), constants.SHORT_WAIT);
    // 25 Click on 1st widget -> Form page is displayed
    I.click(locate('div').withAttr({ description: nameEntityShortcutDescription }));
    I.waitForVisible(locate('h5').withText(formNameAT_EntEditShortcutWidget), constants.SHORT_WAIT);
    commonActions.goBackToPreviousPage();
    // 26 Check 2nd widget title: "CUJ Shortcut Title"
    I.waitForVisible(locate('h4').withText(titleCUJShortcutTitle), constants.SHORT_WAIT);
    // 27 Check 2nd widget description "CUJ Shortcut Description"
    I.waitForVisible(locate('p').withText(descriptionCUJShortcutDescription), constants.SHORT_WAIT);
    // 28 Check 2nd widget tag:  "CUJ Shortcut Tag"
    I.waitForVisible(locate('div').withText(tagCUJShortcutTag).withAttr({ class: 'tag' }), constants.SHORT_WAIT);
    // 29 Click on 2nd widget -> CUJ Widget is displayed
    I.click(locate('div').withAttr({ description: descriptionCUJShortcutDescription }));
    I.waitForVisible(locate('h4').withText(nameDashboardCUJ).inside(locate('div').withAttr({ class: 'customForm_AT_EditCUJWidget' })), constants.SHORT_WAIT);
    commonActions.goBackToPreviousPage();
    // 30 Check 3rd widget title: "Entity View Widget Title" is displayed
    // 31 Check if list view is displayed (Dashboard1 record is displayed)
    I.waitForVisible(locate('td').withText(listViewDashboard1).withAttr({ 'aria-colindex': '1' }), constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(titleEntityViewWidgetTitle), constants.SHORT_WAIT);
  },

  verifyEditHTMLWidgetDashboard(
    nameEditHTMLWidgetDashboard,
    titleAutoTestWidget,
    contentUpdateContentforHTMLWidget,
    content2UpdateWidgetContent,
    titleHTMLTBU_HTMLWidget,
  ) {
    // 19 Click on your Dashboard "Edit HTML Widget"
    I.waitForVisible(locate('a').withText(nameEditHTMLWidgetDashboard), constants.SHORT_WAIT);
    I.click(locate('a').withText(nameEditHTMLWidgetDashboard));
    // 20 Check if 2 widgets are displayed
    I.seeNumberOfElements(dashboardPage.fields.dashboardTargetField, 2);
    // 21 Check 1st widget doesn't have title (TBU HTML Wid Title)
    I.waitForVisible(locate('div').withAttr({ description: titleHTMLTBU_HTMLWidget }).withAttr({ showtitle: 'false' }), constants.SHORT_WAIT);
    // 22 Check 2nd widget title is: "HTML Widget Title"
    // 23 Check 1st widget content "Update Content for HTML Widget"
    I.waitForVisible(locate('h4').withText(contentUpdateContentforHTMLWidget), constants.SHORT_WAIT);
    // 24 Check 2nd widget content "Update Widget Content"
    I.waitForVisible(locate('h4').withText(content2UpdateWidgetContent), constants.SHORT_WAIT);
  },

  verifyEditDeleteWidgetDashboard(
    nameDashboardDelete,
    nameDashboardHide,
    nameUpdateDashboard,
    widgetDeleteWidget,
  ) {
    // 13 Check if "DashboardDelete" is not displayed
    I.waitForInvisible(locate('a').withText(nameDashboardDelete), constants.SHORT_WAIT);
    // 14 Check if "DashboardHide" is not displayed
    I.waitForInvisible(locate('a').withText(nameDashboardHide), constants.SHORT_WAIT);
    // 15 Check if "Dashboard Update" is displayed
    I.waitForVisible(locate('a').withText(nameUpdateDashboard), constants.SHORT_WAIT);
    // 16 Click on it
    I.click(locate('a').withText(nameUpdateDashboard));
    // 17 Check if your widget is not displayed
    I.waitForInvisible(locate('h4').withText(widgetDeleteWidget), constants.SHORT_WAIT);
  },

  verifyCreateWidgetDashboard(nameAutoTest) {
    // 22 Check if your Dashboard is displayed (Auto Test)
    I.waitForVisible(locate('a').withText(nameAutoTest), constants.SHORT_WAIT);
    // 23 Click on it
    I.click(locate('a').withText(nameAutoTest));
    // 24 Check if Your widget is displayed
    I.waitForVisible(locate('h4').withText(nameAutoTest).inside(locate('div').withAttr({ description: 'HTML - AddWidget' })), constants.SHORT_WAIT);
  },

  verifyEntityViewWidgetAndContent(entityDashboard, nameView, codeView, nameUpdated) {
    I.waitForVisible(dashboardPage.tabs.entityViewTab, constants.SHORT_WAIT);
    I.click(dashboardPage.tabs.entityViewTab);
    I.waitForVisible(locate('div').withAttr({ entityname: entityDashboard }), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameView).inside(locate('#AT_DashEntityView_dashboard_grid')));
    I.waitForVisible(locate('td').withText(codeView).inside(locate('#AT_DashEntityView_dashboard_grid')));
    // Check if Name "Auto Test 1" is editable
    I.click(locate('td').withText(nameView).inside(locate('#AT_DashEntityView_dashboard_grid')));
    within(locate('tr').withAttr({ 'aria-rowindex': '1' }).inside(locate('div').withAttr({ entityname: entityDashboard })), () => {
      I.fillField(dashboardPage.fields.nameAT_DashEntityViewField, nameUpdated);
      I.pressKey('Enter');
    });
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // Check if Code "AT1" is not editable
    I.click(locate('td').withText(codeView).inside(locate('#AT_DashEntityView_dashboard_grid')));
    I.waitForInvisible(dashboardPage.fields.codeAT_DashEntityViewField, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameUpdated).inside(locate('#AT_DashEntityView_dashboard_grid')));
  },

  verifyAT_DashEntityViewContent(nameUpdated, codeUpdated) {
    I.waitForVisible(locate('td').withText(nameUpdated).inside(locate('#AT_DashEntityView_dashboard_grid')));
    I.waitForVisible(locate('td').withText(codeUpdated).inside(locate('#AT_DashEntityView_dashboard_grid')));
  },

  verifyFormShortcutWidget(entityDashboard, widgetTest, value) {
    I.waitForVisible(locate('div').withAttr({ entityname: entityDashboard }).first(), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ entityname: entityDashboard }).first());
    I.waitForVisible(locate('td').withText(widgetTest), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(value), constants.SHORT_WAIT);
  },

  verifyCustomShortcutWidgets(shortcutLinkWidget, dashShortcutWidget, dashShortcutWidgetContent, formRecord) {
    I.waitForVisible(dashboardPage.tabs.shortcutCujTab, constants.SHORT_WAIT);
    I.click(dashboardPage.tabs.shortcutCujTab);
    I.waitForVisible(locate('div').withAttr({ customactionname: shortcutLinkWidget }), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withAttr({ customactionname: dashShortcutWidget }), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ customactionname: dashShortcutWidget }));
    I.waitForVisible(locate('h4').withText(dashShortcutWidgetContent).inside(locate(dashboardPage.container.containerContent)), constants.SHORT_WAIT);
    I.click(commonPage.buttons.goBackButton);
    I.waitForVisible(locate('div').withAttr({ customactionname: shortcutLinkWidget }), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ customactionname: shortcutLinkWidget }));
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, formRecord);
  },

  verifyChartWidget(chartDashboard) {
    I.waitForVisible(dashboardPage.tabs.chartsTab, constants.SHORT_WAIT);
    I.click(dashboardPage.tabs.chartsTab);
    I.waitForVisible(locate('div').withAttr({ chartname: chartDashboard }), constants.SHORT_WAIT);
    // using wait because the animation for chart is slower then waitingForElement.
    I.wait(2);
    I.moveCursorTo(dashboardPage.charts.firstSliceChart);
    I.seeElementInDOM(dashboardPage.charts.firstSliceValueChart);
    I.wait(2);
    I.moveCursorTo(dashboardPage.charts.secondSliceChart);
    I.seeElementInDOM(dashboardPage.charts.secondSliceValueChart);
    I.wait(2);
    I.moveCursorTo(dashboardPage.charts.thirdSliceChart);
    I.seeElementInDOM(dashboardPage.charts.thirdSliceValueChart);
  },
};
