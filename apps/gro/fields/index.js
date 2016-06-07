'use strict';

var _ = require('lodash');

module.exports = _.extend(
  require('./about'),
  require('./type'),
  require('./details'),
  require('./person'),
  require('./people'),
  require('./additional'),
  require('./how'),
  require('./which'),
  require('./when'),
  require('./name'),
  require('./email'),
  require('./address-outside'),
  require('./country'),
  require('./postcode'),
  require('./address')
);
