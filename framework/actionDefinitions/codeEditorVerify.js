// Page
const codeEditorPage = require('~pages/codeEditorPage');
// Constants
const constants = require('~config/constants');

const I = actor();

module.exports = {
  async verifyFilterByItemContainer() {
    // verify filter BY item Container
    I.waitForVisible(codeEditorPage.buttons.filtersButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filtersButton);
    I.waitForVisible(codeEditorPage.fields.entitiesFiltersField, constants.SHORT_WAIT);
    const checkEntities = await this.verifyCheckedForFilter(codeEditorPage.checkbox.entityCheckbox);
    I.assert(checkEntities, true);
    I.waitForVisible(codeEditorPage.fields.clientScriptLibrariesFiltersField, constants.SHORT_WAIT);
    const checkCsLibraries = await this.verifyCheckedForFilter(codeEditorPage.checkbox.csLibrariesCheckbox);
    I.assert(checkCsLibraries, true);
    I.waitForVisible(codeEditorPage.fields.automationScriptsDemandFiltersField, constants.SHORT_WAIT);
    const checkWfOnDemand = await this.verifyCheckedForFilter(codeEditorPage.checkbox.wfOnDemandCheckbox);
    I.assert(checkWfOnDemand, true);
    I.waitForVisible(codeEditorPage.fields.automationScriptsLibrariesFiltersField, constants.SHORT_WAIT);
    const checkWfLibraries = await this.verifyCheckedForFilter(codeEditorPage.checkbox.wfLibrariesCheckbox);
    I.assert(checkWfLibraries, true);
    I.waitForVisible(codeEditorPage.fields.customUserJourneysFiltersField, constants.SHORT_WAIT);
    const checkCustomActions = await this.verifyCheckedForFilter(codeEditorPage.checkbox.customActionsCheckbox);
    I.assert(checkCustomActions, true);
    I.waitForVisible(codeEditorPage.fields.htmlWidgetsFiltersField, constants.SHORT_WAIT);
    const checkHtmlWidgets = await this.verifyCheckedForFilter(codeEditorPage.checkbox.htmlWidgetsCheckbox);
    I.assert(checkHtmlWidgets, true);
    I.waitForVisible(codeEditorPage.fields.styleSheetsFiltersField, constants.SHORT_WAIT);
    const checkStyleSheets = await this.verifyCheckedForFilter(codeEditorPage.checkbox.styleSheetsCheckbox);
    I.assert(checkStyleSheets, true);
    I.waitForVisible(codeEditorPage.fields.codeBlockFiltersField, constants.SHORT_WAIT);
    const checkCodeBlock = await this.verifyCheckedForFilter(codeEditorPage.checkbox.codeBlockCheckbox);
    I.assert(checkCodeBlock, true);
    I.waitForVisible(codeEditorPage.buttons.deselectAllItemTypesButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.deselectAllItemTypesButton);
  },

  verifyIfEntityExistInAdvanceCodEditor(nameDA, entityLinked, entityUnlinked) {
    I.waitForVisible(codeEditorPage.fields.entitiesFiltersField, constants.SHORT_WAIT);
    I.click(codeEditorPage.fields.entitiesFiltersField);
    I.waitForVisible(codeEditorPage.buttons.filtersButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filtersButton);
    // verify independent entity
    I.waitForVisible(codeEditorPage.buttons.independentItemsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.independentItemsButton);
    I.waitForVisible(codeEditorPage.buttons.openEntitiesItemsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.openEntitiesItemsButton);
    I.waitForVisible(locate('span').withText(entityUnlinked).inside(locate('li').withAttr({ 'aria-label': entityUnlinked })), constants.SHORT_WAIT);
    // close
    I.waitForVisible(codeEditorPage.buttons.independentItemsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.independentItemsButton);
    // verify entity Linked
    I.waitForVisible(codeEditorPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })));
    I.waitForVisible(codeEditorPage.buttons.openEntitiesItemsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.openEntitiesItemsButton);
    I.waitForVisible(locate('span').withText(entityLinked).inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
  },

  async verifyFilterByProjectContainer(project, nbDA, independentDA) {
    I.waitForVisible(codeEditorPage.buttons.filterByProjectsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filterByProjectsButton);
    I.waitForVisible(locate('span').withText(project).inside(codeEditorPage.selector.filterByOptionsCodeEditor), constants.SHORT_WAIT);
    const checkProject = await this.verifyCheckedForFilter(codeEditorPage.checkbox.projectCheckbox);
    I.assert(checkProject, true);
    I.waitForVisible(locate('span').withText(nbDA).inside(codeEditorPage.selector.filterByOptionsCodeEditor));
    I.waitForVisible(locate('span').withText(independentDA).inside(codeEditorPage.selector.filterByOptionsCodeEditor));
  },

  async verifyFilterByProjectAction(project, nameDA1, nameDA2) {
    I.waitForVisible(codeEditorPage.buttons.deselectAllProjectsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.deselectAllProjectsButton);
    I.waitForVisible(locate('span').withText(project).inside(codeEditorPage.selector.filterByOptionsCodeEditor), constants.SHORT_WAIT);
    I.click(locate('span').withText(project).inside(codeEditorPage.selector.filterByOptionsCodeEditor));
    I.waitForVisible(codeEditorPage.buttons.filterByProjectsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filterByProjectsButton);
    I.waitForVisible(locate('span').withText(nameDA1).inside(locate('li').withAttr({ 'aria-label': nameDA1 })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameDA2).inside(locate('li').withAttr({ 'aria-label': nameDA2 })), constants.SHORT_WAIT);
    const locator = codeEditorPage.containers.filterContainer;
    const length = await I.executeScript((el) => document.querySelector(el).innerText.split('\n').length, locator);
    I.assertEqual(length, 2);
  },

  async verifyFilterByDAContainer(nameDA1, nameDA2) {
    I.waitForVisible(codeEditorPage.buttons.filterByDAButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filterByDAButton);
    I.waitForVisible(locate('span').withText(nameDA1).inside(codeEditorPage.selector.filterByDAClass), constants.SHORT_WAIT);
    const checkDA1 = await this.verifyCheckedForFilter(codeEditorPage.checkbox.DA1Checkbox);
    I.assert(checkDA1, true);
    I.waitForVisible(locate('span').withText(nameDA2).inside(codeEditorPage.selector.filterByDAClass), constants.SHORT_WAIT);
    const checkDA2 = await this.verifyCheckedForFilter(codeEditorPage.checkbox.DA2Checkbox);
    I.assert(checkDA2, true);
    I.waitForVisible(codeEditorPage.buttons.independentItemsFromFilterByDAButton, constants.SHORT_WAIT);
    I.waitForVisible(codeEditorPage.buttons.deselectAllApplicationsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.deselectAllApplicationsButton);
    I.waitForVisible(codeEditorPage.buttons.selectAllApplicationsButton, constants.SHORT_WAIT);
  },

  verifyFilterByDAAction(nameDA1, nameDA2) {
    I.waitForVisible(locate('span').withText(nameDA1).inside(codeEditorPage.selector.filterByDAClass), constants.SHORT_WAIT);
    I.click(locate('span').withText(nameDA1).inside(codeEditorPage.selector.filterByDAClass));
    I.waitForVisible(locate('span').withText(nameDA2).inside(codeEditorPage.selector.filterByDAClass), constants.SHORT_WAIT);
    I.click(locate('span').withText(nameDA2).inside(codeEditorPage.selector.filterByDAClass));
    I.waitForVisible(codeEditorPage.buttons.filterByDAButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filterByDAButton);
    I.waitForVisible(locate('span').withText(nameDA1).inside(locate('li').withAttr({ 'aria-label': nameDA1 })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(nameDA2).inside(locate('li').withAttr({ 'aria-label': nameDA2 })), constants.SHORT_WAIT);
  },

  async verifyCheckedForFilter(locator) {
    const resultExecuteScript = await I.executeScript((el) => document.querySelector(el).checked, locator);
    return resultExecuteScript;
  },

  verifyFilterContainer(){
    I.waitForVisible(codeEditorPage.buttons.filtersButton, constants.SHORT_WAIT);
    I.waitForVisible(codeEditorPage.buttons.filterByProjectsButton, constants.SHORT_WAIT);
    I.waitForVisible(codeEditorPage.buttons.filterByDAButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.filterByDAButton);
    I.waitForVisible(codeEditorPage.buttons.deselectAllApplicationsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.deselectAllApplicationsButton);
    I.waitForVisible(codeEditorPage.buttons.selectAllApplicationsButton, constants.SHORT_WAIT);
  },

  verifyDataFormLinkedDA(nameDA,nameEntity){
    I.waitForVisible(codeEditorPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })), constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.toggleTreeViewItemsButton.inside(locate('li').withAttr({ 'aria-label': nameDA })));
    I.waitForVisible(codeEditorPage.buttons.openEntitiesItemsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.openEntitiesItemsButton);
    I.waitForVisible(locate('span').withText(nameEntity).inside(locate('li').withAttr({ 'aria-label': nameDA })),constants.SHORT_WAIT);
    // close entity
    I.waitForVisible(codeEditorPage.buttons.closeEntitiesItemsButton, constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.closeEntitiesItemsButton);
    // close DA
    I.waitForVisible(codeEditorPage.buttons.arrowCloseDAButton.inside(locate('li').withAttr({ 'aria-label': nameDA })),constants.SHORT_WAIT);
    I.click(codeEditorPage.buttons.arrowCloseDAButton.inside(locate('li').withAttr({ 'aria-label': nameDA })));
   },

  verifyExistingFilters(){
    // verify filter by item type
    I.waitForVisible(codeEditorPage.buttons.filtersButton, constants.SHORT_WAIT);
    // verify filter by digital asset
    I.waitForVisible(codeEditorPage.buttons.filterByDAButton, constants.SHORT_WAIT);
    // verify filter by project
    I.waitForVisible(codeEditorPage.buttons.filterByProjectsButton, constants.SHORT_WAIT);
  },
};
