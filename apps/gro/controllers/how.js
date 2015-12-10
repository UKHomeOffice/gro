'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var HowController = function HowController() {
  BaseController.apply(this, arguments);
};

util.inherits(HowController, BaseController);

HowController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

HowController.prototype.getValues = function getValues(req, res) {
  res.locals.backLink = _.last(req.sessionModel.get('steps')).replace(/^\//, '');

  BaseController.prototype.getValues.apply(this, arguments);
};

module.exports = HowController;
