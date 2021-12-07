// Data
const data = require('~data/lighthouseData/LighthouseData.json');
// Actor
const I = actor();
// Path and report name
const path = require('path');
const reportName = path.basename(__filename);

Feature('Lighthouse Audit');

Scenario('Portal Homepage Lighthouse Audit', async () => {
  I.runAudit(data.TC003URL, data.username, data.password, reportName);
});
