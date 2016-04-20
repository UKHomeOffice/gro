'use strict';

const path = require('path');
const hof = require('hof');
const i18n = hof.i18n({
  path: path.resolve(__dirname, '../apps/common/translations/__lng__/__ns__.json')
});
const config = require('../config');
const logger = require('../lib/logger');

/*eslint no-unused-vars: 0*/
module.exports = function errorHandler(err, req, res) {
  /*eslint no-unused-vars: 1*/
  const content = {};

  if (err.code === 'SESSION_TIMEOUT') {
    content.title = i18n.translate('errors.session.title');
    content.message = i18n.translate('errors.session.message');
  }

  err.template = 'error';
  content.title = content.title || i18n.translate('errors.default.title');
  content.message = content.message || i18n.translate('errors.default.message');

  res.statusCode = err.status || 500;

  logger.error(err.message || err.error, err);

  res.render(err.template, {
    content,
    error: err,
    showStack: config.env === 'development',
    startLink: req.path.replace(/^\/([^\/]*).*$/, '$1')
  });
};
