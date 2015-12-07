'use strict';

var _ = require('underscore');

module.exports = _.extend(
  require('./about'),
  require('./type'),
  require('./details'),
  require('./person'),
  require('./how'),
  require('./which'),
  require('./when')
);
