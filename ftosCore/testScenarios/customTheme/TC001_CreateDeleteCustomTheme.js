// Actions
const commonActions = require('~actions/commonActions');
const customThemeActions = require('~actions/customThemeActions');

// Data
const data = require('~data/customTheme/TC001_CreateDeleteCustomTheme.json');

// Author: Andrei Fabian
// AT-367
// For this test the user needs to install the 'lato' and the 'roboto' font from the prerequisites folder

Feature('Custom Theme');

Scenario('User can create and delete a custom theme', async () => {
  await commonActions.loginInApp(data.urlDesigner, data.username, data.password);
  commonActions.accessDirectUrl(data.urlCustomTheme);
  // Create a custom theme
  customThemeActions.createCustomTheme(
    data.customThemeName,
    data.baseThemeSolid,
    data.colorsTab,
    data.infoColor,
    data.warningColor,
    data.successColor,
    data.errorColor,
    data.paletteFirstColor,
    data.paletteSecondColor,
    data.paletteThirdColor,
    data.fontsTab,
    data.latoFont,
  );
  // Delete a custom theme
  customThemeActions.deleteCustomTheme(data.customThemeTest);
  await commonActions.logoutFromApp();
});
