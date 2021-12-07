const Helper = require('@codeceptjs/helper');

class getConsoleErrors extends Helper {
  async getErrors() {
    try {
      console.log('called');
      const browserLogs = await this.grabBrowserLogs();
      console.log(browserLogs);
      let errorOrWarning = false;
      if (browserLogs.indexOf('WARNING') >= -1) errorOrWarning = true;
      if (browserLogs.indexOf('SEVERE') >= -1) errorOrWarning = true;
      console.log(errorOrWarning);
      return errorOrWarning;
    } catch (error) {
      console.error('Error!', error);
    }
  }
}

module.exports = getConsoleErrors;
