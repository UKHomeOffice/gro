'use strict';

const BaseController = require('hof').controllers.base;

module.exports = class PostController extends BaseController {
  constructor(options) {
    super(options);
  }

  saveValues(req, res, callback) {
    const address = (data =>

        data['address-text-one'] + ' ' +
        data['address-text-two'] + ' ' +
        data['address-text-three'] + ' ' +
        data['address-text-four'] + ' ' +
        data['address-text-five']

    )(req.form.values);

    req.sessionModel.set('address', address);

    super.saveValues(req, res, callback);
  }
};
