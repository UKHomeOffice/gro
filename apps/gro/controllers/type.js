'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var TypeController = function TypeController() {
  BaseController.apply(this, arguments);
};

util.inherits(TypeController, BaseController);

TypeController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = TypeController;
