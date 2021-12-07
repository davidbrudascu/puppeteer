// Actions
const commonActions = require('~actions/commonActions');
const B2CActions = require('~actions/B2CActions');
// Data
const data = require('~data/B2C/TC003_CheckFormEntityView');
// Verify
const B2CVerify = require('~actions/B2CVerify');

// Author Catalin Diaconu
// AT-544/AT-993

Feature('B2C');

Scenario('BUG: User can navigate Form Driven Flows through a B2C', async () => {
  commonActions.accessDirectUrl(data.urlFirstFDFB2C);
  B2CVerify.verifyLabelsCheckFormFirstFDF();
  B2CActions.fillFirstFDFCheckForm(data.secondRecord, data.name);
  // FIXME BUG Getting redirected, but the page doesn't refresh
  B2CVerify.verifyElementsCheckFormSecondFDF();
});
