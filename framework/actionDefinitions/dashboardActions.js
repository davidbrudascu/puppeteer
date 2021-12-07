// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const dashboardPage = require('~pages/dashboardPage');

const I = actor();

module.exports = {
  actionDeleteWidgetDashboard(nameAT_DeleteWidget, nameChangeWidgetOrder2Widget, nameChangeWidgetOrder1Widget) {
    // 3	Click on your Widget (AT_DeleteWidget)
    I.waitForVisible(locate('div').withText(nameAT_DeleteWidget).inside(locate('div').withAttr({ description: 'Shortcut - AT_DeleteWidget'})), constants.SHORT_WAIT);
    I.click(locate('div').withText(nameAT_DeleteWidget).inside(locate('div').withAttr({ description: 'Shortcut - AT_DeleteWidget'})));
    // 4	Click Delete button
    I.waitForVisible(dashboardPage.buttons.deleteWidgetButton, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.deleteWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 5	Click on 2nd widget
    I.click(locate('div').withText(nameChangeWidgetOrder2Widget).inside(locate('div').withAttr({description: 'HTML - ChangeWidgetOrder2'})));
    // 6	Click Delete button
    I.waitForVisible(dashboardPage.buttons.deleteWidgetButton, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.deleteWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 7	Click on 3rd widget
    I.click(locate('div').withText(nameChangeWidgetOrder1Widget).inside(locate('div').withAttr({description: 'HTML - ChangeWidgetOrder1'})));
    // 8	Click Delete button
    I.waitForVisible(dashboardPage.buttons.deleteWidgetButton, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.deleteWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 9	Check "Show on portal" on dashboard level
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
  },

  actionChangeOrderWidgetDashboard() {
    // 12	Make 1st widget larger
    // 13	Switch position between them
    I.waitForVisible(locate('div').withAttr({ description: 'HTML - ChangeWidgetOrder2' }), constants.SHORT_WAIT);
    I.dragAndDrop(locate('div').withAttr({ description: 'HTML - ChangeWidgetOrder2' }), locate('div').withAttr({ description: 'HTML - ChangeWidgetOrder1' }));
    I.click(locate('div').withAttr({ description: 'HTML - ChangeWidgetOrder1' }));
    I.dragSlider(locate('div').withAttr({ class: 'ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se' }).inside(locate('div').withAttr({ description: 'HTML - ChangeWidgetOrder1' })), 200);
    I.waitForVisible(dashboardPage.buttons.addHtmlWidgetButton, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.addHtmlWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.waitForVisible(locate('div').withAttr({ class: 'title' }).withText('HTML - ChangeWidgetOrder1'), constants.SHORT_WAIT);
    I.click(locate('span').withAttr({ class: 'dx-checkbox-icon' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_showOnHome' })));
  },

  actionEditShortcutWidgetDashboard(nameShortcutAT_EntEditShortcutWidget, nameEntityShortcutTitle, nameEntityShortcutDescription, updateEntityWidgetTag,
  nameShortcutAT_EditCUJWidget,nameCUJShortcutTitle, nameCUJShortcutDescription, nameCUJShortcutTag, default_AT_EntEditEntViewWidget, updateEntityViewWidgetTitle) {
    // 3	Click on "Shortcut - AT_EntEditShortcutWidget" widget
    I.wait(3);
    I.waitForVisible(locate('div').withText(nameShortcutAT_EntEditShortcutWidget), constants.SHORT_WAIT);
    I.click(locate('div').withText(nameShortcutAT_EntEditShortcutWidget).inside(locate('div').withAttr({ description: 'Shortcut - AT_EntEditShortcutWidget' })));
    // 4	Update Title "Entity Shortcut Title"
    I.waitForVisible(dashboardPage.fields.addTitleWidgetField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addTitleWidgetField, nameEntityShortcutTitle);
    // 5	Update Description "Entity Shortcut Description"
    I.fillField(dashboardPage.fields.addDescriptionDashboardField, nameEntityShortcutDescription);
    // 6	Update Tag "Entity Widget Tag"
    I.fillField(dashboardPage.fields.addTagWidgetDashboardField, updateEntityWidgetTag);
    // 8	Click on "Save" button
    I.click(dashboardPage.buttons.addHtmlWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 9	Click on "Shortcut - AT_EditCUJWidget" widget
    I.click(locate('div').withText(nameShortcutAT_EditCUJWidget).inside(locate('div').withAttr({ description: 'Shortcut - AT_EditCUJWidget' })));
    // 10	Update Title "CUJ Shortcut Title"
    I.waitForVisible(dashboardPage.fields.addTitleWidgetField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addTitleWidgetField, nameCUJShortcutTitle);
    // 11	Update Description "CUJ Shortcut Description"
    I.fillField(dashboardPage.fields.addDescriptionDashboardField, nameCUJShortcutDescription);
    // 12	Update Tag "CUJ Shortcut Tag"
    I.fillField(dashboardPage.fields.addTagWidgetDashboardField, nameCUJShortcutTag);
    // 14	Click on "Save" button
    I.click(dashboardPage.buttons.addHtmlWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 15	Click on "AT_EntEditEntViewWidget (default)" widget
    I.click(locate('div').withText(default_AT_EntEditEntViewWidget).inside(locate('div').withAttr({ description: 'AT_EntEditEntViewWidget (default)' })));
    // 16	Update Title "Entity View Widget Title"
    I.waitForVisible(dashboardPage.fields.addTitleWidgetField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addTitleWidgetField, updateEntityViewWidgetTitle);
    // 17	Click on "Save" button
    I.click(dashboardPage.buttons.addHtmlWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 18	Check "Show on Portal" on Dashboard level
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
  },

  actionEditHTMLWidgetUpdateContentDashboard(nameTBU_HTMLWidget, nameUpdatedHTMLWidget, goToCodeTab, customHtmlP4) {
    // 3	Access your Widget (TBU_HTMLWidget)
    commonActions.doubleClickValueFromTable(dashboardPage.container.containerContent, nameTBU_HTMLWidget);
    // 4	Update Title from TBU HTML Widget -> Updated HTML Widget
    I.waitForVisible(dashboardPage.fields.addWidgetTitleField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addWidgetTitleField, nameUpdatedHTMLWidget);
    // 5	Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 6	Access Code section
    I.waitForVisible(dashboardPage.fields.addWidgetNameField, constants.SHORT_WAIT);
    commonActions.navigateToFormStep(goToCodeTab);
    // 7	Open Source Code
    // 8	Replace code with: <h4>Update Content for HTML Widget</h4>
    commonActions.fillInCustomTinyMceEditor(dashboardPage.selector.codeTemplateLoc, dashboardPage.selector.codeTemplateTinyMceId, customHtmlP4);
  },

  actionEditHTMLWidgetUpdateTitleDashboard(nameHTMLUpdateWidget, titleAutoTestWidget){
    // 11	Click on your Widget "HTML Update Widget"
    I.waitForVisible(locate('div').withText(nameHTMLUpdateWidget), constants.SHORT_WAIT);
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.click(dashboardPage.fields.inputVerticalMargin);
    I.click(dashboardPage.fields.inputHorizontalMargin);
    I.click(locate('div').withText(nameHTMLUpdateWidget).inside(dashboardPage.charts.chartHTMLUpdateWidget));
    // 12	Check "Show Title"
    I.waitForVisible(dashboardPage.checkboxes.showTitleCheckbox, constants.SHORT_WAIT);
    I.waitForClickable(dashboardPage.checkboxes.showTitleCheckbox, constants.SHORT_WAIT);
    I.click(dashboardPage.checkboxes.showTitleCheckbox);
    // 13	Fill in title with "Auto Test Widget"
    //I.fillField(dashboardPage.fields.addTitleWidgetField, titleAutoTestWidget);
    // 14	Click on Save
    I.click(dashboardPage.buttons.addHtmlWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 15	Check "Show on Portal" on Dashboard level
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
  },

  actionEditDeleteWidgetDashboard(nameDashboardDelete, toolbarButtonDelete, deleteYES, nameDashboardEdit, nameUpdateDashboard, HTMLDeleteWidget){
    // 3	Select "DashboardDelete"
    I.waitForVisible(locate('td').withText(nameDashboardDelete), constants.SHORT_WAIT);
    I.click(locate('td').withText(nameDashboardDelete));
    // 4	Click on "Delete" icon -> Click yes
    commonActions.clickSidebarButton(toolbarButtonDelete);
    I.waitForVisible(locate('span').withText(deleteYES), constants.SHORT_WAIT);
    I.click(locate('span').withText(deleteYES));
    I.waitForInvisible(locate('td').withText(nameDashboardDelete), constants.SHORT_WAIT);
    // 5	Access "DashboardEdit"
    commonActions.doubleClickValueFromTable(locate('div').withAttr({ id: 'ebsContainerContent' }), nameDashboardEdit);
    // 6	Check "Show on Portal"
    I.waitForVisible(dashboardPage.checkboxes.showOnHomeCheckbox, constants.SHORT_WAIT);
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
    // 7	Update Display Name: "Update Dashboard"
    I.fillField(dashboardPage.fields.addDashboardDisplayName, nameUpdateDashboard);
    // 8	Delete your Widget
    I.waitForVisible(locate('div').withText(HTMLDeleteWidget).withAttr({ 'htmlwidgetname':'DeleteWidget' }), constants.SHORT_WAIT);
    I.click(dashboardPage.selector.deleteWidgetDiv);
    I.waitForVisible(dashboardPage.buttons.deleteWidgetButton, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.deleteWidgetButton);
    I.waitForInvisible(dashboardPage.selector.deleteWidgetDiv, constants.SHORT_WAIT);
  },

  actionCreateWidgetCodeTabDashboard(nameAddWidget, nameAutoWidget, goToCodeTab, customHtmlP4) {
    // 4  Add a name "AddWidget"
    I.waitForVisible(dashboardPage.fields.addWidgetNameField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addWidgetNameField, nameAddWidget);
    // 5  Add a title "Auto Widget"
    I.fillField(dashboardPage.fields.addWidgetTitleField, nameAutoWidget);
    // 6  Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 7  Go to "Code" tab
    I.waitForVisible(dashboardPage.fields.addWidgetNameField, constants.SHORT_WAIT);
    commonActions.navigateToFormStep(goToCodeTab);
    // 8  Open Source Code and fill with: <h4>Auto Test</h4>
    commonActions.fillInCustomTinyMceEditor(dashboardPage.selector.codeTemplateLoc, dashboardPage.selector.codeTemplateTinyMceId, customHtmlP4);

  },

  actionCreateWidgetDashboard(nameCreateDashboard, nameAutoTest, selectHtmlWidget, nameAutoWidget, selectHTMLAutoWidget){
    // 12 Fill in Name with "CreateDashboard"
    I.waitForVisible(dashboardPage.fields.addDashboardNameField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addDashboardNameField, nameCreateDashboard);
    // 13 Fill in Display name with: "Auto Test"
    I.fillField(dashboardPage.fields.addDashboardDisplayName, nameAutoTest);
    // 14 Check "Show in Home page"
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
    // 15 Save and Reload
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 16 Select "HTML Widget" from drop-down list
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.selectOption(dashboardPage.selector.widgetDropdownList, selectHtmlWidget);
    // 17 Select your widget (AddWidget / Auto Widget)
    I.waitForVisible(dashboardPage.selector.selectComboWidgetDropdownList, constants.SHORT_WAIT);
    I.fillField(dashboardPage.selector.selectComboWidgetDropdownList, nameAutoWidget);
    I.click(dashboardPage.selector.selectAutoWidgetList);
    I.waitForVisible(locate('span').withText(selectHTMLAutoWidget), constants.SHORT_WAIT);
    I.click(locate('span').withText(selectHTMLAutoWidget));
    // 18 Click on "AddHTML"
    I.waitForVisible(dashboardPage.buttons.addHtmlWidgetButton, constants.SHORT_WAIT);
    I.click(dashboardPage.buttons.addHtmlWidgetButton);
  },

  addEntityWidgetToDashboard(dashboard, entityViewWidget, entity, dashboardOption) {
    commonActions.doubleClickValueFromTable(dashboardPage.container.containerContent, dashboard);
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.click(dashboardPage.selector.widgetDropdownList);
    I.selectOption(dashboardPage.selector.widgetDropdownList, entityViewWidget);
    I.fillField(dashboardPage.fields.entityViewWidgetInputField, entity);
    I.pressKey('Enter');
    I.click(dashboardPage.fields.viewWidgetField);
    I.waitForVisible(locate('div').withText('dashboard').inside(locate('div').withAttr({ class: 'dx-scrollview-content' })).last(), constants.SHORT_WAIT);
    I.click(locate('div').withText(dashboardOption).inside(locate('div').withAttr({ class: 'dx-item dx-list-item' })).last());
    // Add widget and resize it
    I.click(dashboardPage.buttons.addWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.moveCursorTo(locate('div').withAttr({ entityname: entity }).inside('#designer'));
    I.dragSlider(locate('div').withAttr({ class: 'ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se' }).inside(locate('div').withAttr({ description: `${entity} (dashboard)` })), 300);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  accessAT_DashEntityViewRecord(code, entityDashboard, codeUpdated) {
    commonActions.doubleClickValueFromTable(locate('div').withAttr({ entityname: entityDashboard }), code);
    I.waitForVisible(dashboardPage.fields.addDashboardCodeField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addDashboardCodeField, codeUpdated);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addShortcutWidgets(shortcut, entity, entityDashboard, form, shortcutEntity) {
    commonActions.doubleClickValueFromTable(dashboardPage.container.containerContent, shortcutEntity);
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.click(dashboardPage.selector.widgetDropdownList);
    I.selectOption(dashboardPage.selector.widgetDropdownList, shortcut);
    I.fillField(dashboardPage.fields.shortcutWidgetInputField, entity);
    I.pressKey('Enter');
    I.click(dashboardPage.buttons.radioButton.first());
    I.fillField(dashboardPage.fields.entityWidgetInputField, entityDashboard);
    I.pressKey('Enter');
    I.click(dashboardPage.buttons.addWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.moveCursorTo(locate('div').withAttr({ entityname: entityDashboard }).inside('#designer'));
    I.dragSlider(locate('div').withAttr({ class: 'ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se' }).inside(locate('div').withAttr({ description: `Shortcut - ${entityDashboard}` })), 200);
    I.click(dashboardPage.selector.dashboardPanel);
    I.click(dashboardPage.selector.widgetDropdownList);
    I.selectOption(dashboardPage.selector.widgetDropdownList, shortcut);
    I.fillField(dashboardPage.fields.shortcutWidgetInputField, entity);
    I.pressKey('Enter');
    I.click(dashboardPage.buttons.radioButton.last());
    I.fillField(dashboardPage.fields.entityWidgetInputField, entityDashboard);
    I.pressKey('Enter');
    I.fillField(dashboardPage.fields.formWidgetInputField, form);
    I.pressKey('Enter');
    I.click(dashboardPage.buttons.addWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.moveCursorTo(locate('div').withAttr({ entityname: entityDashboard }).inside('#designer').last());
    I.dragSlider(locate('div').withAttr({ class: 'ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se' }).inside(locate('div').withAttr({ description: `Shortcut - ${entityDashboard}` })).last(), 200);
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  accessShortcutWidget(entityDashboard, widgetTest, step1, step2, value) {
    I.waitForVisible(dashboardPage.tabs.shortcutEntityTab, constants.SHORT_WAIT);
    I.click(dashboardPage.tabs.shortcutEntityTab);
    // Verify widgets
    I.waitForVisible(locate('div').withAttr({ entityname: entityDashboard }).first(), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withAttr({ entityname: entityDashboard }).last(), constants.SHORT_WAIT);
    I.click(locate('div').withAttr({ entityname: entityDashboard }).last());
    // Check form sections
    I.waitForVisible(locate('h5').withAttr({ "data-section-name": step1 }), constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withAttr({ "data-section-name": step2 }), constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addDashboardNameField, widgetTest);
    I.click(locate('h5').withAttr({ "data-section-name": step2 }));
    I.waitForVisible(dashboardPage.fields.addValueField, constants.SHORT_WAIT);
    I.fillField(dashboardPage.fields.addValueField, value);
    // FIXME Bug: Save & Close doesn't return the user to Dashboard; TBD JIRA ID
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async addCustomShortcutWidget(columnName, nameDashboard, shortcut, customAction, entityCustomAction) {
    await commonActions.searchInTableAfterASpecificColumn(columnName, nameDashboard, dashboardPage.container.containerContent);
    commonActions.doubleClickValueFromTable(dashboardPage.container.containerContent, nameDashboard);
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.click(dashboardPage.selector.widgetDropdownList);
    I.selectOption(dashboardPage.selector.widgetDropdownList, shortcut);
    I.fillField(dashboardPage.fields.shortcutWidgetInputField, customAction);
    I.pressKey('Enter');
    I.fillField(dashboardPage.fields.entityWidgetInputField, entityCustomAction);
    I.pressKey('Enter');
    I.click(dashboardPage.buttons.addWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addChartToDashboard(charts, chartDashboard) {
    commonActions.doubleClickValueFromTable(dashboardPage.container.containerContent, charts);
    I.waitForVisible(dashboardPage.selector.widgetDropdownList, constants.SHORT_WAIT);
    I.click(dashboardPage.selector.widgetDropdownList);
    I.selectOption(dashboardPage.selector.widgetDropdownList, charts);
    I.fillField(dashboardPage.fields.chartWidgetInputField, chartDashboard);
    I.pressKey('Enter');
    I.click(dashboardPage.buttons.addWidgetButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.moveCursorTo(locate('div').withAttr({ chartname: chartDashboard }).inside('#designer'));
    I.dragAndDrop(locate('div').withAttr({ class: 'ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se' }).inside(locate('div').withAttr({ description: `Chart - ${chartDashboard}` })), dashboardPage.selector.dashboardPanel);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.click(dashboardPage.checkboxes.showOnHomeCheckbox);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },
};
