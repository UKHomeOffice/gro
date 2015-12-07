'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var WhichController = function WhichController() {
  BaseController.apply(this, arguments);
};

util.inherits(WhichController, BaseController);

WhichController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = WhichController;
