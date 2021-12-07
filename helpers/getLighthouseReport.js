const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const Helper = require('@codeceptjs/helper');
const puppeteer = require('puppeteer');
const data = require('~data/lighthouseData/LighthouseData.json');

// TODO for pr change to codecept config
const configPuppeteer = require('../config/codecept.conf');

class getLighthouseReport extends Helper {
  async runAudit(targetURL, username, password, fileName) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const baseUrl = configPuppeteer.config.helpers.Puppeteer.url + targetURL;
      const fileNameJSON = `${fileName}.json`;
      const fileNameHTML = `${fileName}.html`;

      // Verifies if the page that needs to be tested also needs the login action
      let needLogin = true;
      if (targetURL == data.TC007URL) { needLogin = false; }
      if (targetURL == data.TC004URL) { needLogin = false; }

      console.log('Navigating to Login page...');
      let page = (await browser.pages())[0];
      await page.goto(baseUrl, { waitUntil: 'networkidle0' });

      if (needLogin == true) {
        console.log('Starting login: entering username and password ...');
        await page.type('#usernameField', username);
        await page.type('#passwordField', password);

        console.log('Logging in ...');
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle0' }),
          page.click('.btn-login'),
          page.goto(baseUrl),
          page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
      }

      page = (await browser.pages())[0];
      console.log(browser.wsEndpoint());
      console.log('Running lighthouse...');
      const report = await lighthouse(page.url(), {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        logLevel: 'info',
        disableDeviceEmulation: true,
        chromeFlags: ['--disable-mobile-emulation'], // TODO change this to have the ability to run on mobile or desktop (try to find parameter for run script)
      }, config);
      const json = reportGenerator.generateReport(report.lhr, 'json');
      const html = reportGenerator.generateReport(report.lhr, 'html');
      console.log(`Lighthouse scores: ${report.lhr.audits}`);

      console.log('Writing results...');
      fs.writeFileSync(path.join(__dirname, '../reportsOutput/reportPerformanceTests/', fileNameJSON), json);
      fs.writeFileSync(path.join(__dirname, '../reportsOutput/reportPerformanceTests/', fileNameHTML), html);
      console.log('Done!');
    } catch (error) {
      console.error('Error!', error);
    }
  }
}
module.exports = getLighthouseReport;
