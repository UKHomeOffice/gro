'use strict';

const BaseController = require('hof').controllers.base;

module.exports = class NoPostcodeController extends BaseController {
  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    return Object.assign({}, locals, {
      postcodeApiMessageKey: (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }
};
