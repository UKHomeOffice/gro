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

DetailsController.prototype.successHandler = function successHandler(req) {
  if (req.form.values['existing-radio'] = "yes") {
    this.options.next = '/type';
  } else {
    this.options.next = '/name'
  }

  BaseController.prototype.successHandler.apply(this, arguments);
}

module.exports = DetailsController;
