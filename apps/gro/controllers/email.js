'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var EmailController = function EmailController() {
  BaseController.apply(this, arguments);
};

util.inherits(EmailController, BaseController);

EmailController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = EmailController;
