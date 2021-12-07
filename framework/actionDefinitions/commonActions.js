// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const commonPage = require('~pages/commonPage');
const loginPage = require('~pages/loginPage');
const accountPanelPage = require('~pages/accountPanelPage');
const businessEntityPage = require('~pages/businessEntityPage');
const dataImExPage = require('~pages/dataImportExportPage');
const tryTo = codeceptjs.container.plugins('tryTo');

module.exports = {
  async loginInStudioApp(url, username, password) {
    I.amOnPage(constants.BASE_STUDIO_URL + url);
    this.waitForLoadersToFinish();
    I.waitForVisible(loginPage.fields.usernameField, constants.SHORT_WAIT);
    I.fillField(loginPage.fields.usernameField, username);
    I.fillField(loginPage.fields.passwordField, password);
    I.waitForClickable(loginPage.buttons.submitButton, constants.SHORT_WAIT);
    I.click(loginPage.buttons.submitButton);
    I.waitForElement(accountPanelPage.buttons.profilePanelButton, constants.LONG_WAIT);
    const interactivePopup = await tryTo(() => I.waitForVisible(commonPage.buttons.skipInteractiveTutorialButton), constants.VERY_SHORT_WAIT);
    if (interactivePopup === true) {
      I.waitForVisible(commonPage.buttons.skipInteractiveTutorialButton, constants.SHORT_WAIT);
      I.click(commonPage.buttons.skipInteractiveTutorialButton);
      I.waitForInvisible(commonPage.container.interactiveTutorialContainer, constants.SHORT_WAIT);
    }
    const result = await tryTo(() => I.waitForVisible(commonPage.fields.searchMenuInputField));
    if (result === true) {
      I.click(commonPage.buttons.contextMenuButton);
    }
  },

  loginInPortalApp(url, username, password) {
    I.amOnPage(constants.BASE_PORTAL_URL + url);
    this.waitForLoadersToFinish();
    I.waitForVisible(loginPage.fields.usernameField, constants.SHORT_WAIT);
    I.fillField(loginPage.fields.usernameField, username);
    I.fillField(loginPage.fields.passwordField, password);
    I.waitForClickable(loginPage.buttons.submitButton, constants.SHORT_WAIT);
    I.click(loginPage.buttons.submitButton);
    I.waitForElement(accountPanelPage.buttons.profilePanelButton, constants.LONG_WAIT);
  },

  async loginInApp(url, username, password) {
    I.amOnPage(url);
    this.waitForLoadersToFinish();
    I.waitForVisible(loginPage.fields.usernameField, constants.SHORT_WAIT);
    I.fillField(loginPage.fields.usernameField, username);
    I.fillField(loginPage.fields.passwordField, password);
    I.waitForClickable(loginPage.buttons.submitButton, constants.SHORT_WAIT);
    I.click(loginPage.buttons.submitButton);
    I.waitForElement(accountPanelPage.buttons.profilePanelButton, constants.LONG_WAIT);
    if (url === '_Designer/Account/LogOn' || url === '_Designer/Main') {
      I.waitForVisible(commonPage.buttons.skipInteractiveTutorialButton, constants.SHORT_WAIT);
      I.click(commonPage.buttons.skipInteractiveTutorialButton);
      I.waitForInvisible(commonPage.container.interactiveTutorialContainer, constants.SHORT_WAIT);
      const result = await tryTo(() => I.seeElement(commonPage.fields.searchMenuInputField));
      if (result === true) {
        I.click(commonPage.buttons.contextMenuButton);
      }
    }
  },

  async logoutFromApp() {
    await this.clickProfileMenu();
    // Click Log Out
    I.waitForVisible(accountPanelPage.buttons.logOffButton, constants.SHORT_WAIT);
    I.waitForClickable(accountPanelPage.buttons.logOffButton, constants.SHORT_WAIT);
    I.click(accountPanelPage.buttons.logOffButton);
    // Wait until redirect
    I.waitForVisible(loginPage.buttons.submitButton, constants.SHORT_WAIT);
  },

  saveAndRefreshAction() {
    this.waitForLoadersToFinish();
    const selector = commonPage.buttons.saveAndRefreshButton;
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.moveCursorTo(selector);
    I.click(selector);
    I.waitForVisible(commonPage.messagePopup.toast, constants.LONG_WAIT);
  },

  saveAndCloseAction() {
    this.waitForLoadersToFinish();
    const selector = commonPage.buttons.saveAndCloseButton;
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.moveCursorTo(selector);
    I.click(selector);
  },

  saveAndNewAction() {
    this.waitForLoadersToFinish();
    const selector = commonPage.buttons.saveAndNewButton;
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.moveCursorTo(selector);
    I.click(selector);
  },

  goBackToPreviousPage() {
    this.waitForLoadersToFinish();
    I.waitForVisible(commonPage.buttons.goBackButton, constants.SHORT_WAIT);
    I.waitForClickable(commonPage.buttons.goBackButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.goBackButton);
    this.waitForLoadersToFinish();
  },

  deleteSelection() {
    I.click(commonPage.checkbox.selectSingleResultCheckbox);
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.yesAnswerButton);
    I.dontSee(commonPage.checkbox.selectSingleResultCheckbox);
  },

  deleteSelectionYes(entity) {
    I.waitForVisible(commonPage.checkbox.selectSingleResultCheckbox, constants.SHORT_WAIT);
    I.click(commonPage.checkbox.selectSingleResultCheckbox);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForVisible(businessEntityPage.buttons.resultForNoData, constants.SHORT_WAIT);
    I.see(entity, businessEntityPage.buttons.resultForNoData);
  },

  deleteSelectionNo(entity) {
    I.click(commonPage.checkbox.selectSingleResultCheckbox);
    I.click(commonPage.buttons.deleteButton);
    I.click(commonPage.buttons.cancelAnswerButton);
    I.waitForVisible(businessEntityPage.buttons.resultForSearch2ndLine, constants.SHORT_WAIT);
    I.see(entity, businessEntityPage.buttons.resultForSearch2ndLine);
  },

  accessByViewButton() {
    I.click(commonPage.buttons.viewButton);
  },

  accessDirectUrl(strictUrl) {
    I.amOnPage(strictUrl);
    // FIXME BUG De discutat cu Ovidiu, Bogdan, Victor slow redirect-ul cu pagina anterioara
    this.waitForLoadersToFinish();
    I.wait(2);
  },

  refreshPage() {
    I.refreshPage();
  },

  // Ok, Insert, Insert existing
  // TODO Check all other toolbar buttons: Remove existing, Delete, Export, Refresh, Cancel, Remove
  // TODO find if used in Portal, Studio or Both
  clickToolbarButton(string) {
    this.waitForLoadersToFinish();
    const selector = locate('div').withText(string).inside(locate('div').withAttr({ id: 'ebsToolbar' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // InsertBtn, DeleteBtn, ExportBtn, AdvancedFindBtn, createCustomUJBtn, deleteCustomUJBtn
  // TODO find if used in Portal, Studio or Both
  clickSidebarButton(string) {
    this.waitForLoadersToFinish();
    // Click
    const selector = locate(`#${string}Btn`);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Used in step forms
  // TODO find if used in Portal, Studio or Both
  navigateToFormStep(string) {
    this.waitForLoadersToFinish();
    // FIXME Issue when navigating on a slower connection,
    // it should wait until elements are all loaded to continue
    I.wait(2);
    const selector = locate('span').withText(string).inside(locate('div').withAttr({ role: 'tab' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.scrollTo(selector);
    I.wait(2);
    I.forceClick(selector);
    // FIXME Issue when navigating on a slower connection,
    // it should wait until elements are all loaded to continue
    I.wait(2);
  },

  clickExpandAndCollapseSection(string) {
    I.waitForVisible(locate('h4').withText(string).inside(locate('a').withAttr({ 'data-toggle': 'collapse' })), constants.SHORT_WAIT);
    I.click(locate('h4').withText(string).inside(locate('a').withAttr({ 'data-toggle': 'collapse' })));
  },

  // Get Id from console and navigate
  // TODO  Run a script to get ID from selected table row and navigate
  async getIdFromSelectedRowAndNavigate(url, tableContainer) {
    I.waitForVisible(tableContainer, constants.SHORT_WAIT);
    // Browser context
    // eslint-disable-next-line no-undef
    const dateCId = await I.executeScript((container) => $(container).data('dxDataGrid').getSelectedRowKeys()[0], tableContainer);
    this.accessDirectUrl(url + dateCId);
  },

  // Get Id from console
  // TODO  Run a script to get ID from selected table using the table container
  async getIdFromSelectedRow(tableContainer) {
    // I.waitForVisible(withinId, constants.SHORT_WAIT);
    // Browser context
    // eslint-disable-next-line no-undef
    const date = await I.executeScript((container) => $(container).data('dxDataGrid').getSelectedRowKeys()[0], tableContainer);
    return date;
  },

  // Expand section in form
  // TODO find if used in Portal, Studio or Both
  menuSectionExpand(string) {
    const selector = locate('h4').withText(string).inside(locate('a').withAttr({ 'data-toggle': 'collapse' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.scrollTo(selector);
    I.click(selector);
  },

  // Select a row from table
  // TODO  Select a row from table using a name
  selectARowFromTableAfterText(textforclick) {
    I.waitForVisible(locate('td').withText(textforclick).inside(locate('tr')).last(), constants.SHORT_WAIT);
    I.click(locate('td').withText(textforclick).inside(locate('tr')).last());
  },

  // Verify a value from table
  // TODO  Verify a value in a table after text
  verifyAValueInTableAfterText(textforverify) {
    I.waitForVisible(locate('td').withText(textforverify).inside(locate('tr')), constants.SHORT_WAIT);
  },

  // Collapse section in form
  // TODO find if used in Portal, Studio or Both
  menuSectionCollapse(string) {
    const selector = locate('h4').withText(string).inside(locate('a').withAttr({ 'data-toggle': 'collapse' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.scrollTo(selector);
    I.click(selector);
  },

  // Open Portal side menu
  portalSideMenuOpen() {
    I.wait(3);
    const selector = locate('a').withAttr({ 'data-tour-element': 'menu-trigger' });
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click Portal side menu item
  portalClickSideMenuItem(type, string) {
    let selector;
    if (type.toString().trim() === constants.MENU_ITEM) {
      selector = locate('a').withText(string).inside(locate('li').withAttr({ class: 'leaf-menu-item' }));
    }
    if (type.toString().trim() === constants.MENU_SECTION) {
      selector = locate('label').withText(string).inside(locate('li').withAttr({ class: 'has-children primary' }));
    }
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.scrollTo(selector);
    I.click(selector);
  },

  // Click TinyMCE Text Editor menu option
  // TODO find if used in Portal, Studio or Both
  clickTextEditorMenuItem(string) {
    const selector = locate('span').withText(string).inside(locate('div').withAttr({ role: 'menuitem' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click TinyMCE source code editor button
  // Change Size, Maximize/Restore, Ok, Cancel
  // TODO find if used in Portal, Studio or Both
  clickSourceCodeEditorButton(string) {
    const selector = locate('button').withChild(locate('span').withText(string));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.moveCursorTo(selector);
    I.click(selector);
  },

  // Click Tab menu items
  // Template, After Generate Js
  // TODO find if used in Portal, Studio or Both
  clickTabMenuItem(string) {
    const selector = locate('a').withText(string).inside(locate('li').withAttr({ role: 'tab' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Fill in TinyMCE Editor with string HTML
  // Used for example in CustomUJ > Code > Template (wyswyg editor)
  fillInCustomTinyMceEditor(anchor, editorId, stringHtml) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.executeScript(([editor, string]) => {
      // Browser context
      // eslint-disable-next-line no-undef
      tinyMCE.get(editor).setContent(string);
    }, [editorId, stringHtml]);
  },

  // Fill in Monaco Editor with string script
  fillInCustomMonacoEditor(anchor, editorId, stringHtml) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    // Paste ebs.showMessage("abc", "success");
    I.executeScript(([id, string]) => {
      // Browser context
      // eslint-disable-next-line no-undef
      monaco.editor.getModels()[id].setValue(string);
    }, [editorId, stringHtml]);
  },
  // Fill in Form Attribute with string script
  fillInFormAttribute(anchor, editorId, stringHtml) {
    // EX: ebs.setFormAttributeValue("ebsContainerContent","TextMaxLength","John");
    I.executeScript(([anchor, id, string]) => {
      // Browser context
      // eslint-disable-next-line no-undef
      ebs.setFormAttributeValue(anchor, id, string);
    }, [anchor, editorId, stringHtml]);
  },

  // Get Id from entity
  // TODO  Run a script to get ID for your entity
  async getIdForYourEntity(id) {
    // Browser context
    // eslint-disable-next-line no-undef
    // EX: ebs.getCurrentEntityData()['reportid']
    return await I.executeScript((id) => ebs.getCurrentEntityData()[id], id);
  },

  // Click the dropdown button of a given popup lookup table and select value
  fillInPopupLookupTableWithValue(tableAnchor, string) {
    // Search for string
    const search = locate('input').withAttr({ role: 'textbox' })
      .inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': '1' }))
      .inside(tableAnchor);
    I.waitForVisible(search, constants.SHORT_WAIT);
    I.fillField(search, string);
    // Click row in table
    const selector = locate('td').withText(string).withAttr({ role: 'gridcell' })
      .inside(locate('tr').withAttr({ role: 'row' }))
      .inside(tableAnchor);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click the dropdown button of a given dropdown lookup table and select value
  fillInDropdownLookupTableWithValue(tableAnchor, string) {
    // Search for string
    const search = locate('input').withAttr({ role: 'textbox' })
      .inside(locate('div').withAttr({ class: 'dx-editor-with-menu' }))
      .inside(tableAnchor);
    I.waitForVisible(search, constants.SHORT_WAIT);
    I.fillField(search, string);
    // I select the field from results
    const selector = locate('td').withText(string).withAttr({ role: 'gridcell' })
      .inside(locate('div').withAttr({ class: 'dx-datagrid-content' }))
      .inside(tableAnchor);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click: Yes || No in the save popup message: "Changes were made, continue without saving?",
  // "Save changes?"
  clickPopupDialog(option) {
    const selector = locate('span').withText(option).inside(locate(commonPage.popup.popupContent));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click Export Sidebar Button and: Export current set || Export all data set
  // FIXME appears to not properly select ? But why?
  clickExportCurrentDataButton(option) {
    // const selector = locate('div').withText(option).inside(locate('.dx-list-item')).first(); - for BUG
    const selector = locate('div').withText(option).inside(locate('div').withAttr({class:'dx-widget dx-collection'}));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.click(selector);
    I.waitForVisible(dataImExPage.buttons.exportButton,constants.SHORT_WAIT);
    I.click(dataImExPage.buttons.exportButton);
    I.wait(2);
  },
  clickExportAllDataButton(option) {
    const selector = locate('div').withText(option).inside(locate('div').withAttr({class:'dx-widget dx-collection'}));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
    I.waitForVisible(dataImExPage.buttons.exportButton,constants.SHORT_WAIT);
    I.click(dataImExPage.buttons.exportButton);
  },

  // Click Export Table Button and: Export current set || Export all data set
  // FIXME appears to not properly select ? But why?
  clickTableExportDataButton(option) {
    this.clickToolbarButton('Export');
    const selector = locate('div').withText(option).inside(locate(commonPage.popup.popupContent));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Double click the value in the table to access it
  // Table anchor
  doubleClickValueFromTable(selector, value) {
    // FIXME Workaround, appears to not work if only doing one double click
    // or single click followed by double click
    const anchor = locate('td').withText(value).withAttr({ role: 'gridcell' }).inside(locate(selector));
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.doubleClick(anchor);
    I.click(anchor);
  },

  // Focus the field, select all and press DELETE
  // Text, Number
  deleteTextValueFromInput(selector) {
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.moveCursorTo(selector);
    I.click(selector);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
  },

  // Fill the input field with specified value
  // Text, Number
  fillInTextValueInInput(selector, value) {
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.fillField(selector, value);
    I.pressKey(constants.KEY_ENTER);
  },

  // Click a button
  // TODO Click on a button after locator
  clickButtonAfterLocator(locator) {
    I.waitForVisible(locator, constants.SHORT_WAIT);
    I.click(locator);
  },

  // Fill a field
  // TODO  Fill a field with a value using locator
  fillField(locator, value) {
    I.waitForVisible(locator, constants.SHORT_WAIT);
    I.waitForClickable(locator, constants.SHORT_WAIT);
    I.fillField(locator, value);
  },

  // See a value on a field
  // TODO  See a value on a field using locator
  seeInField(locator, value) {
    I.waitForVisible(locator, constants.SHORT_WAIT);
    I.see(value, locator);
  },

  // See a value on a field
  // TODO  See a value on a field using Container
  seeInFieldAfterContainer(locator, value) {
    I.waitForVisible(locator, constants.SHORT_WAIT);
    I.see(value);
  },

  // Fill the optionset input field with the specified value selected from dropdown
  fillInOptionSetValueInInput(selector, value) {
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector);
    I.click(selector);
    I.fillField(selector, value);
    I.click(locate('p').withText(value).inside(locate('div').withAttr({ class: 'dx-scrollable-content' })));
  },

  // Select a value from dropdown
  selectValueFromDropdown(selector, value) {
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
    I.waitForVisible(locate('p').withText(value).inside(locate('div').withAttr({ class: 'dx-scrollable-content' })), constants.SHORT_WAIT);
    I.click(locate('p').withText(value).inside(locate('div').withAttr({ class: 'dx-scrollable-content' })));
  },

  // Fill the search field of a table by the column id and the value to search for
  searchByColumnValueInTable(anchor, column, value) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    // Click filter and set equals
    const searchMenu = locate('i').withAttr({ class: 'dx-icon dx-icon-filter-operation-default' })
      .inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': column }))
      .inside(anchor);
    const searchEquals = locate('i').withAttr({ class: 'dx-icon dx-icon-filter-operation-equals' });
    I.waitForVisible(searchMenu, constants.SHORT_WAIT);
    I.wait(3);
    // I.moveCursorTo(searchMenu);
    I.click(searchMenu);
    I.waitForVisible(searchEquals, constants.SHORT_WAIT);
    I.click(searchEquals);
    // Search
    const selector = locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': column })).inside(anchor);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.fillField(selector, value);
    I.wait(3);
    // Wait for result
    I.waitForVisible(locate('td').withText(value).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })).inside(anchor), constants.SHORT_WAIT);
    I.waitForClickable(locate('td').withText(value).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })).inside(anchor), constants.SHORT_WAIT);
  },

  // Fill the search field of a table by the column id and the value to search for
  searchByColumnValueNotEqualsFilterInTable(anchor, column, value) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    // Search
    const selector = locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ role: 'gridcell' }).withAttr({ 'aria-colindex': column })).inside(anchor);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.fillField(selector, value);
    // Wait for result
    I.waitForVisible(locate('td').withText(value).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })).inside(anchor), constants.SHORT_WAIT);
  },

  // Fill in a checkbox with checked || unchecked
  // FIXME I.uncheckOption() does not seem to properly function
  async tickCheckbox(selector, value) {
    I.waitForVisible(selector, constants.SHORT_WAIT);
    const state = await I.grabAttributeFrom(selector, 'aria-checked');
    // If I want the checkbox checked
    if (value.toString().trim() === constants.CHECKMARK_TICKED) {
      // and it is unchecked or mixed
      // Bug? sometimes state is 1/0 rather than true/false
      if (state === 'false' || state === 'mixed' || state === '0') {
        I.checkOption(selector);
        I.waitForVisible(selector.withAttr({ 'aria-checked': 'true' }), constants.SHORT_WAIT);
      }
      // else if I want the checkbox unchecked
    } else if (value.toString().trim() === constants.CHECKMARK_UNTICKED) {
      // and it is checked
      if (state === 'true' || state === '1') {
        I.checkOption(selector);
        I.waitForVisible(selector.withAttr({ 'aria-checked': 'false' }), constants.SHORT_WAIT);
      }
      // or mixed
      if (state === 'mixed') {
        I.checkOption(selector);
        I.checkOption(selector);
        I.waitForVisible(selector.withAttr({ 'aria-checked': 'false' }), constants.SHORT_WAIT);
      }
    }
  },

  // Portal forms, click the "page" navigation button
  // Next, Previous
  portalClickCustomButton(value) {
    const selector = locate('button').withText(value);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  waitForLoadersToFinish() {
    // Wait for any loader to finish
    // Table loader
    I.waitForInvisible({ class: commonPage.popup.loadIndicator }, constants.SHORT_WAIT);
    // Full page please wait
    I.waitForInvisible(commonPage.buttons.loaderButton, constants.SHORT_WAIT);
  },

  // Used in portal section forms
  portalNavigateToSectionStep(string) {
    const selector = locate('p').withText(string).inside(locate('div').withAttr({ class: 'ew-controllers-overflow' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click the dropdown button of a given lookup table
  clickLookupTableButton(dropdownAnchor) {
    // Click dropdown button
    I.waitForVisible(dropdownAnchor, constants.SHORT_WAIT);
    I.click(dropdownAnchor);
    this.waitForLoadersToFinish();
  },

  tickAllRowsInTable(anchor) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    within(anchor, () => {
      const selector = locate('td').withAttr({ role: 'columnheader' }).withChild(locate('div').withAttr({ role: 'checkbox' }));
      I.waitForVisible(selector, constants.SHORT_WAIT);
      I.click(selector);
    });
  },

  clickPopupCloseButton() {
    const selector = locate('div').withAttr({ role: 'button' }).withAttr({ 'aria-label': 'close' }).inside(locate('div').withAttr({ class: 'dx-toolbar-after' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.moveCursorTo(selector);
    I.click(selector);
  },

  clickPaginationInTable(pageNumber) {
    const selector = locate('div').withAttr({ role: 'button' }).withText(pageNumber).inside(locate('div').withAttr({ class: 'dx-pages' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  clickResultsPerPageInTable(resultsNumber) {
    const selector = locate('div').withAttr({ role: 'button' }).withText(resultsNumber).inside(locate('div').withAttr({ class: 'dx-page-sizes' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.scrollTo(selector);
    I.click(selector);
  },

  closeToastMessage(type, string) {
    const selector = locate(type).withText(string).inside(locate(commonPage.messagePopup.toast));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
    I.waitForInvisible(selector, constants.SHORT_WAIT);
  },

  // Fill in a bool value with Yes, No
  fillInBoolValue(anchor, option) {
    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.click(locate('div').withText(option).before(locate('div')).inside(anchor));
  },

  // Contains language(portal/studio), theme, palette (portal)
  clickTripleDotMenu() {
    this.waitForLoadersToFinish();
    const selector = locate('a').withAttr({ id: 'ui-config-trigger' });
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.waitForClickable(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click to change the application language to the provided one
  async changeApplicationLanguage(language) {
    // FIXME Fix collision with loading...
    I.wait(4);
    this.clickTripleDotMenu();
    const currentLanguage = await I.grabTextFrom(locate('span').after(locate('input').withAttr({ checked: 'checked' })).inside(locate('form').withAttr({ name: 'languageForm' })));
    // If current language is different than what I want, change, else close menu
    if (currentLanguage !== language) {
      const selector = locate('span').withText(language).inside(locate('form').withAttr({ name: 'languageForm' }));
      I.waitForVisible(selector, constants.SHORT_WAIT);
      I.click(selector);
      I.waitForInvisible(selector, constants.SHORT_WAIT);
    } else {
      this.clickTripleDotMenu();
    }
  },

  // Click to open/close the profile menu (up-right)
  async clickProfileMenu() {
    this.waitForLoadersToFinish();
    const selector = await I.dontSee(accountPanelPage.dropdown.profileDropdown);
    if (!selector) {
      this.refreshPage();
      this.waitForLoadersToFinish();
    }
    I.waitForVisible(accountPanelPage.dropdown.profileDropdown, constants.SHORT_WAIT);
    I.waitForClickable(accountPanelPage.dropdown.profileDropdown, constants.SHORT_WAIT);
    I.click(accountPanelPage.dropdown.profileDropdown);
  },

  // Click to select a dashboard
  portalClickSelectDashboard(value) {
    const selector = locate('a').withText(value).inside(locate('ul').withAttr({ role: 'tablist' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.click(selector);
  },

  // Click to view a value from a table
  viewValueFromTable(selector, value) {
    within(selector, () => {
      const row = locate('tr').withAttr({ role: 'row' }).withDescendant(locate('td').withText(value).withAttr({ role: 'gridcell' }));
      const viewButton = locate('a').withText('View').inside(row);
      I.waitForVisible(viewButton, constants.SHORT_WAIT);
      I.click(viewButton);
    });
  },

  // Select Checkbox from a row
  async selectCheckboxOfaRow(name) {
    I.waitForVisible(locate('td').withText(name).inside(locate('tr')), constants.SHORT_WAIT);
    const row = await I.grabAttributeFrom(locate('tr').withDescendant(locate('td').withText(name)), 'aria-rowindex');
    I.click(locate('td').withAttr({ 'aria-label': 'Select row' }).inside(locate('tr').withAttr({ 'aria-rowindex': row })));
  },

  // Select all records from a table
  selectAllRecordsFromTable(container) {
    I.waitForVisible(locate('td').withAttr({ 'aria-label': 'Select all' }).withAttr({ role: 'columnheader' }).inside(locate(container)), constants.SHORT_WAIT);
    I.click(locate('td').withAttr({ 'aria-label': 'Select all' }).withAttr({ role: 'columnheader' }).inside(locate(container)));
  },

  // Set current working directory to root
  setCWDasRoot() {
    if (process.cwd().match(/([^\\]*)\/*$/)[1] === 'config') {
      process.chdir('../');
    }
  },

  clearCookie(nameCookie) {
    I.clearCookie(nameCookie);
    I.refreshPage();
  },

  // Search in table after a specific column name
  async searchInTableAfterASpecificColumn(columnName, searchAfter, anchorContainer) {
    I.waitForVisible(locate('td').withAttr({ 'aria-label': `Column ${columnName}` }).inside(anchorContainer), constants.SHORT_WAIT);
    const row = await I.grabAttributeFrom(locate('td').withAttr({ 'aria-label': `Column ${columnName}` }).inside(anchorContainer), 'aria-colindex');
    const selector = locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': row })).inside(anchorContainer);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.fillField(selector, searchAfter);
    const clickSelector = locate('td').withText(searchAfter).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(anchorContainer);
    I.waitForVisible(clickSelector, constants.SHORT_WAIT);
    I.waitForClickable(clickSelector, constants.SHORT_WAIT);
    I.click(clickSelector);
  },
};
