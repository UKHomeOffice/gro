'use strict';

const controllers = require('hof').controllers;
const BaseController = controllers.base;

class PostController extends BaseController {
  saveValues(req, res, callback) {
    var data = req.form.values;
    var address = [
      data['address-text-one'],
      data['address-text-two'],
      data['address-text-three'],
      data['address-text-four'],
      data['address-text-five']
    ].join(' ');

    req.sessionModel.set('address', address);
    super.saveValues(req, res, callback);
  }
}

module.exports = PostController;
