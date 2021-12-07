// Actions
const commonActions = require('~actions/commonActions');
const B2CActions = require('~actions/B2CActions');
// Data
const data = require('~data/B2C/TC002_Localization');

// Author Catalin Diaconu
// AT-539

Feature('B2C');

Scenario('User can use the Localize functionality through a B2C', async () => {
  // Access the B2C basic Form Driven Flow for EN.
  commonActions.accessDirectUrl(data.urlB2CEN);
  B2CActions.fillLocalizationFormEN(
    data.entityName,
    data.nameLabelEN,
    data.addressLabelEN,
    data.nameEN,
    data.addressEN,
    data.textEN,
  );
  // Access the B2C Form Driven Flow for RO
  commonActions.accessDirectUrl(data.urlB2CRO);
  B2CActions.fillLocalizationFormRO(
    data.entityName,
    data.nameLabelRO,
    data.addressLabelEN,
    data.addressLabelRO,
    data.nameRO,
    data.addressRO,
    data.textRO,
  );
});
