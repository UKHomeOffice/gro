'use strict';

const hof = require('hof');
const mockPostcode = require('./mock-postcode');
const config = require('./config');

const options = {
  start: false,
  routes: [
    require('./apps/gro')
  ],
  getCookies: false,
  getTerms: false,
  redis: config.redis
};

const app = hof(options);

if (config.env === 'ci') {
  options.middleware = [
    mockPostcode
  ];
}

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' }
  ];
  // set service name for cookie banner
  res.locals.serviceName = 'GRO';
  next();
});

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  next();
});

app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

module.exports = app;
