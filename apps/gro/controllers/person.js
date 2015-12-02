'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var PersonController = function PersonController() {
  BaseController.apply(this, arguments);
};

util.inherits(PersonController, BaseController);

PersonController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = PersonController;
