'use strict';

const controllers = require('hof').controllers;
const BaseController = controllers.base;

module.exports = class NoPostcodeController extends BaseController {
  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    return Object.assign({}, locals, {
      postcodeApiMessageKey: (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }
};
