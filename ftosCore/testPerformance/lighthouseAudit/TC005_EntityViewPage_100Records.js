// Data
const data = require('~data/lighthouseData/LighthouseData.json');
// Actor
const I = actor();
// Path and report name
const path = require('path');
const reportName = path.basename(__filename);

Feature('Lighthouse Audit');

Scenario('Entity View Page with 100 Records Lighthouse Audit', async () => {
  I.runAudit(data.TC005URL, data.username, data.password, reportName);
});
