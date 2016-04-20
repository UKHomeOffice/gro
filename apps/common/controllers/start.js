'use strict';

const controllers = require('hof').controllers;
const BaseController = controllers.base;

class StartController extends BaseController {
  getValues(req) {
    req.sessionModel.reset();
    super.successHandler.apply(this, arguments);
  }
}

module.exports = StartController;
