'use strict';

const BaseController = require('hof').controllers.base;

module.exports = class StartController extends BaseController {

  constructor(options) {
    super(options);
  }

  /*eslint no-unused-vars: 0*/
  getValues(req, res, callback) {
    req.sessionModel.reset();
    super.successHandler.apply(this, arguments);
  }

};
