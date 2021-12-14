// Actions
const commonActions = require('~actions/commonActions');
const customThemeActions = require('~actions/customThemeActions');
const webConfigActions = require('~actions/webConfigActions');
// Data
const data = require('~data/customTheme/TC002_EditCustomTheme.json');

// Author: Andrei Fabian
// AT-367
// For this test the user needs to install the 'lato' and the 'roboto' font from the prerequisites folder

Feature('Custom Theme');

Scenario('User can edit a custom theme', async () => {
  // add webconfig action
  //webConfigActions.addWebConfigKey(data.applicationName, [data.keysWebConfig]);
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlCustomTheme);
  // Edit an existing custom theme
  customThemeActions.editCustomTheme(
    data.baseThemeFlat,
    data.colorsTab,
    data.infoColor,
    data.successColor,
    data.warningColor,
    data.errorColor,
    data.paletteFirstColor,
    data.paletteSecondColor,
    data.paletteThirdColor,
    data.fontsTab,
    data.latoFont,
  );
  await commonActions.logoutFromApp();
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  commonActions.accessDirectUrl(data.urlCheckCSS);
  // Check if the custom theme was applied
  await customThemeActions.checkCustomThemeInPortal(
    data.successScript,
    data.infoScript,
    data.warningScript,
    data.errorScript,
    data.infoColorCode,
    data.successColorCode,
    data.warningColorCode,
    data.errorColorCode,
    data.backgroundColorCode,
  );
  await commonActions.logoutFromApp();
  //webConfigActions.restoreWebConfigFile(data.applicationName);
});
