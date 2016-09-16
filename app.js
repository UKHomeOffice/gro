'use strict';

const bootstrap = require('hof-bootstrap');
const mockPostcode = require('./mock-postcode');
const config = require('./config');

const options = {
  views: false,
  fields: false,
  routes: [
    require('./apps/gro')
  ]
};

if (config.env === 'ci') {
  options.middleware = [
    mockPostcode
  ];
}

bootstrap(options);
