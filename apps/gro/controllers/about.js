'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var DateController = controllers.date;

var AboutController = function AboutController() {
  this.dateKey = 'example-dob';
  DateController.apply(this, arguments);
};

util.inherits(AboutController, DateController);

AboutController.prototype.validateField = function validateField(keyToValidate, req) {
  return DateController.prototype.validateField.call(this, keyToValidate, req, false);
};

module.exports = AboutController;
