// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
const shortcutsActions = require('~actions/shortcutsActions');
// Data
const data = require('~data/shortcuts/TC005_CheckboxShortcuts.json');
// Verify
const shortcutVerify = require('~actions/shortcutsVerify');
const commonVerify = require('~actions/commonVerify');

// Author Catalin Diaconu
// AT-536

Feature('Shortcuts');

Scenario('User can use shortcuts select checkboxes/radio buttons', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFDF);
  // Verify Checkbox
  shortcutsActions.clickCheckbox(data.isDefault);
  shortcutsActions.pressKey(constants.KEY_SPACE, data.one);
  commonVerify.verifyIfCheckboxIsSelected(data.isDefault, data.false);
  shortcutsActions.pressKey(constants.KEY_SPACE, data.one);
  commonVerify.verifyIfCheckboxIsSelected(data.isDefault, data.true);
  // Access Step1
  commonActions.accessDirectUrl(data.step1FcURL);
  shortcutsActions.continueWithoutSaving();
  // Verify Radio Button
  shortcutsActions.clickRadioButton(data.navigateToAnotherFlowRadio);
  shortcutsActions.pressKey(constants.KEY_LEFT_ARROW, data.one);
  shortcutsActions.pressKey(constants.KEY_ENTER, data.one);
  shortcutVerify.verifyRadioButtonIsSelected(data.navigateToAnotherStepRadio);
  shortcutsActions.pressKey(constants.KEY_RIGHT_ARROW, data.one);
  shortcutsActions.pressKey(constants.KEY_ENTER, data.one);
  shortcutVerify.verifyRadioButtonIsSelected(data.navigateToAnotherFlowRadio);
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlFormPortal);
  // Verify Checkbox
  shortcutsActions.clickCheckbox(data.boolAttr);
  shortcutsActions.pressKey(constants.KEY_SPACE, data.one);
  commonVerify.verifyIfCheckboxIsSelected(data.boolAttr, data.false);
  shortcutsActions.pressKey(constants.KEY_SPACE, data.one);
  commonVerify.verifyIfCheckboxIsSelected(data.boolAttr, data.true);
  // Verify Radio Button
  shortcutsActions.clickRadioButton(data.noRadioButton);
  shortcutsActions.pressKey(constants.KEY_LEFT_ARROW, data.one);
  shortcutsActions.pressKey(constants.KEY_ENTER, data.one);
  shortcutVerify.verifyRadioButtonIsSelected(data.yesRadioButton);
  shortcutsActions.pressKey(constants.KEY_RIGHT_ARROW, data.one);
  shortcutsActions.pressKey(constants.KEY_ENTER, data.one);
  shortcutVerify.verifyRadioButtonIsSelected(data.noRadioButton);
  await commonActions.logoutFromApp();
});
