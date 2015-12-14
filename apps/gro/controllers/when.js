'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var DateController = controllers.date;

var WhenController = function WhenController() {
  this.dateKey = 'when-date';
  DateController.apply(this, arguments);
};

util.inherits(WhenController, DateController);

WhenController.prototype.validateField = function validateField(keyToValidate, req) {
  return DateController.prototype.validateField.call(this, keyToValidate, req, false);
};

module.exports = WhenController;
