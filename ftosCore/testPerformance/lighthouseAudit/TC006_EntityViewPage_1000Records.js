// Data
const data = require('~data/lighthouseData/LighthouseData.json');
// Actor
const I = actor();
// Path and report name
const path = require('path');
const reportName = path.basename(__filename);

Feature('Lighthouse Audit');

Scenario('Entity View Page with 1000 Records Lighthouse Audit', async () => {
  I.runAudit(data.TC006URL, data.username, data.password, reportName);
});
