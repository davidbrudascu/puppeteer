FintechOS CodeceptJS automated test suite.

#### Installation:
1. `npm install` to install the dependencies from package.json to /node_modules
2. `npx codeceptjs run -c ./config/local.conf.js --plugins allure` to run a config file, generating allure reports xml
3. Optionally, to use `allure-commandline`, run `npx allure serve ./config/output/` to generate an Allure visual report
4. Optionally, npm script on Windows to empty out the *output/* folder `@powershell Remove-Item ./config/output/* -Recurse -Force;`. Chain with `&&` to empty&run each time.

#### Dependencies:
    "allure-commandline": "2.13.0",
    "codeceptjs": "^3.0.5",
    "codeceptjs-assert": "0.0.4",
    "codeceptjs-resemblehelper": "^1.9.3",
    "exceljs": "^4.2.0",
    "html-minifier": "4.0.0",
    "link-module-alias": "1.2.0",
    "puppeteer": "5.0.0",
    "lighthouse": "^7.3.0"
#### Local FintechOS setup:
To run the tests properly on local, you need the following FintechOS setup:
* Studio web app, with the path '_Designer';
* Portal web app, with the path '_Portal';
* Portal Profile web app, with the path '_PortalProfile';
* B2C web app (no need for path because it's not used in tests)
* Proxy web app, with the path '_B2C';

#### Structure:
- */config/*
   - *output/* - Used for Allure Reporting and Step by step reporting.
   - *screenshots/* - screenshot files to be used in visual difference tests
   - *\*.conf.js* - CodeceptJS configuration files for tests. F.ex. local, codecept, jenkins.
   - *steps.d.ts* - TypeScript Definitions provide autocompletion in Visual Studio Code and other IDEs.
- */DB/* - current database backup
- */framework/*
   - *actionDefinitions/* - used for Actions and Verify files, ex navigation, clicks, checks.
   - *page/* - used for Page Object files, ex. selectors, option sets, page related things.
- */ftosCore/*
   - *testData/* - contains .json files with test data, ex. logins, urls, test data, identifiers for data.
   - *testScenarios/* - contains the scenarios files for functional tests.
   - *testPerformance/* - contains the scenario files for Lighthouse performance tests.
- */helpers/* - helpers files, currently used by Lighthouse scenarios
- */prerequisites/* - prerequisite files for different tests that need to be added on local FTOS setup in order to run the tst properly
- */reportsOutput/*:
    - */reportFunctionalTests/*: - report folder to be used by Functional Tests
    - */reportPerformanceTests/*: - report folder to be used by Performance Tests (currently Lighthouse tests)
- *.gitignore* - ignore `node_modules/` and other files from committing them accidentally.
- *README.md* - you are reading this :)

~~RT = Regression tests~~ ~~ST = Smoke tests~~ <- currently discontinued terminology
