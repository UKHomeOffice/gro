'use strict';

const BaseController = require('hof').controllers.base;

module.exports = class AddressController extends BaseController {
  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    const isDomestic = req.form.values.country === 'United Kingdom';
    return Object.assign({}, locals, {
      isDomestic,
      postcodeApiMessageKey: (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }
};
