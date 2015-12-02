'use strict';

var _ = require('underscore');

module.exports = _.extend(
  require('./about'),
  require('./type'),
  require('./person'),
  require('./how')
);
