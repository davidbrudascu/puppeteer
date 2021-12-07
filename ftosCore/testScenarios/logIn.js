// Actions
const actions = require('~root/framework/(DEPRECATED)businessActions');
// Data
const data = require('~data/login');

const I = actor();

Feature('Login');

Scenario('User can login to app', async () => {
  actions.loginToApp(data.urlDesigner, data.username, data.password);

  // I.grabValueFrom(field).then(function(variabila) {
  //    if (variabila !==  constantName)
  //        I.assertFail("Not good !")
  // }

  I.say('Great !');
});
