'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var AdditionalController = function AdditionalController() {
  BaseController.apply(this, arguments);
};

util.inherits(AdditionalController, BaseController);

AdditionalController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req, false);
};

AdditionalController.prototype.getValues = function getValues(req, res) {
  res.locals.backLink = _.last(req.sessionModel.get('steps')).replace(/^\//, '');

  BaseController.prototype.getValues.apply(this, arguments);
};

module.exports = AdditionalController;
