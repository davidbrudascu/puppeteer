const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: true,
      // args:  ['--enable-features=NetworkService'],
      // ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://caltrackr.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();