'use strict';

const hof = require('hof');
const config = require('./config');
const mockPostcode = require('./mock-postcode');

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
  res.locals.appName = settings.appName;
  next();
});

module.exports = app;
