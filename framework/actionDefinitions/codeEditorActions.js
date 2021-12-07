// Constants
const constants = require('~config/constants');
// Page
const digitalAssetPage = require('~pages/digitalAssetPage');
const codeEditorPage = require('~pages/codeEditorPage');
const commonPage = require('~pages/commonPage.js');

const I = actor();

module.exports = {
  accessAdvancedCodeEditor(search) {
    I.waitForVisible(commonPage.buttons.contextMenuButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.contextMenuButton);
    I.waitForVisible(digitalAssetPage.fields.searchMenuItemField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.searchMenuItemField, search);
    I.waitForVisible(codeEditorPage.fields.advancedCodEditorField, constants.SHORT_WAIT);
    I.click(codeEditorPage.fields.advancedCodEditorField);
  },

  // Click on Filter by digital asset
  clickCodeBlocksFilterByDigitalAsset(digitalAssetName) {
    I.waitForVisible(digitalAssetPage.buttons.filterByDigitalAssetButton, constants.SHORT_WAIT);
    I.waitForClickable(digitalAssetPage.buttons.filterByDigitalAssetButton, constants.SHORT_WAIT)
    I.click(digitalAssetPage.buttons.filterByDigitalAssetButton);
    I.waitForVisible(digitalAssetPage.buttons.deselectAllDigitalAssetsButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.deselectAllDigitalAssetsButton);
    I.click(locate('span').withText(digitalAssetName));
    I.click(digitalAssetPage.buttons.filterByDigitalAssetButton);
    I.doubleClick(locate('span').withText(digitalAssetName).inside(locate('li').withAttr({ 'aria-label': digitalAssetName })));
    I.click(locate('span').withText(digitalAssetName).inside(locate('li').withAttr({ 'aria-label': digitalAssetName })));
  },

  // Click on Filter by item type
  clickCodeBlocksFilterByItemType() {
    I.waitForVisible(digitalAssetPage.buttons.filterByDigitalAssetButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.filterByItemTypeButton);
    I.waitForVisible(digitalAssetPage.buttons.deselectAllItemTypesButton, constants.SHORT_WAIT);
    I.click(digitalAssetPage.buttons.deselectAllItemTypesButton);
    I.click(digitalAssetPage.buttons.styleSheetButton);
    I.click(digitalAssetPage.buttons.filterByItemTypeButton);
  },

  insertItemType(item, addItem, nameScript) {
    I.waitForVisible(locate('span').withText(item).inside(locate('li').withAttr({ 'aria-label': item })), constants.SHORT_WAIT);
    I.doubleClick(locate('span').withText(item).inside(locate('li').withAttr({ 'aria-label': item })));
    I.doubleClick(locate('span').withText(item).inside(locate('li').withAttr({ 'aria-label': item })));
    I.waitForVisible(locate('span').withText(addItem).inside(locate('div').withAttr({ class: 'dx-item-content dx-treeview-item-content' })), constants.SHORT_WAIT);
    I.click(locate('span').withText(addItem).inside(locate('div').withAttr({ class: 'dx-item-content dx-treeview-item-content' })));
    I.waitForVisible(digitalAssetPage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(digitalAssetPage.fields.nameInputField, nameScript);
  },

  accessDefaultDataView(digitalAssetName, entityName, username1, nameDefault) {
    // filter by DA and check the needed DA
    I.waitForVisible(codeEditorPage.buttons.filterByDigitalAssetButton, constants.SHORT_WAIT);
    I.forceClick(codeEditorPage.buttons.filterByDigitalAssetButton);
    I.waitForVisible(digitalAssetPage.buttons.deselectAllDigitalAssetsButton, constants.SHORT_WAIT);
    I.forceClick(digitalAssetPage.buttons.deselectAllDigitalAssetsButton);
    I.forceClick(locate('span').withText(digitalAssetName));
    I.forceClick(digitalAssetPage.buttons.filterByDigitalAssetButton);
    I.waitForVisible(codeEditorPage.selector.expandItemTreeButton.inside(locate('li').withAttr({ 'aria-label': digitalAssetName })), constants.SHORT_WAIT);
    I.click(codeEditorPage.selector.expandItemTreeButton.inside(locate('li').withAttr({ 'aria-label': digitalAssetName })));
    // select Entity tree
    I.waitForVisible(codeEditorPage.selector.expandItemTreeButton.inside(codeEditorPage.fields.entityField), constants.SHORT_WAIT);
    I.click(codeEditorPage.selector.expandItemTreeButton.inside(codeEditorPage.fields.entityField));
    // Select your entity tree
    I.waitForVisible(codeEditorPage.selector.expandItemTreeButton.inside(locate('li').withAttr({ 'aria-label': entityName })), constants.SHORT_WAIT);
    I.click(codeEditorPage.selector.expandItemTreeButton.inside(locate('li').withAttr({ 'aria-label': entityName })));
    // Select Views tree
    I.waitForVisible(codeEditorPage.selector.expandItemTreeButton.inside(codeEditorPage.fields.viewField), constants.SHORT_WAIT);
    I.click(codeEditorPage.selector.expandItemTreeButton.inside(codeEditorPage.fields.viewField));
    // select the default data view from the entity
    I.waitForVisible(codeEditorPage.selector.expandItemTreeButton.inside(locate('li').withAttr({ 'aria-label': nameDefault })), constants.SHORT_WAIT);
    I.forceClick(codeEditorPage.selector.expandItemTreeButton.inside(locate('li').withAttr({ 'aria-label': nameDefault })));
    // select fetchObjectExpression.js
    I.waitForVisible(codeEditorPage.fields.fetchObjectExpressionField, constants.SHORT_WAIT);
    I.doubleClick(codeEditorPage.fields.fetchObjectExpressionField);
    I.forceClick(codeEditorPage.fields.fetchObjectExpressionField);
    // verify the warning massage
    I.waitForVisible(locate('div').withText(`This item is checked out by user: '${username1}'.`).inside(codeEditorPage.fields.topWarningMessageField));
  },
};