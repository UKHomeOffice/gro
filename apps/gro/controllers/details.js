'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var DetailsController = function DetailsController() {
  BaseController.apply(this, arguments);
};

util.inherits(DetailsController, BaseController);

DetailsController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = DetailsController;
