'use strict';

var util = require('util');
var _    = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.date;

var AboutController = function AboutController() {
  BaseController.apply(this, arguments);
};

util.inherits(AboutController, BaseController);

AboutController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req, false);
};

AboutController.prototype.successHandler = function successHandler(req) {
  if (_.contains(["complaint", "other"], req.form.values["about-radio"])) {
    this.options.next = '/details';
  } else {
    this.options.next = '/type';
  }

  BaseController.prototype.successHandler.apply(this, arguments);
}

module.exports = AboutController;
