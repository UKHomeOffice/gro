'use strict';

const bootstrap = require('hof-bootstrap');
const mockPostcode = require('./mock-postcode');
const config = require('./config');

const options = {
  translations: './apps/gro/translations',
  views: false,
  fields: false,
  routes: [
    require('./apps/gro')
  ],
  redis: config.redis
};

if (config.env === 'ci') {
  options.middleware = [
    mockPostcode
  ];
}

bootstrap(options);
