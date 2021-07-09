'use strict';

const hof = require('hof');
const config = require('./config');
const mockPostcode = require('./mock-postcode');

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  routes: settings.routes.map(require)
});

if (config.env === 'ci') {
  settings.middleware = [
    mockPostcode
  ];
}

const app = hof(settings);

module.exports = app;
