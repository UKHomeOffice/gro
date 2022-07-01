'use strict';

const hof = require('hof');
const config = require('./config');
const mockPostcode = require('./mock-postcode');
const _ = require('lodash');

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require)
});

if (config.env === 'ci') {
  settings.middleware = [
    mockPostcode
  ];
}

const app = hof(settings);

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  next();
});

if (config.env === 'development' || config.env === 'test') {
  app.use('/test/bootstrap-session', (req, res) => {
    const appName = req.body.appName;

    if (!_.get(req, 'session[`hof-wizard-${appName}`]')) {
      if (!req.session) {
        throw new Error('Redis is not running!');
      }

      req.session[`hof-wizard-${appName}`] = {};
    }

    Object.keys(req.body.sessionProperties || {}).forEach(key => {
      req.session[`hof-wizard-${appName}`][key] = req.body.sessionProperties[key];
    });

    res.send('Session populate complete');
  });
}

module.exports = app;
