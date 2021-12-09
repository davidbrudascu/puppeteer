exports.config = {
  tests: '../ftosCore/testScenarios/*/*',
  output: './output',
  helpers: {
    getLighthouseReport: {
      require: '../helpers/getLighthouseReport.js',
    },
    grabConsoleErrors: {
      require: '../helpers/grabConsoleErrors.js',
    },
    FileSystem: {
      pathPortal: 'path-to-Portal',
      pathPortalProfile: 'path-to-PortalProfile',
      pathStudio: 'path-to-Studio',
    },
    Puppeteer: {
      url: process.env.BASEURL,
      show: false,
      chrome: {
        args: ['--no-sandbox', '--window-size=1280,960'],
      },
      windowSize: '1280x960',
    },
    AssertWrapper: {
      require: 'codeceptjs-assert',
    },
  },
  plugins: {
    tryTo: {
      enabled: true,
    },
    allure: {
      enabled: true,
    },
    stepByStepReport: {
      enabled: false,
      deleteSuccessful: false,
      screenshotsForAllureReport: true,
    },
    autoDelay: {
      enabled: true,
      methods: [
        'click',
        'fillField',
        'checkOption',
        'pressKey',
        'rightClick',
      ],
    },
  },
  bootstrap: null,
  mocha: {},
  name: 'testScenarios',
};
