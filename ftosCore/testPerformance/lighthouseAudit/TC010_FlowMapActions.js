// Data
const data = require('~data/lighthouseData/LighthouseData.json');
// Actor
const I = actor();
// Path and report name
const path = require('path');
const reportName = path.basename(__filename);

Feature('Lighthouse Audit');

Scenario('Flow Map Page with Actions Lighthouse Audit', async () => {
  I.runAudit(data.TC010URL, data.username, data.password, reportName);
});
