'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var AboutController = function AboutController() {
  BaseController.apply(this, arguments);
};

util.inherits(AboutController, BaseController);

AboutController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req, false);
};

module.exports = AboutController;
