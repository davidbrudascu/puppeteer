// Constants
const fs = require('fs');
const { DOMParser } = require('xmldom');
const paths = require('~config/codecept.conf');

const { pathPortal } = paths.config.helpers.FileSystem;
const { pathPortalProfile } = paths.config.helpers.FileSystem;
const { pathStudio } = paths.config.helpers.FileSystem;

module.exports = {

  // Add keys to the web.config file.
  addWebConfigKey(application, keysArray) {
    // Set the web.config file path for the desired application.
    const webConfigPath = (application === 'Portal' ? pathPortal : pathStudio);
    const currentWebConfigFile = `${webConfigPath}\\Web.config`;
    const backupWebConfigFile = `${webConfigPath}\\Web.config.backup`;
    // Set a general callback function, it's used in multiple calls in this method.
    function callback(err) {
      if (err) throw err;
    }
    // Backup web.config file: will be created or overwritten by default.
    fs.copyFile(currentWebConfigFile, backupWebConfigFile, callback);
    // Read the web.config file and start with the insert process.
    fs.readFile(currentWebConfigFile, { encoding: 'utf8' }, (err, data) => {
      let newData = data;
      // Parse the array of keys and insert them one by one after <appSettings> node.
      keysArray.forEach((element) => {
        const regex = new RegExp('<appSettings>\\s');
        const replaceString = `${'<appSettings> '}${'\n'}${'\t'}${element}`;
        newData = newData.replace(regex, replaceString);
      });
      // Write new data to web.config file.
      fs.writeFile(currentWebConfigFile, newData, 'utf8', callback);
    });
  },

  // Edit the existing values of web.config keys based on an array of desired keys and values
  editWebConfigKey(application, keysArray) {
    // Set the web.config file path for the desired application.
    const webConfigPath = (application === 'Portal' ? pathPortal : pathStudio);
    const currentWebConfigFile = `${webConfigPath}\\Web.config`;
    const backupWebConfigFile = `${webConfigPath}\\Web.config.backup`;
    // Set a general callback function, it's used in multiple calls in this method.
    function callback(err) {
      if (err) throw err;
    }
    // Backup web.config file: will be created or overwritten by default.
    fs.copyFile(currentWebConfigFile, backupWebConfigFile, callback);
    // Read the web.config file and start with editing process.
    fs.readFile(currentWebConfigFile, { encoding: 'utf8' }, (err, data) => {
      // Parse the xml data and store it to be used later.
      const xmlData = new DOMParser().parseFromString(data);
      // Parse the array of keys and prepare them one by one for edit
      keysArray.forEach((element) => {
        const regexKeyName = new RegExp('(?<=key=")(.*)(?=" value)');
        const regexKeyValue = new RegExp('(?<=value=")(.*)(?=")');
        const key = xmlData.getElementsByTagName('add');
        // For each key in web.config file, verify the match of keyName between key from array and file.
        for (let i = 0; i < key.length; i++) {
          const keyName = xmlData.getElementsByTagName('add')[i].getAttribute('key');
          if (keyName === element.match(regexKeyName)[0]) {
            // Update value from web.config with the one from array
            key[i].setAttribute('value', element.match(regexKeyValue)[0]);
          }
        }
      });
      // Write all the changes to the web.config file
      fs.writeFile(currentWebConfigFile, xmlData, 'utf-8', callback);
    });
  },

  // Edit the existing values of Portal Profile web.config key
  editWebConfigPortalProfileKey(keysArray) {
    const currentWebConfigFile = `${pathPortalProfile}\\Web.config`;
    // Set a general callback function, it's used in multiple calls in this method.
    function callback(err) {
      if (err) throw err;
    }
    // Read the web.config file and start with editing process.
    fs.readFile(currentWebConfigFile, { encoding: 'utf8' }, (err, data) => {
      // Parse the xml data and store it to be used later.
      const xmlData = new DOMParser().parseFromString(data);
      // Parse the array of keys and prepare them one by one for edit
      keysArray.forEach((element) => {
        const regexKeyName = new RegExp('(?<=key=")(.*)(?=" value)');
        const regexKeyValue = new RegExp('(?<=value=")(.*)(?=")');
        const key = xmlData.getElementsByTagName('add');
        // For each key in web.config file, verify the match of keyName between key from array and file.
        for (let i = 0; i < key.length; i++) {
          const keyName = xmlData.getElementsByTagName('add')[i].getAttribute('key');
          if (keyName === element.match(regexKeyName)[0]) {
            // Update value from web.config with the one from array
            key[i].setAttribute('value', element.match(regexKeyValue)[0]);
          }
        }
      });
      // Write all the changes to the web.config file
      fs.writeFile(currentWebConfigFile, xmlData, 'utf-8', callback);
    });
  },

  // Restore web.config file to from backup
  restoreWebConfigFile(application) {
    // Set the web.config file path for the desired application
    const webConfigPath = (application === 'Portal' ? pathPortal : pathStudio);
    const currentWebConfigFile = `${webConfigPath}\\Web.config`;
    const backupWebConfigFile = `${webConfigPath}\\Web.config.backup`;
    // Restore the backup of web.config file by replacing it with te current web.config file
    function callback(err) {
      if (err) throw err;
    }
    fs.copyFile(backupWebConfigFile, currentWebConfigFile, callback);
  },

  // Copy ADUserConfiguration.xml file
  addADConfigFile(sourcePath) {
    // Make sure that sourcePath has the filename too
    // If file exists in destination, it will be replaced, otherwise, created.
    fs.copyFileSync(sourcePath, `${pathPortal}\\ADUserConfiguration.xml`);
  },

};
