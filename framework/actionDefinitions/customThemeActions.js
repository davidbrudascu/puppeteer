// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Page
const customThemePage = require('~pages/customThemePage');
const commonPage = require('~pages/commonPage');
// Verify
const commonVerify = require('~actions/commonVerify');
// Custom Theme Color Fields
const  successColorInputField  = customThemePage.fields.successColorInputField;
const  infoColorInputField  = customThemePage.fields.infoColorInputField;
const  errorColorInputField  = customThemePage.fields.errorColorValueInputField;
const  warningColorInputField  = customThemePage.fields.warningColorInputField;
const  firstPaletteColor  = customThemePage.fields.paletteFirstColorInputField;
const  secondPaletteColor  = customThemePage.fields.paletteSecondColorInputField;
const  thirdPaletteColor  = customThemePage.fields.paletteThirdColorInputField;

const I = actor();

module.exports = {
  selectARowFromTableAfterText(textForClick) {
    I.waitForVisible(locate('td').withText(textForClick).inside(locate('tr')), constants.SHORT_WAIT);
    I.click(locate('td').withText(textForClick).inside(locate('tr')));
  },

  selectColor(color, colorField) {
    I.click(colorField);
    I.fillField(colorField, color);
    I.pressKey('Enter');
  },

  createCustomTheme(customThemeName, baseTheme, colorsTab, infoColor, warningColor, successColor, errorColor, paletteFirstColor, paletteSecondColor, paletteThirdColor, fontsTab, latoFont) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(customThemePage.fields.nameField, constants.SHORT_WAIT);
    I.fillField(customThemePage.fields.nameField, customThemeName);
    commonActions.selectValueFromDropdown(customThemePage.buttons.baseThemeDropdown, baseTheme);
    I.click(locate('span').withText(colorsTab).inside(customThemePage.selectors.tabList));
    I.waitForVisible(customThemePage.fields.infoColorInputField, constants.SHORT_WAIT);
    I.scrollTo(customThemePage.fields.infoColorInputField);
    I.waitForVisible(customThemePage.fields.infoColorInputField, constants.SHORT_WAIT);
    // Select colors for the custom theme
    this.selectColor(infoColor, infoColorInputField);
    this.selectColor(warningColor, warningColorInputField);
    this.selectColor(successColor, successColorInputField);
    this.selectColor(errorColor, errorColorInputField);
    I.waitForVisible(customThemePage.fields.paletteFirstColorInputField, constants.SHORT_WAIT);
    I.scrollTo(customThemePage.fields.paletteFirstColorInputField);
    // Select colors for the custom theme
    this.selectColor(paletteFirstColor, firstPaletteColor);
    this.selectColor(paletteSecondColor, secondPaletteColor);
    this.selectColor(paletteThirdColor, thirdPaletteColor);
    I.click(locate('span').withText(fontsTab).inside(customThemePage.selectors.tabList));
    I.waitForVisible(customThemePage.buttons.fontsPopUpButton, constants.SHORT_WAIT);
    I.click(customThemePage.buttons.fontsPopUpButton);
    commonActions.selectARowFromTableAfterText(latoFont);
    I.click(customThemePage.buttons.fontsOkButton);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  deleteCustomTheme(customThemeTest) {
    this.selectARowFromTableAfterText(customThemeTest);
    I.click(customThemePage.buttons.deleteButton);
    I.waitForClickable(commonPage.buttons.yesAnswerButton);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  editCustomTheme(baseThemeFlat, colorsTab, infoColor, successColor, warningColor, errorColor, paletteFirstColor, paletteSecondColor, paletteThirdColor, fontsTab, latoFont) {
    commonActions.selectValueFromDropdown(customThemePage.buttons.baseThemeDropdown, baseThemeFlat);
    I.click(locate('span').withText(colorsTab).inside(customThemePage.selectors.tabList));
    I.waitForVisible(customThemePage.fields.infoColorInputField, constants.SHORT_WAIT);
    I.scrollTo(customThemePage.fields.infoColorInputField);
    I.click(customThemePage.fields.infoColorInputField);
    I.fillField(customThemePage.fields.infoColorInputField, infoColor);
    I.pressKey('Enter');
    I.dontSeeInField(customThemePage.fields.successColorInputField, infoColor);
    I.click(customThemePage.fields.successColorInputField);
    I.fillField(customThemePage.fields.successColorInputField, successColor);
    I.pressKey('Enter');
    I.click(customThemePage.fields.warningColorInputField);
    I.fillField(customThemePage.fields.warningColorInputField, warningColor);
    I.pressKey('Enter');
    I.dontSeeInField(customThemePage.fields.errorColorValueInputField, warningColor);
    I.click(customThemePage.fields.errorColorValueInputField);
    I.fillField(customThemePage.fields.errorColorValueInputField, errorColor);
    I.pressKey('Enter');
    I.waitForVisible(customThemePage.fields.paletteFirstColorInputField, constants.SHORT_WAIT);
    I.scrollTo(customThemePage.fields.paletteFirstColorInputField);
    I.click(customThemePage.fields.paletteFirstColorInputField);
    I.fillField(customThemePage.fields.paletteFirstColorInputField, paletteFirstColor);
    I.pressKey('Enter');
    I.click(customThemePage.fields.paletteSecondColorInputField);
    I.fillField(customThemePage.fields.paletteSecondColorInputField, paletteSecondColor);
    I.pressKey('Enter');
    I.click(customThemePage.fields.paletteThirdColorInputField);
    I.fillField(customThemePage.fields.paletteThirdColorInputField, paletteThirdColor);
    I.pressKey('Enter');
    I.click(locate('span').withText(fontsTab).inside(customThemePage.selectors.tabList));
    I.waitForVisible(customThemePage.buttons.fontsPopUpButton, constants.SHORT_WAIT);
    I.click(customThemePage.buttons.fontsPopUpButton);
    commonActions.selectARowFromTableAfterText(latoFont);
    I.click(customThemePage.buttons.fontsOkButton);
    commonActions.saveAndCloseAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async checkCustomThemeInPortal(successScript, infoScript, warningScript, errorScript, infoColorCode, successColorCode, warningColorCode, errorColorCode, backgroundColorCode) {
    await I.executeScript(successScript);
    await I.executeScript(infoScript);
    await I.executeScript(warningScript);
    await I.executeScript(errorScript);
    I.waitForVisible(customThemePage.errors.info, constants.SHORT_WAIT);
    I.seeCssPropertiesOnElements(customThemePage.errors.info, { 'background-color': infoColorCode });
    I.waitForVisible(customThemePage.errors.success, constants.SHORT_WAIT);
    I.seeCssPropertiesOnElements(customThemePage.errors.success, { 'background-color': successColorCode });
    I.waitForVisible(customThemePage.errors.warning, constants.SHORT_WAIT);
    I.seeCssPropertiesOnElements(customThemePage.errors.warning, { 'background-color': warningColorCode });
    I.waitForVisible(customThemePage.errors.error, constants.SHORT_WAIT);
    I.seeCssPropertiesOnElements(customThemePage.errors.error, { 'background-color': errorColorCode });
    I.waitForVisible(customThemePage.container.titleContainer, constants.SHORT_WAIT);
    I.seeCssPropertiesOnElements(customThemePage.container.titleContainer, { 'background-color': backgroundColorCode });
  },

  selectIcon(iconClassName, iconName) {
    I.waitForVisible(customThemePage.fields.iconURLField, constants.SHORT_WAIT);
    I.click(customThemePage.fields.iconURLField);
    I.waitForVisible(customThemePage.buttons.iconClassButton, constants.SHORT_WAIT);
    I.click(customThemePage.buttons.iconClassButton)
    I.waitForVisible(locate('a').withText(iconClassName).inside(customThemePage.selectors.iconClassDropdown), constants.SHORT_WAIT);
    I.click(locate('a').withText(iconClassName).inside(customThemePage.selectors.iconClassDropdown));
    I.waitForVisible(locate('button').withAttr({ title: iconName}));
    I.click(locate('button').withAttr({ title: iconName}));
  },

  pinEntityToHome(entityName) {
    I.waitForVisible(customThemePage.buttons.menuButtonPortal, constants.SHORT_WAIT);
    I.click(customThemePage.buttons.menuButtonPortal);
    I.waitForVisible(customThemePage.fields.menuSearchInputFieldPortal, constants.SHORT_WAIT);
    I.fillField(customThemePage.fields.menuSearchInputFieldPortal, entityName);
    I.waitForVisible(locate('a').withText(entityName), constants.SHORT_WAIT);
    I.moveCursorTo(locate('a').withText(entityName));
    I.waitForVisible(customThemePage.buttons.pinListToHomePortalButton.withAttr({ 'entity-name': entityName}), constants.SHORT_WAIT);
    I.click(customThemePage.buttons.pinListToHomePortalButton.withAttr({ 'entity-name': entityName}));
  },

  pinEntityListToHome(entityName) {
    I.waitForVisible(customThemePage.buttons.menuButtonPortal, constants.SHORT_WAIT);
    I.click(customThemePage.buttons.menuButtonPortal);
    I.waitForVisible(customThemePage.fields.menuSearchInputFieldPortal, constants.SHORT_WAIT);
    I.fillField(customThemePage.fields.menuSearchInputFieldPortal, entityName);
    I.waitForVisible(locate('a').withText(entityName), constants.SHORT_WAIT);
    I.waitForVisible(customThemePage.buttons.pinListToHomePortalButton.withAttr({ 'entity-name': entityName}), constants.SHORT_WAIT);
    I.click(customThemePage.buttons.pinListToHomePortalButton.withAttr({ 'entity-name': entityName}));
  },

  addMenuItemEntityIcon(entityType, entityName, iconClassName, iconName) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    commonActions.selectValueFromDropdown(customThemePage.fields.entityTypeField, entityType);
    I.waitForVisible(customThemePage.fields.businessEntityField, constants.SHORT_WAIT);
    I.click(customThemePage.fields.businessEntityField);
    I.waitForVisible(customThemePage.fields.searchNameMenuItem, constants.SHORT_WAIT);
    I.fillField(customThemePage.fields.searchNameMenuItem, entityName);
    I.waitForVisible(locate('td').withText(entityName).inside(locate('tr')), constants.SHORT_WAIT);
    I.click(locate('td').withText(entityName).inside(locate('tr')));
    this.selectIcon(iconClassName, iconName);
  },

  deleteMenuItem(entityName) {
    I.waitForVisible(customThemePage.fields.searchDisplayNameMenuItemInputField, constants.SHORT_WAIT);
    I.fillField(customThemePage.fields.searchDisplayNameMenuItemInputField, entityName);
    commonActions.selectARowFromTableAfterText(entityName);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
    I.waitForInvisible(locate('td').withText(entityName).inside(customThemePage.selectors.secondRow), constants.SHORT_WAIT);
    I.dontSeeElement(locate('td').withText(entityName).inside(customThemePage.selectors.secondRow));
  },
};
